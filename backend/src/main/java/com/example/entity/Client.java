package com.example.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "client")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String lastName;
    private String firstName;
    private String patronymic;
    @Column(unique = true)
    private String passportDetails;
    private String email;
    private int age;
    private double workExperience;
    private String loanSecurity;
    private double debtLoad;
    private int numberOpenLoans;


}
