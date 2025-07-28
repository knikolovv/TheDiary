package com.example.TheDiary.service;

import com.example.TheDiary.model.FoodEntry;
import com.example.TheDiary.repository.FoodRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class FoodService {
    private FoodRepo foodRepo;

    public FoodEntry getFoodByName(String foodName) {
        return foodRepo.findByFoodNameContaining(foodName);
    }

    public FoodEntry saveFood(FoodEntry foodEntry) {
        return foodRepo.save(foodEntry);
    }
}
