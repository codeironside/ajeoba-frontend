import React from "react";
import { Box, Typography } from "@mui/material";
import { commonStyles } from "../../Style/CommonStyle";
import AjTypography from "../AjTypography";
import vnin_input_img from "../../Assets/Images/vnin_input_2.png";

function VninModalContent() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        p: "30px",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", mb: "20px" }}>
        <AjTypography
          sx={{ fontWeight: "700", fontSize: "16px", color: "#006d33" }}
          displayText="What is vNIN?"
        />
        <AjTypography
          sx={{ fontWeight: "500", fontSize: "12px" }}
          displayText="The vNiN is the NIMC’s initiative to safeguard and keep your NIN private to you"
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", mb: "20px" }}>
        <AjTypography
          sx={{ fontWeight: "700", fontSize: "16px", color: "#006d33" }}
          displayText="How to generate vNIN via USSD?"
        />
        <AjTypography
          sx={{ fontWeight: "500", fontSize: "12px" }}
          displayText="For a user to generate a Virtual NIN via USSD, they will have to dial *346*3*`User's NIN*696739#."
        />

        <AjTypography
          sx={{ fontWeight: "500", fontSize: "12px" }}
          displayText="Use 696739 as the Agent Code"
        />

        <AjTypography
          sx={{ fontWeight: "500", fontSize: "12px" }}
          displayText="An SMS message will be sent back to the user containing the Virtual NIN generated for them. Enter the result in the input field below"
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", mb: "20px" }}>
        <AjTypography
          sx={{ fontWeight: "700", fontSize: "16px", color: "#006d33" }}
          displayText="How to generate vNIN via the NIMC app?"
        />
        <AjTypography
          sx={{ fontWeight: "500", fontSize: "12px" }}
          displayText="Download the NIMC App"
        />

        <AjTypography
          sx={{ fontWeight: "500", fontSize: "12px" }}
          displayText='Click on "Get Virtual NIN"'
        />

        <AjTypography
          sx={{ fontWeight: "500", fontSize: "12px" }}
          displayText='Select "Input Enterprise short-code" and type 696739 '
        />

        <AjTypography
          sx={{ fontWeight: "500", fontSize: "12px" }}
          displayText='Click "Submit" and your virtual NIN will be generated. Enter the result in the input field below'
        />

        <Typography
          component="img"
          src={vnin_input_img}
          sx={{ mt: '20px' }}
        />
      </Box>
    </Box>
  );
}

export default VninModalContent;
