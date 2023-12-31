package com.example.shoesstore.repository.product;

import com.example.shoesstore.model.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductRepository extends JpaRepository<Product,Long> {
}
