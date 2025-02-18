import React from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { valueprop } from "./Valueprop";

function TitleSection() {
  return (
    <div>
      <Box sx={valueprop.titlebg}>
        <Typography sx={valueprop.title}>our value proposition</Typography>
      </Box>
      <Box sx={valueprop.titledetails}>
        <Typography sx={valueprop.titledetailstext}>
          Ajeoba provides a comprehensive suite of agricultural solutions,
          including proprietary investments, digital infrastructure, and an
          intrinsic database for farmer empowerment. Our financial services
          cater to agricultural needs, ensuring seamless transactions and
          economic empowerment. With market arbitrage capabilities, our company
          significantly contributes to Nigeria's agricultural value chain
          efficiency.{" "}
        </Typography>
      </Box>
    </div>
  );
}

export default TitleSection;
