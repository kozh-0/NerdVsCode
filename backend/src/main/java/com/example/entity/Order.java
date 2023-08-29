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
    @Column(name = "passport_details")
    private String passportDetails;
    @Column(name = "monthly_payment")
    private double monthlyPayment;
    private double rate;
    @Column(name = "init_fee")
    private double initFee;
    private int year;
    private String email;
    private String telegram;

}
