package com.example.TheDiary.controller;

import com.example.TheDiary.model.FinanceEntry;
import com.example.TheDiary.service.FinanceService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/finance")
public class FinanceController {
    private FinanceService financeService;

    @PostMapping("/create")
    public ResponseEntity<FinanceEntry> createFinanceEntry(@RequestBody FinanceEntry financeEntry) {
        FinanceEntry newFinanceEntry = financeService.createFinanceEntry(financeEntry);
        return new ResponseEntity<>(newFinanceEntry, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FinanceEntry> getFinanceEntryById(@PathVariable Long id) {
        FinanceEntry financeEntry = financeService.getFinanceEntryById(id);
        return ResponseEntity.ok(financeEntry);
    }

    @GetMapping("")
    public ResponseEntity<List<FinanceEntry>> findAllFinanceEntries() {
        List<FinanceEntry> financeEntries = financeService.findAllFinanceEntries();
        return ResponseEntity.ok(financeEntries);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FinanceEntry> updateFinanceEntry(@PathVariable Long id,
                                                           @RequestBody FinanceEntry financeEntry) {
        FinanceEntry updatedFinanceEntry = financeService.updateFinanceEntry(id, financeEntry);
        return ResponseEntity.ok(updatedFinanceEntry);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFinanceEntryById(@PathVariable Long id) {
        if (financeService.getFinanceEntryById(id) == null) {
            return ResponseEntity.notFound().build();
        } else {
            financeService.deleteFinanceEntryById(id);
            return ResponseEntity.ok().build();
        }
    }
}
