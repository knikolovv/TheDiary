package com.example.TheDiary.controller;

import com.example.TheDiary.service.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/images")
public class ImageController {
    private ImageService imageService;

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImageById(@PathVariable Long id) {
        if (imageService.getImageById(id) == null) {
            return ResponseEntity.notFound().build();
        } else {
            imageService.deleteImageById(id);
            return ResponseEntity.ok().build();
        }
    }
}
