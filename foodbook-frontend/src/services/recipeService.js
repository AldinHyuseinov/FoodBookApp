import { getUserData } from "./userService";

const API_URL = "http://localhost:8000/api/recipes";

export async function getAllRecipes() {
  return (await fetch(API_URL)).json();
}

export async function addRecipe(recipeData) {
  const userData = getUserData();

  if (!userData) {
    location.href = "/auth/login";
    return;
  }

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userData.authorization}`,
    },
    body: recipeData,
  };

  const response = await fetch(API_URL, requestOptions);

  if (response.status === 400) {
    const err = await response.json();
    const messages = [];

    Object.keys(err).forEach((key) => {
      messages.push(`${err[key]}`);
    });

    throw new Error(messages.join(""));
  }

  // location.href = "/";
}
