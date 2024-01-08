package com.example.shoesstore.service.product.impl;

import com.example.shoesstore.model.product.Size;
import com.example.shoesstore.repository.product.ISizeRepository;
import com.example.shoesstore.service.product.ISizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SizeService implements ISizeService {
    @Autowired
    private ISizeRepository sizeRepository;
    @Override
    public List<Size> findSizesByProductVariantId(Long productVariantId) {
        return sizeRepository.findSizesByProductVariantId(productVariantId);
    }

    @Override
    public List<Size> findAll() {
        return sizeRepository.findAll();
    }

    @Override
    public Page<Size> findAll(Pageable pageable) {
        return sizeRepository.findAll(pageable);
    }
}
