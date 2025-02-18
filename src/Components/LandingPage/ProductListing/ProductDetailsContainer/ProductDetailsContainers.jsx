import React from "react";
import NavBar from "../../NavBar/NavBar.jsx";
import Footer from "../../Footer/Footer.jsx";
import ProductDetails from "../ProductDetailsContainer/ProductDetails.jsx";

function ProductDetailsContainers() {
  return (
    <div>
      <NavBar />
      <ProductDetails />
      <Footer />
    </div>
  );
}

export default ProductDetailsContainers;
