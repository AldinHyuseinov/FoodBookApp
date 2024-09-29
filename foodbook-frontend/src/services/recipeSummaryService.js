export async function htmlToRecipe(pageUrl) {
  //using proxy
  const text = await (
    await fetch(`http://localhost:3000/proxy?url=${encodeURIComponent(pageUrl)}`)
  ).text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/html");

  const recipeName = getRecipeName(doc);
  const ingredients = getIngredients(doc);

  const recipe = {};
  recipe.recipeName = recipeName;
  recipe.ingredients = ingredients;

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

function getIngredients(doc) {
  const ingredients = [];

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

  listSelectors.forEach((selector) => {
    const elements = doc.querySelectorAll(selector);
    elements.forEach((el) => {
      ingredients.push(el.innerText.trim());
    });
  });

  if (ingredients.length === 0) {
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

    fallbackSelectors.forEach((selector) => {
      const elements = doc.querySelectorAll(selector);
      elements.forEach((el) => {
        ingredients.push(el.innerText.trim());
      });
    });
  }

  const uniqueIngredients = [...new Set(ingredients)].filter(Boolean);

  if (uniqueIngredients.length === 0) {
    const sectionHeaders = Array.from(doc.querySelectorAll("h2, h3, h4")).filter((header) =>
      /ingredients/i.test(header.innerText)
    );

    sectionHeaders.forEach((header) => {
      let container = header.nextElementSibling;

      while (container && !(container.tagName === "UL" || container.tagName === "OL")) {
        const deepIngredients = container.querySelectorAll("ul li, ol li, p, span");

        if (deepIngredients.length > 0) {
          deepIngredients.forEach((el) => {
            ingredients.push(el.innerText.trim());
          });
          break;
        }
        container = container.nextElementSibling;
      }
    });
  }

  const finalIngredients = [...new Set(ingredients)].filter(Boolean);
  return finalIngredients;
}
