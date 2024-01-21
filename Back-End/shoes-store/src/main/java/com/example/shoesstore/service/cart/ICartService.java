package com.example.shoesstore.service.cart;

import com.example.shoesstore.model.account.Account;
import com.example.shoesstore.model.cart.CartProduct;
import com.example.shoesstore.model.product.ProductVariant;
import com.example.shoesstore.model.product.SizeVariant;

import java.util.List;

public interface ICartService {
    void addToCart(ProductVariant productVariant, SizeVariant sizeVariant, int quantity, Account account);
    void updateCartProductQuantity(Long cartProductId, int newQuantity, Account account);
    void removeCartProduct(Long cartProductId);
    List<CartProduct> getCartProducts(Account account);
    void resetCardByAccount(Account account);
}

