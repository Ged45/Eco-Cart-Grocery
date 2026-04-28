import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomeShop from "./pages/home-shop";
import ProductDetail from "./pages/product-detail";
import Categories from './pages/Categories'
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

      
      {path:"/categories" , element:<Categories/>}
    ],
  },
]);

export default router;