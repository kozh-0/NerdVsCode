package com.example.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Objects;

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
    private String email;
    private int age;
    private int workExperience;
    private int inn;
    private int snils;
    private int creditRating;
    private int debtLoad;
    private int numberOpenLoans;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Client client = (Client) o;
        return age == client.age && workExperience == client.workExperience && inn == client.inn && snils == client.snils && creditRating == client.creditRating && debtLoad == client.debtLoad && numberOpenLoans == client.numberOpenLoans && Objects.equals(id, client.id) && Objects.equals(lastName, client.lastName) && Objects.equals(firstName, client.firstName) && Objects.equals(patronymic, client.patronymic) && Objects.equals(email, client.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, lastName, firstName, patronymic, email, age, workExperience, inn, snils, creditRating, debtLoad, numberOpenLoans);
    }
}
