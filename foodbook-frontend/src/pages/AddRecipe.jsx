import DirectionField from "../components/DirectionField";
import IngredientField from "../components/IngredientField";
import previewPhoto from "../utils/previewPhotoUtil";
import "../css/add-recipe-form.css";
import "../css/form.css";
import RecipeTimeField from "../components/RecipeTimeField";
import React, { useRef, useState } from "react";
import RemoveButton from "../components/RemoveButton";
import { addRecipe } from "../services/recipeService";
import ErrorBox from "../components/ErrorBox";
import Modal from "../components/Modal";
import useTitle from "../hooks/useTitle";

export default function AddRecipePage() {
  useTitle("Submit a Recipe | FoodBook");

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
  const [errors, setErrors] = useState({});

  const [modal, setModal] = useState({ isOpen: false, itemType: "" });
  const [modalItems, setModalItems] = useState({});
  const [modalIngredientText, setModalIngredientText] = useState("");
  const [modalDirectionText, setModalDirectionText] = useState("");

  const openModal = (items) => {
    if (items === "ingredients") {
      setModal({ isOpen: true, itemType: "ingredients" });
      setModalItems({
        title: "Add multiple ingredients",
        description:
          "Paste your ingredient list here. Add one ingredient per line. Include the quantity (i.e. cups, tablespoons) and any special preparation (i.e. sifted, softened, chopped).",
        placeholder: `Example\n${initialIngredientFields
          .map((field) => field.placeholder)
          .join("\n")}`,
      });
      return;
    }

    setModal({ isOpen: true, itemType: "directions" });
    setModalItems({
      title: "Add multiple steps",
      description:
        "Enter your direction steps here. Add one step per line. Press ‘enter’ or ‘return’ to start a new step line. Include oven temperatures, baking or cooking times, and pan sizes, etc.",
      placeholder:
        "Example:\nCombine all dry ingredients in a large bowl. Set aside.\nCombine all wet ingredients in a small bowl. Fold gently in with the dry ingredients",
    });
  };

  const closeModal = (e) => {
    if (e) {
      e.preventDefault();
    }
    setModal({ isOpen: false, itemType: "" });
  };

  const handleModalChange = (value, title) => {
    if (title === "Add multiple ingredients") {
      setModalIngredientText(value);
      return;
    }
    setModalDirectionText(value);
  };

  const handleModalSubmit = (title) => {
    if (title === "Add multiple ingredients") {
      const newIngredients = ingredients.filter((ingredient) => ingredient);
      const ingredientsFromModal = modalIngredientText.split("\n");

      ingredientsFromModal.forEach((item) => newIngredients.push(item));
      setIngredients(newIngredients);
      setModalIngredientText("");

      if (ingredientFields.length < newIngredients.length) {
        addIngredientField(null, newIngredients.length - ingredientFields.length);
      }
      closeModal();

      return;
    }

    const newDirections = directions.filter((direction) => direction);
    const directionsFromModal = modalDirectionText.split("\n");

    directionsFromModal.forEach((item) => newDirections.push(item));
    setDirections(newDirections);
    setModalDirectionText("");

    if (directionFields.length < newDirections.length) {
      addDirectionField(null, newDirections.length - directionFields.length);
    }
    closeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title.current.value);
    formData.append("description", description.current.value);

    if (photo) {
      formData.append("photo", photo);
    }

    const filteredIngredients = ingredients.filter((ingredient) => ingredient);
    if (filteredIngredients.length > 0) {
      formData.append("ingredients", JSON.stringify(filteredIngredients));
    }

    const filteredDirections = directions.filter((direction) => direction);
    if (filteredDirections.length > 0) {
      formData.append("directions", JSON.stringify(filteredDirections));
    }

    formData.append("servings", Number(servings.current.value));

    const prepTimeString = `${prepTime.time} ${prepTime.unit}`;

    if (prepTimeString !== "0 minutes") {
      formData.append("prepTime", prepTimeString);
    }

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
      setErrors(JSON.parse(err.message));
      window.scrollTo(0, 0);
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

  const addIngredientField = (e, count) => {
    if (e) {
      e.preventDefault();
    }

    const newIngredientFields = [...ingredientFields, { placeholder: null }];

    if (count) {
      for (let index = 0; index < count - 1; index++) {
        newIngredientFields.push({ placeholder: null });
      }
    }

    setIngredientFields(newIngredientFields);
  };

  const removeIngredientField = (index) => {
    const newIngredientFields = ingredientFields.filter((_, i) => i !== index);
    const ingredientValues = [...ingredients];

    if (ingredientValues.length >= 1) {
      ingredientValues.splice(index, 1);
      setIngredients(ingredientValues);
    }

    setIngredientFields(newIngredientFields);
  };

  const addDirectionField = (e, count) => {
    if (e) {
      e.preventDefault();
    }

    const newDirectionFields = [
      ...directionFields,
      { placeholder: null, stepNumber: directionFields.length + 1 },
    ];

    if (count) {
      for (let index = 0; index < count - 1; index++) {
        newDirectionFields.push({
          placeholder: null,
          stepNumber: directionFields.length + index + 2,
        });
      }
    }

    setDirectionFields(newDirectionFields);
  };

  const removeDirectionField = (index) => {
    const newDirections = directionFields
      .filter((_, i) => i !== index)
      .map((direction, i) => ({
        ...direction,
        stepNumber: i + 1,
      }));

    const directionValues = [...directions];

    if (directionValues.length >= 1) {
      directionValues.splice(index, 1);
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
        {Object.keys(errors).length > 0 && (
          <ErrorBox message="Please fill out the form and correct the errors!" />
        )}
        <header className="recipe-header">
          <h1>Add a Recipe</h1>
          <p>
            Uploading personal recipes is easy! Share with your friends, family or the community.
          </p>
        </header>

        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <fieldset className="form-section recipe-details">
            <legend className="visually-hidden">Recipe title and description</legend>

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
                {errors.hasOwnProperty("title") && <ErrorBox message={errors["title"]} />}
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
                {errors.hasOwnProperty("description") && (
                  <ErrorBox message={errors["description"]} />
                )}
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
              {errors.hasOwnProperty("photo") && <ErrorBox message={errors["photo"]} />}
            </div>
          </fieldset>

          <fieldset className="form-section ingredients">
            {errors.hasOwnProperty("ingredients") && <ErrorBox message={errors["ingredients"]} />}
            <legend>
              <p className="legend-title">Ingredients</p>
            </legend>

            <div className="sub-titles">
              <p>
                Enter one ingredient per line. Include the quantity (i.e. cups, tablespoons) and any
                special preparation (i.e. sifted, softened, chopped).
              </p>
              <p>
                Enter ingredients below or{" "}
                <a role="button" onClick={() => openModal("ingredients")}>
                  Add several at once
                </a>
              </p>
            </div>

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
            {errors.hasOwnProperty("directions") && <ErrorBox message={errors["directions"]} />}
            <legend>
              <p className="legend-title">Directions</p>
            </legend>

            <div className="sub-titles">
              <p>
                Explain how to make your recipe, including oven temperatures, baking or cooking
                times, and pan sizes, etc.
              </p>
              <p>
                Enter directions below or{" "}
                <a role="button" onClick={() => openModal("directions")}>
                  Add several at once
                </a>
              </p>
            </div>

            {directionFields.map(({ placeholder, stepNumber }, index) => (
              <div key={index} className="form-input">
                <DirectionField
                  placeholder={placeholder}
                  stepNumber={stepNumber}
                  value={directions[index]}
                  onChange={(value) => handleDirectionChange(index, value)}
                >
                  <RemoveButton removeItem={() => removeDirectionField(index)} />
                </DirectionField>
              </div>
            ))}

            <button className="add-btn" onClick={addDirectionField}>
              Add Step
            </button>
          </fieldset>

          <fieldset className="form-section servings">
            <legend className="visually-hidden">Servings</legend>
            <div className="form-input">
              <label htmlFor="servings">Servings</label>
              <input ref={servings} type="number" id="servings" placeholder="e.g. 8" />
              {errors.hasOwnProperty("servings") && <ErrorBox message={errors["servings"]} />}
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
              {errors.hasOwnProperty("prepTime") && <ErrorBox message={errors["prepTime"]} />}
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

      {modal.isOpen && (
        <Modal
          title={modalItems["title"]}
          description={modalItems["description"]}
          placeholder={modalItems["placeholder"]}
          isOpen={modal.isOpen}
          onClose={closeModal}
          onChange={(value, title) => handleModalChange(value, title)}
          onSubmit={(title) => handleModalSubmit(title)}
          value={modal.itemType === "ingredients" ? modalIngredientText : modalDirectionText}
        />
      )}
    </main>
  );
}
