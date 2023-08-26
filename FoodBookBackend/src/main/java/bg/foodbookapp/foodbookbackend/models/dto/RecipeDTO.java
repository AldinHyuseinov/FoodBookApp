package bg.foodbookapp.foodbookbackend.models.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class RecipeDTO extends BaseRecipeDTO {
    private String picture;
    private List<TagDTO> tags;

    public RecipeDTO() {
        this.tags = new ArrayList<>();
    }
}
