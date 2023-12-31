package com.example.shoesstore.service.product.impl;

import com.example.shoesstore.model.product.Product;
import com.example.shoesstore.repository.product.IProductRepository;
import com.example.shoesstore.service.product.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements IProductService {
    @Autowired
    IProductRepository productRepository;

    @Override
    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id).get();
    }
}
