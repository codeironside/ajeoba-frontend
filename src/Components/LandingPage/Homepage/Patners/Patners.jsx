import React from "react";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
// import "@splidejs/react-splide/dist/css";

import { Typography, Box } from "@mui/material";
import { patnersstyle } from "./Patners.js";
import { patners } from "../../../../Constant/AppConstant.js";

function Patners() {
  return (
    <Box sx={patnersstyle.parentcontainer}>
      <Box sx={patnersstyle.container}>
        <Box sx={patnersstyle.topcontemttext}>
          <Typography sx={patnersstyle.header}>OUR PARTNERS</Typography>
          <Typography sx={patnersstyle.header2}>Trusted Partners</Typography>
        </Box>
        <Box>
          <Splide
            options={{
              type: "loop",
              drag: "free",
              arrows: false,
              pagination: false,
              perPage: 3,
              autoScroll: {
                pauseOnHover: false,
                pauseOnFocus: false,
                rewind: false,
                speed: 2,
              },
            }}
            extensions={{ AutoScroll }}
          >
            {patners.map((item, index) => (
              <SplideSlide key={index} style={patnersstyle.carousecontainerlimage}>
                <img
                  src={item.img}
                  alt="patners"
                  style={patnersstyle.carouselimage}
                />
              </SplideSlide>
            ))}
          </Splide>
        </Box>
      </Box>
    </Box>
  );
}

export default Patners;
