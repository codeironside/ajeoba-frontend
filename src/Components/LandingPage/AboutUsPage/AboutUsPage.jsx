import React from "react";
import NavBar from "../NavBar/NavBar.jsx";
import Footer from "../Footer/Footer.jsx";
import Banner from "./AboutUs/Banner.jsx";
import FirstSection from "./AboutUs/FirstSection.jsx";
import MissionVission from "./AboutUs/MissionVission.jsx";
import CoreValues from "./AboutUs/CoreValues.jsx";
import StaffandBoard from "./AboutUs/StaffandBoard.jsx";

function AboutUsPage() {
  return (
    <div>
      <NavBar />
      <Banner />
      <FirstSection />
      <MissionVission />
      <CoreValues />
      <StaffandBoard />
      <Footer />
    </div>
  );
}

export default AboutUsPage;
