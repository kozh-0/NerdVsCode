package com.example.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDtoRequest {

    private String username;

    private String password;

    private String passwordConfirm;

    private String lastName;

    private String firstName;

    private String patronymic;

    private String email;

}
