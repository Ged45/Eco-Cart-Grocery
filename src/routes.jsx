import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomeShop from "./pages/home-shope";
import Signup from "./pages/signup";
import Login from "./pages/login";
// Pages


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout (Navbar + Footer)
    children: [
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