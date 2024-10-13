export async function htmlToRecipe(pageUrl) {
  //using proxy
  const text = await (
    await fetch(`http://localhost:3000/proxy?url=${encodeURIComponent(pageUrl)}`)
  ).text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/html");

  const recipeName = getRecipeName(doc);
  const ingredients = getIngredients(doc);
  const directions = getDirections(doc);

  const recipe = {};
  recipe.recipeName = recipeName;
  recipe.ingredients = ingredients;
  recipe.directions = directions;

  if (
    recipe.recipeName === "" ||
    recipe.ingredients.length === 0 ||
    recipe.directions.length === 0
  ) {
    throw new Error();
  }

  return recipe;
}

function getRecipeName(doc) {
  const getFirstValidName = (selectors) => {
    const recipeNames = Array.from(doc.querySelectorAll(selectors.join(", "))).map(
      (tag) => tag.textContent
    );
    return recipeNames.find((name) => name);
  };

  const headerNames = getFirstValidName(["h1", "h2"]);
  if (headerNames) return headerNames;

  const classNames = [".recipe-title", ".recipe-name", ".entry-title"];
  const classBasedNames = getFirstValidName(classNames);
  if (classBasedNames) return classBasedNames;

  return "";
}

function extractElements(doc, selectors) {
  const results = [];
  selectors.forEach((selector) => {
    const elements = doc.querySelectorAll(selector);
    elements.forEach((el) => {
      results.push(el.innerText.trim());
    });
  });
  return results;
}

function extractFromHeaders(doc, headerText, contentSelectors) {
  const results = [];
  const sectionHeaders = Array.from(doc.querySelectorAll("h2, h3, h4")).filter((header) =>
    new RegExp(headerText, "i").test(header.innerText)
  );

  sectionHeaders.forEach((header) => {
    let container = header.nextElementSibling;

    while (
      container &&
      !(
        container.tagName === "UL" ||
        container.tagName === "OL" ||
        container.tagName === "DIV" ||
        container.tagName === "P"
      )
    ) {
      const deepElements = container.querySelectorAll(contentSelectors);

      if (deepElements.length > 0) {
        deepElements.forEach((el) => {
          results.push(el.innerText.trim());
        });
        break;
      }

      container = container.nextElementSibling;
    }
  });

  return results;
}

function getIngredients(doc) {
  const listSelectors = [
    "ul[class*='ingredients'] li",
    "ul[class*='recipe-ingredients'] li",
    "ul[class*='ingredient-list'] li",
    "ul[class*='ingredient-item'] li",
    "ul[class*='recipe__ingredients'] li",
    "ul[class*='entry-ingredients'] li",
    "ol[class*='ingredients'] li",
    "ol[class*='recipe-ingredients'] li",
    "ol[class*='ingredient-list'] li",
    "ol[class*='ingredient-item'] li",
  ];

  const fallbackSelectors = [
    "div[class*='ingredients'] p",
    "div[class*='recipe-ingredients'] p",
    "div[class*='ingredient-list'] p",
    "div[class*='ingredient-item'] p",
    "div[class*='ingredients'] span",
    "div[class*='ingredient-item'] span",
    "p[class*='ingredients']",
    "p[class*='recipe-ingredients']",
    "span[class*='ingredients']",
    "span[class*='ingredient']",
  ];

  let ingredients = extractElements(doc, listSelectors);

  if (ingredients.length === 0) {
    ingredients = extractElements(doc, fallbackSelectors);
  }

  if (ingredients.length === 0) {
    ingredients = extractFromHeaders(doc, "ingredients", "ul li, ol li, p, span");
  }

  const uniqueIngredients = [...new Set(ingredients)].filter(Boolean);

  console.log(uniqueIngredients);
  return uniqueIngredients;
}

function getDirections(doc) {
  const listSelectors = [
    "ol[class*='instructions'] li",
    "ol[class*='steps'] li",
    "ul[class*='instructions'] li",
    "ul[class*='steps'] li",
    "ol[class*='recipe-directions'] li",
    "ul[class*='recipe-directions'] li",
    "ol[class*='instructions'] li p",
    "ol[class*='steps'] li p",
    "ul[class*='instructions'] li p",
    "ul[class*='steps'] li p",
    "ol[class*='recipe-directions'] li p",
    "ul[class*='recipe-directions'] li p",
    "ol[class*='instructions'] li p",
    "ol[class*='steps'] li p",
    "ul[class*='instructions'] li p",
    "ul[class*='steps'] li p",
    "ol[class*='recipe-directions'] li p",
    "ul[class*='recipe-directions'] li p",
  ];

  const fallbackSelectors = [
    "div[class*='instructions'] p",
    "div[class*='steps'] p",
    "div[class*='recipe-directions'] p",
    "p[class*='instructions']",
    "p[class*='steps']",
    "p[class*='recipe-directions']",
    "div[class*='instructions'] span",
    "div[class*='steps'] span",
  ];

  let directions = extractElements(doc, listSelectors);

  if (directions.length === 0) {
    directions = extractElements(doc, fallbackSelectors);
  }

  if (directions.length === 0) {
    directions = extractFromHeaders(doc, "instructions|directions|steps", "ul li, ol li, p, span");
  }

  const uniqueDirections = [...new Set(directions)].filter(Boolean);

  console.log(uniqueDirections);
  return uniqueDirections;
}
