package com.example.TheDiary.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    private Long id;

    private String foodName;
    private Double foodCaloriesPer100g;
    private Double servingSize;
    private Double carbohydrates;
    private Double proteins;
    private Double fats;
    private Double saturatedFats;
    @ManyToOne
    @JoinColumn(name = "meal_id")
    private Meal meal;
}
