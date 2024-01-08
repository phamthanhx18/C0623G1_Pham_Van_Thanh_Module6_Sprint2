package com.example.shoesstore.controller;

import com.example.shoesstore.model.product.Category;
import com.example.shoesstore.model.product.Product;
import com.example.shoesstore.service.product.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/category")
@RestController
public class CategoryController {
    @Autowired
    private ICategoryService categoryService;
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategory(){
        List<Category> categoryList = categoryService.getAllCategory();
        if (categoryList.size() == 0) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(categoryList,HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Category> getAllCategory(@PathVariable Long id){
        Category category = categoryService.findById(id);
        if (category == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(category,HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id){
        categoryService.deleteCategory(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/all")
    public ResponseEntity<Page<Category>> getAllCategory(@PageableDefault(size = 10) Pageable pageable){
        Page<Category> categoryPage = categoryService.getAllCategory(pageable);
        if (categoryPage.toList().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(categoryPage,HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<?> addCategory(@RequestBody Category category){
        try {
            categoryService.save(category);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
