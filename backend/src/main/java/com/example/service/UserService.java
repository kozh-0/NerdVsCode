package com.example.service;

import com.example.dto.request.UserDtoRequest;
import com.example.dto.response.UserDtoResponse;
import com.example.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.example.entity.User;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final RestTemplate restTemplate;

    public UserService(UserRepository userRepository, RestTemplate restTemplate) {
        this.userRepository = userRepository;
        this.restTemplate = restTemplate;
    }

    public UserDtoResponse proposalProcessing(UserDtoRequest userDtoRequest) throws Exception {

        // Это будет поиск по базе данных банка
        User userDb = userRepository.findByPassportDetails(userDtoRequest.getPassportDetails());
        if (userDb == null)
            throw new Exception("Пользователь не существует");



        return new UserDtoResponse(userDb.getId(), userDb.getLastName(), userDb.getFirstName(), userDb.getPatronymic(), userDb.getPassportDetails(), userDb.getEmail(), userDb.getTelegram());
    }

    public List<UserDtoResponse> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserDtoResponse> userDtoResponses = new ArrayList<>();
        for (User user : users) {
            userDtoResponses.add(new UserDtoResponse(user.getId(), user.getLastName(), user.getFirstName(), user.getPatronymic(), user.getPassportDetails(), user.getEmail(), user.getTelegram()));
        }
        return userDtoResponses;
    }

    public Object getBankClient(long id) {
        //RestTemplate restTemplate = new RestTemplate();
        try {
            ResponseEntity<Object> response
                    = restTemplate.getForEntity("http://localhost:8081/clients/" + id, Object.class);
            log.info(Objects.requireNonNull(response.getBody()).toString());
            return response.getBody();
        }
        catch (final HttpClientErrorException e) {
            System.out.println(e.getStatusCode());
            System.out.println(e.getResponseBodyAsString());
        }

        /*
        ResponseEntity<ClientDto> response =
                restTemplate.getForEntity(
                        "http://localhost:8081/clients/" + id,
                        ClientDto.class);
        ClientDto clientDto = response.getBody();
        return clientDto;*/
        return null;
    }

}
