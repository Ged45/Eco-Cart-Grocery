import { createBrowserRouter } from "react-router-dom";
import App from "./App";

// Pages
import Checkout from "./pages/checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout (Navbar + Footer)
    children: [
     { path: "checkout", element: <Checkout /> },
      
      
    ],
  },
]);

export default router;