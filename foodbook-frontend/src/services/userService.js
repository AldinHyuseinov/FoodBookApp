const API_URL = "http://localhost:8000/api/users";

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/login`, getRequestOptions(email, password));

  if (response.status === 401) {
    throw new Error();
  }

  const authHeader = response.headers.get("Authorization");
  const json = await response.json();

  const user = {
    email: json.email,
    authorization: authHeader,
    tokenExpiration: json.tokenExpiration,
  };

  setUserData(user);

  location.href = "/";
}

export async function registerUser(email, password) {
  const response = await fetch(`${API_URL}/register`, getRequestOptions(email, password));

  if (response.status === 400) {
    const err = await response.json();
    const messages = [];

    Object.keys(err).forEach((key) => {
      messages.push(`${err[key]}`);
    });

    throw new Error(messages.join(""));
  }

  location.href = "/auth/login";
}

export function getUserData() {
  return JSON.parse(localStorage.getItem("userData"));
}

export function setUserData(data) {
  localStorage.setItem("userData", JSON.stringify(data));
}

export function clearUserData() {
  localStorage.removeItem("userData");
}

function getRequestOptions(email, password) {
  const data = {
    email,
    password,
  };

  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
}
