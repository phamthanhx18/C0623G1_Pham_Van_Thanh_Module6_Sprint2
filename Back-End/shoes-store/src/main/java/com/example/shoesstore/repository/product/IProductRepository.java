package com.example.shoesstore.repository.product;

import com.example.shoesstore.model.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IProductRepository extends JpaRepository<Product,Long> {
    @Query("SELECT MAX(p.price) FROM Product p")
    Double findMaxPrice();
    @Query(value = "SELECT p.* FROM products p " +
            "LEFT JOIN product_variants pv ON p.id = pv.product_id " +
            "LEFT JOIN size_variant sv ON pv.id = sv.product_variant_id WHERE " +
            "(p.category_id = :categories OR :categories IS NULL) AND " +
            "(pv.color_id IN :colors OR :colors IS NULL) AND " +
            "(sv.size_id IN :sizes OR :sizes IS NULL) AND " +
            "(p.price >= :minPrice OR :minPrice IS NULL) AND " +
            "(p.price <= :maxPrice OR :maxPrice IS NULL)",
            nativeQuery = true)
    List<Product> filterProducts(@Param("categories") Long categories,
                                 @Param("colors") List<Long> colors,
                                 @Param("sizes") List<Long> sizes,
                                 @Param("minPrice") Long minPrice,
                                 @Param("maxPrice") Long maxPrice);

}
