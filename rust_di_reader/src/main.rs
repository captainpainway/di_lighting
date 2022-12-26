use std::time::Duration;
use rusb::{DeviceHandle, GlobalContext};
use serde::{Deserialize};

#[derive(Deserialize, Debug)]
struct DITag {
    tag: String,
    name: String,
    base_r: u8,
    base_g: u8,
    base_b: u8,
    light_program: u8,
}

#[tokio::main]
async fn main() {
    let mut message_number: u8 = 0;
    let device = start_device().expect("No device found.");

    // Send activation code.
    activate(&device, &mut message_number).await;

    // Wait for tags to be placed on the base.
    loop {
        let val = wait_for_tag(&device).await;
        match val[0x00] {
            0xab => disc_added_or_removed(&device, val, &mut message_number).await,
            _ => (),
        }
    }
}

fn start_device() -> Option<DeviceHandle<GlobalContext>> {
    let dev = rusb::open_device_with_vid_pid(0x0e6f, 0x0129);
    match dev {
        Some(mut device) => {
            device.reset().unwrap();
            let language = device.read_languages(Duration::from_secs(1)).unwrap()[0];
            let device_desc = device.device().device_descriptor().unwrap();
            let product_string = device.read_product_string(language, &device_desc, Duration::from_secs(1)).unwrap();
            println!("{:?}", product_string);

            if device.kernel_driver_active(0).unwrap() {
                device.detach_kernel_driver(0).unwrap();
            }
            device.claim_interface(0).unwrap();
            Some(device)
        },
        None => {
            println!("No device found");
            None
        },
    }
}

async fn send_command(device: &DeviceHandle<GlobalContext>, command: [u8; 32]) {
    let write = device.write_interrupt(1, &command[..], Duration::from_secs(5));
    match write {
        Ok(_) => {},
        Err(e) => println!("Error: {:?}", e),
    }
}

fn construct_message(command: u8, data: Vec<u8>, message_number: &mut u8) -> [u8; 32] {
    let command_body = [vec![command, *message_number], data].concat();
    let command_length: u8 = command_body.len() as u8;
    let command_bytes: Vec<u8> = [vec![0xff, command_length], command_body].concat();
    let mut message: [u8; 32] = [0x00; 32];
    let checksum: u8 = command_bytes.clone().into_iter().fold(0, |a, b| a.wrapping_add(b));
    command_bytes.iter().enumerate().map(|(i, &byte)| message[i] = byte).for_each(drop);
    message[command_bytes.len()] = checksum & 0xff;
    *message_number = *message_number + 1;
    message
}

async fn activate(device: &DeviceHandle<GlobalContext>, message_number: &mut u8) {
    let activate = vec![0x28, 0x63, 0x29, 0x20, 0x44, 0x69, 0x73, 0x6e, 0x65, 0x79, 0x20, 0x32, 0x30, 0x31, 0x33];
    let activate_command = construct_message(0x80, activate, message_number);
    send_command(&device, activate_command).await;
}

fn read_buffer(device: &DeviceHandle<GlobalContext>) -> [u8; 32] {
    let mut buf = [0; 32];
    let response = device.read_interrupt(129, &mut buf, Duration::from_millis(100));
    //println!("{:?}", buf);
    match response {
        Ok(_len) => return buf,
        Err(_e) => return buf,
    }
}

async fn wait_for_tag(device: &DeviceHandle<GlobalContext>) -> [u8; 32] {
    read_buffer(device)
}

async fn disc_added_or_removed(device: &DeviceHandle<GlobalContext>, data: [u8; 32], mut message_number: &mut u8) {
    let base_num = data[2];
    let disc_ref = data[4];
    let added_removed = data[5];
    if added_removed == 0x00 { // New disc placed on base.
        let tag = read_tag(&device, disc_ref, message_number).await;
        if tag != "No tag found" {
            let di_tag_vec = check_if_tag_is_known(&tag).await;
            if di_tag_vec[0].name.len() > 0 {
                let light_color = get_base_color(&di_tag_vec[0], base_num);
                light_base(&device, light_color, &mut message_number).await;
                println!("{:?}: {:?}", di_tag_vec[0].name, tag);
                spawn_lightshow(&di_tag_vec[0].light_program).await;
            } else {
                light_base(&device, vec![base_num, 255, 255, 255], &mut message_number).await;
                println!("Unknown tag: {:?}", tag);
            }
            // Send tag to REST endpoint for web client.
            let body = [("tag", tag)];
            let client = reqwest::Client::new();
            client.post("http://localhost:8080/api/set_current")
                .form(&body)
                .send()
                .await
                .unwrap();
        }
    } else { // Disc removed from base.
        kill_lightshow().await;
        light_base(&device, vec![base_num, 0, 0, 0], &mut message_number).await;
        // Send empty string to REST endpoint for web client.
        let body = [("tag", "")];
        let client = reqwest::Client::new();
        client.post("http://localhost:8080/api/set_current")
            .form(&body)
            .send()
            .await
            .unwrap();
    }
}

async fn spawn_lightshow(light_program: &u8) {
    if *light_program != 0 as u8 {
        let body = format!("{{\"on\": true, \"playlist\": {{\"ps\": [{}]}}}}", light_program);
        let client = reqwest::Client::new();
        client.post("http://192.168.0.83/json")
            .body(body)
            .send()
            .await
            .unwrap();
        println!("Started light show: {:?}", light_program);
    }
}

async fn kill_lightshow() {
    let body = "{\"on\": false}";
    let client = reqwest::Client::new();
    client.post("http://192.168.0.83/json")
        .body(body)
        .send()
        .await
        .unwrap();
    println!("Lights are now off");
}

fn get_base_color(di_tag: &DITag, base_num: u8) -> Vec<u8> {
    let light_color: Vec<u8> = [vec![base_num], vec!(di_tag.base_r, di_tag.base_g, di_tag.base_b)].concat();
    light_color
}

async fn check_if_tag_is_known(tag: &String) -> Vec<DITag> {
    let tmp = DITag {name: String::new(), tag: String::new(), base_r: 0, base_g: 0, base_b: 0, light_program: 0};
    let body = reqwest::get("http://localhost:8080/api/figures/".to_owned() + tag)
        .await
        .unwrap()
        .json::<DITag>()
        .await
        .unwrap_or(tmp);
    vec!(body)
}

async fn read_tag(device: &DeviceHandle<GlobalContext>, disc_ref: u8, message_number: &mut u8) -> String {
    let tag_command = construct_message(0xb4, vec![disc_ref], message_number);
    send_command(&device, tag_command).await;
    get_tag_id(read_buffer(&device))
}

fn get_tag_id(val: [u8; 32]) -> String {
    if val[0x03] != 0x80 {
        if val[0x04] != 0x00 && val[0x04] != 15 {
            let tag = &val[4..11];
            let tag_id: String = tag.to_vec().into_iter().enumerate().map(|(i, x)| {
                let mut hex = format!("{:X?}", x);
                if i != 6 {
                    hex += ":";
                }
                hex
            }).collect();
            return tag_id;
        }
    }
    return "No tag found".to_string();
}

async fn light_base(device: &DeviceHandle<GlobalContext>, data: Vec<u8>, message_number: &mut u8) {
    let light_command = construct_message(0x90, data, message_number);
    send_command(&device, light_command).await;
}
