import { createBrowserRouter } from "react-router-dom";
 import App from "./App";
import HomeShop from "./pages/home-shop";
import Contact from "./pages/contact";

// Pages
import Checkout from "./pages/checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout (Navbar + Footer)
    children: [

     { path: "checkout", element: <Checkout /> },
     { path: "contact", element: <Contact /> },

     {
        path: "/", 
        element: <HomeShop />,
      },

      
      
    ],
  },
]);

export default router;