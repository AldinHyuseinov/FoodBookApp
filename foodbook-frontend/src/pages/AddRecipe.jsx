import DirectionField from "../components/DirectionField";
import IngredientField from "../components/IngredientField";
import previewPhoto from "../utils/previewPhotoUtil";
import "../css/add-recipe-form.css";
import "../css/form.css";
import RecipeTimeField from "../components/RecipeTimeField";
import { useState } from "react";
import RemoveButton from "../components/RemoveButton";

export default function AddRecipePage() {
  const initialIngredientFields = [
    { placeholder: "e.g. 2 cups flour, sifted" },
    { placeholder: "e.g. 1 cup sugar" },
    { placeholder: "e.g. 2 tablespoons butter, softened" },
  ];

  const initialDirectionFields = [
    { placeholder: "e.g. Preheat oven to 350 degrees…", stepNumber: 1 },
    { placeholder: "e.g. Combine all dry ingredients in a large bowl…", stepNumber: 2 },
    { placeholder: "e.g. Pour into greased trays and bake for 15-20 minutes…", stepNumber: 3 },
  ];

  const [ingredientFields, setIngredientFields] = useState(initialIngredientFields);
  const [directionFields, setDirectionFields] = useState(initialDirectionFields);

  const [ingredients, setIngredients] = useState([]);
  const [directions, setDirections] = useState([]);

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleDirectionChange = (index, value) => {
    const newDirections = [...directions];
    newDirections[index] = value;
    setDirections(newDirections);
  };

  const handlePhotoChange = (e) => {
    previewPhoto(e);
  };

  const addIngredientField = (e) => {
    e.preventDefault();

    const newIngredientFields = [...ingredientFields, { placeholder: null }];
    setIngredientFields(newIngredientFields);
  };

  const removeIngredientField = (index) => {
    const newIngredientFields = ingredientFields.filter((_, i) => i !== index);
    const ingredientValues = [...ingredients];
    ingredientValues[index] = "";
    setIngredients(ingredientValues);
    setIngredientFields(newIngredientFields);
  };

  const addDirectionField = (e) => {
    e.preventDefault();

    const newDirectionFields = [
      ...directionFields,
      { placeholder: null, stepNumber: directionFields.length + 1 },
    ];

    setDirectionFields(newDirectionFields);
  };

  const removeDirectionField = (stepNumber) => {
    const newDirections = directionFields
      .filter((direction) => direction.stepNumber !== stepNumber)
      .map((direction, i) => ({
        ...direction,
        stepNumber: i + 1,
      }));

    const directionValues = [...directions];
    directionValues[stepNumber] = "";
    setDirections(directionValues);
    setDirectionFields(newDirections);
  };

  return (
    <main>
      <div className="page-container">
        <header className="recipe-header">
          <h1>Add a Recipe</h1>
          <p>
            Uploading personal recipes is easy! Share with your friends, family or the community.
          </p>
        </header>

        <form encType="multipart/form-data">
          <fieldset className="form-section recipe-details">
            <legend style={{ display: "none" }}>Recipe title and description</legend>

            <div className="inputs">
              <div className="form-input">
                <label htmlFor="title">Recipe Title</label>
                <input type="text" name="title" id="title" placeholder="Give your recipe a title" />
              </div>

              <div className="form-input">
                <label htmlFor="description">Description</label>
                <textarea
                  rows="5"
                  cols="10"
                  name="description"
                  id="description"
                  placeholder="Share the story behind your recipe and what makes it special."
                ></textarea>
              </div>
            </div>

            <div className="form-input">
              <label htmlFor="photo">Photo (optional)</label>
              <input
                style={{
                  minHeight: "14.5em",
                  background: "url(/src/images/recipe-placeholder.png) center",
                }}
                type="file"
                name="photo"
                id="photo"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </div>
          </fieldset>

          <fieldset className="form-section ingredients">
            <legend>
              <p className="legend-title">Ingredients</p>
            </legend>
            <p>
              Enter one ingredient per line. Include the quantity (i.e. cups, tablespoons) and any
              special preparation (i.e. sifted, softened, chopped).
            </p>

            {ingredientFields.map(({ placeholder }, index) => (
              <div key={index} className="form-input">
                <IngredientField
                  placeholder={placeholder}
                  value={ingredients[index]}
                  onChange={(value) => handleIngredientChange(index, value)}
                >
                  <RemoveButton removeItem={() => removeIngredientField(index)} />
                </IngredientField>
              </div>
            ))}

            <button className="add-btn" onClick={addIngredientField}>
              Add Ingredient
            </button>
          </fieldset>

          <fieldset className="form-section directions">
            <legend>
              <p className="legend-title">Directions</p>
            </legend>
            <p>
              Explain how to make your recipe, including oven temperatures, baking or cooking times,
              and pan sizes, etc.
            </p>

            {directionFields.map(({ placeholder, stepNumber }) => (
              <div key={stepNumber} className="form-input">
                <DirectionField
                  placeholder={placeholder}
                  stepNumber={stepNumber}
                  value={directions[stepNumber]}
                  onChange={(value) => handleDirectionChange(stepNumber, value)}
                >
                  <RemoveButton removeItem={() => removeDirectionField(stepNumber)} />
                </DirectionField>
              </div>
            ))}

            <button className="add-btn" onClick={addDirectionField}>
              Add Step
            </button>
          </fieldset>

          <fieldset className="form-section servings">
            <legend style={{ display: "none" }}>Servings</legend>
            <div className="form-input">
              <label htmlFor="servings">Servings</label>
              <input type="text" id="servings" placeholder="e.g. 8" />
            </div>
          </fieldset>

          <fieldset className="form-section recipe-cook-times">
            <legend style={{ display: "none" }}>Times</legend>
            <div className="form-input">
              <RecipeTimeField id="prep-time" label="Prep Time" />
            </div>
            <div className="form-input">
              <RecipeTimeField id="cook-time" label="Cook Time (optional)" />
            </div>
          </fieldset>

          <fieldset className="form-section notes">
            <legend>
              <p className="legend-title">Notes (optional)</p>
            </legend>
            <p>Add any helpful tips about ingredient substitutions, serving, or storage here.</p>

            <button className="add-btn">Add Note</button>
          </fieldset>

          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}
