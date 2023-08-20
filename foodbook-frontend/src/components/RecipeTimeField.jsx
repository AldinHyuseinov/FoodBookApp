export default function RecipeTimeField({ id, label, onTimeChange, onUnitChange }) {
  const handleTimeChange = (e) => {
    onTimeChange(e.target.value);
  };

  const handleUnitChange = (e) => {
    onUnitChange(e.target.value);
  };
  
  return (
    <div className="time-field">
      <label htmlFor={id}>{label}</label>
      <input type="number" id={id} placeholder="0" onChange={handleTimeChange} />
      <select name={id} id={`${id}-unit`} onChange={handleUnitChange}>
        <option value="min">minutes</option>
        <option value="hours">hours</option>
        <option value="days">days</option>
      </select>
    </div>
  );
}
