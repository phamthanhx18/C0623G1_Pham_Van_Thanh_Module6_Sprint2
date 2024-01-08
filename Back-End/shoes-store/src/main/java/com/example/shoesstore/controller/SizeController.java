package com.example.shoesstore.controller;

import com.example.shoesstore.model.product.Category;
import com.example.shoesstore.model.product.Color;
import com.example.shoesstore.model.product.Size;
import com.example.shoesstore.service.product.ISizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api/size")
@RestController
public class SizeController {
    @Autowired
    private ISizeService sizeService;

    @GetMapping
    public ResponseEntity<List<Size>> getAllCategory(){
        List<Size> sizeList = sizeService.findAll();
        if (sizeList.size() == 0) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(sizeList,HttpStatus.OK);
    }
    @GetMapping("/all")
    public ResponseEntity<Page<Size>> getAllCategory(@PageableDefault(size = 10) Pageable pageable){
        Page<Size> colorPage = sizeService.findAll(pageable);
        if (colorPage.toList().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(colorPage,HttpStatus.OK);
    }
}
