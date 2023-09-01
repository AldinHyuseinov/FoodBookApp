import { getUserData } from "../../services/userService";
import "../../assets/css/form.css";
import "../../assets/css/user_profile/personal-info.css";

export default function PersonalInfo() {
  return (
    <div className="personal-info">
      <header>
        <h1>Personal Info</h1>
        <p>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
            <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
          </svg>
          Only you can see the information on this page.
        </p>
      </header>

      <main>
        <section className="personal-info-section">
          <h2>My Basic Info</h2>

          <form>
            <div className="form-input">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" readOnly value={getUserData().email} />
            </div>

            <div className="form-input">
              <label htmlFor="first-name">First Name</label>
              <input type="text" id="first-name" />
            </div>

            <div className="form-input">
              <label htmlFor="last-name">Last Name</label>
              <input type="text" id="last-name" />
            </div>

            <div className="form-input">
              <label htmlFor="birth-date">Birth Date</label>
              <input type="date" id="birth-date" />
            </div>
            <button type="submit">Save</button>
          </form>
        </section>
      </main>
    </div>
  );
}
