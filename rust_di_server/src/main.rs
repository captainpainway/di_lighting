mod db;
use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use actix_web::http::header;
use actix_cors::Cors;
use serde::Serialize;
use std::sync::Mutex;
use urlencoding::decode;

#[derive(Debug, Serialize)]
struct AppState {
    current: Mutex<String>,
}

#[derive(Debug, Serialize)]
struct Tag {
    tag: String
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let current = web::Data::new(AppState {
        current: Mutex::new(String::new())
    });

    HttpServer::new(move || {
        App::new()
            .app_data(current.clone())
            .wrap(Cors::default()
                .allowed_origin("http://127.0.0.1:8081")
                .allowed_methods(vec!["GET", "POST"])
                .allowed_headers(vec![header::AUTHORIZATION, header::ACCEPT])
                .allowed_header(header::CONTENT_TYPE)
                .max_age(3600)
            )
            .service(
                web::scope("/api")
                    .service(hello)
                    .service(all_figures)
                    .service(figure)
                    .service(get_current)
                    .service(set_current)
                    .service(new_figure)
            )
    })
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

#[get("/figures")]
async fn all_figures() -> impl Responder {
    let figures = db::get_all_figures();
    let json = serde_json::to_string(&figures).expect("");
    HttpResponse::Ok().body(json)
}

#[get("/figures/{tag}")]
async fn figure(path: web::Path<String>) -> impl Responder {
    let figures = db::get_figure(path.to_string());
    match figures.len() {
        0 => HttpResponse::NotFound().body(""),
        _ => {
            let json = serde_json::to_string(&figures[0]).expect("");
            HttpResponse::Ok().body(json)
        }
    }
}

#[get("/get_current")]
async fn get_current(data: web::Data<AppState>) -> impl Responder {
    // let t = Tag {
    //     tag: decode(&data.current.lock().unwrap())
    //         .expect("     ")
    //         .into_owned()[4..]
    //         .to_string()
    // };
    // let tag = serde_json::to_string(&t).expect("");
    // HttpResponse::Ok().body(tag)
    let tag = data.current.lock().unwrap();
    match tag.len() {
        0 => HttpResponse::NotFound().body(""),
        _ => {
            // let figures = db::get_figure(decode(&tag)
            //     .expect("")
            //     .into_owned()[4..]
            //     .to_string()
            // );
            let t = Tag {
                tag: decode(&tag)
                    .expect("     ")
                    .into_owned()[4..]
                    .to_string()
            };
            let json = serde_json::to_string(&t).expect("");
            HttpResponse::Ok().body(json)
        }
    }
}

#[post("/figures")]
async fn new_figure(req_body: String) -> impl Responder {
    db::post_figure(req_body);
    HttpResponse::Ok().body("")
}

#[post("/set_current")]
async fn set_current(req_body: String, data: web::Data<AppState>) -> impl Responder {
    let mut current = data.current.lock().unwrap();
    *current = req_body.clone();
    HttpResponse::Ok().body(req_body)
}
