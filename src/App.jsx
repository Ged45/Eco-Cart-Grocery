import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeShop from "./pages/home-shope";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <HomeShop/>
      {/* add ur pages here */}
      <Footer />
    </>
  );
}

export default App;