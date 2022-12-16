use diesel::prelude::*;
use serde::Serialize;

#[derive(Debug, Queryable, Serialize)]
pub struct Figure {
    pub tag: String,
    pub name: Option<String>,
    pub base_r: Option<i32>,
    pub base_g: Option<i32>,
    pub base_b: Option<i32>,
    pub light_program: Option<String>,
}