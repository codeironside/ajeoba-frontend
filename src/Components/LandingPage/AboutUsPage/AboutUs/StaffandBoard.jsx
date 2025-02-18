import React from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { aboutUs } from "../AboutUs";

import { boardpeople, managestaff } from "../../../../Constant/AppConstant";

function StaffandBoard() {
  return (
    <Box sx={aboutUs.container}>
      <Box sx={aboutUs.sections}>
        <Typography sx={{ ...aboutUs.header, color: "#090909" }}>
          The Board
        </Typography>
        <Box sx={aboutUs.board1}>
          {boardpeople.map((item, index) => (
            <Box key={index} sx={aboutUs.memembers}>
              <img src={item.img} alt="img" style={aboutUs.banerimg} />
              <Typography sx={aboutUs.boardname}>{item.name}</Typography>
              <Typography sx={aboutUs.boardrole}>{item.role}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={aboutUs.sections}>
        <Typography sx={{ ...aboutUs.header, color: "#090909" }}>
          The Management Staff
        </Typography>
        <Box sx={aboutUs.board1}>
          {managestaff.map((item, index) => (
            <Box key={index} sx={aboutUs.memembers}>
              <img src={item.img} alt="img" style={aboutUs.banerimg} />
              <Typography sx={aboutUs.boardname}>{item.name}</Typography>
              <Typography sx={aboutUs.boardrole}>{item.role}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default StaffandBoard;

