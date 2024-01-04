package com.example.shoesstore.repository.product;

import com.example.shoesstore.model.product.Color;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IColorRepository extends JpaRepository<Color,Long> {
}
