package com.example.shoesstore.model.order;

import com.example.shoesstore.model.product.ProductVariant;
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
    @ManyToOne(targetEntity = Order.class)
    private Order order;

    @Id
    @ManyToOne(targetEntity = ProductVariant.class)
    private ProductVariant variant;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "price", nullable = false)
    private Double price;
}
