export default function IngredientField({ placeholder, children, onChange, value, index }) {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="ingredient-field">
      <label htmlFor={`ingredient-${index}`} className="visually-hidden">
        Add Ingredient
      </label>
      <input
        className="ingredient"
        type="text"
        id={`ingredient-${index}`}
        value={value || ""}
        placeholder={placeholder || "Add another ingredient"}
        onChange={handleInputChange}
      />
      {children}
    </div>
  );
}
