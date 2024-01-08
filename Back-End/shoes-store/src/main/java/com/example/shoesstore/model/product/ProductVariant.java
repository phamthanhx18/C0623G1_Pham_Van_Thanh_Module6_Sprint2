package com.example.shoesstore.model.product;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "product_variants")
public class ProductVariant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String avatar;
    @ManyToOne(targetEntity = Product.class)
    @JsonBackReference
    private Product product;
    @ManyToOne(targetEntity = Color.class)
    private Color color;
    private Integer stock;
    private Double price;
    private Double priceSale;
    @OneToMany(mappedBy = "productVariant")
    @JsonManagedReference
    private Set<AlbumsVariant> albumsVariants;
    @OneToMany(mappedBy = "productVariant")
    @JsonManagedReference
    private Set<SizeVariant> sizeVariants;
}
