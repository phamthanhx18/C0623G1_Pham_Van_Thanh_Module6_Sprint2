package com.example.shoesstore.service.customer;

import com.example.shoesstore.model.account.Account;
import com.example.shoesstore.model.account.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ICustomerService {
    Page<Customer> getAllCustomer(Pageable pageable);
    void save(Customer customer);

    Customer getCustomerByAccount(Account account);
}
