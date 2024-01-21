package com.example.shoesstore.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpDTO {
    private String username;
    private String password;
    private String confirmPassword;
    private String email;
    private String name;
    private Boolean gender;
    private String birthday;
    private String phone;
    private String address;
}
