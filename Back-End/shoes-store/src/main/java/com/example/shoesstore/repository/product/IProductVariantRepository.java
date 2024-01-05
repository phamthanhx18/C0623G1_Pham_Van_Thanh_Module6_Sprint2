package com.example.shoesstore.repository.product;

import com.example.shoesstore.model.product.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductVariantRepository extends JpaRepository<ProductVariant,Long> {
}
