package com.example.shoesstore.controller;

import com.example.shoesstore.model.product.Category;
import com.example.shoesstore.model.product.Color;
import com.example.shoesstore.service.product.IColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/color")
@RestController
public class ColorController {
    @Autowired
    private IColorService colorService;
    @GetMapping
    public ResponseEntity<List<Color>> getAllCategory(){
        List<Color> colorList = colorService.findAll();
        if (colorList.size() == 0) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(colorList,HttpStatus.OK);
    }
    @GetMapping("/all")
    public ResponseEntity<Page<Color>> getAllCategory(@PageableDefault(size = 10) Pageable pageable){
        Page<Color> colorPage = colorService.findAll(pageable);
        if (colorPage.toList().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(colorPage,HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addColor(@RequestBody Color color){
        try {
            colorService.save(color);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<Color> getColor(@PathVariable Long id){
        Color color = colorService.findById(id);
        if (color == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(color,HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteColor(@PathVariable Long id){
        colorService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
