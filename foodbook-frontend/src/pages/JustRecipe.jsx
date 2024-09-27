import "../assets/css/recipe_extract/just-recipe.css";
import "../assets/css/form/form.css";
import { htmlToRecipe } from "../utils/extractRecipe";
import { useRef } from "react";

export default function JustRecipe() {
  const pageUrl = useRef("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(pageUrl.current.value);
    await htmlToRecipe(pageUrl.current.value);
  };

  return (
    <main>
      <header>
        <h1>Clear away the clutter on any recipe site.</h1>
        <p>Get the instructions without the fluff. No more popups, ads or life stories.</p>
      </header>

      <form onSubmit={handleSubmit}>
        <label htmlFor="pageUrl" className="visually-hidden">
          Page Url
        </label>
        <input type="text" placeholder="Paste a recipe URL" ref={pageUrl} />
        <button type="submit">Get Recipe</button>
      </form>
    </main>
  );
}
