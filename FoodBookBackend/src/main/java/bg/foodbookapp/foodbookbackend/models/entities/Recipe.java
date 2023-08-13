package bg.foodbookapp.foodbookbackend.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

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

    public Recipe() {
        this.ingredients = new ArrayList<>();
        this.directions = new ArrayList<>();
        this.notes = new ArrayList<>();
        this.reviews = new ArrayList<>();
    }
}
