package com.example.TheDiary.controller;

import com.example.TheDiary.model.Meal;
import com.example.TheDiary.service.MealService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{id}")
    public ResponseEntity<Meal> getMealById(@PathVariable Long id) {
        Meal meal = mealService.getMealById(id);
        if (meal != null) {
            return ResponseEntity.ok(meal);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/meal/create")
    public ResponseEntity<Meal> createMeal(@RequestBody Meal meal) {
        Meal newMeal = mealService.saveMeal(meal);
        return new ResponseEntity<>(newMeal, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Meal> updateMeal(@PathVariable Long id, @RequestBody Meal meal) {
        Meal mealToUpdate = mealService.updateMeal(id, meal);
        return ResponseEntity.ok(mealToUpdate);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMealById(@PathVariable Long id) {
        mealService.deleteMealById(id);
        return ResponseEntity.noContent().build();
    }
}
