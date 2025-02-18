import React from "react";
import { Box, Typography } from "@mui/material";
import { valueprop } from "./Valueprop";

import {
  valuepropinputsupplychildimages1,
  valuepropinputsupplychildimages2,
  valuepropinputsupplychildimages3,
} from "../../../../Constant/AppConstant";

function InputSupply() {
  return (
    <Box sx={valueprop.inputsuppliybg}>
      <Typography sx={valueprop.textheaderdb}>Input Supply</Typography>
      <Box sx={valueprop.databasetoptextcontainer}>
        <Typography sx={valueprop.databasetoptext}>
          Ajeoba seeks to provide a wide range of agricultural inputs leveraging
          technology to connect farmers to high quality products that improve
          crop health and increase productivity. Inputs such a Organic
          fertilizers, high quality seeds, pesticides and herbicides as well as
          modern and tech based farm equipments.
        </Typography>{" "}
      </Box>

      <Box className="inputsupplybottomcontent">
        <img
          src={valuepropinputsupplychildimages1}
          alt="img"
          className="bannerimginput"
        />
        <img
          src={valuepropinputsupplychildimages2}
          alt="img"
          className="bannerimginput"
        />
        <img
          src={valuepropinputsupplychildimages3}
          alt="img"
          className="bannerimginput"
        />
      </Box>
    </Box>
  );
}

export default InputSupply;
