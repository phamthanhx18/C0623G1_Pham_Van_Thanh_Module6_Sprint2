package com.example.shoesstore.service.product.impl;

import com.example.shoesstore.model.product.Category;
import com.example.shoesstore.repository.product.ICategoryRepository;
import com.example.shoesstore.service.product.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService implements ICategoryService {
    @Autowired
    private ICategoryRepository categoryRepository;
    @Override
    public List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }
}
