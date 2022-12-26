use diesel::prelude::*;
use serde::{Serialize, Deserialize};
use crate::db::schema::*;

#[derive(Debug, Queryable, Insertable, Serialize, Deserialize)]
#[diesel(table_name = figures)]
pub struct Figure {
    pub tag: String,
    pub name: Option<String>,
    pub base_r: Option<i32>,
    pub base_g: Option<i32>,
    pub base_b: Option<i32>,
    pub light_program: Option<i32>,
}