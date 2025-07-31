package com.example.TheDiary.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FoodEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Food name must not be blank")
    private String foodName;
    private Double foodCaloriesPer100g;
    private Double carbohydrates;
    private Double proteins;
    private Double fats;
    private Double saturatedFats;
}
