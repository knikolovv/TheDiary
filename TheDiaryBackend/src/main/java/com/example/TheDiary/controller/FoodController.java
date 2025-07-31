package com.example.TheDiary.controller;

import com.example.TheDiary.model.FoodEntry;
import com.example.TheDiary.service.FoodService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/food")
public class FoodController {
    private FoodService foodService;

    @GetMapping("")
    public ResponseEntity<Iterable<FoodEntry>> findAllFoods() {
        Iterable<FoodEntry> foodEntries = foodService.findAllFoods();
        return ResponseEntity.ok(foodEntries);
    }

    @GetMapping("/{name}")
    public ResponseEntity<FoodEntry> getFoodByName(@PathVariable String name) {
        FoodEntry foodEntry = foodService.getFoodByName(name);
        return ResponseEntity.ok(foodEntry);
    }

    @PostMapping("/create")
    public ResponseEntity<FoodEntry> createFood(@RequestBody @Valid FoodEntry foodEntry) {
        FoodEntry newFoodEntry = foodService.saveFood(foodEntry);
        return ResponseEntity.ok(newFoodEntry);
    }
}
