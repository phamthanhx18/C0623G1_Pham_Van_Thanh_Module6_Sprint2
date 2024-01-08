package com.example.shoesstore.service.product;

import com.example.shoesstore.model.product.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ICategoryService {
    List<Category> getAllCategory();
    Page<Category> getAllCategory(Pageable pageable);
    void save(Category category);
    Category findById(Long id);
    void deleteCategory(Long id);
}
