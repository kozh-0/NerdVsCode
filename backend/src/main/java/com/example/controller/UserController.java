package com.example.controller;

import com.example.dto.request.UserDtoRequest;
import com.example.dto.response.UserDtoResponse;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public UserDtoResponse register(@Valid @RequestBody UserDtoRequest registerUserDtoRequest) throws Exception {
        return userService.register(registerUserDtoRequest);
    }

    @GetMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<UserDtoResponse> getUsers() {
        return userService.getAllUsers();
    }

}
