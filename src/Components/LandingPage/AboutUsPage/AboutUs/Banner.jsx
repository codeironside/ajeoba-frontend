import React from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { aboutUs } from "../AboutUs";

import { banner, bannermobile } from "../../../../Constant/AppConstant";


function Banner() {
  const isSmallScreen = useMediaQuery("(max-width: 900px)");

    return (
      <Box>
        <Box sx={aboutUs.bannerContainer}>
          {!isSmallScreen ? (
            <img src={banner} alt="banner" style={aboutUs.bannerimg} />
          ) : (
            <img src={bannermobile} alt="banner" style={aboutUs.bannerimg} />
          )}
        </Box>
        <Box sx={aboutUs.titlebg}>
          <Typography sx={aboutUs.title}>about ajeoba</Typography>
        </Box>
      </Box>
    );
}

export default Banner;
