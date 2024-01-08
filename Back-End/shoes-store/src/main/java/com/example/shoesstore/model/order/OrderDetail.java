package com.example.shoesstore.model.order;

import com.example.shoesstore.model.product.ProductVariant;
import com.example.shoesstore.model.product.SizeVariant;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "order_details")
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(targetEntity = Order.class)
    @JsonBackReference
    private Order order;
    @ManyToOne(targetEntity = ProductVariant.class)
    private ProductVariant variant;
    @ManyToOne(targetEntity = SizeVariant.class)
    private SizeVariant sizeVariant;
    @Column(name = "quantity", nullable = false)
    private Integer quantity;
    @Column(name = "price", nullable = false)
    private Double price;
}
