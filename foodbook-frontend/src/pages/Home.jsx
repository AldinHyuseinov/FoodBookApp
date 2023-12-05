import { useEffect, useState } from "react";
import { getAllRecipes } from "../services/recipeService";
import "../assets/css/home_page/home.css";
import "../assets/css/home_page/home-media-queries.css";
import Loading from "../components/Loading";
import useTitle from "../hooks/useTitle";
import useLoading from "../hooks/useLoading";
import SuccessAlert from "../components/alerts/SuccessAlert";
import { useSearchParams } from "react-router-dom";

export default function HomePage() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [recipes, isLoading] = useLoading(getAllRecipes);
  const [searchParams] = useSearchParams();
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
      {searchParams.get("login-success") && <SuccessAlert message={"Login Successful. Welcome!"} />}
      {searchParams.get("recipe-added") && <SuccessAlert message={"Recipe Added!"} />}
      <h1>All Recipes</h1>

      <div className="cards">
        {isLoading && <Loading />}
        {allRecipes.map(({ id, title, picture, rating, tags }) => (
          <div
            key={id}
            className="card"
            tabIndex="0"
            onClick={() => (location.href = `/recipe/${id}`)}
          >
            <div className="media">
              <img
                src={picture ? picture : "./src/assets/images/recipe-placeholder.png"}
                alt={picture ? `Picture of ${title}` : "Recipe"}
              />
            </div>
            <div className="card-content">
              <p className="tag">{tags.length > 0 ? tags[0] : "Recipes"}</p>
              <h2>{title}</h2>
              {rating > 0 && <div>{rating}</div>}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
