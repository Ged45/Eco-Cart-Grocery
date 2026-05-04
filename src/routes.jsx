import { createBrowserRouter } from "react-router-dom";
 import App from "./App";
import HomeShop from "./pages/home-shop";
import Contact from "./pages/contact";


// Pages
import Checkout from "./pages/checkout";

import Cart from "./pages/cart";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [


     { path: "checkout", element: <Checkout /> },
     { path: "contact", element: <Contact /> },

     {
        path: "/", 
        element: <HomeShop />,
      },

      
      

      {
        path: "/cart",
        element: <Cart />,
      },

    ],
  },
]);

export default router;
