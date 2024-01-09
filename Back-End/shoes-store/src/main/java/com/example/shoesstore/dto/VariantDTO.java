package com.example.shoesstore.dto;

import com.example.shoesstore.model.product.Color;
import com.example.shoesstore.model.product.Product;
import com.example.shoesstore.model.product.Size;
import lombok.Getter;
import lombok.Setter;
import java.util.List;
@Getter
@Setter
public class VariantDTO {
    private String avatar;
    private List<String> albumsVariant;
    private Product product;
    private Double price;
    private Double priceSale;
    private List<Size> size;
    private Integer stock;
    private Color color;
}
