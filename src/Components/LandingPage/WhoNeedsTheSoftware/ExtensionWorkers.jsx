import React from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { whoneeds } from "./WhoNeedsTheSoftware";

import { otherperosnas2, otherperosnas4 } from "../../../Constant/AppConstant";

function ExtensionWorkers() {
  const isSmallScreen = useMediaQuery("(max-width: 900px)");

  return (
    <div>
      <Box sx={whoneeds.databaseparentconteaniner}>
        {/* <Box sx={whoneeds.leftcontainerinnerontent}> */}

        <Box sx={whoneeds.databasetoptextcontainerextention}>
          <Typography sx={whoneeds.textheader}>
            Financial Companies, E-extension Officers, etc
          </Typography>
          <Typography sx={whoneeds.databasetoptextextention}>
            Financial Companies will be able to leverage our platform to access
            comprehensive financial data, collaborate closely with smallholder
            farmers, and provide highly tailored financial services. They can
            utilize detailed insights to customize financial offerings
            specifically for the agricultural community.
          </Typography>
        </Box>
      </Box>
      <Box sx={whoneeds.databasebottomcontent}>
        {!isSmallScreen ? (
          <img src={otherperosnas4} alt="img" style={whoneeds.bannerimg} />
        ) : (
          <img src={otherperosnas2} alt="img" style={whoneeds.bannerimg} />
        )}
      </Box>
    </div>
  );
}

export default ExtensionWorkers;
