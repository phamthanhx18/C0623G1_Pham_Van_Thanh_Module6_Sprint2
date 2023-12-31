package com.example.shoesstore.repository.product;

import com.example.shoesstore.model.product.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICategoryRepository extends JpaRepository<Category,Long> {
}
