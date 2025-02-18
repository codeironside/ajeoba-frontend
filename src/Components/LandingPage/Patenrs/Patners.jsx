import React from "react";
import { Box } from "@mui/material";
import { patners } from "../../../Constant/AppConstant";
import { makeStyles } from "@mui/styles";

function Patners() {
  const classes = useStyles();

  const duplicatedPartners = patners
    .concat(patners)
    .concat(patners)
    .concat(patners);

  return (
    <Box
      sx={{
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
        Our Trusted partners
      </Box>
      <Box sx={{ display: "grid", placeItems: "center" }}>
        <Box className={classes.slider}>
          <Box className={classes.slidetrack}>
            {duplicatedPartners?.map((item, index) => (
              <img
                key={index}
                className={classes.slide}
                src={item.img}
                alt={`Partner ${index}`}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Patners;

const useStyles = makeStyles((theme) => ({
  slide: {
    height: "8rem",
    width: "15rem",
    alignItems: "center",
    display: "flex",
    margin: "0 2rem",
    perspective: "7.14rem",
    [theme.breakpoints.down("md")]: {
      width: "6rem",
      height: "3rem",
    },
    [theme.breakpoints.down("sm")]: {
      width: "4rem",
      height: "2.5rem",
      margin: "0 1rem",
    },
    [theme.breakpoints.down("xs")]: {
      width: "2rem",
    },
  },
  "@keyframes scroll": {
    "0%": { transform: "translateX(0)" },
    "100%": {
      transform: "translateX(calc(10.86rem * 9))",
    },
  },

  slider: {
    height: "17rem",
    margin: "auto",
    position: "relative",
    width: "100%",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
    "@media(max-width: 768px)": {
      height: "14rem",
    },
    "@media(max-width: 468px)": {
      height: "10rem",
    },
  },

  slidetrack: {
    display: "flex",
    width: "calc(10.86rem * 18)",
    animation: "scroll 30s linear infinite",
    scrollSnapType: "x mandatory",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "@media(max-width: 768px)": {},
    "@media(max-width: 468px)": {
      animation: "scroll 40s linear infinite",
    },
  },

  img: {
    width: "100%",
  },
}));
