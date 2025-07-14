package com.example.TheDairy.repository;

import com.example.TheDairy.model.Reminder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReminderRepo extends JpaRepository<Reminder,Long> {
}
