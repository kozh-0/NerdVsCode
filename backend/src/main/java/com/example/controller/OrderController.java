package com.example.controller;

import com.example.dto.request.ClientDtoRequest;
import com.example.dto.request.OrderDtoRequest;
import com.example.dto.response.ProposalDtoResponse;
import com.example.service.OrderService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8081"})
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping(value = "/orders", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public String createOrder(@Valid @RequestBody OrderDtoRequest orderDtoRequest) throws Exception {
        return orderService.createOrder(orderDtoRequest);
    }

}
