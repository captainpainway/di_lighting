package com.lightkeeper.springserver.controller;
import com.lightkeeper.springserver.model.Figure;
import com.lightkeeper.springserver.repository.FigureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")

public class FigureController {
    @Autowired
    FigureRepository figureRepository;
    String current_tag = "";
    @GetMapping("/figures")
    public ResponseEntity<List<Figure>> getAllFigures() {
        try {
            List<Figure> figures = new ArrayList<Figure>();
            figureRepository.findAll().forEach(figures::add);
            if (figures.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(figures, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/figures")
    public ResponseEntity<Figure> createNewFigure(@RequestBody Figure figure) {
        try {
            Figure _figure = figureRepository.save(new Figure(figure.name, figure.tag, figure.base_r, figure.base_g, figure.base_b, figure.light_program));
            return new ResponseEntity<>(_figure, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/figures/{tag}")
    public ResponseEntity<Figure> updateFigure(@PathVariable("tag") String tag, @RequestBody Figure figure) {
        Optional<Figure> figureData = figureRepository.findByTag(tag);
        if (figureData.isPresent()) {
            Figure _figure = figureData.get();
            _figure.name = figure.name;
            _figure.base_r = figure.base_r;
            _figure.base_g = figure.base_g;
            _figure.base_b = figure.base_b;
            _figure.light_program = figure.light_program;
            return new ResponseEntity<>(figureRepository.save(_figure), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/figures/{tag}")
    public ResponseEntity<Figure> getFigureByTag(@PathVariable("tag") String tag) {
        Optional<Figure> figureData = figureRepository.findByTag(tag);
        if (figureData.isPresent()) {
            return new ResponseEntity<>(figureData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/set_current")
    public ResponseEntity<String> shareTag(@RequestBody String tag) {
        current_tag = tag.substring(4);
        return new ResponseEntity<String>(tag, HttpStatus.OK);
    }

    @GetMapping("/get_current")
    public ResponseEntity<HashMap<String, String>> returnTag(String tag) {
        HashMap<String, String> res = new HashMap<>();
        res.put("tag", current_tag);
        return new ResponseEntity<HashMap<String, String>>(res, HttpStatus.OK);
    }
}
