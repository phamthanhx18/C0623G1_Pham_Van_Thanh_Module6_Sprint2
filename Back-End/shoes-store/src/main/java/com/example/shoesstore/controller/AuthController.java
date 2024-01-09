package com.example.shoesstore.controller;

import com.example.shoesstore.dto.Login;
import com.example.shoesstore.model.account.Account;
import com.example.shoesstore.model.account.MyUserDetail;
import com.example.shoesstore.security.jwt.JwtUtils;
import com.example.shoesstore.service.auth.IAccountService;
import com.example.shoesstore.service.auth.impl.MyUserDetailService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Login login, HttpServletResponse response) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            MyUserDetail myUserDetail = (MyUserDetail) authentication.getPrincipal();
            String jwt = jwtProvider.createToken(myUserDetail);
            // Tạo cookie
            String cookieValue = "jwt=" + jwt + "; HttpOnly; Secure; Path=/; Max-Age=604800; SameSite=Strict"; // 604800 giây = 7 ngày
            response.setHeader("Set-Cookie", cookieValue);
            return ResponseEntity.ok("Đăng nhập thành công");
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>("Thông tin đăng nhập không chính xác.", HttpStatus.UNAUTHORIZED);
        }
    }
    @GetMapping("/check-auth")
    public ResponseEntity<?> test() {
            return new ResponseEntity<>("OKE", HttpStatus.OK);
    }
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        // Xóa cookie bằng cách đặt Max-Age thành 0
        String cookieValue = "jwt=; HttpOnly; Secure; Path=/; Max-Age=0; SameSite=Strict";
        response.setHeader("Set-Cookie", cookieValue);

        return ResponseEntity.ok("Đăng xuất thành công");
    }

}
