package com.lightkeeper.springserver.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "figures")
public class Figure {
    @Id
    public String id;

    public String tag;
    public String name;
    public int base_r;
    public int base_g;
    public int base_b;
    public String light_program;

    public Figure() {}

    public Figure(String name, String tag, int base_r, int base_g, int base_b, String light_program) {
        this.name = name;
        this.tag = tag;
        this.base_r = base_r;
        this.base_g = base_g;
        this.base_b = base_b;
        this.light_program = light_program;
    }
}
