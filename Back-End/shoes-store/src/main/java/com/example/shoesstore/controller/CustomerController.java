package com.example.shoesstore.controller;

import com.example.shoesstore.model.account.Customer;
import com.example.shoesstore.model.product.Category;
import com.example.shoesstore.service.ICustomerService;
import com.example.shoesstore.service.product.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/customer")
@RestController
public class CustomerController {
    @Autowired
    private ICustomerService customerService;

    @GetMapping
    public ResponseEntity<Page<Customer>> getAllCategory(@PageableDefault(size = 10) Pageable pageable){
        Page<Customer> customerList = customerService.getAllCustomer(pageable);
        if (customerList.toList().size() == 0) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(customerList,HttpStatus.OK);
    }
}
