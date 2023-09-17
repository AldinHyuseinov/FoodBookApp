import { sendFormData } from "../utils/fetchData";

const API_URL = "http://localhost:8000/api/recipes";

export async function getAllRecipes() {
  return (await fetch(API_URL)).json();
}

export async function addRecipe(recipeData) {
  await sendFormData(recipeData, "POST", API_URL);

  location.href = "/";
}

export async function getRecipe(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (response.status === 404) {
    location.href = "/404";
    return;
  }
  return response.json();
}
