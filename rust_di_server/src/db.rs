mod schema;
mod models;
use diesel::pg::PgConnection;
use diesel::prelude::*;
use dotenvy::dotenv;
use std::env;
use models::*;
use schema::figures::dsl::*;
use schema::light_programs::dsl::*;
use urlencoding::decode;

pub fn establish_connection() -> PgConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set.");
    PgConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

pub fn get_all_figures() -> Vec<models::Figure> {
    let connection = &mut establish_connection();
    figures
        .load::<Figure>(connection)
        .expect("Error loading figures")
}

pub fn get_figure(query_tag: String) -> Vec<models::Figure> {
    let connection = &mut establish_connection();
    figures
        .filter(tag.eq(query_tag))
        .limit(1)
        .load(connection)
        .expect("Error loading figures")
}

pub fn post_figure(data: String) -> () {
    let connection = &mut establish_connection();
    let info = decode(&data).expect("").into_owned();
    let json: Figure = serde_json::from_str(&info).expect("");
    diesel::insert_into(figures)
        .values(&json)
        .execute(connection)
        .expect("Error saving figure");
}

pub fn put_figure(query_tag: String, data: String) -> () {
    let connection = &mut establish_connection();
    let info = decode(&data).expect("").into_owned();
    let json: Figure = serde_json::from_str(&info).expect("");
    diesel::update(figures.find(query_tag))
        .set((
            name.eq(json.name),
            base_r.eq(json.base_r),
            base_g.eq(json.base_g),
            base_b.eq(json.base_b),
            light_program.eq(json.light_program)
        ))
        .get_result::<Figure>(connection)
        .expect("Error updating figure");
}

pub fn get_all_light_programs() -> Vec<models::LightProgram> {
    let connection = &mut establish_connection();
    light_programs
        .load::<LightProgram>(connection)
        .expect("Error loading light programs")
}

pub fn get_light_program(query_tag: String) -> Vec<models::LightProgram> {
    let connection = &mut establish_connection();
    light_programs
        .filter(scheme.eq(query_tag))
        .limit(1)
        .load(connection)
        .expect("Error loading light program")
}

pub fn post_light_program(data: String) -> () {
    let connection = &mut establish_connection();
    let info = decode(&data).expect("").into_owned();
    let json: LightProgram = serde_json::from_str(&info).expect("");
    diesel::insert_into(light_programs)
        .values(&json)
        .execute(connection)
        .expect("Error saving light program");
}

pub fn put_light_program(query_tag: String, data: String) -> () {
    let connection = &mut establish_connection();
    let info = decode(&data).expect("").into_owned();
    let json: LightProgram = serde_json::from_str(&info).expect("");
    diesel::update(light_programs.find(query_tag))
        .set((
            scheme.eq(json.scheme),
            code.eq(json.code),
        ))
        .get_result::<LightProgram>(connection)
        .expect("Error updating light program");
}
