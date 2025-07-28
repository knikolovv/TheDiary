package com.example.TheDiary.repository;

import com.example.TheDiary.model.FoodEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodRepo extends JpaRepository<FoodEntry, Long> {
    FoodEntry findByFoodNameContaining(String name);
}
