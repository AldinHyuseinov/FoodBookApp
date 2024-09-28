export async function htmlToRecipe(pageUrl) {
  //using proxy
  const text = await (
    await fetch(`http://localhost:3000/proxy?url=${encodeURIComponent(pageUrl)}`)
  ).text();
  console.log(text);

  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/html");

  console.log(doc);
}
