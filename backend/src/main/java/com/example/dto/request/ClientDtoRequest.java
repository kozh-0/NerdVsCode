package com.example.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientDtoRequest {

    private String lastName;
    private String firstName;
    private String patronymic;
    private String passportDetails;
    private String email;
    private String telegram;

}
