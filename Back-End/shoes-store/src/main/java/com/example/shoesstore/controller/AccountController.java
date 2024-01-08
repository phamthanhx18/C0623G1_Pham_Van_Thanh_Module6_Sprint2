package com.example.shoesstore.controller;

import com.example.shoesstore.model.account.Account;
import com.example.shoesstore.service.auth.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/user")
@RestController
public class AccountController {
    @Autowired
    private IAccountService accountService;
    @GetMapping
    public ResponseEntity<Page<Account>> getAllCategory(@PageableDefault(size = 10) Pageable pageable){
        Page<Account> accountPage = accountService.getAllAccount(pageable);
        if (accountPage.toList().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(accountPage,HttpStatus.OK);
    }
}

