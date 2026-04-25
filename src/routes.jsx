import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomeShop from "./pages/home-shop";
import Cart from "./pages/cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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
