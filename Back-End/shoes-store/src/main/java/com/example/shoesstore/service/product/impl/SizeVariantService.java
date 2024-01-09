package com.example.shoesstore.service.product.impl;

import com.example.shoesstore.model.product.ProductVariant;
import com.example.shoesstore.model.product.Size;
import com.example.shoesstore.model.product.SizeVariant;
import com.example.shoesstore.repository.product.ISizeVariantRepository;
import com.example.shoesstore.service.product.ISizeVariantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SizeVariantService implements ISizeVariantService {
    @Autowired
    private ISizeVariantRepository sizeVariantRepository;
    @Override
    public SizeVariant findSizeVariant(Size size, ProductVariant productVariant) {
        return sizeVariantRepository.findBySizeAndProductVariant(size,productVariant);
    }

    @Override
    public void save(SizeVariant sizeVariant) {
        sizeVariantRepository.save(sizeVariant);
    }

}
