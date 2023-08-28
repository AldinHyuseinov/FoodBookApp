package bg.foodbookapp.foodbookbackend.models.dto;

import bg.foodbookapp.foodbookbackend.utils.validations.ValidatePicture;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@NoArgsConstructor
@Getter
@Setter
public class AddRecipeDTO {
    @Size(min = 3, max = 30, message = "Title should be between 3 and 30 characters")
    private String title;

    @Size(min = 10, max = 300, message = "Description should be between 10 and 300 characters")
    private String description;

    @ValidatePicture
    private MultipartFile photo;

    @NotNull(message = "Missing ingredients")
    private String ingredients;

    @NotNull(message = "Missing directions")
    private String directions;

    @Min(value = 1, message = "At least one serving is required")
    private Integer servings;

    @NotNull(message = "How long does it take to prep?")
    private String prepTime;

    private String cookTime;

    private String notes;
}
