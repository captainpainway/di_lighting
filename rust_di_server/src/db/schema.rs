// @generated automatically by Diesel CLI.

diesel::table! {
    figures (tag) {
        tag -> Text,
        name -> Nullable<Text>,
        base_r -> Nullable<Int4>,
        base_g -> Nullable<Int4>,
        base_b -> Nullable<Int4>,
        light_program -> Nullable<Text>,
    }
}
