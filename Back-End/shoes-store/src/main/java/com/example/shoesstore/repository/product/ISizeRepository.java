package com.example.shoesstore.repository.product;

import com.example.shoesstore.model.product.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ISizeRepository extends JpaRepository<Size,Long> {
    @Query(value = "SELECT s.* FROM sizes s JOIN size_variant sv ON s.id = sv.size_id WHERE sv.product_variant_id = ?1", nativeQuery = true)
    List<Size> findSizesByProductVariantId(Long productVariantId);
}
