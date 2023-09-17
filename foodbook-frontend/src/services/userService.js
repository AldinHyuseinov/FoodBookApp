import { sendFormData } from "../utils/fetchData";

const API_URL = "http://localhost:8000/api/users";

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/login`, getRequestOptions(email, password));

  if (response.status === 401) {
    throw new Error("Invalid username or password.");
  }

  if (response.status === 500) {
    throw new Error("Internal server error.");
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

export async function updateUserPublicInfo(userData) {
  await sendFormData(userData, "PATCH", `${API_URL}/user-public-info/update`);
}

export function getUserData() {
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (userData) {
    const tokenExpirationDate = new Date(userData.tokenExpiration);
    const dateNow = new Date();

    if (dateNow >= tokenExpirationDate) {
      clearUserData();
      return null;
    }
  } else {
    location.href = "/auth/login";
    return null;
  }

  return userData;
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
