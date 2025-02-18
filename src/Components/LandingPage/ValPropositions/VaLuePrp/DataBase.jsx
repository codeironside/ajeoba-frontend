import React from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { valueprop } from "./Valueprop";

import { valuepropintridatbase, valuepropintridatbasemobile } from "../../../../Constant/AppConstant";

function DataBase() {
    const isSmallScreen = useMediaQuery("(max-width: 900px)");

  return (
    <Box>
      <Box sx={valueprop.databaseparentconteaniner}>
        {/* <Box sx={valueprop.leftcontainerinnerontent}> */}
        <Typography sx={valueprop.textheaderdb}>Intrinsic Database</Typography>
        <Box sx={valueprop.databasetoptextcontainer}>
          <Typography sx={valueprop.databasetoptext}>
            The paucity of data is prevalent in the agriculture sector and to
            close this gap, Ajeoba will constantly collect and develop a
            repository for relevant data within the Agricultural space across
            Nigeria and overtime, Africa.
          </Typography>
          <Typography sx={valueprop.databasetoptext}>
            {" "}
            The availability of relevant and verified data can help farmers
            create predictive analysis related to future yields and make
            resource management decisions based on proven trends.
          </Typography>{" "}
          <Typography sx={valueprop.databasetoptext}>
            Government agencies and relevant stakeholders can also gain access
            to this data pool to make economic and trade decisions.
          </Typography>
        </Box>
      </Box>
      {/* </Box> */}
      <Box sx={valueprop.databasebottomcontent}>
        {!isSmallScreen ? (
          <img
            src={valuepropintridatbase}
            alt="img"
            style={valueprop.bannerimg}
          />
        ) : (
          <img
            src={valuepropintridatbasemobile}
            alt="img"
            style={valueprop.bannerimg}
          />
        )}
      </Box>
    </Box>
  );
}

export default DataBase;
