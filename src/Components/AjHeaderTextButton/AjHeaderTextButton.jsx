import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { commonStyles, customCommonStyles } from "../../Style/CommonStyle";
import AjButton from "../AjButton";
import { useNavigate } from "react-router-dom";

const AjHeaderTextButton = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <Grid item sx={customCommonStyles.subContainer}>
        <Box sx={customCommonStyles.headerBox}>
          <Typography sx={commonStyles.tableText}>
            {`${props.displayText}(${props.length})`}
          </Typography>
        </Box>
        <AjButton
          variant="text"
          styleData={{
            ...customCommonStyles.addButtonStyle,
            ...props.displayTextButtonStyle,
          }}
          displayText={props.displayTextButton}
          onClick={() => navigate(props.changeNavigate)}
        />
      </Grid>
    </>
  );
};

export default AjHeaderTextButton;
