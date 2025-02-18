import React from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { whoneeds } from "./WhoNeedsTheSoftware";


function Title() {
    return (
      <div>
        <Box sx={whoneeds.titlebg}>
          <Typography sx={whoneeds.title}>who needs the software</Typography>
        </Box>
      </div>
    );
}

export default Title;
