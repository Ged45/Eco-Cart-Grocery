
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./styles/tailwind.css";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </AuthProvider>

);

