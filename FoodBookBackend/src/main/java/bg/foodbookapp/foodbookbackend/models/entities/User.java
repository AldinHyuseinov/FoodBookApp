package bg.foodbookapp.foodbookbackend.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User extends BaseEntity {
    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String username;

    private String firstName;

    private String lastName;

    private LocalDate birthDate;

    @OneToOne
    private Picture profilePicture;

    @Column(columnDefinition = "TEXT")
    private String tagline;

    @ManyToOne(optional = false)
    private UserRole role;

    @OneToMany
    private List<Recipe> favouriteRecipes;

    public User() {
        this.favouriteRecipes = new ArrayList<>();
    }
}
