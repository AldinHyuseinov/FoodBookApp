export default function previewPhoto(e) {
  const file = e.target.files[0];

  if (!file) {
    e.target.style.background = "url(/src/images/recipe-placeholder.png) center";
    return;
  }

  const img = new Image();

  img.onload = () => {
    // Calculate the new width and height for scaling
    const maxWidth = 289; // Set your desired max width
    const maxHeight = 232; // Set your desired max height
    let width = img.width;
    let height = img.height;

    if (width > maxWidth) {
      height *= maxWidth / width;
      width = maxWidth;
    }

    if (height > maxHeight) {
      width *= maxHeight / height;
      height = maxHeight;
    }

    // Create a canvas element and draw the scaled image
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);

    // Get the scaled image as a data URL
    const scaledUrl = canvas.toDataURL(file.type);

    // Set the background of the target element to the scaled image
    e.target.style.background = `url(${scaledUrl}) center no-repeat`;
  };

  // Set the image source to the generated URL
  img.src = URL.createObjectURL(file);
}
