package com.example.TheDiary.controller;

import com.example.TheDiary.model.FoodEntry;
import com.example.TheDiary.service.FoodService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/search")
    public ResponseEntity<List<FoodEntry>> findFoodByName(@RequestParam String name) {
        List<FoodEntry> foodEntries = foodService.findFoodByName(name);
        return ResponseEntity.ok(foodEntries);
    }

    @PostMapping("/create")
    public ResponseEntity<FoodEntry> createFood(@RequestBody @Valid FoodEntry foodEntry) {
        FoodEntry newFoodEntry = foodService.saveFood(foodEntry);
        return ResponseEntity.ok(newFoodEntry);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable Long id) {
        foodService.deleteFoodById(id);
        return ResponseEntity.noContent().build();
    }
}
