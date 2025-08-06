package com.example.TheDiary.service;

import com.example.TheDiary.model.Meal;
import com.example.TheDiary.model.MealFood;
import com.example.TheDiary.repository.MealRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
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
        if (meal.getMealFoods() != null) {
            meal.getMealFoods().forEach(mealFood -> mealFood.setMeal(meal));
        }
        return mealRepo.save(meal);
    }

    public Meal updateMeal(Long id, Meal updatedMeal) {
        Meal mealToUpdate = mealRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Meal entry not found"));

        Optional.of(updatedMeal.getMealType()).ifPresent(mealToUpdate::setMealType);
        Optional.of(updatedMeal.getDate()).ifPresent(mealToUpdate::setDate);

        mealToUpdate.getMealFoods().clear();
        for (MealFood mealFood : updatedMeal.getMealFoods()) {
            mealFood.setMeal(mealToUpdate);
            mealToUpdate.getMealFoods().add(mealFood);
        }

        Optional.ofNullable(updatedMeal.getTotalCalories()).ifPresent(mealToUpdate::setTotalCalories);
        Optional.ofNullable(updatedMeal.getTotalCarbs()).ifPresent(mealToUpdate::setTotalCarbs);
        Optional.ofNullable(updatedMeal.getTotalProteins()).ifPresent(mealToUpdate::setTotalProteins);
        Optional.ofNullable(updatedMeal.getTotalFats()).ifPresent(mealToUpdate::setTotalFats);
        Optional.ofNullable(updatedMeal.getTotalSaturatedFats()).ifPresent(mealToUpdate::setTotalSaturatedFats);

        return mealRepo.save(mealToUpdate);
    }

    public void deleteMealById(Long id) {
        if (mealRepo.existsById(id)) {
            mealRepo.deleteById(id);
        } else {
            throw new RuntimeException("Meal not found with id: " + id);
        }
    }
}
