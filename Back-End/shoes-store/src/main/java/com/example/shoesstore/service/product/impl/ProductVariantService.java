package com.example.shoesstore.service.product.impl;

import com.example.shoesstore.model.product.ProductVariant;
import com.example.shoesstore.repository.product.IProductVariantRepository;
import com.example.shoesstore.service.product.IProductVariantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductVariantService implements IProductVariantService {
    @Autowired
    private IProductVariantRepository productVariantRepository;
    @Override
    public void save(ProductVariant productVariant) {
        productVariantRepository.save(productVariant);
    }
}
