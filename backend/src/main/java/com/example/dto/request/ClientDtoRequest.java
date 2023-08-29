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

    private String lastName;
    private String firstName;
    private String patronymic;
    @NotEmpty(message = "{passportdetails.notempty}")
    private String passportDetails;
    private String email;
    private String telegram;

}
