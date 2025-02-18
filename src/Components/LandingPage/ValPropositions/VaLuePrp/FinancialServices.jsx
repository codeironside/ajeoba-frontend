import React from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import finaservicesbg from "../../Homepage/Images/finservicerightimg.png";
import { valueprop } from "./Valueprop";

function FinancialServices() {
  return (
    <Box sx={valueprop.finserviceparentcontainer}>
      <Box sx={valueprop.finservicecontainer}>
        <Box sx={valueprop.finservicelefttcontainer}>
          <Typography sx={valueprop.textheaderwhite}>
            Financial Services
          </Typography>
          <Typography sx={valueprop.bottomtextwhite}>
            Ajeoba seeks to bridge the financing gap for smallholder farmers
            across Nigeria.<br></br>
            Using our robust farmer verification and KYC structure, farmers
            verified on our platform can gain access to small loans to boost
            agricultural process. Farmers through registered cooperative
            associations can apply for international grants and aid to increase
            productivity.
          </Typography>
          <Typography sx={valueprop.bottomtextwhite}>
            The sole aim of this is to directly impact the lives of small holder
            farmers, creating increased all round agricultural yield. Qualified
            loan amounts will be based on: Historical Farm Yield and current
            Prices of Commodities.
          </Typography>
        </Box>
        <Box sx={valueprop.finservicerightcontainer}>
          <img src={finaservicesbg} alt="img" style={valueprop.bannerimg} />
        </Box>
      </Box>
    </Box>
  );
}

export default FinancialServices;
