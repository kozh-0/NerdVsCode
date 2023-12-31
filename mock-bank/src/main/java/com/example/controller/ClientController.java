package com.example.controller;

import com.example.entity.Client;
import com.example.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ClientController {

    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping(value = "/clients", produces = MediaType.APPLICATION_JSON_VALUE)
    public Client getClient(@RequestParam(value = "passportDetails") String passportDetails) {
        return clientService.getClient(passportDetails);
    }

    @GetMapping(value = "/all/clients", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Client> getClients() {
        return clientService.getClients();
    }
}
