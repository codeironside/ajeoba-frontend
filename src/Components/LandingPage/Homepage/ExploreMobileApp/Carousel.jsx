import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";

import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { Splide, SplideSlide } from '@splidejs/react-splide';
// import '@splidejs/react-splide/css';

import { exploremobileapp } from "./ExploreMobileApp.js";

import icon1 from "../Images/icon1.png";
import icon2 from "../Images/icon2.png";
import icon3 from "../Images/icon3.png";

function Carousel() {
  return (
    <div>
      <Splide
        options={{
          type: "loop",
          focus: "center",
          drag: "free",
          arrows: false,
          pagination: false,
          perPage: 4,
          autoScroll: {
            pauseOnHover: false,
            pauseOnFocus: false,
            rewind: false,
            speed: 3,
          },
        }}
        extensions={{ AutoScroll }}
      >
        {appfeatures.map((item, index) => (
          <SplideSlide
            key={index}
            style={exploremobileapp.carouselbottomcontent}
          >
            <img
              src={item.icon}
              alt="icons"
              style={exploremobileapp.carouselbottomiconcontent}
            />
            <Typography sx={exploremobileapp.carouselbottomcontenttext}>
              {item.text}
            </Typography>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}

export default Carousel;

const appfeatures = [
  {
    icon: icon1,
    text: "Quick and easy onboarding",
  },
  {
    icon: icon2,
    text: "Highly rated logistics",
  },
  {
    icon: icon3,
    text: "Quality products",
  },
  {
    icon: icon1,
    text: "20/7 support for customers and vendors",
  },
  {
    icon: icon2,
    text: "Updates on orders",
  },
];
