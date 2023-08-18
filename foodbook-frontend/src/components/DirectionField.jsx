import RemoveIngredientButton from "./RemoveIngredientButton";

export default function DirectionField({ placeholder, stepNumber }) {
  return (
    <div className="direction-field">
      <label htmlFor="direction">Step {stepNumber}</label>
      <textarea id="direction" placeholder={placeholder || "Add another step"}></textarea>
      <RemoveIngredientButton />
    </div>
  );
}
