import { useRef } from "react";
import "../../assets/css/form/form.css";
import "../../assets/css/user_profile/public-info.css";
import previewPhoto from "../../utils/previewPhotoUtil";

export default function PublicInfo() {
  const photoLabel = useRef();
  const photoLabelBackground =
    '#fff url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" height="2em" fill="orange" viewBox="0 0 512 512"%3E%3Cpath d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/%3E%3C/svg%3E\') center no-repeat';

  const handlePhotoChange = (e) => {
    previewPhoto(e, photoLabel.current, photoLabelBackground, 160, 160);
  };

  // Todo
  return (
    <div className="public-info">
      <header>
        <h1>Public Info</h1>
      </header>

      <main>
        <section className="public-info-section">
          <h2>About Me</h2>

          <form encType="multipart/form-data">
            <div className="inputs">
              <div className="form-input">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" />
              </div>

              <div className="form-input">
                <label htmlFor="tagline">Tagline</label>
                <textarea id="tagline" placeholder="This is you in a nutshell"></textarea>
              </div>
            </div>

            <div className="wrapper">
              <p>Add an Image</p>
              <div className="input-wrapper">
                <div className="form-input">
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
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
