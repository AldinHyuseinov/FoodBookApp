package bg.foodbookapp.foodbookbackend.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "recipes")
@Getter
@Setter
public class Recipe extends BaseEntity {
    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @OneToMany
    private List<Picture> recipePictures;

    @OneToMany
    private List<Ingredient> ingredients;

    @OneToMany
    private List<Direction> directions;

    @Column(nullable = false)
    private Integer servings;

    @Column(nullable = false)
    private String prepTime;

    private String cookTime;

    @OneToMany
    private List<Note> notes;

    @OneToMany
    private List<Review> reviews;

    @ManyToOne
    private User addedByUser;

    @OneToMany
    private List<Tag> tags;

    @Column(nullable = false)
    private LocalDateTime dateAdded;

    public Recipe() {
        this.ingredients = new ArrayList<>();
        this.directions = new ArrayList<>();
        this.notes = new ArrayList<>();
        this.reviews = new ArrayList<>();
        this.tags = new ArrayList<>();
    }
}
