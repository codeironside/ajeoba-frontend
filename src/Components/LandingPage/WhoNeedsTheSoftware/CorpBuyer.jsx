import React from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { whoneeds } from "./WhoNeedsTheSoftware";

import { corpobuyerlady } from "../../../Constant/AppConstant";

function CorpBuyer() {
  return (
    <Box sx={whoneeds.corpbuyercontainer}>
      <Box sx={whoneeds.leftcontainercorpbuyer}>
        <Box sx={whoneeds.leftcontainerinnercontent}>
          <Typography sx={whoneeds.textheaderwhite}>Corporate Buyer</Typography>
          <Typography sx={whoneeds.bottomtextwhite}>
            Corporate Buyer will be able to connect with sellers of agricultural
            produce, enabling smooth interactions and transactions within the
            agricultural market. Additionally, they can offer valuable feedback
            for sellers and logistics companies, contributing to improved
            operations and better service quality.
          </Typography>
        </Box>
      </Box>
      <Box sx={whoneeds.rightcontainer}>
        {" "}
        <img
          src={corpobuyerlady}
          alt="img"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
    </Box>
  );
}

export default CorpBuyer;
