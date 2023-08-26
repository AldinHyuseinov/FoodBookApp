package bg.foodbookapp.foodbookbackend.utils.exceptions;

import lombok.Getter;

@Getter
public class RecipeNotFoundException extends RuntimeException {
    public RecipeNotFoundException(String message) {
        super(message);
    }
}
