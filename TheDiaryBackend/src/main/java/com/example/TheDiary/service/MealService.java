package com.example.TheDiary.service;

import com.example.TheDiary.model.Meal;
import com.example.TheDiary.model.MealFood;
import com.example.TheDiary.repository.MealRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Function;

@Service
@AllArgsConstructor
public class MealService {
    private MealRepo mealRepo;

    public List<Meal> findAllMeals() {
        return mealRepo.findAll();
    }

    public Meal getMealById(Long id) {
        return mealRepo.findById(id).orElseThrow(() -> new RuntimeException("Meal not found with id: " + id));
    }

    public Meal saveMeal(Meal meal) {
        return mealRepo.save(meal);
    }
}
