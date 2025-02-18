import React from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { valueprop } from "./Valueprop";

import {
  valuepropbannerdesktop,
  valuepropbannermobile,
} from "../../../../Constant/AppConstant";

function Banner() {
  const isSmallScreen = useMediaQuery("(max-width: 900px)");

  return (
    <Box sx={valueprop.bannerContainer}>
      {!isSmallScreen ? (
        <img
          src={valuepropbannerdesktop}
          alt="banner"
          style={valueprop.bannerimg}
        />
      ) : (
        <img
          src={valuepropbannermobile}
          alt="banner"
          style={valueprop.bannerimg}
        />
      )}
    </Box>
  );
}

export default Banner;
