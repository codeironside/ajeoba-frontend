import React from "react";
import { exploreSection } from "./ExploreSection";
import { Box, Typography, Button } from "@mui/material";
import { exploreimg } from "../../../../Constant/AppConstant.js";

function ExploreSection() {
  return (
    <Box sx={exploreSection.background}>
      <Box sx={exploreSection.textcontent}>
        <Box sx={exploreSection.topcontemttext}>
          <Typography sx={exploreSection.header}>AJEOBA MARKETPLACE</Typography>
          <Typography sx={exploreSection.header2}>
            Explore high quality farm products and inputs
          </Typography>
        </Box>
        <Box sx={exploreSection.bottomContent}>
          <Box sx={exploreSection.exploreImageLeftContainer}>
            <img
              src={exploreimg}
              alt="exploreimg"
              style={exploreSection.exploreImageLeft}
            />
          </Box>

          <Box sx={exploreSection.exploreContentright}>
            <Typography sx={exploreSection.exploreContentrightText}>
              At our marketplace, we're not just selling farm products and
              inputs; we're offering you a pathway to seamless transactions
              within the value chain.
            </Typography>
            <Typography sx={exploreSection.exploreContentrightText}>
              We connect buyers and sellers to a robust and interactive B2B/B2C
              digital storefront for quality agricultural produce and inputs. A
              virtual space to showcase and transact seamlessly, offering you
              top notch payment settlement services and real time order/delivery
              tracking.
            </Typography>
            <Typography sx={exploreSection.exploreContentrightText}>
              Visit our marketplace today and explore the world of high-quality
              farm products and inputs
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ExploreSection;
