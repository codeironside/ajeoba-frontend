import React from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";

import { valueprop } from "./Valueprop";

import { valueproppropinvflower } from "../../../../Constant/AppConstant";

function PropInv() {
  return (
    <Box sx={valueprop.propinvparentcontainer}>
      <Box sx={valueprop.propinvcontainer}>
        <Box sx={valueprop.leftcontainer}>
          <Box sx={valueprop.leftcontainerinnercontent}>
            <Typography sx={valueprop.textheaderwhite}>
              Proprietary Investment
            </Typography>
            <Typography sx={valueprop.bottomtextwhite}>
              Ajeoba is working to build a diversified investment portfolio
              within the agricultural sector, creating high-yield investment
              opportunities for investors.
            </Typography>
            <Typography sx={valueprop.bottomtextwhite}>
              These opportunities are open to investors within and outside the
              agricultural for the purpose of testing new investment strategies,
              instruments or markets. Group subsidiaries can also invest in
              newly launched titled funds, client funds or SPVs. Such
              opportunities include: Set up and management of fisheries, set up
              of greenhouses, trade facilitation, set up of processing plants.
            </Typography>
          </Box>
        </Box>
        <Box sx={valueprop.rightcontainer}>
          {" "}
          <img
            src={valueproppropinvflower}
            alt="img"
            style={valueprop.bannerimg}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default PropInv;
