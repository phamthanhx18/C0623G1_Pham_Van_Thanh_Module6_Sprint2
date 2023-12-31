package com.example.shoesstore.service.product;

import com.example.shoesstore.model.product.Product;

import java.util.List;

public interface IProductService {
    List<Product> getAllProduct();
    Product getProductById(Long id);
}
