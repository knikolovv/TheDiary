package com.example.TheDiary.service;

import com.example.TheDiary.model.FinanceEntry;
import com.example.TheDiary.repository.FinanceRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@AllArgsConstructor
public class FinanceService {
    private FinanceRepo financeRepo;

    public FinanceEntry createFinanceEntry(FinanceEntry financeEntry) {
        return financeRepo.save(financeEntry);
    }

    public List<FinanceEntry> findAllFinanceEntries() {
        return financeRepo.findAll();
    }

    public FinanceEntry getFinanceEntryById(Long id) {
        return financeRepo.findById(id).
                orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Finance entry not found"));
    }

    public void deleteFinanceEntryById(Long id) {
        if (financeRepo.existsById(id)) {
            financeRepo.deleteById(id);
        } else {
            throw new RuntimeException("Finance entry not found with id: " + id);
        }
    }
}
