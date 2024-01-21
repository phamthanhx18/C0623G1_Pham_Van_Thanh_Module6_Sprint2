package com.example.shoesstore.controller;

import com.example.shoesstore.model.account.Account;
import com.example.shoesstore.model.account.Customer;
import com.example.shoesstore.model.account.MyUserDetail;
import com.example.shoesstore.service.auth.IAccountService;
import com.example.shoesstore.service.customer.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/customer")
@RestController
public class CustomerController {
    @Autowired
    private ICustomerService customerService;
    @Autowired
    private IAccountService accountService;

    @GetMapping
    public ResponseEntity<Page<Customer>> getAllCategory(@PageableDefault(size = 10) Pageable pageable){
        Page<Customer> customerList = customerService.getAllCustomer(pageable);
        if (customerList.toList().size() == 0) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(customerList,HttpStatus.OK);
    }
    @GetMapping("/info")
    public ResponseEntity<Customer> getInfoUser() {
        Account account = getAuthenticatedAccount();
        Customer customer = customerService.getCustomerByAccount(account);
        return new ResponseEntity<>(customer,HttpStatus.OK);
    }
    @PostMapping("/save")
    public ResponseEntity<?> getInfoUser(@RequestBody Customer customer) {
        Account account = getAuthenticatedAccount();
        account.setEmail(customer.getAccount().getEmail());
        accountService.save(account);
        customerService.save(customer);
        return new ResponseEntity<>(HttpStatus.OK);
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
