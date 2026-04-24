import { createBrowserRouter } from "react-router-dom";
import App from "./App";

// Pages
import Categories from "./pages/categories";
import AboutPage from "./pages/about";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout (Navbar + Footer)
    children: [
      { index: true, element: <AboutPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "categories", element: <Categories /> },
    ],
  },
]);

export default router;
