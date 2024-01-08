package com.example.shoesstore.service.product;

import com.example.shoesstore.model.product.Size;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ISizeService {
    List<Size> findSizesByProductVariantId(Long productVariantId);
    List<Size> findAll();
    Page<Size> findAll(Pageable pageable);
}
