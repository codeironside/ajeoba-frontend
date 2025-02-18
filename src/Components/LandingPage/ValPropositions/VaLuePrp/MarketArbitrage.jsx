import React from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import marketarbitagebg from "../../Homepage/Images/marketarbg.png";
import marketarbitagesm from "../../Homepage/Images/marketarbsm.png";
import { valueprop } from "./Valueprop";

import { valuepropmarketarbitargedesktop } from "../../../../Constant/AppConstant";

function MarketArbitrage() {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  return (
    <>
      {!isSmallScreen ? (
        <Box sx={valueprop.marketarbparent}>
          <Box sx={valueprop.marketarbbgimgbig}>
            <img
              src={valuepropmarketarbitargedesktop}
              alt="img"
              style={valueprop.bannerimg}
            />
          </Box>
          <Box sx={valueprop.marketarbittextcontent}>
            <Typography sx={valueprop.textheader}>Market Arbitrage</Typography>
            <Typography sx={valueprop.bottomtext}>
              Building a B2B2C marketplace for farmers creating seamless
              linkages to off takers (small or large scale), enabling and
              facilitating the sale of high-quality agricultural produce. <br />
              This reduces hands-off and expedites farm-to-market time thereby
              reducing wastage and regulating pricing/market inefficiencies. By
              this, farmers have access to large markets, selling off farm
              produce within days/weeks at a significant margin. <br />
              {/* Leverage the opportunity of pricing/market inefficiencies by
              off-taking farm produce at the end of the produce’s season to sell
              within days/weeks at a significant margin. */}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box sx={valueprop.marketarbparentsm}>
          <Box sx={valueprop.bannerimg}>
            <img src={marketarbitagesm} alt="img" style={valueprop.bannerimg} />
          </Box>
          <Box sx={valueprop.marketarbparemntlowercontent}>
            <Typography sx={valueprop.textheader}>Market Arbitrage</Typography>
            <Typography sx={valueprop.bottomtext}>
              Building a B2B2C marketplace for farmers creating seamless
              linkages to off takers (small or large scale), enabling and
              facilitating the sale of high-quality agricultural produce. <br />
              This reduces hands-off and expedites farm-to-market time thereby
              reducing wastage and regulating pricing/market inefficiencies. By
              this, farmers have access to large markets, selling off farm
              produce within days/weeks at a significant margin. <br />
              Leverage the opportunity of pricing/market inefficiencies by
              off-taking farm produce at the end of the produce’s season to sell
              within days/weeks at a significant margin.
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
}

export default MarketArbitrage;
