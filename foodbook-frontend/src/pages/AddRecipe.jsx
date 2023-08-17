import "../css/add-recipe-form.css";
import "../css/form.css";

export default function AddRecipePage() {
  const handlePhotoChange = (e) => {
    previewPhoto(e);
  };

  return (
    <main>
      <header className="recipe-header">
        <h1>Add a Recipe</h1>
        <p>Uploading personal recipes is easy! Share with your friends, family or the community.</p>
      </header>

      <form encType="multipart/form-data">
        <fieldset className="form-section recipe-details">
          <legend style={{ display: "none" }}>Recipe title and description</legend>

          <div className="inputs">
            <div className="form-input">
              <label htmlFor="title">Recipe Title</label>
              <input type="text" name="title" id="title" placeholder="Give your recipe a title" />
            </div>

            <div className="form-input">
              <label htmlFor="description">Description</label>
              <textarea
                rows="5"
                cols="10"
                name="description"
                id="description"
                placeholder="Share the story behind your recipe and what makes it special."
              ></textarea>
            </div>
          </div>

          <div className="form-input">
            <label htmlFor="photo">Photo</label>
            <input
              style={{
                minHeight: "14.5em",
                background: "url(/src/images/recipe-placeholder.png) center",
              }}
              type="file"
              name="photo"
              id="photo"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </div>
        </fieldset>
      </form>
    </main>
  );
}

function previewPhoto(e) {
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
