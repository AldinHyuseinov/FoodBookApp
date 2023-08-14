package bg.foodbookapp.foodbookbackend.services;

import bg.foodbookapp.foodbookbackend.models.dto.RecipeDTO;
import bg.foodbookapp.foodbookbackend.models.entities.*;
import bg.foodbookapp.foodbookbackend.repositories.*;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor(onConstructor_ = @Autowired)
public class RecipeService {
    private final RecipeRepository recipeRepository;

    private final IngredientRepository ingredientRepository;

    private final DirectionRepository directionRepository;

    private final NoteRepository noteRepository;

    private final ReviewRepository reviewRepository;

    private final UserRepository userRepository;

    private final ModelMapper mapper;

    @PostConstruct
    private void initRecipes() {

        if (recipeRepository.count() >= 1) {
            return;
        }

        Recipe recipe = new Recipe();
        recipe.setTitle("Beans");
        recipe.setDescription("Baked beans are the perfect addition to any outdoor cookout or barbecue. " +
                "These baked beans are slow-cooked in the oven with onions, and a sweet, syrupy sauce, resulting " +
                "in an old-fashioned taste that everyone will enjoy.");
        recipe.setPrepTime("10 min");
        recipe.setCookTime("4 hrs 10 min");
        recipe.setServings(6);
        recipe.setDateAdded(LocalDateTime.now());

        Ingredient ingredient = new Ingredient();
        ingredient.setIngredientInfo("2 cups dry beans");

        Ingredient ingredient2 = new Ingredient();
        ingredient2.setIngredientInfo("1 medium onion, diced");

        Ingredient ingredient3 = new Ingredient();
        ingredient3.setIngredientInfo("2 teaspoons salt");

        Ingredient ingredient4 = new Ingredient();
        ingredient4.setIngredientInfo("¼ teaspoon ground black pepper");
        ingredientRepository.saveAll(List.of(ingredient, ingredient2, ingredient3, ingredient4));

        recipe.setIngredients(List.of(ingredient, ingredient2, ingredient3, ingredient4));

        Direction direction = new Direction();
        direction.setExplanation("Add ingredients to a pot.");

        Direction direction2 = new Direction();
        direction2.setExplanation("Boil and serve!");

        directionRepository.saveAll(List.of(direction, direction2));

        recipe.setDirections(List.of(direction, direction2));

        recipeRepository.save(recipe);
    }

    @Transactional
    public List<RecipeDTO> getAllRecipes() {
        return recipeRepository.findAll().stream().map(recipe -> {
            RecipeDTO recipeDTO = mapper.map(recipe, RecipeDTO.class);

            List<Picture> recipePictures = recipe.getRecipePictures();

            if (recipePictures.size() == 0) {
                recipeDTO.setPicture(null);
            } else {
                recipeDTO.setPicture(recipe.getRecipePictures().get(0).getPicture());
            }
            recipeDTO.setRating(getAverageRatingForRecipe(recipe.getId()));

            return recipeDTO;
        }).toList();
    }

    @Transactional
    public double getAverageRatingForRecipe(Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElse(null);

        return recipe.getReviews().stream().mapToDouble(Review::getRating).average().orElse(0);
    }
}
