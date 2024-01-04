package com.example.shoesstore.service.product.impl;

import com.example.shoesstore.model.product.Color;
import com.example.shoesstore.repository.product.IColorRepository;
import com.example.shoesstore.service.product.IColorService;
import org.springframework.beans.factory.annotation.Autowired;
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
}
