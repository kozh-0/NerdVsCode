package com.example.controller;

import com.example.dto.request.UserDtoRequest;
import com.example.dto.response.ProposalDtoResponse;
import com.example.dto.response.UserDtoResponse;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8081"})
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ProposalDtoResponse proposalProcessing(@RequestBody UserDtoRequest userDtoRequest) throws Exception {
        return userService.proposalProcessing(userDtoRequest);
    }

    @GetMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<UserDtoResponse> getUsers() {
        return userService.getAllUsers();
    }

    @GetMapping(value = "/clients/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Object getBankClient(@PathVariable long id) {
        return userService.getBankClient(id);
    }

}
