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
        meal.setTotalCalories(calculateTotal(meal, mealFood -> mealFood.getFoodEntry().getFoodCaloriesPer100g()));
        meal.setTotalCarbs(calculateTotal(meal, mealFood -> mealFood.getFoodEntry().getCarbohydrates()));
        meal.setTotalProteins(calculateTotal(meal, mealFood -> mealFood.getFoodEntry().getProteins()));
        meal.setTotalFats(calculateTotal(meal, mealFood -> mealFood.getFoodEntry().getFats()));
        meal.setTotalSaturatedFats(calculateTotal(meal, mealFood -> mealFood.getFoodEntry().getSaturatedFats()));

        return mealRepo.save(meal);
    }

    private double calculateTotal(Meal meal, Function<MealFood, Double> nutrientExtractor) {
        return meal.getMealFoods().stream()
                .mapToDouble(food -> (food.getServingSize() / 100.0) * nutrientExtractor.apply(food))
                .sum();
    }


}
