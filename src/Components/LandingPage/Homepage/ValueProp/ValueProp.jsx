import React, { useState } from "react";
import { Box, Typography, Button, Divider, useMediaQuery } from "@mui/material";
import { valueprop } from "./ValueProp.js";
import { useNavigate } from "react-router";

import add from "../Images/add.png";
import minus from "../Images/minus.png";
import valueropquote from "../Images/valueropquotenew.svg";

import {
  valuepropgrrnsmilingmanrightside,
  handholdingmanure,
} from "../../../../Constant/AppConstant.js";

const ValueProps = ({ item, index, totalItems, openIndex, setOpenIndex }) => {
  const isOpen = index === openIndex;

  const openAccord = () => {
    setOpenIndex(isOpen ? -1 : index);
  };

  return (
    <>
      <Box
        onClick={openAccord}
        sx={{
          ...valueprop.parentContainer,
          padding: isOpen ? ".5rem 0" : "1rem 0",
          transition: "padding .3s ease-in",
        }}
      >
        <Box sx={valueprop.innertextContainer}>
          <Box sx={valueprop.outterquestionContainer}>
            <img
              src={isOpen ? minus : add}
              alt="button"
              style={valueprop.iconstyle}
            />
            <Typography sx={valueprop.innerquestionstyle}>
              {item.question}
            </Typography>
          </Box>
          {isOpen ? (
            <Typography sx={valueprop.answerstyle}>{item.answer}</Typography>
          ) : null}
        </Box>
      </Box>
    </>
  );
};

function ValueProp() {
  const totalItems = Props.length;
  const [openIndex, setOpenIndex] = useState(-1);
  const navigate = useNavigate();

  return (
    <>
      <Box sx={valueprop.covercontainer}>
        <Box sx={valueprop.leftsidebackground(openIndex)}>
          <Box sx={valueprop.leftsideContainer}>
            <Box sx={valueprop.valuepropheader}>
              <Typography sx={valueprop.header}>Value Proposition</Typography>
              <Typography sx={valueprop.header2}>Our Offerings</Typography>
            </Box>
            <Box sx={valueprop.leftsideContainermapped}>
              {Props?.map((item, index) => (
                <>
                  <ValueProps
                    key={index}
                    item={item}
                    index={index}
                    totalItems={totalItems}
                    openIndex={openIndex}
                    setOpenIndex={setOpenIndex}
                  />
                  {index === totalItems - 1 ? null : (
                    <Divider sx={{ color: "white" }} />
                  )}
                </>
              ))}
            </Box>

            <Button
              sx={valueprop.viemorebutton}
              // className="slide-bannerTextButton"
              onClick={() => navigate("/our-value-propositions")}
            >
              {" "}
              View More
            </Button>
          </Box>
        </Box>
        <Box sx={valueprop.rightsidebackground}>
          <img
            src={valuepropgrrnsmilingmanrightside}
            alt="faq header"
            style={{ width: "100%", height: "100%", objectFit:'cover' }}
          />
        </Box>
      </Box>
      <Box className="lowercontainercontainer">
        <Box className="lowercontainerleft">
          <img src={handholdingmanure} alt="bgleft" style={valueprop.imgleft} />
        </Box>
        <Box className="lowerrighttextcontainer">
          <Box className="lowerrightinnertextcontainer">
            <img
              src={valueropquote}
              alt="bgleft"
              style={valueprop.valueropquote}
            />

            <Typography
              className="lowercontainertext"
              // sx={valueprop.lowercontainertext}
            >
              Our platform is an innovative approach that we believe will change
              the landscape and improve the way agricultural products are grown,
              traded, financed, and delivered in Africa in a transparent and
              more efficient way.
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ValueProp;

const Props = [
  {
    question: "Digital Infrastructure",
    answer:
      "Ajeoba connects sellers and buyers in agriculture, using technology for efficient transactions, enhancing supply chains operations.",
  },
  {
    question: "Input Supply",
    answer:
      "Ajeoba links farmers to quality inputs for improved crop health: organic fertilizers, seeds, pesticides, herbicides, and equipments.",
  },
  {
    question: "Financial Services",
    answer:
      "Ajeoba bridges financing gaps for Nigerian farmers, helping farmers gain access to small loans to boost agricultural process.",
  },
  {
    question: "Market Arbitrage",
    answer:
      "Creating a B2B2C marketplace for farmers, seamlessly linking them with off-takers and facilitating the sale of high-quality produce.",
  },
  {
    question: "Proprietary Investment",
    answer:
      "Ajeoba is working to build a diversified investment portfolio within the agricultural sector, creating high-yield investment opportunities for investors.",
  },
  {
    question: "Intrinsic Database",
    answer:
      "Ajeoba addresses data scarcity in agriculture by creating a repository for predictive analysis, aiding farmers and others to make informed decisions.",
  },
];
