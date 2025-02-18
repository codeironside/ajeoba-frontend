import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { aboutUs } from "../AboutUs";

import { corevalues } from "../../../../Constant/AppConstant";

function CoreValues() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Box sx={aboutUs.parentContainer}>
      <Box sx={aboutUs.innerContainer}>
        <Box sx={aboutUs.toptext}>
          <Typography sx={aboutUs.header}>Ajeoba’s Core Values</Typography>
          <Typography sx={aboutUs.bottomtextdd}>
            Our core values center on user-centric excellence, leveraging
            top-notch human resources and technology with unwavering commitment
            to ethics. We strive for continuous improvement through digital
            innovation and world-class technology.
          </Typography>
        </Box>
        <Box sx={aboutUs.corevaluebottom}>
          {corevalues.map((item, index) => (
            <Box
              key={index}
              sx={aboutUs.corevalueimgs(
                isMobile,
                index === corevalues.length - 1
              )}
            >
              <img src={item.img} alt="img" style={aboutUs.bannerimgcovalues} />
              <Typography sx={aboutUs.corvalname}>{item.name}</Typography>
              <Typography sx={aboutUs.corvaltext}>{item.text}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default CoreValues;
