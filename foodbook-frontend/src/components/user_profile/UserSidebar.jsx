import { getUserData } from "../../services/userService";

export default function UserSidebar() {
  return (
    <aside className="sidebar">
      <section className="user-greeting user">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="1em">
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
        </svg>
        Hi, {getUserData().email}
      </section>

      <nav className="user-side-nav">
        <ul>
          <li>
            <a href="/profile/personal-info">Personal Info</a>
          </li>
          <li>
            <a href="/profile/public-info">Public Info</a>
          </li>
          <li>
            <a href="/profile/personal-recipes">Personal Recipes</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
