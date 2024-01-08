package com.example.shoesstore.repository.product;

import com.example.shoesstore.model.order.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrderDetailRepository extends JpaRepository<OrderDetail,Long> {
}
