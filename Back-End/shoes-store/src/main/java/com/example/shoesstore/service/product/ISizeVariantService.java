package com.example.shoesstore.service.product;

import com.example.shoesstore.model.product.ProductVariant;
import com.example.shoesstore.model.product.Size;
import com.example.shoesstore.model.product.SizeVariant;

public interface ISizeVariantService {
    SizeVariant findSizeVariant(Size size, ProductVariant productVariant);
}
