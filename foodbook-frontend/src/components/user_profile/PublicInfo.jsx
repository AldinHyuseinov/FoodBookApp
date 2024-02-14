import { useEffect, useRef, useState } from "react";
import "../../assets/css/form/form.css";
import "../../assets/css/user_profile/public-info.css";
import previewPhoto from "../../utils/previewPhotoUtil";
import { updateUserPublicInfo } from "../../services/userService";
import ErrorBox from "../add_recipe_page/ErrorBox";
import usePublicInfo from "../../hooks/usePublicInfo";

export default function PublicInfo() {
  const photoLabel = useRef();
  const defaultLabelBackground =
    '#fff url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" height="2em" fill="orange" viewBox="0 0 512 512"%3E%3Cpath d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/%3E%3C/svg%3E\') center no-repeat';
  const [photoLabelBackground, setPhotoLabelBackground] = useState(defaultLabelBackground);

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [photo, setPhoto] = useState(null);
  const publicInfo = usePublicInfo(true);
  const [username, setUsername] = useState("");
  const [tagline, setTagline] = useState("");
  const [errors, setErrors] = useState({});

  // Populate input fields when data is fetched
  useEffect(() => setUsername(publicInfo.username), [publicInfo.username]);
  useEffect(() => setTagline(publicInfo.tagline), [publicInfo.tagline]);

  const handleSubmitButtonState = (value, type) => {
    const checkIfFieldsEmpty = (username, tagline, photo) => {
      if (username || tagline || photo) {
        setSubmitButtonDisabled(false);
        return;
      }
      setSubmitButtonDisabled(true);
    };

    const handler = {
      username: () => checkIfFieldsEmpty(value, tagline, photo),
      tagline: () => checkIfFieldsEmpty(username, value, photo),
      photo: () => checkIfFieldsEmpty(username, tagline, value),
    };

    handler[type]();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    username && formData.append("username", username);
    tagline && formData.append("tagline", tagline);
    photo && formData.append("photo", photo);

    try {
      await updateUserPublicInfo(formData);
      Object.keys(errors).length > 0 && setErrors({});
    } catch (err) {
      setErrors(JSON.parse(err.message));
    }
  };

  const handlePhotoChange = (e) => {
    previewPhoto(e, photoLabel.current, photoLabelBackground, 160, 160);
    const file = e.target.files[0];

    handleSubmitButtonState(file, "photo");
    setPhoto(file);
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;

    handleSubmitButtonState(value, "username");
    setUsername(value);
  };

  const handleTaglineChange = (e) => {
    const value = e.target.value;

    handleSubmitButtonState(value, "tagline");
    setTagline(value);
  };

  return (
    <div className="public-info">
      <header>
        <h1>Public Info</h1>
      </header>

      <main>
        <section className="public-info-section">
          <h2>About Me</h2>

          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <div className="form-container">
              <div className="inputs">
                <div className="form-input">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                  {errors.hasOwnProperty("username") && <ErrorBox message={errors["username"]} />}
                </div>

                <div className="form-input">
                  <label htmlFor="tagline">Tagline</label>
                  <textarea
                    id="tagline"
                    placeholder="This is you in a nutshell"
                    value={tagline}
                    onChange={handleTaglineChange}
                  ></textarea>
                  {errors.hasOwnProperty("tagline") && <ErrorBox message={errors["tagline"]} />}
                </div>
              </div>

              <div className="wrapper">
                <p>Add an Image</p>
                <div className="input-wrapper">
                  <div
                    className="form-input"
                    onDragOver={(e) => {
                      e.preventDefault();
                      setPhotoLabelBackground(
                        `#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='2em' fill='orange' viewBox='0 0 512 512'%3E%3C!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--%3E%3Cpath d='M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z'/%3E%3C/svg%3E") center no-repeat`
                      );
                    }}
                    onDragLeave={() => setPhotoLabelBackground(defaultLabelBackground)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setPhotoLabelBackground(defaultLabelBackground);

                      const file = e.dataTransfer.files[0];
                      if (file) {
                        handlePhotoChange({ target: { files: [file] } });
                      }
                    }}
                  >
                    <label
                      style={{ background: photoLabelBackground }}
                      htmlFor="photo"
                      id="photo-label"
                      ref={photoLabel}
                    ></label>
                    <input type="file" id="photo" accept="image/*" onChange={handlePhotoChange} />
                  </div>
                  <p>Profile Photo</p>
                </div>
                {errors.hasOwnProperty("photo") && <ErrorBox message={errors["photo"]} />}
              </div>
            </div>
            <button type="submit" disabled={submitButtonDisabled}>
              Save
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
