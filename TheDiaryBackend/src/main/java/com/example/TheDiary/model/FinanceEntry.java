package com.example.TheDiary.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class FinanceEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String counterparty;
    @Column(name = "category")
    @Enumerated(EnumType.STRING)
    @NotNull
    private FinancialCategory category;
    @Column(nullable = false)
    @NotNull
    private Double amount;
    @Column(name = "payment_method")
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;
    @Nullable
    private String description;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
}
