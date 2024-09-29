import { useParams } from "react-router";
import { getRecipe } from "../services/recipeService";
import { useEffect, useState } from "react";
import useLoading from "../hooks/useLoading";
import Loading from "../components/Loading";
import useTitle from "../hooks/useTitle";
import formatDate from "../utils/formatDate";
import calculateTotalTime from "../utils/calculateTotalTime";
import RecipeDetail from "../components/RecipeDetail";
import "../assets/css/recipe-page.css";

export default function RecipePage() {
  const { id } = useParams();
  const [findRecipe, isLoading] = useLoading(getRecipe);
  const [recipe, setRecipe] = useState({
    description: "",
    dateAdded: "",
    photos: [],
    ingredients: [],
    directions: [],
    servings: 0,
    prepTime: "",
    cookTime: "",
    notes: [],
    addedBy: "",
  });

  useTitle(`${recipe.title} | FoodBook`);

  useEffect(() => {
    const fetchRecipe = async () => {
      const fetchedRecipe = await findRecipe(id);
      setRecipe(fetchedRecipe);
    };
    fetchRecipe();
  }, []);

  return (
    <main>
      {isLoading ? (
        <Loading />
      ) : (
        <article>
          <header className="page-header">
            <h1>{recipe.title}</h1>
            {recipe.rating > 0 ? <p>{recipe.rating}</p> : <p>No ratings yet</p>}
            <p className="description">{recipe.description}</p>

            <div className="header-items">
              <p className="added-by-user">
                Recipe by <span>{recipe.addedBy}</span>
              </p>
              <p className="date">Added on {formatDate(recipe.dateAdded)}</p>
            </div>
          </header>

          <section className="pictures-section">
            <div className="media">
              <img
                src={
                  recipe.photos.length > 0
                    ? recipe.photos[0]
                    : "/src/assets/images/recipe-placeholder.png"
                }
                alt={recipe.photos.length > 0 ? `Picture of ${recipe.title}` : "Recipe"}
              />
            </div>
          </section>

          <section className="recipe-details-section">
            <RecipeDetail detailLabel="Prep Time:" detailValue={recipe.prepTime} />
            <RecipeDetail detailLabel="Cook Time:" detailValue={recipe.cookTime} />
            <RecipeDetail
              detailLabel="Total Time:"
              detailValue={calculateTotalTime(recipe.prepTime, recipe.cookTime)}
            />
            <RecipeDetail detailLabel="Servings:" detailValue={recipe.servings} />
          </section>

          <section className="ingredients-section">
            <h2>Ingredients</h2>
            <ul>
              {recipe.ingredients.map(({ id, ingredientInfo }) => (
                <li key={id}>{ingredientInfo}</li>
              ))}
            </ul>
          </section>

          <section className="directions-section">
            <h2>Directions</h2>
            <ul>
              {recipe.directions.map(({ id, explanation, stepNumber }) => (
                <li key={id}>
                  <p className="step-number">Step {stepNumber}</p>
                  <p className="direction">{explanation}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="notes-section">
            <ul>
              {recipe.notes.map(({ id, title, noteText }) => (
                <li key={id}>
                  <h2>{title}</h2>
                  <p className="note-text">{noteText}</p>
                </li>
              ))}
            </ul>
          </section>
        </article>
      )}
    </main>
  );
}
