package com.example.TheDairy.controller;

import com.example.TheDairy.model.Note;
import com.example.TheDairy.service.NoteService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/note")
@AllArgsConstructor
public class NoteController {
    private NoteService noteService;

    @GetMapping("")
    public ResponseEntity<List<Note>> getNotes() {
        List<Note> notes = noteService.getNotes();
        return ResponseEntity.ok(notes);
    }

    @PostMapping("")
    public ResponseEntity<Note> createNote(@Valid @RequestBody Note note) {
        Note newNote = noteService.saveNote(note);
        return new ResponseEntity<>(newNote, HttpStatus.CREATED);
    }
}
