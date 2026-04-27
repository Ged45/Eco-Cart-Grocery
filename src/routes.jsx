import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomeShop from "./pages/home-shop";
import ProductDetail from "./pages/product-detail";

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
      
      { path: "product/:productId", element: <ProductDetail /> },

      
      
    ],
  },
]);

export default router;