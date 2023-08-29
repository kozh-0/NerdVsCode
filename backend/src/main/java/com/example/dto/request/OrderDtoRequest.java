package com.example.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDtoRequest {

    private String name;
    private String carName;
    private double carPrice;
    @NotEmpty(message = "{passportdetails.notempty}")
    private String passportDetails;
    private double monthlyPayment;
    private double rate;
    private double initFee;
    private int year;
    private String email;
    private String telegram;

}
