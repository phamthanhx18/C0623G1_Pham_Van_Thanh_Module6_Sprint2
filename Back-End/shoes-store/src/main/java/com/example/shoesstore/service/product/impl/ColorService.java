package com.example.shoesstore.service.product.impl;

import com.example.shoesstore.model.product.Color;
import com.example.shoesstore.repository.product.IColorRepository;
import com.example.shoesstore.service.product.IColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColorService implements IColorService {
    @Autowired
    private IColorRepository colorRepository;

    @Override
    public List<Color> findAll() {
        return colorRepository.findAll();
    }

    @Override
    public Page<Color> findAll(Pageable pageable) {
        return colorRepository.findAll(pageable);
    }

    @Override
    public void save(Color color) {
        colorRepository.save(color);
    }

    @Override
    public Color findById(Long id) {
        return colorRepository.findById(id).get();
    }

    @Override
    public void delete(Long id) {
        colorRepository.deleteById(id);
    }
}
