package com.example.shoesstore.controller;

import com.example.shoesstore.dto.OrderDTO;
import com.example.shoesstore.dto.OrderDetailDTO;
import com.example.shoesstore.model.account.Account;
import com.example.shoesstore.model.account.Customer;
import com.example.shoesstore.model.account.MyUserDetail;
import com.example.shoesstore.model.account.Role;
import com.example.shoesstore.model.order.Order;
import com.example.shoesstore.model.order.OrderDetail;
import com.example.shoesstore.model.product.SizeVariant;
import com.example.shoesstore.service.auth.IAccountService;
import com.example.shoesstore.service.auth.IRoleService;
import com.example.shoesstore.service.cart.ICartService;
import com.example.shoesstore.service.customer.ICustomerService;
import com.example.shoesstore.service.product.IOrderDetailService;
import com.example.shoesstore.service.product.IOrderService;
import com.example.shoesstore.service.product.ISizeVariantService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/order")
@RestController
public class OrderController {
    @Autowired
    private IOrderService orderService;
    @Autowired
    private ICustomerService customerService;
    @Autowired
    private IOrderDetailService orderDetailService;
    @Autowired
    private ICartService cartService;
    @PostMapping
    public ResponseEntity<?> saveOrder(@RequestBody OrderDTO orderDTO){
        Account account = getAuthenticatedAccount();
        cartService.resetCardByAccount(account);
        Customer customer = customerService.getCustomerByAccount(account);
        BeanUtils.copyProperties(orderDTO,customer);
        customerService.save(customer);
        Order order = new Order();
        BeanUtils.copyProperties(orderDTO,order);
        order.setCustomer(customer);
        orderService.saveOrder(order);

        for (OrderDetailDTO orderDetailDTO: orderDTO.getOrderDetailDTO()) {
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setOrder(order);
            orderDetail.setSizeVariant(orderDetailDTO.getSizeVariant());
            orderDetail.setPrice(orderDetailDTO.getProductVariant().getPrice());
            orderDetail.setVariant(orderDetailDTO.getProductVariant());
            BeanUtils.copyProperties(orderDetailDTO,orderDetail);
            orderDetailService.createOrderDetail(orderDetail);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/get-order")
    public ResponseEntity<?> getOrderByAccount(@PageableDefault(size = 10) Pageable pageable){
        Account account = getAuthenticatedAccount();
        Page<Order> orderPage = orderService.getOrderByAccount(account,pageable);
        return new ResponseEntity<>(orderPage,HttpStatus.OK);
    }
    @GetMapping("/get-order/{idOrder}")
    public ResponseEntity<Order> getOrderByAccount(@PathVariable Long idOrder) {
        Account account = getAuthenticatedAccount();
        Order order = orderService.getOrderById(idOrder);

        if (order == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        boolean isUserOwnOrder = order.getCustomer().getAccount().getId().equals(account.getId());
        boolean isUserManager = account.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_MANAGER"));
        if (isUserOwnOrder || isUserManager) {
            return new ResponseEntity<>(order, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<Page<Order>> getAllOrder(@PageableDefault(size = 10) Pageable pageable){
        Page<Order> orderPage = orderService.getAllOrder(pageable);
        if (orderPage.toList().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(orderPage,HttpStatus.OK);
    }
    @GetMapping("/revenue")
    public ResponseEntity<List<Order>> getOrdersBetweenDates(@RequestParam("start") String startDate, @RequestParam("end") String endDate) {
        List<Order> orders = orderService.findOrdersBetweenDates(startDate, endDate);
        return ResponseEntity.ok(orders);
    }
    private Account getAuthenticatedAccount() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        MyUserDetail userDetails = (MyUserDetail) authentication.getPrincipal();
        Account account = userDetails.getAccount();
        return account;
    }
}
