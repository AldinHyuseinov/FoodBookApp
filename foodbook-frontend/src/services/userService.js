import { sendFormData } from "../utils/fetchData";

const API_URL = "http://localhost:8000/api/users";

export async function loginUser(email, password) {
  const response = await fetch(
    `${API_URL}/login`,
    getRequestOptions({ email, password }, "POST", false)
  );

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

  location.href = "/?login-success=true";
}

export async function registerUser(email, password) {
  const response = await fetch(
    `${API_URL}/register`,
    getRequestOptions({ email, password }, "POST", false)
  );

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
  await sendFormData(userData, "PATCH", `${API_URL}/user/public-info/update`);
}

export async function updateUserPersonalInfo(userData) {
  const response = await fetch(
    `${API_URL}/user/personal-info/update`,
    getRequestOptions(userData, "PATCH", true)
  );

  if (response.status === 400) {
    throw new Error(JSON.stringify(await response.json()));
  }
}

export async function getPublicInfo() {
  return await (await fetch(`${API_URL}/user/public-info`, getAuthHeader())).json();
}

export async function getPersonalInfo() {
  return await (await fetch(`${API_URL}/user/personal-info`, getAuthHeader())).json();
}

export async function getUserPicture() {
  const response = await fetch(`${API_URL}/user/public-info/picture`, getAuthHeader());

  if (response.status !== 404) {
    return await response.json();
  }
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
  }

  return userData;
}

export function setUserData(data) {
  localStorage.setItem("userData", JSON.stringify(data));
}

export function clearUserData() {
  localStorage.removeItem("userData");
}

function getRequestOptions(data, method, needsAuth) {
  const requestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  if (needsAuth) {
    requestOptions.headers["Authorization"] = getAuthHeader().headers.Authorization;
  }

  return requestOptions;
}

function getAuthHeader() {
  const userData = getUserData();

  return {
    headers: {
      Authorization: `Bearer ${userData.authorization}`,
    },
  };
}
