import "../../assets/css/recipe_extract/recipe-summary.css";

export default function RecipeSummary({ summary }) {
  return (
    <div className="page-container">
      <header className="recipe-name">
        <h1>{summary.recipeName}</h1>
      </header>

      <main className="summary">
        <section className="ingredients">
          <header>
            <h2>Ingredients</h2>
          </header>

          <ul className="ingredient-list">
            {summary.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </section>

        <section className="directions">
          <header>
            <h2>Directions</h2>
          </header>

          <ul className="direction-list">
            {summary.directions.map((direction, i) => (
              <li key={i}>
                <p>{i + 1}</p>
                {direction}
              </li>
            ))}
          </ul>
        </section>
      </main>
      <p>May contain mistakes!</p>
    </div>
  );
}
