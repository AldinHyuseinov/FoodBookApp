import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import Footer from "./components/Footer";

const HomePage = lazy(() => import("./pages/Home"));

function App() {
  return (
    <>
      <Navigation />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route index element={<HomePage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
