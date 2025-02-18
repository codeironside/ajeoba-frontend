import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import faq_header from "../../Assets/Images/faqsframe_fxcfur.svg"
import cancel from "../../Assets/Images/cancel_zulufn.svg";
import plus from "../../Assets/Images/plus_kgvx4z.svg";
import bgImage from "../../Assets/Images/backdrop_lc9aix.svg";


const FAQItem = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  const openAccord = () => {
    setOpen(!open);
  };

  return (
    <Box
      onClick={openAccord}
      sx={{
        cursor: "pointer",
        position: "relative",
        margin: "2rem auto 0 auto",
        width: "85%",
        padding: open ? "3rem" : "3rem",
        background: open ? `url(${bgImage})` : "#F0F5EC",
        backgroundSize: "cover",
        transition: "padding 0.3s ease, background 0.3s ease",
        fontFamily: "DM Sans",
        borderRadius: "4px",
        "@media (max-width: 1500px)": {
          padding: open ? "3rem" : "2rem",
        },
        "@media (max-width: 480px)": {
          padding: open ? "1rem" : "1rem",
        },
      }}
    >
      {open ? (
        <Typography
          sx={{
            width: "90%",
            textAlign: "left",
            marginLeft: "1rem",
            display: "flex",
            gap: "2.2rem",
            fontFamily: "DM Sans",

            "@media (max-width: 480px)": {
              gap: "1rem",
              marginLeft: "0",
              // width: "70%",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: "36px",
              fontWeight: "700",
              lineHeight: "35px",
              color: "white",
              fontFamily: "DM Sans",
              "@media (max-width: 1500px)": {
                fontSize: "32px",
                lineHeight: "32px",
              },
              "@media (max-width: 480px)": {
                fontSize: "18px",
                fontWeight: "700",
              },
            }}
          >
            {index < 10 ? `0${index + 1}` : index + 1}
          </Typography>
          <Typography>
            <Typography
              sx={{
                fontSize: "32px",
                fontWeight: "700",
                lineHeight: "32px",
                color: "white",
                fontFamily: "DM Sans",
                "@media (max-width: 1500px)": {
                  fontSize: "20px",
                  lineHeight: "22px",
                },
                "@media (max-width: 480px)": {
                  fontSize: "18px",
                  fontWeight: "700",
                },
              }}
            >
              {item.question}
            </Typography>
            <Typography
              sx={{
                fontSize: "30px",
                fontWeight: "400",
                lineHeight: "42px",
                color: "white",
                marginTop: "1rem",
                fontFamily: "DM Sans",
                "@media (max-width: 1500px)": {
                  fontSize: "20px",
                  lineHeight: "24.56px",
                },
                "@media (max-width: 480px)": {
                  fontSize: "14px",
                },
              }}
            >
              {item.answer}
            </Typography>
          </Typography>
        </Typography>
      ) : (
        <Typography
          sx={{
            textAlign: "left",
            marginLeft: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "2.2rem",
            color: "#003c1c",
            fontFamily: "DM Sans",
            "@media (max-width: 1500px)": {
              width: "90%",
            },
            "@media (max-width: 480px)": {
              marginLeft: ".2rem",
              gap: "1rem",
              width: "100%",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: "36px",
              fontWeight: "700",
              lineHeight: "35px",
              color: "#003C1C",
              fontFamily: "DM Sans",
              "@media (max-width: 1500px)": {
                fontSize: "32px",
                lineHeight: "42px",
              },
              "@media (max-width: 480px)": {
                fontSize: "18px",
                fontWeight: "700",
              },
            }}
          >
            {index < 10 ? `0${index + 1}` : index + 1}
          </Typography>
          <Typography
            sx={{
              fontFamily: "DM Sans",
              fontWeight: "500",
              fontSize: "32px",
              lineHeight: "32px",
              color: "#003C1C",
              "@media (max-width: 1500px)": {
                fontSize: "24px",
                lineHeight: "24.56px",
              },
              "@media (max-width: 480px)": {
                fontSize: "14px",
              },
            }}
          >
            {item.question}
          </Typography>
        </Typography>
      )}

      <Box
        sx={{
          "@media (max-width:480px)": {
            display: "none",
          },
        }}
      >
        <img
          src={open ? cancel : plus}
          alt="button"
          style={{
            position: "absolute",
            top: "50%",
            right: "20px",
            transform: "translateY(-50%)",
          }}
        />
      </Box>
    </Box>
  );
};

export default function CustomizedAccordions() {
  return (
    <Box>
      {/* <Box> */}
      <img
        src={faq_header}
        alt="faq header"
        style={{ width: "100%" }}
      />
      {/* </Box> */}

      <Box
        sx={{
          margin: "6rem 0",
          "@media (max-width:480px)": {
            margin: "2rem 0",
          },
        }}
      >
        {FAQs?.map((item, index) => (
          <FAQItem key={index} item={item} index={index} />
        ))}
      </Box>
    </Box>
  );
}

const FAQs = [
  {
    question: "What is Ajeoba?",
    answer:
      "Ajeoba is an agriculture value-chain digital infrastructure provider. We are creating an ecosystem for agro-allied businesses and value-creating activities leveraging digital, as an alternative to the current, inefficient physical infrastructure.",
  },
  {
    question: "How does Ajeoba work?",
    answer:
      "Serving as the integrator cum operator at the center of the ecosystem, Ajeoba’s digital marketplace platform primarily creates an interface between sellers (farmers, producers, and aggregators) and buyers (consumers, aggregators, industrials, and exporters) of agricultural products and related transweractions leveraging information technology to eliminate transweraction friction and enhance supply chain efficiency.",
  },
  {
    question: "Who can use Ajeoba?",
    answer:
      "Corporate Buyers, Farming Cooperatives/Associations, Aggregators, Input suppliers, and Quality Assurance companies",
  },
  {
    question:
      "What types of agricultural products can be bought and sold on Ajeoba?",
    answer:
      "Ajeoba deals in a variety of products including but not limited to grains, horticulture, tubers, Seeds, Industrial Crops, etc Please contact us to suggest something we might be missing out on.",
  },
  {
    question: "Are there any fees associated with using Ajeoba?",
    answer:
      "Yes, there are commissions associated with transweractions on Ajeoba.The commission varies per product and can be seen during the product upload and purchase process.",
  },
];
