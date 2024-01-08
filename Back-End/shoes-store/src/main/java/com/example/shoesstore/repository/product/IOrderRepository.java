package com.example.shoesstore.repository.product;


import com.example.shoesstore.model.order.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrderRepository extends JpaRepository<Order,Long> {
}
