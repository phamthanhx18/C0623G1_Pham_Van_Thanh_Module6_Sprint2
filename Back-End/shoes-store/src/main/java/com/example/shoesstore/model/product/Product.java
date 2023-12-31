package com.example.shoesstore.model.product;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "products")
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String productName;
    private String productAvatar;
    private Double price;
    private Double priceSale;
    @Column(columnDefinition = "TEXT")
    private String shortDescription;
    private String description;
    @ManyToOne(targetEntity = Category.class)
    private Category category;
    @OneToMany(mappedBy = "product")
    @JsonManagedReference
    private Set<ProductVariant> productVariants;
}
