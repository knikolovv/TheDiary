package com.example.TheDiary.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String title;
    @Column(columnDefinition = "TEXT")
    private String description;
    @Column(name = "is_pinned")
    private boolean isPinned = false;
    @OneToMany(mappedBy = "note", cascade = {CascadeType.MERGE,CascadeType.PERSIST}, orphanRemoval = true)
    @JsonManagedReference
    private List<Image> images = new ArrayList<>();
}