package com.example.service;

import com.example.dto.request.UserDtoRequest;
import com.example.dto.response.UserDtoResponse;
import com.example.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.example.entity.User;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDtoResponse register(UserDtoRequest userDtoRequest) throws Exception {

        User userDb = userRepository.findByUsername(userDtoRequest.getUsername());
        if (userDb != null)
            throw new Exception("Пользователь существует");

        User user = new User(0L, userDtoRequest.getUsername(), userDtoRequest.getPassword(), userDtoRequest.getPasswordConfirm(), userDtoRequest.getLastName(), userDtoRequest.getFirstName(), userDtoRequest.getPatronymic(), userDtoRequest.getEmail());

        userRepository.save(user);

        return new UserDtoResponse(user.getId(), user.getUsername(), user.getPassword(), user.getLastName(), user.getFirstName(), user.getPatronymic(), user.getEmail());
    }

    public List<UserDtoResponse> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserDtoResponse> userDtoResponses = new ArrayList<>();
        for (User user : users) {
            userDtoResponses.add(new UserDtoResponse(user.getId(), user.getUsername(), user.getPassword(), user.getLastName(), user.getFirstName(), user.getPatronymic(), user.getEmail()));
        }
        return userDtoResponses;
    }

}
