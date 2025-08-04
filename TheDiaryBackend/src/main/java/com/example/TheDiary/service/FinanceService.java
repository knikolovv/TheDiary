package com.example.TheDiary.service;

import com.example.TheDiary.model.FinanceEntry;
import com.example.TheDiary.repository.FinanceRepo;
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

    public FinanceEntry updateFinanceEntry(Long id, FinanceEntry financeEntry) {
        FinanceEntry entryToUpdate = financeRepo.findById(id).
                orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Finance entry not found"));

        Optional.of(financeEntry.getCounterparty())
                .ifPresentOrElse(entryToUpdate::setCounterparty,
                        () -> {
                            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Counterparty is required");
                        });
        Optional.ofNullable(financeEntry.getAmount()).ifPresent(entryToUpdate::setAmount);
        Optional.ofNullable(financeEntry.getCategory()).ifPresent(entryToUpdate::setCategory);
        Optional.ofNullable(financeEntry.getPaymentMethod()).ifPresent(entryToUpdate::setPaymentMethod);
        Optional.ofNullable(financeEntry.getDate()).ifPresent(entryToUpdate::setDate);
        Optional.ofNullable(financeEntry.getDescription()).ifPresent(entryToUpdate::setDescription);
        return financeRepo.save(entryToUpdate);
    }

    public void deleteFinanceEntryById(Long id) {
        if (financeRepo.existsById(id)) {
            financeRepo.deleteById(id);
        } else {
            throw new RuntimeException("Finance entry not found with id: " + id);
        }
    }
}
