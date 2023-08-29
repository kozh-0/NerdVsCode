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
public class ClientDtoRequest {

    @NotEmpty(message = "{lastname.notempty}")
    @Size(max = 25, message = "{lastname.size}")
    @Pattern(regexp = "^(([А-Я][а-яё]+)|([A-Z][a-z]+))$", message = "{lastname.pattern}")
    private String lastName;
    @NotEmpty(message = "{firstname.notempty}")
    @Size(max = 25, message = "{firstname.size}")
    @Pattern(regexp = "^(([А-Я][а-яё]+)|([A-Z][a-z]+))$", message = "{firstname.pattern}")
    private String firstName;
    @Size(max = 25, message = "{patronymic.size}")
    @Pattern(regexp = "^(([А-Я][а-яё]+)|([A-Z][a-z]+))$", message = "{patronymic.pattern}")
    private String patronymic;
    @NotEmpty(message = "{passportdetails.notempty}")
    private String passportDetails;
    @NotEmpty(message = "{email.notempty}")
    @Email(message = "{email.email}")
    private String email;
    private String telegram;

}
