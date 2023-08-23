export default function IngredientField({ placeholder, children, onChange, value }) {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="ingredient-field">
      <label htmlFor="ingredient" className="visually-hidden">
        Add Ingredient
      </label>
      <input
        type="text"
        id="ingredient"
        value={value || ""}
        placeholder={placeholder || "Add another ingredient"}
        onChange={handleInputChange}
      />
      {children}
    </div>
  );
}
