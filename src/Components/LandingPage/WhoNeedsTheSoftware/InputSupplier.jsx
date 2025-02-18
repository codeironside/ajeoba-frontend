import React from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { whoneeds } from "./WhoNeedsTheSoftware";

import { inputsupplier1 } from "../../../Constant/AppConstant";

function InputSupplier() {
  return (
    <Box sx={whoneeds.diginfParentContainer}>
      <Box sx={whoneeds.inputsupplycontainer}>
        <Box sx={whoneeds.imgContainer}>
          <img
            src={inputsupplier1}
            alt="img"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
        <Box sx={whoneeds.textContainter}>
          <Typography sx={whoneeds.textheader}>Input Suppliers</Typography>{" "}
          <Typography sx={whoneeds.bottomtext}>
            Input Suppliers will be able to manage input aggregation data,
            providing a centralized platform to collect, analyze, and distribute
            various agricultural inputs. They can assign the aggregated input to
            multiple farmers and cooperatives, streamlining the supply chain
            process.
          </Typography>{" "}
        </Box>
      </Box>
    </Box>
  );
}

export default InputSupplier;
