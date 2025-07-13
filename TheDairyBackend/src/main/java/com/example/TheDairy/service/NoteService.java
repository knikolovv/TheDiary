package com.example.TheDairy.service;


import com.example.TheDairy.model.Image;
import com.example.TheDairy.model.Note;
import com.example.TheDairy.repository.ImageRepo;
import com.example.TheDairy.repository.NoteRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class NoteService {
    private NoteRepo noteRepo;

    private ImageRepo imageRepo;

    private final Path root = Paths.get("uploads/notes/images");

    public List<Note> findAllNotes() {
        return noteRepo.findAll();
    }

    public Note saveNote(String title, String description, MultipartFile[] images) throws IOException {
        Note note = new Note();
        note.setTitle(title);
        note.setDescription(description);
        noteRepo.save(note);

        if (images != null && images.length > 0) {
            Files.createDirectories(root);

            for (MultipartFile image : images) {
                if (!image.isEmpty()) {
                    String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
                    Path filePath = root.resolve(fileName);
                    Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                    Image img = new com.example.TheDairy.model.Image();
                    img.setNote(note);
                    img.setFileName(fileName);
                    img.setPath(filePath.toString());
                    imageRepo.save(img);

                    note.getImages().add(img);
                }
            }
        }

        return note;
    }

    public void deleteNote(Long id) {
        if (noteRepo.existsById(id)) {
            noteRepo.deleteById(id);
            deleteOrphanImages();
        } else {
            throw new RuntimeException("Note not found with id: " + id);
        }
    }

    public Note getNoteById(Long id) {
        return noteRepo.findById(id).orElse(null);
    }

    public Note updateNote(Long id, String title, String description, boolean isPinned, MultipartFile[] images) {
        Note note = getNoteById(id);
        if (note == null) {
            throw new NullPointerException("No note with id: " + id + " was found!");
        }
        if (!title.isBlank()) {
            note.setTitle(title);
        }
        note.setDescription(description);
        note.setPinned(isPinned);

        // TODO edit images
        if (images != null && images.length > 0) {
            note.getImages().clear();

            for (MultipartFile image : images) {
                if (!note.getImages().contains(image)) {

                }
            }
        }
        return noteRepo.save(note);
    }


    public void deleteOrphanImages() {
        Set<String> orphanedImages = imageRepo.findAll()
                .stream()
                .map(Image::getPath)
                .map(path -> path.replace("\\", "/"))
                .collect(Collectors.toSet());

        File uploadsDir = new File("uploads/notes/images");
        if (!uploadsDir.exists() || !uploadsDir.isDirectory()) {
            throw new IllegalStateException("Uploads folder does not exist!");
        }

        File[] files = uploadsDir.listFiles();
        if (files != null) {
            for (File file : files) {
                String relativePath = "uploads/notes/images/" + file.getName();
                if (!orphanedImages.contains(relativePath.replace("\\", "/"))) {
                    file.delete();
                }
            }
        }
    }
}
