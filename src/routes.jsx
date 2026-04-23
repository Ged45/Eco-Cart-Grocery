import { createBrowserRouter } from "react-router-dom";
import App from "./App";

// Pages
import Categories from "./pages/categories";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout (Navbar + Footer)
    children: [
     
      { path: "categories", element: <Categories /> },
      
    ],
  },
]);

export default router;