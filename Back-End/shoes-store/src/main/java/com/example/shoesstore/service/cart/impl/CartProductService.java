package com.example.shoesstore.service.cart.impl;

import com.example.shoesstore.model.account.Account;
import com.example.shoesstore.model.cart.CartProduct;
import com.example.shoesstore.model.product.ProductVariant;
import com.example.shoesstore.model.product.SizeVariant;
import com.example.shoesstore.repository.cart.CartProductRepository;
import com.example.shoesstore.service.cart.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartProductService implements ICartService {
    @Autowired
    private CartProductRepository cartProductRepository;

    public void addToCart(ProductVariant productVariant, SizeVariant sizeVariant, int quantity, Account account) {
        CartProduct existingCartProduct = cartProductRepository.findByProductVariantAndSizeVariantAndAccount(productVariant, sizeVariant, account).orElse(null);

        if (existingCartProduct != null) {
            existingCartProduct.setQuantity(existingCartProduct.getQuantity() + quantity);
            cartProductRepository.save(existingCartProduct);
        } else {
            CartProduct newCartProduct = new CartProduct();
            newCartProduct.setProductVariant(productVariant);
            newCartProduct.setSizeVariant(sizeVariant);
            newCartProduct.setQuantity(quantity);
            newCartProduct.setAccount(account);
            cartProductRepository.save(newCartProduct);
        }
    }

    public void updateCartProductQuantity(Long cartProductId, int newQuantity, Account account) {
        CartProduct cartProduct = cartProductRepository.findById(cartProductId).get();
        cartProduct.setQuantity(newQuantity);
        cartProductRepository.save(cartProduct);
    }

    public void removeCartProduct(Long cartProductId) {
        cartProductRepository.deleteById(cartProductId);
    }

    public List<CartProduct> getCartProducts(Account account) {
        return cartProductRepository.findAllByAccount(account);
    }

    @Override
    public void resetCardByAccount(Account account) {
        List<CartProduct> cartProducts = getCartProducts(account);
        cartProductRepository.deleteAll(cartProducts);
    }
}

