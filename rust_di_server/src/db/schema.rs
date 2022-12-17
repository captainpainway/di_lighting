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

diesel::table! {
    light_programs (scheme) {
        scheme -> Text,
        code -> Nullable<Text>,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    figures,
    light_programs,
);
