package com.example.service;

import com.example.dto.request.OrderDtoRequest;
import com.example.entity.Client;
import com.example.entity.Order;
import com.example.exception.ServerErrorCode;
import com.example.exception.ServerException;
import com.example.repository.OrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class OrderService {

    private static final Logger log = LoggerFactory.getLogger(ClientService.class);

    private final OrderRepository orderRepository;
    private final WebClient.Builder webClientBuilder;

    public OrderService(OrderRepository orderRepository, WebClient.Builder webClientBuilder) {
        this.orderRepository = orderRepository;
        this.webClientBuilder = webClientBuilder;
    }

    public String createOrder(OrderDtoRequest orderDtoRequest) throws ServerException {
        Client client = webClientBuilder.build()
                .get()
                .uri("http://mock-bank:8081/api/clients?passportDetails=" + orderDtoRequest.getPassportDetails())
                .retrieve()
                .bodyToMono(Client.class)
                .block();

        if (client == null)
            throw new ServerException(ServerErrorCode.CLIENT_NOT_FOUND);

        Order order = new Order(0L, orderDtoRequest.getName(), orderDtoRequest.getPassportDetails(), orderDtoRequest.getMonthlyPayment(), orderDtoRequest.getRate(), orderDtoRequest.getInitFee(), orderDtoRequest.getYear(), orderDtoRequest.getEmail(), orderDtoRequest.getTelegram());
        orderRepository.save(order);

        return "Заявка отправлена!";
    }

}
