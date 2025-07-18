package com.example.TheDairy.controller;

import com.example.TheDairy.model.Note;
import com.example.TheDairy.service.NoteService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/notes")
@AllArgsConstructor
public class NoteController {
    private NoteService noteService;

    @GetMapping("")
    public ResponseEntity<List<Note>> findAllNotes() {
        List<Note> notes = noteService.findAllNotes();
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable Long id) {
        Note note = noteService.getNoteById(id);
        if (note != null) {
            return ResponseEntity.ok(note);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Note> createNote(@Valid @RequestParam String title,
                                           @Valid @RequestParam String description,
                                           boolean isPinned,
                                           @RequestParam(required = false) MultipartFile[] images) throws IOException {
        Note newNote = noteService.saveNote(title, description, isPinned, images);

        return new ResponseEntity<>(newNote, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNoteById(@PathVariable Long id) {
        if (noteService.getNoteById(id) == null) {
            return ResponseEntity.notFound().build();
        } else {
            noteService.deleteNote(id);
            return ResponseEntity.ok().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(
            @PathVariable Long id,
            @Valid @RequestParam String title,
            @Valid @RequestParam String description,
            boolean isPinned,
            @RequestParam(required = false) MultipartFile[] images) {
        Note updatedNote = noteService.updateNote(id, title, description, isPinned, images);
        return ResponseEntity.ok(updatedNote);
    }
}
