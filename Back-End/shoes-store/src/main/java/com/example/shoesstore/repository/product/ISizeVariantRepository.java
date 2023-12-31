package com.example.shoesstore.repository.product;

import com.example.shoesstore.model.product.ProductVariant;
import com.example.shoesstore.model.product.Size;
import com.example.shoesstore.model.product.SizeVariant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ISizeVariantRepository extends JpaRepository<SizeVariant,Long> {
    SizeVariant findBySizeAndProductVariant(Size size, ProductVariant productVariant);
}
