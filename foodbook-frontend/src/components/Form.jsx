import { useRef, useState } from "react";
import { loginUser, registerUser } from "../services/userService";

export default function Form({ title, buttonLabel, children }) {
  const [passwordShown, setShownPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const email = useRef();
  const password = useRef();

  const handleShowPassword = (e) => {
    e.preventDefault();

    if (passwordShown) {
      setShownPassword(false);
    } else {
      setShownPassword(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === "Log in") {
      try {
        await loginUser(email.current.value, password.current.value);
        setError(false);
        setErrorMessage("");
      } catch (err) {
        setError(true);
        setErrorMessage("Invalid username or password.");
      }
      clearFields([email.current, password.current]);
      return;
    }

    try {
      await registerUser(email.current.value, password.current.value);
      setError(false);
      setErrorMessage("");
    } catch (err) {
      setError(true);
      setErrorMessage(err.message);
    }
    clearFields([email.current, password.current]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{title}</h1>
      {error && <ErrorMessage message={errorMessage} />}
      <div className="form-input">
        <label htmlFor="email">Email Address</label>
        <input type="email" name="email" id="email" placeholder="Enter your email" ref={email} />
      </div>

      <div className="form-input">
        <label htmlFor="password">Password</label>
        <div className="password-field">
          <input
            type={passwordShown ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Enter your password"
            maxLength="30"
            ref={password}
          />
          <button onClick={handleShowPassword}>Show</button>
        </div>
      </div>

      <button type="submit">{buttonLabel}</button>

      {children}
    </form>
  );
}

function ErrorMessage({ message }) {
  const messageParts = message.split(".");

  return (
    <div>
      {messageParts.map((m, index) => (
        <p key={index} style={{ color: "darkred", padding: 0 }}>
          {m}
        </p>
      ))}
    </div>
  );
}

function clearFields(fields) {
  fields.forEach((field) => (field.value = ""));
}
