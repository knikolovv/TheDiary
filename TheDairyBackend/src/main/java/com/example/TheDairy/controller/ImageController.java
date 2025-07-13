package com.example.TheDairy.controller;

import com.example.TheDairy.service.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/images")
public class ImageController {
    ImageService imageService;

    @DeleteMapping("/{id}")
    public void deleteImageById(@PathVariable Long id) {
        imageService.deleteImageById(id);
    }
}
