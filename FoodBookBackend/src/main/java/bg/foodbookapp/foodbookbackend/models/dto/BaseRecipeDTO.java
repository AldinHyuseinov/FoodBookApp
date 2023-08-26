package bg.foodbookapp.foodbookbackend.models.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public abstract class BaseRecipeDTO {
    private Long id;

    private String title;

    private double rating;
}
