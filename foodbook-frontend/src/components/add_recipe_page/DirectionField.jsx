export default function DirectionField({ placeholder, stepNumber, children, onChange, value }) {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="direction-field">
      <label htmlFor={`direction-${stepNumber}`}>Step {stepNumber}</label>
      <textarea
        className="direction"
        id={`direction-${stepNumber}`}
        value={value || ""}
        placeholder={placeholder || "Add another step"}
        onChange={handleInputChange}
      ></textarea>
      {children}
    </div>
  );
}
