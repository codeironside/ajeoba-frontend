import React from "react";
import ProductListBanner from "./ProductListBanner";
import NavBar from "../../NavBar/NavBar.jsx";
import ProductListContainer from "./ProductListContainer.jsx";
import Footer from "../../Footer/Footer.jsx";

function ProductListExpanded() {
  return (
    <div>
      <NavBar />
      <ProductListBanner />
      <ProductListContainer />
      <Footer />
    </div>
  );
}

export default ProductListExpanded;
