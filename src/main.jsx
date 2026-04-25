
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./styles/tailwind.css";
import { CartProvider } from "./components/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
    <RouterProvider router={router} />
  </CartProvider>
);