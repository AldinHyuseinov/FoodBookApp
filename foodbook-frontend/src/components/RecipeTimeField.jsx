export default function RecipeTimeField({ id, label }) {
  return (
    <div className="time-field">
      <label htmlFor={id}>{label}</label>
      <input type="number" id={id} placeholder="0" />
      <select name={id} id={`${id}-unit`}>
        <option value="min">minutes</option>
        <option value="hours">hours</option>
        <option value="days">days</option>
      </select>
    </div>
  );
}
