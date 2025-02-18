import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { whoneeds } from "./WhoNeedsTheSoftware";

import {
  logcompanybdekstop,
  logcompanymobile,
} from "../../../Constant/AppConstant";


function Logisticscomp() {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  return (
    <div>
      {!isSmallScreen ? (
        <Box sx={whoneeds.marketarbparent}>

          <Box sx={whoneeds.marketarbittextcontent}>
            <Typography sx={whoneeds.textheader}>Logistics Company</Typography>
            <Typography sx={whoneeds.bottomtext}>
              Logistics Company will be able to register on the web app and
              purchase subscriptions. They will be able to view advertisements
              for logistics services and get in touch with the ad posters by
              viewing their details. They will be able to change the transit
              status of the orders thereby providing traceability.
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box sx={whoneeds.marketarbparentsm}>
          <Box sx={whoneeds.bannerimg}>
            <img src={logcompanymobile} alt="img" style={whoneeds.bannerimg} />
          </Box>
          <Box sx={whoneeds.logisticscompanytextcontentsm}>
            <Typography sx={whoneeds.textheader}>Logistics Company</Typography>
            <Typography sx={whoneeds.bottomtext}>
              Logistics Company will be able to register on the web app and
              purchase subscriptions. They will be able to view advertisements
              for logistics services and get in touch with the ad posters by
              viewing their details. They will be able to change the transit
              status of the orders thereby providing traceability.
            </Typography>
          </Box>
        </Box>
      )}
    </div>
  );
}

export default Logisticscomp;
