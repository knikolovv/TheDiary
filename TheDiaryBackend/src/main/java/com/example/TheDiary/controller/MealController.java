package com.example.TheDiary.controller;

import com.example.TheDiary.model.Meal;
import com.example.TheDiary.service.MealService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/nutrition")
public class MealController {
    private MealService mealService;

    @GetMapping("")
    public List<Meal> findAllMeal() {
        return mealService.findAllMeals();
    }

    @PostMapping("/create")
    public Meal createMeal(Meal meal) {
        return mealService.saveMeal(meal);
    }

}
