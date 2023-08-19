export default function IngredientField({ placeholder, children, onChange, value }) {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="ingredient-field">
      <input
        type="text"
        value={value}
        placeholder={placeholder || "Add another ingredient"}
        onChange={handleInputChange}
      />
      {children}
    </div>
  );
}
