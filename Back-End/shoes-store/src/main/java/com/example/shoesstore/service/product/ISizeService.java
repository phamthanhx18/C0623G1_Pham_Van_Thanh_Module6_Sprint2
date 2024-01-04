package com.example.shoesstore.service.product;

import com.example.shoesstore.model.product.Size;

import java.util.List;

public interface ISizeService {
    List<Size> findSizesByProductVariantId(Long productVariantId);
    List<Size> findAll();
}
