package bg.foodbookapp.foodbookbackend.models.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class RecipeDetailsDTO extends BaseRecipeDTO {
    private String description;

    private LocalDateTime dateAdded;

    private List<String> photos;

    private List<IngredientDTO> ingredients;

    private List<DirectionDTO> directions;

    private Integer servings;

    private String prepTime;

    private String cookTime;

    private List<NoteDTO> notes;

    private String addedBy;

    public RecipeDetailsDTO() {
        this.photos = new ArrayList<>();
        this.ingredients = new ArrayList<>();
        this.directions = new ArrayList<>();
        this.notes = new ArrayList<>();
    }
}
