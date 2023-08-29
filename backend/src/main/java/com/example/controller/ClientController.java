package com.example.controller;

import com.example.dto.request.ClientDtoRequest;
import com.example.dto.response.ClientDtoResponse;
import com.example.dto.response.ProposalDtoResponse;
import com.example.entity.Client;
import com.example.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8081"})
public class ClientController {

    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping(value = "/clients", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ProposalDtoResponse proposalProcessing(@RequestBody ClientDtoRequest clientDtoRequest) throws Exception {
        return clientService.proposalProcessing(clientDtoRequest);
    }

    @GetMapping(value = "/clients", produces = MediaType.APPLICATION_JSON_VALUE)
    public ClientDtoResponse getClient(@RequestParam(value = "passportDetails") String passportDetails) throws Exception {
        return clientService.getClient(passportDetails);
    }

}
