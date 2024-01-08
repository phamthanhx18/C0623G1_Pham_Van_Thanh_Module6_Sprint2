package com.example.shoesstore.service.product.impl;

import com.example.shoesstore.model.order.OrderDetail;
import com.example.shoesstore.repository.product.IOrderDetailRepository;
import com.example.shoesstore.service.product.IOrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderDetailService implements IOrderDetailService {
    @Autowired
    private IOrderDetailRepository orderDetailRepository;
    @Override
    public void createOrderDetail(OrderDetail orderDetail) {
        orderDetailRepository.save(orderDetail);
    }
}
