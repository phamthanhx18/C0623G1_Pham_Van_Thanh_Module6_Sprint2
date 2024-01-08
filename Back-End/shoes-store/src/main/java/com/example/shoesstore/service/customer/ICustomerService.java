package com.example.shoesstore.service.customer;

import com.example.shoesstore.model.account.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ICustomerService {
    Page<Customer> getAllCustomer(Pageable pageable);
    void save(Customer customer);
}
