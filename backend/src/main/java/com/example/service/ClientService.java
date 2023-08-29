package com.example.service;

import com.example.dto.request.ClientDtoRequest;
import com.example.dto.response.ClientDtoResponse;
import com.example.dto.response.ProposalDtoResponse;
import com.example.entity.Client;
import com.example.exception.ServerErrorCode;
import com.example.exception.ServerException;
import com.example.repository.ClientRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClientService {

    private static final Logger log = LoggerFactory.getLogger(ClientService.class);

    private final ClientRepository clientRepository;
    private final WebClient.Builder webClientBuilder;

    public ClientService(ClientRepository clientRepository, WebClient.Builder webClientBuilder) {
        this.clientRepository = clientRepository;
        this.webClientBuilder = webClientBuilder;
    }

    public ProposalDtoResponse proposalProcessing(ClientDtoRequest clientDtoRequest) throws Exception {

        Client client = webClientBuilder.build()
                .get()
                .uri("http://mock-bank:8081/api/clients?passportDetails=" + clientDtoRequest.getPassportDetails())
                .retrieve()
                .bodyToMono(Client.class)
                .block();

        if (client == null)
            throw new ServerException(ServerErrorCode.CLIENT_NOT_FOUND);

        if (!client.getLastName().equals(clientDtoRequest.getLastName()) || !client.getFirstName().equals(clientDtoRequest.getFirstName()) || !client.getPatronymic().equals(clientDtoRequest.getPatronymic())) {
            throw new ServerException(ServerErrorCode.INVALID_FULL_NAME);
        } else if (!client.getEmail().equals(clientDtoRequest.getEmail())) {
            throw new ServerException(ServerErrorCode.INVALID_EMAIL);
        }

        String rating = scoring(client);

        return new ProposalDtoResponse(rating);
    }

    public List<ClientDtoResponse> getClients() throws Exception {

        return webClientBuilder.build()
                .get()
                .uri("http://mock-bank:8081/api/all/clients")
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<ClientDtoResponse>>() {})
                .block();
    }

    public static String scoring(Client client) {
        String rating = "Неопределённый рейтинг";
        int points = 0;

        int age = client.getAge();
        if (age >= 21 && age <= 22) {
            points += 9;
        } else if (age >= 23 && age < 45) {
            points += 15;
        } else if (age >= 45 && age < 64) {
            points += 34;
        } else if (age >= 64 && age <= 70) {
            points += 10;
        }

        double workExperience = client.getWorkExperience();
        if (workExperience >= 0 && workExperience < 1.5) {
            points += 14;
        } else if (workExperience >= 1.5 && workExperience < 10) {
            points += 27;
        } else if (workExperience >= 10 && workExperience < 20) {
            points += 34;
        } else if (workExperience >= 20) {
            points += 34;
        }

        String loanSecurity = client.getLoanSecurity();
        if (loanSecurity.equals("квартира")) {
            points += 47;
        } else if (loanSecurity.equals("дом")) {
            points += 42;
        } else if (loanSecurity.equals("земельный участок")) {
            points += 32;
        } else if (loanSecurity.equals("автомобиль")) {
            points += 47;
        } else if (loanSecurity.equals("без обеспечения")) {
            points += 15;
        }

        double debtLoad = client.getDebtLoad();
        if (debtLoad >= 0 && debtLoad < 0.11) {
            points += 58;
        } else if (debtLoad >= 0.11 && debtLoad < 0.51) {
            points += 43;
        } else if (debtLoad >= 0.51 && debtLoad < 0.71) {
            points += 21;
        } else if (debtLoad >= 0.71) {
            points += 10;
        }

        int numberOpenLoans = client.getNumberOpenLoans();
        if (numberOpenLoans > 0 && numberOpenLoans <= 2) {
            points += 34;
        } else if (numberOpenLoans >= 3 && numberOpenLoans <= 5) {
            points += 15;
        } else if (numberOpenLoans > 5) {
            points += 3;
        }

        if (points >= 51 && points < 100) {
            rating = "Низкий";
        } else if (points >= 100 && points < 150) {
            rating = "Средний";
        } else if (points >= 150) {
            rating = "Высокий";
        }

        return rating;
    }

}
