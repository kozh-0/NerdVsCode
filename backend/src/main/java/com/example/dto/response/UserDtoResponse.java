package com.example.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDtoResponse {

    private Long id;
    private String lastName;
    private String firstName;
    private String patronymic;
    private String passportDetails;
    private String email;
    private String telegram;

}
