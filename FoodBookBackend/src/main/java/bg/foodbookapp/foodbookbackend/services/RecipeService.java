package bg.foodbookapp.foodbookbackend.services;

import bg.foodbookapp.foodbookbackend.models.dto.*;
import bg.foodbookapp.foodbookbackend.models.entities.*;
import bg.foodbookapp.foodbookbackend.models.enums.Type;
import bg.foodbookapp.foodbookbackend.repositories.*;
import bg.foodbookapp.foodbookbackend.utils.exceptions.RecipeNotFoundException;
import com.google.gson.Gson;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
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

    private final PictureService pictureService;

    private final ModelMapper mapper;

    private final Gson gson;

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
        recipe.setPrepTime("10 minutes");
        recipe.setCookTime("4 hours");
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
        direction.setStepNumber(1);

        Direction direction2 = new Direction();
        direction2.setExplanation("Boil and serve!");
        direction2.setStepNumber(2);

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
                Picture picture = recipePictures.get(0);
                String base64 = Base64.getEncoder().encodeToString(picture.getPicture());
                recipeDTO.setPicture("data:" + picture.getFileType() + ";base64," + base64);
            }
            recipeDTO.setRating(getAverageRatingForRecipe(recipe.getId()));

            return recipeDTO;
        }).toList();
    }

    public void addRecipe(AddRecipeDTO addRecipeDTO, String userEmail) {
        Recipe recipe = mapper.map(addRecipeDTO, Recipe.class);

        if (addRecipeDTO.getPhoto() != null) {
            recipe.setRecipePictures(List.of(pictureService.addPicture(addRecipeDTO.getPhoto(), Type.RECIPE)));
        }
        setIngredients(addRecipeDTO, recipe);
        setDirections(addRecipeDTO, recipe);
        setNotes(addRecipeDTO, recipe);
        recipe.setAddedByUser(userRepository.findByEmail(userEmail).orElse(null));
        recipe.setDateAdded(LocalDateTime.now());

        recipeRepository.save(recipe);
    }

    @Transactional
    public RecipeDetailsDTO getRecipeById(Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RecipeNotFoundException("Recipe not found"));

        RecipeDetailsDTO recipeDTO = mapper.map(recipe, RecipeDetailsDTO.class);

        List<Picture> recipePictures = recipe.getRecipePictures();

        if (recipePictures.size() > 0) {
            recipePictures.forEach(picture -> {
                String base64 = Base64.getEncoder().encodeToString(picture.getPicture());
                recipeDTO.getPhotos().add("data:" + picture.getFileType() + ";base64," + base64);
            });
        }

        User addedByUser = recipe.getAddedByUser();

        if (addedByUser.getUsername() != null) {
            recipeDTO.setAddedBy(addedByUser.getUsername());
        } else {
            recipeDTO.setAddedBy("Anonymous");
        }

        return recipeDTO;
    }

    @Transactional
    public double getAverageRatingForRecipe(Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElse(null);

        return recipe.getReviews().stream().mapToDouble(Review::getRating).average().orElse(0);
    }

    private void setIngredients(AddRecipeDTO addRecipeDTO, Recipe recipe) {
        List<Ingredient> ingredients = Arrays.stream(gson.fromJson(addRecipeDTO.getIngredients(), String[].class))
                .map(ingredientStr -> {
                    Ingredient ingredient = new Ingredient();
                    ingredient.setIngredientInfo(ingredientStr);
                    return ingredient;
                }).toList();

        ingredientRepository.saveAll(ingredients);
        recipe.setIngredients(ingredients);
    }

    private void setDirections(AddRecipeDTO addRecipeDTO, Recipe recipe) {
        List<String> directionStrings = Arrays.stream(gson.fromJson(addRecipeDTO.getDirections(), String[].class)).toList();
        List<Direction> directions = new ArrayList<>();

        for (int i = 0; i < directionStrings.size(); i++) {
            Direction direction = new Direction();
            direction.setExplanation(directionStrings.get(i));
            direction.setStepNumber(i + 1);

            directions.add(direction);
        }

        directionRepository.saveAll(directions);
        recipe.setDirections(directions);
    }

    private void setNotes(AddRecipeDTO addRecipeDTO, Recipe recipe) {
        List<Note> notes = Arrays.stream(gson.fromJson(addRecipeDTO.getNotes(), NoteDTO[].class))
                .map(noteDTO -> mapper.map(noteDTO, Note.class)).toList();

        if (!notes.isEmpty()) {
            noteRepository.saveAll(notes);
            recipe.setNotes(notes);
        }
    }
}
