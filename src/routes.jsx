import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomeShop from "./pages/home-shop";
import Signup from "./pages/signup";  
import Login from "./pages/login";

// Pages
import Checkout from "./pages/checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout (Navbar + Footer)
    children: [

     { path: "checkout", element: <Checkout /> },

     {
        path: "/", 
        element: <HomeShop />,
      },
        {
  path: "/signup",
  element: <Signup />,
      },
{
  path: "/login",
  element: <Login />,
}
      
      
    ],
  },
]);

export default router;