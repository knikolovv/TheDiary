package com.example.TheDiary.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Meal {
    @Id
    private Long id;
    @NotBlank
    @Enumerated(EnumType.STRING)
    private MealType mealType;

    @OneToMany(mappedBy = "meal", orphanRemoval = true)
    private List<FoodEntry> foodEntries = new ArrayList<>();
}
