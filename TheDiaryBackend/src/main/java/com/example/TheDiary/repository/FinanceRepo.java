package com.example.TheDiary.repository;

import com.example.TheDiary.model.FinanceEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinanceRepo extends JpaRepository<FinanceEntry, Long> {
}
