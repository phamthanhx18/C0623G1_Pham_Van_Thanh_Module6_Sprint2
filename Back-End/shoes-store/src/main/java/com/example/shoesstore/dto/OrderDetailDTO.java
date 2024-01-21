package com.example.shoesstore.dto;

import com.example.shoesstore.model.product.ProductVariant;
import com.example.shoesstore.model.product.Size;
import com.example.shoesstore.model.product.SizeVariant;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderDetailDTO {
    private Integer quantity;
    private SizeVariant sizeVariant;
    private ProductVariant productVariant;
}
