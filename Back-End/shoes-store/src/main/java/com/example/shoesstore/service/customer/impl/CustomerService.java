package com.example.shoesstore.service.customer.impl;

import com.example.shoesstore.model.account.Account;
import com.example.shoesstore.model.account.Customer;
import com.example.shoesstore.repository.auth.ICustomerRepository;
import com.example.shoesstore.service.customer.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CustomerService implements ICustomerService {
    @Autowired
    private ICustomerRepository customerRepository;
    @Override
    public Page<Customer> getAllCustomer(Pageable pageable) {
        return customerRepository.findAll(pageable);
    }

    @Override
    public void save(Customer customer) {
        customerRepository.save(customer);
    }

    @Override
    public Customer getCustomerByAccount(Account account) {
        return customerRepository.getCustomerByAccountId(account.getId());
    }
}
