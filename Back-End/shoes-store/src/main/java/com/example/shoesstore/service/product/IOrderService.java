package com.example.shoesstore.service.product;

import com.example.shoesstore.model.account.Account;
import com.example.shoesstore.model.order.Order;
import com.example.shoesstore.model.product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IOrderService {
    void saveOrder(Order order);
    Page<Order> getAllOrder(Pageable pageable);
    List<Order> findOrdersBetweenDates(String startDate, String endDate);
    Page<Order> getOrderByAccount(Account account,Pageable pageable);

    Order getOrderById(Long idOrder);
}
