package bg.foodbookapp.foodbookbackend.models.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class RecipeDTO {
    private Long id;

    private String title;

    private byte[] picture;

    private double rating;

    private LocalDateTime dateAdded;

    private List<TagDTO> tags;

    public RecipeDTO() {
        this.tags = new ArrayList<>();
    }
}
