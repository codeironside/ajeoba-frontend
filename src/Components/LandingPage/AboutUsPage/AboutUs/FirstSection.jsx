import React from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { aboutUs } from "../AboutUs";

import { firsrtsection } from "../../../../Constant/AppConstant";

function FirstSection() {
  return (
    <Box sx={aboutUs.firstSectionparentcontainer}>
      <Box sx={aboutUs.firstSection}>
        <Box sx={aboutUs.leftSection}>
          <Typography sx={aboutUs.leftSectiontext}>
            Ajeoba is an investment agriculture value-chain digital
            infrastructure provider focused on bridging various gaps identified
            in the agricultural value chain. In line with the Sustainable
            Development Goals, the company is working to develop an ecosystem
            for Agro-allied businesses, leveraging technology as an alternative
            to the current, inefficient physical infrastructure and serving as
            the integrator cum operator at the center of the Agri-ecosystem in
            Africa. Our platform is an innovative approach that we believe will
            change the landscape and improve the way agricultural products are
            grown, traded, financed, and delivered in Africa in a transparent
            and more efficient way.
          </Typography>
        </Box>
        <Box sx={aboutUs.rightSection}>
          <img src={firsrtsection} alt="img" style={aboutUs.bannerimg} />
        </Box>
      </Box>
    </Box>
  );
}

export default FirstSection;
