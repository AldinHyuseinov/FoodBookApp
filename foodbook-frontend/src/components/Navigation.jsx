import { useState } from "react";
import { clearUserData } from "../services/userService";
import usePicture from "../hooks/usePicture";

export default function Navbar({ isLoggedIn, setLoggedIn }) {
  const [checked, setChecked] = useState(false);
  const userPicture = usePicture(isLoggedIn);

  const handleLogout = () => {
    clearUserData();
    setLoggedIn(false);
  };

  //Todo:
  return (
    <header className="site-header">
      <label htmlFor="nav-toggle" id="nav-toggle-label">
        {checked ? (
          <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 384 512">
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512">
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        )}
      </label>
      <input type="checkbox" id="nav-toggle" onChange={(e) => setChecked(e.target.checked)} />

      <a href="/" className="branding">
        <div>
          <p className="title">
            Food<span>Book</span>
          </p>
          <p className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" viewBox="0 0 14 16">
              <use xlinkHref="/logo.svg#logo" />
            </svg>
          </p>
        </div>
      </a>

      <nav className="main-nav">
        <ul role="navigation" className="nav">
          <li>
            <a href="/just-recipe">Just Recipe</a>
          </li>

          <li>
            <a href="#">Recipes by Course</a>

            <ul>
              <li>
                <a href="#">Starters</a>
              </li>
              <li>
                <a href="#">Main Course</a>
              </li>
              <li>
                <a href="#">Desert</a>
              </li>
            </ul>
          </li>

          <li>
            <a href="#">Recipes By Diet</a>

            <ul>
              <li>
                <a href="#">Vegetarian</a>
              </li>
              <li>
                <a href="#">Vegan</a>
              </li>
              <li>
                <a href="#">Healthy</a>
              </li>
            </ul>
          </li>

          <li>
            <a href="#">Recipes By Meal</a>

            <ul>
              <li>
                <a href="#">Breakfast</a>
              </li>
              <li>
                <a href="#">Lunch</a>
              </li>
              <li>
                <a href="#">Dinner</a>
              </li>
            </ul>
          </li>
          {isLoggedIn ? (
            <li className="user">
              <a href="#">
                {userPicture ? (
                  <div className="media-user-picture">
                    <img src={userPicture} alt="User Picture" />
                  </div>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                  </svg>
                )}
                My Account
              </a>

              <ul>
                <li>
                  <a href="#" onClick={handleLogout}>
                    Log out
                  </a>
                </li>
                <li>
                  <a href="/profile/personal-info">My Profile</a>
                </li>
                <li>
                  <a href="/recipes/add">Add Recipe</a>
                </li>
              </ul>
            </li>
          ) : (
            <li className="user">
              <a href="/auth/login">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
                Log in
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
