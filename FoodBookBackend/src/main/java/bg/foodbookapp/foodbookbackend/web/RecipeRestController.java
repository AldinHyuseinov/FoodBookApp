package bg.foodbookapp.foodbookbackend.web;

import bg.foodbookapp.foodbookbackend.models.dto.RecipeDTO;
import bg.foodbookapp.foodbookbackend.services.RecipeService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@AllArgsConstructor(onConstructor_ = @Autowired)
public class RecipeRestController {
    private final RecipeService recipeService;

    @GetMapping
    public ResponseEntity<List<RecipeDTO>> allRecipes() {
        return ResponseEntity.ok(recipeService.getAllRecipes());
    }
}
