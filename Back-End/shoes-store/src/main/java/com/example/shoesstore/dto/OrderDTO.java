package com.example.shoesstore.dto;

import com.example.shoesstore.model.account.Customer;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderDTO {
    private String name;
    private String address;
    private String phone;
    private String email;
    private String paymentMethod;
    private Double totalOrder;
    private String orderDate;
    private List<OrderDetailDTO> orderDetailDTO;
}
