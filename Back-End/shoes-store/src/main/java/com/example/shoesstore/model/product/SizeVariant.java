package com.example.shoesstore.model.product;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(targetEntity = Size.class)
    private Size size;
    @ManyToOne(targetEntity = ProductVariant.class)
    @JsonBackReference
    private ProductVariant productVariant;
}
