package com.example.shoesstore.controller;

import com.example.shoesstore.model.product.Color;
import com.example.shoesstore.service.product.IColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
