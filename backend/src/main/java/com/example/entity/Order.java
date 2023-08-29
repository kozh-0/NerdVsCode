package com.example.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "\"order\"")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String carName;
    private double carPrice;
    private String passportDetails;
    private double monthlyPayment;
    private double rate;
    private double initFee;
    private int year;
    private String email;
    private String telegram;

}
