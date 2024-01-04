package com.example.shoesstore.repository.product;

import com.example.shoesstore.model.product.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface IProductVariantRepository extends JpaRepository<ProductVariant,Long> {
    @Query("SELECT MAX(p.price) FROM ProductVariant p")
    Double findMaxPrice();
}
