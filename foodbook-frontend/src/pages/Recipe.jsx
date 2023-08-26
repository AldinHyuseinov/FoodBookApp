import { useParams } from "react-router";
import { getRecipe } from "../services/recipeService";
import { useEffect, useState } from "react";
import useLoading from "../hooks/useLoading";
import Loading from "../components/Loading";
import useTitle from "../hooks/useTitle";

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
        <h1>{recipe.title}</h1>
      </article>
    </main>
  );
}
