package com.example.shoesstore.service.product.impl;

import com.example.shoesstore.model.account.Account;
import com.example.shoesstore.model.order.Order;
import com.example.shoesstore.repository.product.IOrderRepository;
import com.example.shoesstore.service.product.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService implements IOrderService {
    @Autowired
    private IOrderRepository orderRepository;

    @Override
    public void saveOrder(Order order) {
        orderRepository.save(order);
    }

    @Override
    public Page<Order> getAllOrder(Pageable pageable) {
        return orderRepository.findAll(pageable);
    }

    @Override
    public List<Order> findOrdersBetweenDates(String startDate, String endDate) {
        return orderRepository.findByOrderDateBetween(startDate,endDate);
    }

    @Override
    public Page<Order> getOrderByAccount(Account account,Pageable pageable) {
        return orderRepository.findOrderByCustomer_Account(account,pageable);
    }

    @Override
    public Order getOrderById(Long idOrder) {
        return orderRepository.findById(idOrder).get();
    }
}
