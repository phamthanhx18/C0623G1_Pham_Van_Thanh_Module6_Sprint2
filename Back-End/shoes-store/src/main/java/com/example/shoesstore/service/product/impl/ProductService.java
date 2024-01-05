package com.example.shoesstore.service.product.impl;

import com.example.shoesstore.model.product.Product;
import com.example.shoesstore.repository.product.IProductRepository;
import com.example.shoesstore.service.product.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements IProductService {
    @Autowired
    private IProductRepository productRepository;

    @Override
    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    @Override
    public Page<Product> getAllProduct(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id).get();
    }

    @Override
    public Double findMaxPrice() {
        return productRepository.findMaxPrice();
    }

    @Override
    public List<Product> filterProducts(List<Long> categories, List<Long> colors, List<Long> sizes, Long minPrice, Long maxPrice) {
        return productRepository.filterProducts(categories,colors,sizes,minPrice,maxPrice);
    }

    @Override
    public void saveProduct(Product product) {
        productRepository.save(product);
    }
}
