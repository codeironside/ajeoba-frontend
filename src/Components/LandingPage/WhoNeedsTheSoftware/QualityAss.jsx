import React from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { whoneeds } from "./WhoNeedsTheSoftware";

import { qaguy } from "../../../Constant/AppConstant";

function QualityAss() {
  return (
    <Box sx={whoneeds.qacontainer}>
      <Box sx={whoneeds.leftcontainer}>
        <Box sx={whoneeds.leftcontainerinnercontent}>
          <Typography sx={whoneeds.textheaderwhite}>
            Quality Assurance
          </Typography>
          <Typography sx={whoneeds.bottomtextwhite}>
            Quality Assurance will be able to register on the web app and
            purchase subscriptions, view advertisements for quality checks, and
            get in touch with the ad posters by viewing their details.
          </Typography>
        </Box>
      </Box>
      <Box sx={whoneeds.rightcontainer}>
        {" "}
        <img
          src={qaguy}
          alt="img"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
    </Box>
  );
}

export default QualityAss;
