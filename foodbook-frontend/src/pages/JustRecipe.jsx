import "../assets/css/recipe_extract/just-recipe.css";
import "../assets/css/form/form.css";
import { htmlToRecipe } from "../services/recipeSummaryService";
import { useRef, useState } from "react";
import RecipeSummary from "../components/just_recipe/RecipeSummary";
import RecipeSummaryError from "../components/just_recipe/RecipeSummaryError";
import useLoading from "../hooks/useLoading";
import Loading from "../components/Loading";

export default function JustRecipe() {
  const pageUrl = useRef("");
  const [getSummary, isLoading] = useLoading(htmlToRecipe);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await getSummary(pageUrl.current.value);
      setSummary(res);
      setError(false);
    } catch (err) {
      setError(true);
      setSummary(null);
    }

    pageUrl.current.value = "";
  };

  return (
    <main>
      <header>
        <h1>Clear away the clutter on any recipe site.</h1>
        <p>Get the instructions without the fluff. No more popups, ads, or life stories.</p>
      </header>

      <form onSubmit={handleSubmit}>
        <label htmlFor="pageUrl" className="visually-hidden">
          Page Url
        </label>
        <input type="text" placeholder="Paste a recipe URL" ref={pageUrl} />
        <button type="submit">Get Recipe</button>
      </form>

      {isLoading ? <Loading /> : summary && <RecipeSummary summary={summary} />}
      {error && <RecipeSummaryError />}
    </main>
  );
}
