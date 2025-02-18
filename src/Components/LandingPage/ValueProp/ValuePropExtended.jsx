import React from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import NavBar from "../NavBar/NavBar.jsx";
import Footer from "../Footer/Footer";
import "../css/style.css";
import { imgs, vpextended } from "../../../Constant/AppConstant.js";


const ValuePropExtended = () => {
  const classes = useStyles();

  return (
    <Box>
      <NavBar />
      <Box>
        <img
          src={vpextended}
          alt="faq header"
          style={{ width: "100%" }}
        />
      </Box>
      <Box className={classes.lgContianer}>
        <Box
          sx={{
            width: "90%",
            margin: "2rem auto",
            "@media (max-width: 768px)": {
              margin: "3rem auto",
            },
            "@media (max-width: 480px)": {
              margin: "2rem auto",
            },
          }}
        >
          {imgs.map((item, index) => {
            const altImage = index % 2 === 0;
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  margin: "4rem 0",
                  gap: "4rem",
                  justifyContent: "center",
                  alignItems: "center",
                  "@media(max-width:768px)": {
                    flexDirection: "column",
                  },
                  "@media(max-width:468px)": {
                    width: "100%",
                  },
                }}
              >
                {altImage ? (
                  <>
                    <Box
                      id={item.id}
                      sx={{
                        flex: 1,
                        display: "flex",
                        height: "fit-content",
                        flexDirection: "column",
                        "@media(max-width:768px)": {
                          width: "50rem",
                        },
                        "@media(max-width:468px)": {
                          width: "100%",
                        },
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
                        {item.caption}
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
                        {item.text}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        height: "fit-content",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        style={{ flex: 1 }}
                        src={item.img}
                        alt={`image ${index}`}
                      />
                    </Box>
                  </>
                ) : (
                  <>
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        height: "fit-content",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        style={{ flex: 1 }}
                        src={item.img}
                        alt={`image ${index}`}
                      />
                    </Box>

                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        height: "fit-content",
                        flexDirection: "column",
                        "@media(max-width:768px)": {
                          width: "50rem",
                        },
                        "@media(max-width:468px)": {
                          width: "100%",
                        },
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
                        {item.caption}
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
                        {item.text}
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box className={classes.smContianer}>
        {imgs.map((item, index) => (
          <Box
            key={index}
            sx={{
              margin: "4rem auto",
              "@media(max-width: 900px)": { margin: "3rem auto" },
              "@media(max-width: 468px)": { margin: "2rem auto" },
            }}
          >
            <Typography
              sx={{
                "@media(max-width: 1300px)": {
                  fontWeight: "700",
                  lineHeight: "3.5rem",
                  fontSize: "2.7rem",
                  color: "#006d33",
                  marginBottom: "1.5rem",
                  fontFamily: "DM Sans",
                },
                "@media(max-width: 900px)": {
                  fontSize: "2.9rem",
                },
                "@media(max-width: 468px)": {
                  lineHeight: "1.5rem",
                  fontSize: "1.2rem",
                  marginBottom: "1rem",
                },
              }}
            >
              {item.caption}
            </Typography>
            <img
              style={{ width: "100%" }}
              src={item.img}
              alt={`image ${index}`}
            />
            <Typography
              sx={{
                marginTop: "1rem",
                color: "#585858",
                textAlign: "justify",
                fontFamily: "DM Sans",
                "@media(max-width: 1300px)": {
                  lineHeight: "4rem",
                  fontSize: "2rem",
                },
                "@media(max-width: 900px)": {
                  lineHeight: "4rem",
                  fontSize: "1.5rem",
                },
                "@media(max-width: 468px)": {
                  lineHeight: "1.8rem",
                  fontSize: "1rem",
                },
              }}
            >
              {item.text}
            </Typography>
          </Box>
        ))}
      </Box>
      <Footer />
    </Box>
  );
};

export default ValuePropExtended;

const useStyles = makeStyles((theme) => ({
  lgContianer: {
    display: "block",
    margin: "3rem auto",
    "@media(max-width:1300px)": {
      display: "none",
    },
    "@media(max-width: 468px)": {},
  },
  smContianer: {
    width: "90%",
    display: "none",
    "@media(max-width:1300px)": {
      display: "block",
      margin: "2rem auto",
    },
    "@media(max-width: 468px)": {},
  },
}));
