package bg.foodbookapp.foodbookbackend.web;

import bg.foodbookapp.foodbookbackend.models.dto.AddRecipeDTO;
import bg.foodbookapp.foodbookbackend.models.dto.RecipeDTO;
import bg.foodbookapp.foodbookbackend.services.RecipeService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

import static bg.foodbookapp.foodbookbackend.utils.ErrorHelper.hasErrors;

@RestController
@RequestMapping("/api/recipes")
public class RecipeRestController {
    private final RecipeService recipeService;

    private static final Logger LOGGER = LoggerFactory.getLogger(RecipeRestController.class);

    public RecipeRestController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping
    public ResponseEntity<List<RecipeDTO>> allRecipes() {
        LOGGER.info("Got all recipes.");
        return ResponseEntity.ok(recipeService.getAllRecipes());
    }

    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> addRecipe(@ModelAttribute @Valid AddRecipeDTO addRecipeDTO, BindingResult bindingResult, Principal principal) {
        hasErrors(bindingResult);
        recipeService.addRecipe(addRecipeDTO, principal.getName());
        LOGGER.info("Added recipe: {}", addRecipeDTO.getTitle());

        return ResponseEntity.ok().build();
    }
}
