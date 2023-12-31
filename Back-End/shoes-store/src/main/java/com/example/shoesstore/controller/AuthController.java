package com.example.shoesstore.controller;

import com.example.shoesstore.dto.Login;
import com.example.shoesstore.model.account.Account;
import com.example.shoesstore.model.account.MyUserDetail;
import com.example.shoesstore.security.jwt.JwtUtils;
import com.example.shoesstore.service.auth.IAccountService;
import com.example.shoesstore.service.auth.impl.MyUserDetailService;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RequestMapping("/api")
@RestController
public class AuthController {
    @Autowired
    private JwtUtils jwtProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * Handles user login requests.
     *
     * @return ResponseEntity containing the JWT response or map error messages.
     * @author: ThanhPV
     * @date: 12/12/2023
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Login login) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            MyUserDetail myUserDetail = (MyUserDetail) authentication.getPrincipal();
            String jwt = jwtProvider.createToken(myUserDetail);
            return new ResponseEntity<>(jwt, HttpStatus.OK);
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>("Thông tin đăng nhập không chính xác.", HttpStatus.UNAUTHORIZED);
        }
    }
    @PostMapping("/test")
    public ResponseEntity<?> test() {
            return new ResponseEntity<>("OKE", HttpStatus.OK);
    }
}
