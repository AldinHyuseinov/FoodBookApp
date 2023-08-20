import DirectionField from "../components/DirectionField";
import IngredientField from "../components/IngredientField";
import previewPhoto from "../utils/previewPhotoUtil";
import "../css/add-recipe-form.css";
import "../css/form.css";
import RecipeTimeField from "../components/RecipeTimeField";
import React, { useRef, useState } from "react";
import RemoveButton from "../components/RemoveButton";
import { addRecipe } from "../services/recipeService";

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

  const title = useRef("");
  const description = useRef("");
  const [photo, setPhoto] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [directions, setDirections] = useState([]);
  const servings = useRef("");
  const [prepTime, setPrepTime] = useState({ time: 0, unit: "minutes" });
  const [cookTime, setCookTime] = useState({ time: 0, unit: "minutes" });
  const [notesAndTitles, setNotesAndTitles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title.current.value);
    formData.append("description", description.current.value);

    if (photo) {
      formData.append("photo", photo);
    }
    formData.append("ingredients", JSON.stringify(ingredients.filter((ingredient) => ingredient)));
    formData.append("directions", JSON.stringify(directions.filter((direction) => direction)));
    formData.append("servings", servings.current.value);
    formData.append("prepTime", `${prepTime.time} ${prepTime.unit}`);
    formData.append("cookTime", `${cookTime.time} ${prepTime.unit}`);
    formData.append(
      "notes",
      JSON.stringify(
        notesAndTitles.filter(({ title, noteText }) => title !== "" && noteText !== "")
      )
    );

    try {
      await addRecipe(formData);
    } catch (err) {
      console.log(err.message);
    }
  };

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

  const handleNoteChange = (e, index, input) => {
    const newNotesAndTitles = [...notesAndTitles];
    const noteToChange = newNotesAndTitles[index];
    noteToChange[input] = e.target.value;
    setNotesAndTitles(newNotesAndTitles);
  };

  const handleTimeChange = (value, input, timeFieldId) => {
    if (timeFieldId === "prep-time") {
      const newPrepTime = { ...prepTime };
      newPrepTime[input] = input === "time" ? Number(value) : value;
      setPrepTime(newPrepTime);

      return;
    }

    const newCookTime = { ...cookTime };
    newCookTime[input] = input === "time" ? Number(value) : value;
    setCookTime(newCookTime);
  };

  const handlePhotoChange = (e) => {
    previewPhoto(e);
    setPhoto(e.target.files[0]);
  };

  const addIngredientField = (e) => {
    e.preventDefault();

    const newIngredientFields = [...ingredientFields, { placeholder: null }];
    setIngredientFields(newIngredientFields);
  };

  const removeIngredientField = (index) => {
    const newIngredientFields = ingredientFields.filter((_, i) => i !== index);
    const ingredientValues = [...ingredients];

    if (ingredientValues.length >= 1) {
      ingredientValues[index] = "";
      setIngredients(ingredientValues);
    }

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

    if (directionValues.length >= 1) {
      directionValues[stepNumber] = "";
      setDirections(directionValues);
    }
    setDirectionFields(newDirections);
  };

  const addNoteField = (e) => {
    e.preventDefault();

    const newNotesAndTitles = [...notesAndTitles, { title: "", noteText: "" }];
    setNotesAndTitles(newNotesAndTitles);
  };

  const removeNoteField = (index) => {
    const newNotesAndTitles = notesAndTitles.filter((_, i) => i !== index);
    setNotesAndTitles(newNotesAndTitles);
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

        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <fieldset className="form-section recipe-details">
            <legend style={{ display: "none" }}>Recipe title and description</legend>

            <div className="inputs">
              <div className="form-input">
                <label htmlFor="title">Recipe Title</label>
                <input
                  ref={title}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Give your recipe a title"
                />
              </div>

              <div className="form-input">
                <label htmlFor="description">Description</label>
                <textarea
                  ref={description}
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
              <input ref={servings} type="text" id="servings" placeholder="e.g. 8" />
            </div>
          </fieldset>

          <fieldset className="form-section recipe-cook-times">
            <legend style={{ display: "none" }}>Times</legend>
            <div className="form-input">
              <RecipeTimeField
                id="prep-time"
                label="Prep Time"
                onTimeChange={(value) => handleTimeChange(value, "time", "prep-time")}
                onUnitChange={(value) => handleTimeChange(value, "unit", "prep-time")}
              />
            </div>
            <div className="form-input">
              <RecipeTimeField
                id="cook-time"
                label="Cook Time (optional)"
                onTimeChange={(value) => handleTimeChange(value, "time", "cook-time")}
                onUnitChange={(value) => handleTimeChange(value, "unit", "cook-time")}
              />
            </div>
          </fieldset>

          <fieldset className="form-section notes">
            <legend>
              <p className="legend-title">Notes (optional)</p>
            </legend>
            <p>Add any helpful tips about ingredient substitutions, serving, or storage here.</p>

            {notesAndTitles.map(({ title, noteText }, index) => (
              <React.Fragment key={index}>
                <div className="form-input">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    value={title || ""}
                    id="title"
                    placeholder="e.g. Cook's Tip"
                    onChange={(e) => handleNoteChange(e, index, "title")}
                  />
                </div>

                <div className="form-input">
                  <div className="note-field">
                    <label htmlFor="note">Note</label>
                    <textarea
                      type="text"
                      value={noteText || ""}
                      id="note"
                      placeholder="e.g. Try not to overmix the batter. Fold gently"
                      onChange={(e) => handleNoteChange(e, index, "noteText")}
                    />
                    <RemoveButton removeItem={() => removeNoteField(index)} />
                  </div>
                </div>
              </React.Fragment>
            ))}

            <button className="add-btn" onClick={addNoteField}>
              Add Note
            </button>
          </fieldset>

          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}
