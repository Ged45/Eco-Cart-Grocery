import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomeShop from "./pages/home-shop";
import AboutPage from "./pages/about";
import Categories from "./pages/categories";
import ProductDetail from "./pages/product-detail";
import Contact from "./pages/contact";
import Checkout from "./pages/checkout";
import Account from "./pages/account";
import Cart from "./pages/cart";
import Login from "./pages/login";
import Signup from "./pages/signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomeShop /> },
      { path: "shop", element: <HomeShop /> },
      { path: "about", element: <AboutPage /> },
      { path: "categories", element: <Categories /> },
      { path: "checkout", element: <Checkout /> },
      { path: "contact", element: <Contact /> },
      { path: "account", element: <Account /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "product/:productId", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
    ],
  },
]);

export default router;
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
<<<<<<< HEAD
import HomeShop from "./pages/home-shop";
import AboutPage from "./pages/about";
import Categories from "./pages/categories";

// Pages
=======

import ProductDetail from "./pages/product-detail";

// Pages
import HomeShop from "./pages/home-shop";
import Contact from "./pages/contact";
import Checkout from "./pages/checkout";
import Account from "./pages/account";
import Cart from "./pages/cart";
import Login from "./pages/login";
import Signup from "./pages/signup";

import Categories from "./pages/categories";
import AboutPage from "./pages/about";

>>>>>>> 1b8eec163df8490acc76854c82f963ab7d397f09

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
<<<<<<< HEAD
      { index: true, element: <HomeShop /> },
      { path: "shop", element: <HomeShop /> },
      { path: "about", element: <AboutPage /> },
      { path: "categories", element: <Categories /> },
=======



     { path: "checkout", element: <Checkout /> },
     { path: "contact", element: <Contact /> },
     { path: "account", element: <Account /> },
     { path: "login", element: <Login /> },
     { path: "signup", element: <Signup /> },
     {
        path: "/", 
        element: <HomeShop />,
      },
      
      { path: "product/:productId", element: <ProductDetail /> },

      {path: "categories", element: <Categories />},
      

      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path:"/about",
        element: <AboutPage />
      },
      


>>>>>>> 1b8eec163df8490acc76854c82f963ab7d397f09
    ],
  },
]);

export default router;
