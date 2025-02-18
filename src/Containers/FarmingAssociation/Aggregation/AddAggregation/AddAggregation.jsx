import React from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Box, Grid, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

import AddAggregationForm from "./AddAggregationForm/AddAggregationForm";
import { AGGREGATIONS } from "../../../../Routes/Routes";
import { commonStyles } from "../../../../Style/CommonStyle";

const AddAggregation = () => {
  const navigate = useNavigate();

  const backArrowHandler = () => {
    navigate(AGGREGATIONS);
  };

  return (
    <Grid container sx={commonStyles.signupFormMainGridContainer}>
      <Box sx={commonStyles.relativePosition}>
        <IconButton
          disableRipple
          sx={commonStyles.backButtonPosition}
          onClick={backArrowHandler}
        >
          {" "}
          <ArrowBackRoundedIcon sx={commonStyles.backButtonBlackFont} />
        </IconButton>
      </Box>
      <Grid container item sx={{...commonStyles.signupFormMainContentContainer, ...commonStyles.customSrollBar}}>
        <AddAggregationForm />
      </Grid>
    </Grid>
  );
};

export default AddAggregation;
