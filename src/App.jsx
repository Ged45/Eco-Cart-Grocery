import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <Outlet /> {/* pages go here */}
      <Footer />
    </div>
  );
}

export default App;
