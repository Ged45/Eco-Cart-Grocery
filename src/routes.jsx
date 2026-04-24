import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomeShop from "./pages/home-shope";

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
      
      
    ],
  },
]);

export default router;