package com.example.shoesstore.model.cart;

import com.example.shoesstore.model.account.Account;
import com.example.shoesstore.model.product.ProductVariant;
import com.example.shoesstore.model.product.SizeVariant;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "cart")
public class CartProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(targetEntity = ProductVariant.class)
    private ProductVariant productVariant;
    @ManyToOne(targetEntity = SizeVariant.class)
    private SizeVariant sizeVariant;
    private int quantity;
    @ManyToOne(targetEntity = Account.class)
    @JsonIgnore
    private Account account;
}
