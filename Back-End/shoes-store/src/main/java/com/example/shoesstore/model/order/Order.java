package com.example.shoesstore.model.order;

import com.example.shoesstore.model.account.Customer;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(targetEntity = Customer.class)
    private Customer customer;
    @Column(columnDefinition = "DATE")
    private String orderDate;
    private Double totalOrder;
    @OneToMany(mappedBy = "order")
    private Set<OrderDetail> orderDetails;
}
