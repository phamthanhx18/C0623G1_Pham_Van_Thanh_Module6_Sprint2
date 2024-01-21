package com.example.shoesstore.repository.cart;

import com.example.shoesstore.model.account.Account;
import com.example.shoesstore.model.cart.CartProduct;
import com.example.shoesstore.model.product.ProductVariant;
import com.example.shoesstore.model.product.SizeVariant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartProductRepository extends JpaRepository<CartProduct, Long> {
    List<CartProduct> findAllByAccount(Account account);
    Optional<CartProduct> findByProductVariantAndSizeVariantAndAccount(ProductVariant productVariant, SizeVariant sizeVariant, Account account);
}

