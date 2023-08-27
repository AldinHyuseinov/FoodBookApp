import { useParams } from "react-router";
import { getRecipe } from "../services/recipeService";
import { useEffect, useState } from "react";
import useLoading from "../hooks/useLoading";
import Loading from "../components/Loading";
import useTitle from "../hooks/useTitle";
import formatDate from "../utils/formatDate";
import calculateTotalTime from "../utils/calculateTotalTime";
import RecipeDetail from "../components/RecipeDetail";

export default function RecipePage() {
  const { id } = useParams();
  const [findRecipe, isLoading] = useLoading(getRecipe);
  const [recipe, setRecipe] = useState({});
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
      <article>
        {isLoading && <Loading />}
        <header className="page-header">
          <h1>{recipe.title}</h1>
          {recipe.rating > 0 ? <p>{recipe.rating}</p> : <p>No ratings yet</p>}
          <p>{recipe.description}</p>

          <div className="header-items">
            <p>Recipe by: {recipe.addedBy}</p>
            <p>Added on: {formatDate(recipe.dateAdded)}</p>
          </div>
        </header>

        <section className="pictures-section">
          <div className="media">
            <img
              src={
                recipe.photos && recipe.photos.length > 0
                  ? recipe.photos[0]
                  : "/src/assets/images/recipe-placeholder.png"
              }
              alt={
                recipe.photos && recipe.photos.length > 0 ? `Picture of ${recipe.title}` : "Recipe"
              }
            />
          </div>
        </section>

        <section className="recipe-details-section">
          <RecipeDetail detailLabel="Prep Time:" detailValue={recipe.prepTime} />
          <RecipeDetail detailLabel="Cook Time:" detailValue={recipe.cookTime} />
          <RecipeDetail
            detailLabel="Total Time:"
            detailValue={
              Object.keys(recipe).length > 0 && calculateTotalTime(recipe.prepTime, recipe.cookTime)
            }
          />
        </section>
      </article>
    </main>
  );
}
