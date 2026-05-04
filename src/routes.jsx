import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import ProductDetail from "./pages/product-detail";

// Pages
import HomeShop from "./pages/home-shop";
import Contact from "./pages/contact";
import Checkout from "./pages/checkout";

import Cart from "./pages/cart";


import Categories from "./pages/categories";
import AboutPage from "./pages/about";


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
      
      { path: "product/:productId", element: <ProductDetail /> },

      
      

      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path:"/about",
        element: <AboutPage />
      },
      


    ],
  },
]);

export default router;
