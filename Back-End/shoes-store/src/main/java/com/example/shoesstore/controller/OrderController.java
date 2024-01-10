package com.example.shoesstore.controller;

import com.example.shoesstore.dto.OrderDTO;
import com.example.shoesstore.dto.OrderDetailDTO;
import com.example.shoesstore.model.account.Customer;
import com.example.shoesstore.model.order.Order;
import com.example.shoesstore.model.order.OrderDetail;
import com.example.shoesstore.model.product.SizeVariant;
import com.example.shoesstore.service.auth.IAccountService;
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
    private ISizeVariantService sizeVariantService;

    @PostMapping
    public ResponseEntity<?> saveOrder(@RequestBody OrderDTO orderDTO){
        Customer customer = new Customer();
        BeanUtils.copyProperties(orderDTO,customer);
        customerService.save(customer);
        Order order = new Order();
        BeanUtils.copyProperties(orderDTO,order);
        order.setCustomer(customer);
        orderService.saveOrder(order);

        for (OrderDetailDTO orderDetailDTO: orderDTO.getOrderDetailDTO()) {
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setOrder(order);

            SizeVariant sizeVariant = sizeVariantService.findSizeVariant(orderDetailDTO.getSize_variant(),orderDetailDTO.getVariant());
            orderDetail.setSizeVariant(sizeVariant);
            orderDetail.setPrice(orderDetailDTO.getVariant().getPrice());

            BeanUtils.copyProperties(orderDetailDTO,orderDetail);
            orderDetailService.createOrderDetail(orderDetail);
        }
        return new ResponseEntity<>(HttpStatus.OK);
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
}
