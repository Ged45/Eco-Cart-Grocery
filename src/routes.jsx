import { createBrowserRouter } from "react-router-dom";
import App from "./App";

// Pages


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout (Navbar + Footer)
    children: [
     
      
      
    ],
  },
]);

export default router;