import React from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { valueprop } from "./Valueprop";

import { valuepropdigitalinfrasture } from "../../../../Constant/AppConstant";

function DigInfra() {
  return (
    <Box sx={valueprop.diginfParentContainer}>
      <Box sx={valueprop.diginfContainer}>
        <Box sx={valueprop.imgContainer}>
          <img
            src={valuepropdigitalinfrasture}
            alt="img"
            style={valueprop.bannerimg}
          />
          <Box sx={valueprop.imgBottomTextContainer}>
            <Typography sx={valueprop.imgBottomText}>
              “Eliminating transaction friction between sellers and buyers with
              digital infrastructure”
            </Typography>
          </Box>
        </Box>
        <Box sx={valueprop.textContainter}>
          <Typography sx={valueprop.textheader}>
            Digital Infrastructure
          </Typography>{" "}
          <Typography sx={valueprop.bottomtext}>
            The company’s digital platform primarily creates an interface
            between sellers (farmers, producers, and aggregators) and buyers
            (consumers, aggregators, industrials, and exporters) of agricultural
            products and related transactions leveraging information technology
            to eliminate transaction friction and enhance supply chain
            efficiency. To this end, our business model underpinned by our
            robust software will deliver significant gains in the sector
            including but not limited to: Quality assurance (post/pre-harvest),
            Warehousing/inventory, Logistics and traceability, Input supply,
            etc.
          </Typography>{" "}
        </Box>
      </Box>
    </Box>
  );
}

export default DigInfra;
