import { clearUserData } from "../services/userService";

export default function Navbar({ isLoggedIn, setLoggedIn }) {
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
            <svg xmlns="http://www.w3.org/2000/svg" width="14" viewBox="0 0 14 16">
              <use xlinkHref="/logo.svg#logo" />
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
