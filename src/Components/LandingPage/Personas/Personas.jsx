import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AjDialog from "../../AjDialog/AjDialog";
import { commonStyles } from "../../../Style/CommonStyle";
import { arrow_who } from "../../../Constant/AppConstant";

function Personas() {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);

  const handleReadMore = (persona) => {
    setSelectedPersona(persona);
    setOpenDialog(true);
  };
  return (
    <>
      <Box
        sx={{
          position: "relative",
          padding: "3rem 0 4rem 0",
          "@media(max-width: 768px)": {
            padding: "2rem 0",
          },
          "@media(max-width: 468px)": {
            padding: "1rem 0",
          },
        }}
      >
        <Box
          sx={{
            fontWeight: "700",
            lineHeight: "50px",
            fontSize: "32px",
            color: "#006d33",
            textAlign: "center",
            fontFamily: "DM Sans",
            "@media(max-width: 768px)": {
              lineHeight: "3rem",
              fontSize: "2rem",
            },
            "@media(max-width: 468px)": {
              lineHeight: "1.5rem",
              fontSize: "1.2rem",
            },
          }}
        >
          Who needs the Software?
        </Box>
        <Box
          sx={{
            position: "relative",
            width: "90%",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            margin: "2rem auto",
            cursor: "pointer",
            fontFamily: "DM Sans",
            zIndex: "1000",
            "@media(max-width: 468px)": {
              gap: ".3rem",
              margin: "0 auto",
            },
          }}
        >
          {persona.map((item, index) => (
            <Box key={index} className={classes.container}>
              <img className={classes.img} src={item.img} alt="Avatar" />
              <div className={classes.caption}>{item.caption}</div>
              <div className={classes.text}>{item.text}</div>
              <Box
                onClick={() => handleReadMore(item)}
                className={classes.readmore}
                sx={{ cursor: "pointer" }}
              >
                <span>Read More </span>
                <img
                  src={arrow_who}
                  alt="Read More"
                  className={classes.arrowIcon}
                />
              </Box>
            </Box>
          ))}
        </Box>
        <img
          src="https://ajeoba-website.oss-eu-central-1.aliyuncs.com/compressed-images/compressed-images/Crop%20Image%20on%20homepage%202.png"
          alt="digital"
          className={classes.cropimg}
        />
        <img
          src="https://ajeoba-website.oss-eu-central-1.aliyuncs.com/compressed-images/compressed-images/Crop%20Image%20on%20homepage%203.svg"
          alt="digital"
          className={classes.cropimgbot}
        />
      </Box>

      <AjDialog
        open={openDialog}
        closeModal={setOpenDialog}
        styleData={commonStyles.dialogContainer}
      >
        {selectedPersona && (
          <Box className={classes.selectedpersona}>
            <img
              src={selectedPersona.img}
              alt="persona-img"
              className={classes.selectedimg}
            />
            <Box sx={{ width: "100%" }}>
              <div className={classes.selectedCaption}>
                {selectedPersona.caption}
              </div>
              <div className={classes.selectedtext}>
                {selectedPersona.fulltext}
              </div>
            </Box>
          </Box>
        )}
      </AjDialog>
    </>
  );
}

export default Personas;

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "1rem auto",
    width: "30%",
    "@media(max-width: 900px)": {
      width: "45%",
    },
    "@media(max-width: 468px)": {
      width: "100%",
      margin: "1rem auto",
    },
  },
  caption: {
    fontWeight: "700",
    "@media(max-width: 1900px)": {
      fontSize: "2rem",
      margin: "1.2rem 0",
      lineHeight: "2.5rem",
    },
    "@media(max-width: 1500px)": {
      fontSize: "1.1rem",
      margin: ".8rem 0",
    },
    "@media(max-width: 900px)": {
      fontSize: "1.1rem",
    },
    "@media(max-width: 468px)": {
      margin: ".5rem 0",
      fontSize: "1.rem",
    },
  },
  img: {
    height: "auto",
    width: "100%",
    borderRadius: "0.5rem",
    "@media(max-width: 468px)": {
      gap: "1rem",
    },
  },
  text: {
    textAlign: "justify",
    color: "#686868",
    // lineHeight: "1.6rem",
    // fontSize: "1rem",
    fontWeight: "400",
    "@media(max-width: 1900px)": {
      lineHeight: "2.5rem",
      fontSize: "1.5rem",
    },
    "@media(max-width: 1500px)": {
      lineHeight: "2rem",
      fontSize: "1.1rem",
    },
    "@media(max-width: 900px)": {
      lineHeight: "2rem",
      fontSize: "1rem",
    },
    "@media(max-width: 468px)": {
      lineHeight: "1.8rem",
      fontSize: "1rem",
    },
  },
  readmore: {
    color: "#006d33",
    fontSize: "1rem",
    fontWeight: "700",
    lineHeight: "1.55rem",
    marginTop: ".5rem",
    "&:hover": {
      color: "#6D9E3F",
    },
    "@media(max-width: 1900px)": {
      lineHeight: "2.5rem",
      fontSize: "1.5rem",
    },
    "@media(max-width: 1500px)": {
      lineHeight: "2rem",
      fontSize: "1.1rem",
    },
    "@media(max-width: 900px)": {
      lineHeight: "2rem",
      fontSize: "1rem",
    },
    "@media(max-width: 468px)": {
      lineHeight: "1.8rem",
      fontSize: "1rem",
    },
  },
  cropimg: {
    position: "absolute",
    top: "0",
    right: "0",
    width: "25.84rem",
    height: "18.65rem",
    "@media(max-width: 768px)": {
      width: "20.84rem",
      height: "16.65rem",
    },
    "@media(max-width: 468px)": {
      width: "16.84rem",
      height: "14.65rem",
    },
  },
  cropimgbot: {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "25.84rem",
    height: "18.65rem",
    "@media(max-width: 768px)": {
      width: "20.84rem",
      height: "16.65rem",
    },
    "@media(max-width: 468px)": {
      width: "16.84rem",
      height: "14.65rem",
    },
  },
  selectedpersona: {
    padding: "2rem",
    display: "flex",
    gap: "2rem",
    justifyContent: "center",
    alignItem: "center",
    "@media(max-width: 768px)": {
      width: "80%",
      flexDirection: "column",
      margin: "0 auto",
      // width: "500px",
      gap: "1rem",
    },
    "@media(max-width: 468px)": {
      width: "100%",
      padding: "1rem",
    },
  },
  selectedCaption: {
    fontWeight: "700",
    fontSize: "1.5rem",
    lineHeight: "2.8rem",
    fontFamily: "DM Sans",
    marginBottom: ".2rem",
    "@media(max-width: 768px)": {
      fontSize: "18px",
      lineHeight: "28px",
      marginBottom: ".5rem",
    },
    "@media(max-width: 768px)": {
      fontSize: "14px",
      lineHeight: "18px",
      marginBottom: ".3rem",
    },
  },
  selectedtext: {
    fontWeight: "400",
    fontSize: "1.2rem",
    lineHeight: "1.8rem",
    fontFamily: "DM Sans",
    textAlign: "justify",
    "@media(max-width: 768px)": {
      fontSize: "14px",
      lineHeight: "20px",
    },
    "@media(max-width: 468px)": {
      textAlign: "justify",
      fontSize: "14px",
    },
  },
  selectedimg: {
    width: "321px",
    // height: "280px",
    "@media(max-width: 768px)": {
      width: "80%",
    },
    "@media(max-width: 468px)": {
      width: "100%",
    },
  },
}));

const persona = [
  {
    img: "https://ajeoba-website.oss-eu-central-1.aliyuncs.com/compressed-images/compressed-images/Farming%20Corporative%20%281%29.png",
    caption: "Farming Associations",
    text: "Will be able to register on the web app allowing them to manage farmer information, product aggregation data and assign the aggregated product to multiple wareh...",
    fulltext:
      "Will be able to register on the web app allowing them to manage farmer information, product aggregation data and assign the aggregated product to multiple warehouses. They will also be able to create batches of end-to-end logistics services, purchase inputs from the input suppliers, and link with finance companies for financial aid for the farmers.",
    link: "/#",
  },
  {
    img: "https://ajeoba-website.oss-eu-central-1.aliyuncs.com/compressed-images/compressed-images/Quality%20Assurance%20%281%29.png",
    caption: "Quality Assurance",
    text: "Will be able to register on the web app and purchase subscriptions, view advertisements for quality checks, and get in touch with the ad posters by viewing the...",
    fulltext:
      "Will be able to register on the web app and purchase subscriptions, view advertisements for quality checks, and get in touch with the ad posters by viewing their details.",
    link: "/#",
  },
  {
    img: "https://ajeoba-website.oss-eu-central-1.aliyuncs.com/compressed-images/compressed-images/Logistics%20Companies%20%281%29.png",
    caption: "Logistics Companies",
    text: "Will be able to register on the web app and purchase subscriptions. They will be able to view advertisements for logistics services and get in touch with the ad pos...",
    fulltext:
      "Will be able to register on the web app and purchase subscriptions. They will be able to view advertisements for logistics services and get in touch with the ad posters by viewing their details. They will be able to change the transit status of the orders thereby providing traceability.",
    link: "/#",
  },
  {
    img: "https://ajeoba-website.oss-eu-central-1.aliyuncs.com/compressed-images/compressed-images/Input%20Suppliers%20%281%29.png",
    caption: "Input Suppliers",
    text: "Will be able to manage input aggregation data, providing a centralized platform to collect, analyze, and distribute...",
    fulltext:
      "Will be able to manage input aggregation data, providing a centralized platform to collect, analyze, and distribute various agricultural inputs. They can assign the aggregated input to multiple farmers and cooperatives, streamlining the supply chain process.",
    link: "/#",
  },
  {
    img: "https://ajeoba-website.oss-eu-central-1.aliyuncs.com/compressed-images/compressed-images/Corporate%20Buyers%20%281%29.png",
    caption: "Corporate Buyers ",
    text: "Will be able to connect with sellers of agricultural produce. Provide feedback for sellers and logistics companies...",
    fulltext:
      "Will be able to connect with sellers of agricultural produce, enabling smooth interactions and transactions within the agricultural market. Additionally, they can offer valuable feedback for sellers and logistics companies, contributing to improved operations and better service quality.",
    link: "/#",
  },
  {
    img: "https://ajeoba-website.oss-eu-central-1.aliyuncs.com/compressed-images/compressed-images/Financial%20Companies%2C%20E-extension%20Officers%20and%20others%20%281%29-min.png",
    caption: "Financial Companies, E-extension Officers, etc",
    text: "Will be able to leverage our platform to access comprehensive financial data, collaborate...",
    fulltext:
      "Will be able to leverage our platform to access comprehensive financial data, collaborate closely with smallholder farmers, and provide highly tailored financial services. They can utilize detailed insights to customize financial offerings specifically for the agricultural community.",
    link: "/#",
  },
];
