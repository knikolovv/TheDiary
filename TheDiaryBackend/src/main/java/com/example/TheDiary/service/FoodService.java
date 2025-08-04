package com.example.TheDiary.service;

import com.example.TheDiary.model.FoodEntry;
import com.example.TheDiary.repository.FoodRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class FoodService {
    private FoodRepo foodRepo;

    public List<FoodEntry> findAllFoods() {
        return foodRepo.findAll();
    }

    public List<FoodEntry> findFoodByName(String foodName) {
        return foodRepo.findByFoodNameContainingIgnoreCase(foodName);
    }

    public FoodEntry saveFood(FoodEntry foodEntry) {
        return foodRepo.save(foodEntry);
    }

    public void deleteFoodById(Long id) {
        if (!foodRepo.existsById(id)) {
            throw new RuntimeException("Food not found with id: " + id);
        }
        foodRepo.deleteById(id);
    }
}
