package com.example.shoesstore.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Filter {
    private Long categories;
    private List<Long> color;
    private List<Long> size;
    private Long priceFilterMin;
    private Long priceFilterMax;
}
