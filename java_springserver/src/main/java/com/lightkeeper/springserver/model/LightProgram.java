package com.lightkeeper.springserver.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "light_programs")
public class LightProgram {
    @Id
    public String id;

    public String scheme;
    public String code;

    public LightProgram() {}

    public LightProgram(String scheme, String code) {
        this.scheme = scheme;
        this.code = code;
    }
}
