const API_URL = "http://localhost:8000/api/recipes";

export async function getAllRecipes() {
  return (await fetch(API_URL)).json();
}
