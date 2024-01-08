package com.example.shoesstore.service.product;

import com.example.shoesstore.model.product.Color;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IColorService {
    List<Color> findAll();
    Page<Color> findAll(Pageable pageable);
    void save(Color color);
    Color findById(Long id);
    void delete(Long id);
}
