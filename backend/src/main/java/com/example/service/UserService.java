package com.example.service;

import com.example.dto.request.UserDtoRequest;
import com.example.dto.response.ClientDtoResponse;
import com.example.dto.response.ProposalDtoResponse;
import com.example.dto.response.UserDtoResponse;
import com.example.entity.Client;
import com.example.repository.ClientRepository;
import com.example.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import com.example.entity.User;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final ClientRepository clientRepository;
    private final WebClient.Builder webClientBuilder;

    public UserService(UserRepository userRepository, ClientRepository clientRepository, WebClient.Builder webClientBuilder) {
        this.userRepository = userRepository;
        this.clientRepository = clientRepository;
        this.webClientBuilder = webClientBuilder;
    }

    public ProposalDtoResponse proposalProcessing(UserDtoRequest userDtoRequest) throws Exception {

        // Это будет поиск по базе данных банка
        Client client = clientRepository.findByPassportDetails(userDtoRequest.getPassportDetails());
        if (client == null)
            throw new Exception("Клиент не существует");

        String rating = scoring(client);

        return new ProposalDtoResponse(rating);
    }

    public List<ClientDtoResponse> getAllClients() {
        List<Client> clients = clientRepository.findAll();
        List<ClientDtoResponse> clientDtoResponses = new ArrayList<>();
        for (Client client : clients) {
            clientDtoResponses.add(new ClientDtoResponse(client.getId(), client.getLastName(), client.getFirstName(), client.getPatronymic(), client.getPassportDetails(), client.getEmail(), client.getAge(), client.getWorkExperience(), client.getLoanSecurity(), client.getDebtLoad(), client.getNumberOpenLoans()));
        }
        return clientDtoResponses;
    }

    public Object getBankClient(long id) {
        Object obj = webClientBuilder.build()
                .get()
                .uri("http://localhost:8081/api/clients/" + id)
                .retrieve()
                .bodyToMono(Object.class)
                .block();

        /*WebClient webClient = WebClient.create("http://localhost:8081");
        ClientDto client = webClient.get()
                .uri(String.join("", "/clients/1"))
                .retrieve()
                .bodyToMono(ClientDto.class)
                .block();*/

       /* WebClient webClient = WebClient.create();
        return webClient
                .get()
                .uri("http://localhost:8081/clients/{id}", id)
                .retrieve()
                .bodyToMono(ClientDto.class);*/

        /*
        ResponseEntity<ClientDto> response =
                restTemplate.getForEntity(
                        "http://localhost:8081/clients/" + id,
                        ClientDto.class);
        ClientDto clientDto = response.getBody();
        return clientDto;*/
        //return client;
        return obj;
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
