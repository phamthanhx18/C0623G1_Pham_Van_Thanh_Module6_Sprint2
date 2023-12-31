package com.example.shoesstore.model.product;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "size_variant")
@NoArgsConstructor
public class SizeVariant {
    @Id
    @ManyToOne(targetEntity = Size.class)
    private Size size;
    @Id
    @ManyToOne(targetEntity = ProductVariant.class)
    private ProductVariant productVariant;
}
