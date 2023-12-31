package com.example.shoesstore.model.account;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "customers")
@Getter
@Setter
@NoArgsConstructor
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Boolean gender;
    @Column(columnDefinition = "DATE")
    private String birthday;
    private String phone;
    private String address;
    @OneToOne(targetEntity = Account.class)
    private Account account;
}
