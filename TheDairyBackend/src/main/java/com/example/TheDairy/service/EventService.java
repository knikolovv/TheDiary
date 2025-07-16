package com.example.TheDairy.service;

import com.example.TheDairy.model.Event;
import com.example.TheDairy.repository.EventRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class EventService {
    EventRepo eventRepo;

    public List<Event> findAllEvents() {
        return eventRepo.findAll();
    }

    public Event createEvents(Event event) {
        if (event.isAllDay()) {
            event.setEventDateTime(event.getEventDateTime().toLocalDate().atStartOfDay());
        }
        return eventRepo.save(event);
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
