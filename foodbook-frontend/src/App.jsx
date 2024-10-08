import { lazy, Suspense, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import Footer from "./components/Footer";
import { getUserData } from "./services/userService";

const HomePage = lazy(() => import("./pages/Home"));
const LoginPage = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/Register"));
const AddRecipePage = lazy(() => import("./pages/AddRecipe"));
const RecipePage = lazy(() => import("./pages/Recipe"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const PersonalInfo = lazy(() => import("./components/user_profile/PersonalInfo"));
const PublicInfo = lazy(() => import("./components/user_profile/PublicInfo"));
const JustRecipe = lazy(() => import("./pages/JustRecipe"));
const ErrorPage = lazy(() => import("./pages/Error"));

function App() {
  const [isLoggedIn, setLoggedIn] = useState(getUserData() ? true : false);

  return (
    <>
      <Navigation isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/auth/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginPage />} />
            <Route
              path="/auth/register"
              element={isLoggedIn ? <Navigate to="/" /> : <RegisterPage />}
            />
            <Route
              path="/recipes/add"
              element={
                isLoggedIn ? <AddRecipePage /> : <Navigate to="/auth/login/?login-needed=true" />
              }
            />
            <Route path="/recipe/:id" element={<RecipePage />} />
            <Route
              path="/profile"
              element={
                isLoggedIn ? <ProfilePage /> : <Navigate to="/auth/login/?login-needed=true" />
              }
            >
              <Route path="personal-info" element={<PersonalInfo />} />
              <Route path="public-info" element={<PublicInfo />} />
            </Route>
            <Route path="/just-recipe" element={<JustRecipe />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
