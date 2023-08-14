package bg.foodbookapp.foodbookbackend.models.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
public class RecipeDTO {
    private Long id;

    private String title;

    private byte[] picture;

    private double rating;

    private LocalDateTime dateAdded;
}
