import React from "react";
import "../css/style.css";
import { Typography, Box } from "@mui/material";
import { value_bottom } from "../../../Constant/AppConstant";
import { makeStyles } from "@mui/styles";

function DigitalInfra() {
  const classes = useStyles();

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          zIndex: 100,
          "@media(max-width: 768px)": {
            // padding: "1rem 0 ",
          },
          "@media(max-width: 468px)": {
            padding: "1rem 0 1rem 0",
          },
        }}
      >
        <Box
          sx={{
            contain: "content",
            display: "flex",
            flexDirection: "row",
            height: "fit-content",
            zIndex: "1000",
            gap: "4rem",
            width: "90%",
            justifyContent: "center",
            boxSizing: "border-box",
            margin: "0 auto",
            padding: "3rem 0",
            "@media(max-width:1300px)": {
              padding: "3rem 0",
              gap: "2rem",
            },
            "@media(max-width:900px)": {
              flexDirection: "column-reverse",
              height: "100%",
              margin: "0 auto",
              alignItems: "center",
              padding: "3rem 0",
              gap: "2rem",
              width: "80%",
            },
            "@media(max-width:600px)": {
              flexDirection: "column-reverse",
              gap: "2rem",
              padding: "1rem 0",
              width: "90%",
            },
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              height: "fit-content",
              flexDirection: "column",
              "@media(max-width: 600px)": {
                width: "100%",
              },
            }}
          >
            <img
              rel="preload"
              as="image"
              src="https://ajeoba-website.oss-eu-central-1.aliyuncs.com/compressed-images/compressed-images/digital_bttbnk.png"
              alt="digital"
              className={classes.digitalImage}
            />
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              height: "fit-content",
              flexDirection: "column",
              // "@media(min-width: 1500px)": {
              //   margin: "0 auto",
              // },
            }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                color: "#006d33",
                marginBottom: "1.2rem",
                fontFamily: "DM Sans",
                "@media(max-width: 1900px)": {
                  lineHeight: "4rem",
                  fontSize: "2rem",
                },
                "@media(max-width: 1500px)": {
                  lineHeight: "3rem",
                  fontSize: "1.8rem",
                },
                "@media(max-width: 768px)": {
                  lineHeight: "2rem",
                  fontSize: "1.6rem",
                },
                "@media(max-width: 468px)": {
                  lineHeight: "1.5rem",
                  fontSize: "1.2rem",
                  marginBottom: "1rem",
                },
              }}
            >
              Digital infrastructure provider for the agriculture value chain
            </Typography>
            <Typography
              sx={{
                color: "#585858",
                textAlign: "justify",
                fontFamily: "DM Sans",
                "@media(max-width: 1900px)": {
                  lineHeight: "3rem",
                  fontSize: "1.8rem",
                },
                "@media(max-width: 1500px)": {
                  lineHeight: "2rem",
                  fontSize: "1.2rem",
                },
                "@media(max-width:768px)": {
                  lineHeight: "2rem",
                  fontSize: "1rem",
                },
                "@media(max-width: 468px)": {
                  lineHeight: "1.8rem",
                  fontSize: "1rem",
                },
              }}
            >
              Ajeoba Exchange is a digital infrastructure provider focused on
              bridging various gaps identified in the agricultural value chain.{" "}
              <br></br>
              <br></br>In line with the Sustainable Development Goals (SDGs), We
              are working to develop an ecosystem for Agro-allied businesses,
              leveraging technology as an alternative to the current,
              inefficient physical infrastructure and serving as the integrator
              cum operator at the centre of the Agri-ecosystem in Africa.
            </Typography>
          </Box>
        </Box>
        <img
          src={value_bottom}
          alt="digital"
          className={classes.cropimg}
        />
      </Box>
    </>
  );
}

export default DigitalInfra;

const useStyles = makeStyles((theme) => ({
  digitalImage: {
    width: "100%",
    height: "auto",
  },
  cropimg: {
    position: "absolute",
    right: "0",
    bottom: "0",
    width: "25.84rem",
    height: "18.65rem",
    "@media(max-width: 768px)": {
      width: "20.84rem",
      height: "14.65rem",
    },
    "@media(max-width: 468px)": {
      width: "16.84rem",
      height: "14.65rem",
    },
  },
}));
