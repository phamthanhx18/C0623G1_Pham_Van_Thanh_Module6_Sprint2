package com.example.shoesstore.dto;

import com.example.shoesstore.model.product.ProductVariant;
import com.example.shoesstore.model.product.SizeVariant;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddToCartDTO {
    private ProductVariant productVariant;
    private SizeVariant sizeVariant;
    private int quantity;
}
