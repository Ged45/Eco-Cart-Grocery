import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CategoriesPage from "./pages/categories";
function App() {
  return (
    <>
      <Header />
      <Outlet /> {/* pages goes here*/
         
        
           
      }
      <Footer />
    </>
  );
}

export default App;