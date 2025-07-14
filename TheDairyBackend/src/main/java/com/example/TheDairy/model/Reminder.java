package com.example.TheDairy.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Reminder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String title;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime reminderDateTime;
    @Column(updatable = false)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime createdDate;
    @Column
    private boolean isAllDay;

    @PrePersist
    protected void onCreate() {
        this.createdDate = LocalDateTime.now();
    }
}
