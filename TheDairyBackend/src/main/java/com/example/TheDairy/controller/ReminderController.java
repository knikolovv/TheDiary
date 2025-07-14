package com.example.TheDairy.controller;

import com.example.TheDairy.model.Reminder;
import com.example.TheDairy.service.ReminderService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/calendar/reminder")
public class ReminderController {
    ReminderService reminderService;

    @GetMapping("")
    public ResponseEntity<List<Reminder>> findAllReminders() {
        return ResponseEntity.ok(reminderService.findAllReminders());
    }

    @PostMapping("/create")
    public void createReminder(@RequestBody Reminder reminder) {
        reminderService.createReminder(reminder);
    }

    @DeleteMapping("/{id}")
    public void deleteReminderById(@PathVariable Long id) {
        reminderService.deleteReminderById(id);
    }
}
