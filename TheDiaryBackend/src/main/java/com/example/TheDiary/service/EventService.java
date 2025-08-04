package com.example.TheDiary.service;

import com.example.TheDiary.model.Event;
import com.example.TheDiary.repository.EventRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class EventService {
    private EventRepo eventRepo;

    public List<Event> findAllEvents() {
        return eventRepo.findAll();
    }

    public Event createEvents(Event event) {
        if (event.isAllDay()) {
            event.setEventDateTime(event.getEventDateTime().toLocalDate().atStartOfDay());
        }
        return eventRepo.save(event);
    }

    public Event getEventById(Long id) {
        return eventRepo.findById(id).
                orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
    }

    public void deleteEventById(Long id) {
        if (!eventRepo.existsById(id)) {
            throw new RuntimeException("Event not found with id: " + id);
        }
        eventRepo.deleteById(id);
    }

    public Event updateEvent(Long id, Event event) {
        if (!eventRepo.existsById(id)) {
            throw new RuntimeException("Event not found with id: " + id);
        }
        Event existingEvent = eventRepo.findById(id).get();
        existingEvent.setTitle(event.getTitle());
        existingEvent.setEventDateTime(event.getEventDateTime());
        existingEvent.setAllDay(event.isAllDay());

        if (existingEvent.isAllDay()) {
            existingEvent.setEventDateTime(existingEvent.getEventDateTime().toLocalDate().atStartOfDay());
        }

        return eventRepo.save(existingEvent);
    }
}
