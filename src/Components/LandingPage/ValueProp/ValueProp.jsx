import React from "react";
import { useNavigate } from "react-router";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { valuePropImgs, vlogo } from "../../../Constant/AppConstant";

function ValueProp() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: "#F0F5EC",
        padding: "3rem 0 4rem 0",
        "@media(max-width: 768px)": {
          padding: "2rem 0 2rem 0",
        },
        "@media(max-width: 468px)": {
          padding: "2rem 0 2rem 0",
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
        Our Value Proposition
      </Box>
      <Box
        sx={{
          width: "90%",
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          margin: "2rem auto",
          cursor: "pointer",
          fontFamily: "DM Sans",
          "@media(max-width: 900px)": {
            gap: ".5rem",
          },
          "@media(max-width: 468px)": {
            gap: "1rem",
          },
        }}
      >
        {valuePropImgs.map((item, index) => (
          <Box className={classes.container} key={index}>
            <Box>
              <img src={item.img} alt="Atar" className={classes.image} />
            </Box>
            <div className={classes.caption}>{item.caption}</div>
            <div className={classes.overlay}>
              <div className={classes.text}>{item.text}</div>
              <div
                onClick={() => navigate(`/our-value-proposition#${item.id}`)}
                className={classes.readmore}
                sx={{ cursor: "pointer" }}
              >
                <span>Read More </span>
                <img
                  src={vlogo}
                  alt="Read More"
                  className={classes.arrowIcon}
                />
              </div>
            </div>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ValueProp;

const useStyles = makeStyles((theme) => ({
  container: {
    width: "30%",
    position: "relative",
    margin: "0 auto",
    "&:hover $overlay": {
      height: "100%",
    },
    "&:hover $caption": {
      opacity: 0,
    },
    "@media(max-width: 900px)": {
      "&:hover $overlay": {
        height: "100%",
      },
      // fontSize: "16px",
      width: "45%",
    },
    "@media(max-width: 600px)": {
      // fontSize: "16px",
      width: "100%",
    },
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: ".5rem",
    "@media(max-width: 768px)": {},
    "@media(max-width: 468px)": {
      width: "100%",
    },
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    overflow: "hidden",
    width: "100%",
    borderRadius: "8px",
    height: 0,
    transition: "height 0.5s ease",
    fontFamily: "DM Sans",
  },
  caption: {
    color: "white",
    fontSize: "1.1rem",
    fontWeight: "700",
    position: "absolute",
    lineHeight: "24px",
    width: "100%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    fontFamily: "DM Sans",
    "@media(max-width: 1900px)": {
      fontSize: "2rem",
    },
    "@media(max-width: 1500px)": {
      fontSize: "1.1rem",
    },
    "@media(max-width: 900px)": {
      fontSize: "18px",
    },
    "@media(max-width: 600px)": {
      fontSize: "16px",
    },
    "@media(max-width: 300px)": {
      fontSize: ".6rem",
      lineHeight: ".5rem",
    },
  },
  text: {
    color: "white",
    width: "80%",
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    // lineHeight: "4rem",
    "@media(max-width: 1900px)": {
      fontSize: "1.35rem",
      lineHeight: "2.5rem",
    },
    "@media(max-width: 1500px)": {
      fontSize: "1rem",
      lineHeight: "1.8rem",
    },
    "@media(max-width: 1200px)": {
      fontSize: ".8rem",
      lineHeight: "1.5rem",
    },
    "@media(max-width: 900px)": {
      fontSize: "14px",
      lineHeight: "1.8rem",
    },
    "@media(max-width: 600px)": {
      fontSize: "1rem",
      lineHeight: "2rem",
    },
    "@media(max-width: 400px)": {
      fontSize: "1rem",
      lineHeight: "1.5rem",
    },
    "@media(max-width: 300px)": {
      fontSize: ".7rem",
      lineHeight: "1rem",
    },
  },
  readmore: {
    color: "#006d33",
    fontSize: "1rem",
    fontWeight: "700",
    lineHeight: "1.55rem",
    position: "absolute",
    top: "85%",
    left: "37%",
    "&:hover": {
      color: "#6D9E3F",
    },
    "@media(max-width: 600px)": {
      fontSize: "1rem",
      lineHeight: "1rem",
    },
    "@media(max-width: 300px)": {
      fontSize: ".8rem",
      lineHeight: ".8rem",
      top: "80%",
    },
  },
  // arrowIcon: {
  //   "@media(max-width: 300px)": {
  //     width: "1rem",
  //   },
  // },
}));

