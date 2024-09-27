export async function htmlToRecipe(pageUrl) {
  //using proxy
  const text = await (await fetch(`https://cors-anywhere.herokuapp.com/${pageUrl}`)).text();

  console.log(text);
}
