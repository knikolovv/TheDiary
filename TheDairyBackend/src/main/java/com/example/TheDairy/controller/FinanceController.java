package com.example.TheDairy.controller;

import com.example.TheDairy.model.FinanceEntry;
import com.example.TheDairy.service.FinanceService;
import lombok.AllArgsConstructor;
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
        return ResponseEntity.ok(newFinanceEntry);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FinanceEntry> getFinanceEntryById(@PathVariable Long id) {
        FinanceEntry financeEntry = financeService.getFinanceEntryById(id);
        return ResponseEntity.ok(financeEntry);
    }

    @GetMapping("")
    public ResponseEntity<List<FinanceEntry>> findAllFinanceEntries() {
        return ResponseEntity.ok(financeService.findAllFinanceEntries());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFinanceEntryById(@PathVariable Long id) {
        financeService.deleteFinanceEntryById(id);
        return ResponseEntity.ok().build();
    }
}
