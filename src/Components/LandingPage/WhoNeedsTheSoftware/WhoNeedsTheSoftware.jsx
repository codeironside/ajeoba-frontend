import React from "react";
import FarmingAssociation from "./FarminAssociations.jsx";
import NavBar from "../NavBar/NavBar.jsx";
import Footer from "../Footer/Footer.jsx";
import Banner from "./Banner.jsx";
import Title from "./Title.jsx";
import QualityAss from "./QualityAss.jsx";
import Logisticscomp from "./Logisticscomp.jsx";
import InputSupplier from "./InputSupplier.jsx";
import CorpBuyer from "./CorpBuyer.jsx";
import ExtensionWorkers from "./ExtensionWorkers.jsx";

function WhoNeedsSoftware() {
  return (
    <div>
      <NavBar />
      <Banner />
      <Title />
      <FarmingAssociation />
      <QualityAss />
      <Logisticscomp />
      <InputSupplier />
      <CorpBuyer />
      <ExtensionWorkers />
      <Footer />
    </div>
  );
}

export default WhoNeedsSoftware;
