import React from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { whoneeds } from "./WhoNeedsTheSoftware";
import {
  farmingassimg1,
  farmingassimg2,
  farmingassimg3,
} from "../../../Constant/AppConstant";

function Title() {
  return (
    <div>
      <Box sx={whoneeds.farminassbg}>
        <Box sx={whoneeds.databasetoptextcontainer}>
          <Typography sx={whoneeds.farmingassheader}>
            Farming Association
          </Typography>
          <Typography sx={whoneeds.databasetoptext}>
            Farming Association will be able to register on the web app allowing
            them to manage farmer information, product aggregation data and
            assign the aggregated product to multiple warehouses. They will also
            be able to create batches of end-to-end logistics services, purchase
            inputs from the input suppliers, and link with finance companies for
            financial aid for the farmers.
          </Typography>{" "}
        </Box>

        <Box className="inputsupplybottomcontent">
          <img src={farmingassimg1} alt="img" className="bannerimginput" />
          <img src={farmingassimg2} alt="img" className="bannerimginput" />
          <img src={farmingassimg3} alt="img" className="bannerimginput" />
        </Box>
      </Box>
    </div>
  );
}

export default Title;
