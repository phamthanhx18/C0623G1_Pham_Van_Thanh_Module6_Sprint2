package com.example.shoesstore.repository.product;


import com.example.shoesstore.model.account.Account;
import com.example.shoesstore.model.order.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IOrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByOrderDateBetween(String start, String end);
    Page<Order> findOrderByCustomer_Account(Account account, Pageable pageable);
}
