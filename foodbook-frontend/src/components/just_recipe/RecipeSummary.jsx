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
            <li>
              <p>1</p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident, eveniet!
            </li>
            <li>
              <p>2</p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident, eveniet!
            </li>
            <li>
              <p>3</p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident, eveniet!
            </li>
            <li>
              <p>4</p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident, eveniet!
            </li>
            <li>
              <p>5</p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident, eveniet!
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
