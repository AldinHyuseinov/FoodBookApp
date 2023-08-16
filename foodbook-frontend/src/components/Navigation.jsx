import { useState } from "react";
import { clearUserData, getUserData } from "../services/userService";

export default function Navbar() {
  const [isLoggedIn, setLoggedIn] = useState(getUserData() ? true : false);

  const handleLogout = () => {
    clearUserData();
    setLoggedIn(false);
  };

  //Todo:
  return (
    <header className="site-header">
      <a href="/" className="branding">
        <div>
          <p className="title">
            Food<span>Book</span>
          </p>
          <p className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
              <path d="M416 0C400 0 288 32 288 176V288c0 35.3 28.7 64 64 64h32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V352 240 32c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7V480c0 17.7 14.3 32 32 32s32-14.3 32-32V255.6c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16V150.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8V16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z" />
            </svg>
          </p>
        </div>
      </a>

      <nav className="main-nav">
        <ul role="navigation" className="nav">
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
                My Account
              </a>

              <ul>
                <li>
                  <a href="#" onClick={handleLogout}>
                    Log out
                  </a>
                </li>
                <li>
                  <a href="#">My Profile</a>
                </li>
                <li>
                  <a href="#">Add Recipe</a>
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
