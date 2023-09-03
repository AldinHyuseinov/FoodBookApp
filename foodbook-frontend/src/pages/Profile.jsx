import UserSidebar from "../components/user_profile/UserSidebar";
import "../assets/css/user_profile/profile-page.css";
import "../assets/css/user_profile/user-sidebar.css";
import { Outlet } from "react-router";
import useTitle from "../hooks/useTitle";

export default function ProfilePage() {
  useTitle("Profile | FoodBook");

  return (
    <div className="page-container">
      <input type="checkbox" id="side-nav-toggle" />
      <label htmlFor="side-nav-toggle" id="side-nav-toggle-label">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
        My Account
      </label>
      <Outlet />
      <UserSidebar />
    </div>
  );
}
