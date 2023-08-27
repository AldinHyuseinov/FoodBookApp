import { useEffect, useState } from "react";
import { getAllRecipes } from "../services/recipeService";
import "../assets/css/home.css";
import Loading from "../components/Loading";
import useTitle from "../hooks/useTitle";
import useLoading from "../hooks/useLoading";

export default function HomePage() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [recipes, isLoading] = useLoading(getAllRecipes);
  useTitle("FoodBook | All Recipes");

  useEffect(() => {
    const fetchRecipes = async () => {
      const fetchedRecipes = await recipes();
      setAllRecipes(fetchedRecipes);
    };
    fetchRecipes();
  }, []);

  return (
    <main>
      <h1>All Recipes</h1>

      <div className="cards">
        {isLoading && <Loading />}
        {allRecipes.map(({ id, title, picture, rating, tags }) => (
          <div key={id} className="card" onClick={() => (location.href = `/recipe/${id}`)}>
            <div className="media">
              <img src={picture ? picture : "./assets/src/images/recipe-placeholder.png"} alt="Recipe" />
            </div>
            <p className="tag">{tags.length > 0 ? tags[0] : "Recipes"}</p>
            <h2>{title}</h2>
            {rating > 0 && <div>{rating}</div>}
          </div>
        ))}
      </div>
    </main>
  );
}
