package com.example.TheDairy.service;

import com.example.TheDairy.model.Reminder;
import com.example.TheDairy.repository.ReminderRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ReminderService {
    ReminderRepo reminderRepo;

    public List<Reminder> findAllReminders() {
        return reminderRepo.findAll();
    }

    public void createReminder(Reminder reminder) {
        reminderRepo.save(reminder);
    }

    public void deleteReminderById(Long id) {
        if (!reminderRepo.existsById(id)) {
            throw new RuntimeException("Reminder not found with id: " + id);
        }
        reminderRepo.deleteById(id);
    }
}
