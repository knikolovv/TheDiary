package com.example.TheDairy.repository;

import com.example.TheDairy.model.FinanceEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinanceRepo extends JpaRepository<FinanceEntry, Long> {
}
