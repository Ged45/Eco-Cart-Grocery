import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomeShop from "./pages/home-shop";
import AboutPage from "./pages/about";
import Categories from "./pages/categories";

// Pages

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout (Navbar + Footer)
    children: [
      { index: true, element: <HomeShop /> },
      { path: "shop", element: <HomeShop /> },
      { path: "about", element: <AboutPage /> },
      { path: "categories", element: <Categories /> },
    ],
  },
]);

export default router;
