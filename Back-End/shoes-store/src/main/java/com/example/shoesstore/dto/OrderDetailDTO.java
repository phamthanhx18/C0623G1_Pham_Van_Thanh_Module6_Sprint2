package com.example.shoesstore.dto;

import com.example.shoesstore.model.product.ProductVariant;
import com.example.shoesstore.model.product.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderDetailDTO {
    private String nameProduct;
    private Integer quantity;
    private Size size_variant;
    private ProductVariant variant;
}
