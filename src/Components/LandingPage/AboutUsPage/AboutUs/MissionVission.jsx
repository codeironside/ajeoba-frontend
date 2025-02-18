import React from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { aboutUs } from "../AboutUs";

import { vission, mission } from "../../../../Constant/AppConstant";

function MissionVission() {
  const isSmallScreen = useMediaQuery("(max-width: 1200px)");

  return (
    <Box sx={aboutUs.missionvisionparenctcontainer}>
      <Box sx={aboutUs.missionvisioncontainer}>
        <Box sx={aboutUs.mission}>
          <Typography sx={aboutUs.textheader}>Our Mission</Typography>
          <Typography sx={aboutUs.leftSectiontext}>
            To develop an eco-system for Agro-allied businesses, leveraging
            technology as an alternative to the current inefficient physical
            structure.
          </Typography>
          <img src={mission} alt="img" style={aboutUs.bannerimg} />
        </Box>
        <Box sx={aboutUs.vission}>
          <img src={vission} alt="img" style={aboutUs.bannerimg} />
          {!isSmallScreen && (
            <Typography sx={aboutUs.textheader}>Our Vission</Typography>
          )}
          <Typography sx={aboutUs.leftSectiontext}>
            To develop an eco-system for Agro-allied businesses, leveraging
            technology as an alternative to the current inefficient physical
            structure.
          </Typography>
          {isSmallScreen && (
            <Typography sx={aboutUs.textheader}>Our Vission</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default MissionVission;
