import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

function App() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <CartDrawer />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
