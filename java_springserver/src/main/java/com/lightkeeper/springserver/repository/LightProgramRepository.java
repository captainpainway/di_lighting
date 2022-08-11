package com.lightkeeper.springserver.repository;

import com.lightkeeper.springserver.model.LightProgram;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface LightProgramRepository extends MongoRepository<LightProgram, String>{
    Optional<LightProgram> findByScheme(String scheme);
}