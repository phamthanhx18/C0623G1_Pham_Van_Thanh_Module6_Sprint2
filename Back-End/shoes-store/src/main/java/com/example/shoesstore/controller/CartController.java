package com.example.shoesstore.controller;

import com.example.shoesstore.dto.AddToCartDTO;
import com.example.shoesstore.model.account.Account;
import com.example.shoesstore.model.account.MyUserDetail;
import com.example.shoesstore.model.cart.CartProduct;
import com.example.shoesstore.service.cart.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private ICartService cartService;

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody AddToCartDTO addToCartDto) {
        Account account = getAuthenticatedAccount();
        cartService.addToCart(addToCartDto.getProductVariant(), addToCartDto.getSizeVariant(), addToCartDto.getQuantity(), account);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update/{cartProductId}")
    public ResponseEntity<?> updateCartProduct(@PathVariable Long cartProductId, @RequestParam int newQuantity) {
        Account account = getAuthenticatedAccount();
        cartService.updateCartProductQuantity(cartProductId, newQuantity, account);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/remove/{cartProductId}")
    public ResponseEntity<?> removeCartProduct(@PathVariable Long cartProductId) {
        cartService.removeCartProduct(cartProductId);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<CartProduct>> getCartProducts() {
        Account account = getAuthenticatedAccount();
        List<CartProduct> cartProducts = cartService.getCartProducts(account);
        return ResponseEntity.ok(cartProducts);
    }

    private Account getAuthenticatedAccount() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        MyUserDetail userDetails = (MyUserDetail) authentication.getPrincipal();
        Account account = userDetails.getAccount();
        return account;
    }
}

