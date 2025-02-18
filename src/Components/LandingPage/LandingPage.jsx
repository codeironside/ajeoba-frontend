import React from "react";
import { Box } from "@mui/material";
import "./css/style.css";

import NavBar from "./NavBar/NavBar.jsx";
import Footer from "./Footer/Footer";
import HomePage from "./Homepage/HomePage.jsx";
import {
  city,
  c_buyer,
  farming_assoc,
  proprietary_mobile,
  plowing,
  finance,
} from "../../Constant/AppConstant.js";

const LandingPage = () => {
  return (
    <Box>
      <NavBar />
      <HomePage />
      <Footer />
    </Box>
  );
};

export default LandingPage;

const slides1 = [
  {
    image: farming_assoc,
    caption: "Farming Associations",
    text: "Agriculture made smarter with Ajeoba - the one-stop-shop for crop to market connections",
  },
  {
    image: city,
    caption: "Quality Assurance",
    text: "We're your digital plow - cultivating connections, harvesting profits",
  },
  {
    image: c_buyer,
    caption: "Corporate Buyers",
    text: "Join the harvest party with Ajeoba's all-inclusive platform for agribusiness",
  },
];

const slides2 = [
  {
    image: c_buyer,
    caption:
      "The company’s digital platform primarily creates an interface between sellers and buyers of agricultural products and related transactions leveraging information technology to eliminate transaction friction and enhance supply chain efficiency.",
    label: "Digital Infrastructure",
  },
  {
    image: proprietary_mobile,
    caption:
      "Ajeoba is working to build a diversified investment portfolio within the agricultural sector, creating high-yield investment opportunities for investors. These opportunities are open to investors within and outside the agricultural sector ",
    label: "Proprietary Investment",
  },
  {
    image: plowing,
    caption:
      "Ajeoba provides a repository for historical prices, weather analysis, climate predictions, crops planted and yield. Data analytics can help farmers monitor the health of crops in real-time, create predictive analytics related to future yields.",
    label: "Intrinsic Database",
  },
  {
    image: finance,
    caption:
      "We bridge the financing gap for smallholder farmers across Nigeria. Using our robust farmer verification and KYC structure, farmers verified on our platform can gain access to small loans & grants to boost agricultural process & increase productivity.",
    label: "Financial Services",
  },
];
