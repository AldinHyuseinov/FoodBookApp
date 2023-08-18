import RemoveIngredientButton from "./RemoveIngredientButton";

export default function IngredientField({ placeholder }) {
  return (
    <div className="ingredient-field">
      <input type="text" placeholder={placeholder || "Add another ingredient"} />
      <RemoveIngredientButton />
    </div>
  );
}
