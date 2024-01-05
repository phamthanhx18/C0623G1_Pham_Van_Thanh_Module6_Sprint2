package com.example.shoesstore.service.product;

import com.example.shoesstore.model.product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IProductService {
    List<Product> getAllProduct();
    Page<Product> getAllProduct(Pageable pageable);
    Product getProductById(Long id);
    Double findMaxPrice();
    List<Product> filterProducts(List<Long> categories,
                                 List<Long> colors,
                                 List<Long> sizes,
                                 Long minPrice,
                                 Long maxPrice);
    void saveProduct(Product product);
}
