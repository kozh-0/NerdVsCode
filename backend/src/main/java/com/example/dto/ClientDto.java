package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientDto {

    private Long id;
    private String lastName;
    private String firstName;
    private String patronymic;
    private String email;
    private int age;
    private int workExperience;
    private int inn;
    private int snils;
    private int creditRating;
    private int debtLoad;
    private int numberOpenLoans;

}
