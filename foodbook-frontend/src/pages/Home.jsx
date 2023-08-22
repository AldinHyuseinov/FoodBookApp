import { useEffect, useState } from "react";
import { getAllRecipes } from "../services/recipeService";
import "../css/home.css";
import Loading from "../components/Loading";

export default function HomePage() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getRecipes = async () => {
      setLoading(true);
      const recipes = await getAllRecipes();
      setAllRecipes(recipes);
      setLoading(false);
    };
    getRecipes();
  }, []);

  return (
    <main>
      <h1>All Recipes</h1>

      <div className="cards">
        {isLoading && <Loading />}
        {allRecipes.map(({ id, title, picture, rating, tags }) => (
          <div key={id} className="card">
            <div className="media">
              <img src={picture ? picture : "./src/images/recipe-placeholder.png"} alt="Recipe" />
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
