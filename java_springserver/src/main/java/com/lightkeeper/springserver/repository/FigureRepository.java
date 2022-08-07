package com.lightkeeper.springserver.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

import com.lightkeeper.springserver.model.Figure;

public interface FigureRepository extends MongoRepository<Figure, String>{
    Optional<Figure> findByName(String name);
    Optional<Figure> findByTag(String tag);
}