package com.example.service;

import com.example.entity.Client;
import com.example.repository.ClientRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Transactional
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Client getClient(long id) {
        Optional<Client> client = clientRepository.findById(id);
        return client.orElse(null);
    }

}
