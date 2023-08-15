export default function Form({ title, buttonLabel, children }) {
  return (
    <form>
      <h1>{title}</h1>

      <div className="form-input">
        <label htmlFor="email">Email Address</label>
        <input type="email" name="email" id="email" placeholder="Enter your email" />
      </div>

      <div className="form-input">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" placeholder="Enter your password" />
      </div>

      <button type="submit">{buttonLabel}</button>

      {children}
    </form>
  );
}
