package com.example.TheDiary.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private MealType mealType;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    @OneToMany(mappedBy = "meal", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<MealFood> mealFoods = new ArrayList<>();

    private Double totalCalories;
    private Double totalCarbs;
    private Double totalProteins;
    private Double totalFats;
    private Double totalSaturatedFats;
}
