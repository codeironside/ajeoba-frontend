import React from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Grid, IconButton } from "@mui/material";
import { useNavigate } from 'react-router-dom';

import AjTab from "../../../../Components/AjTab/AjTab";
import LogisticAdDetails from "./LogisticAdDetails/LogisticAdDetails";

import { LOGISTICS } from "../../../../Routes/Routes";
import { commonStyles } from "../../../../Style/CommonStyle";

const LogisticDetails = () => {
  const navigate = useNavigate();

  const backArrowHandler = () => {
    navigate(LOGISTICS);
  };

  return (
    <Grid
    container
    sx={{
      ...commonStyles.signupFormMainGridContainer,
      ...commonStyles.relativePosition,
      ...commonStyles.containerpadding,
    }}
  >
      <IconButton
        sx={{
          ...commonStyles.whiteBackButtonPosition,
        }}
        onClick={backArrowHandler}
      >
        <ArrowBackRoundedIcon sx={commonStyles.backButtonBlackFont} />
      </IconButton>
      <AjTab
        components={[
          {
            component: <LogisticAdDetails />,
            index: 0,
            label: "Logistic Ad Details",
          },
        ]}
        displayMyProfile={false}
        isTabPanelDisplay={true}
      />
    </Grid>
  );
};

export default LogisticDetails;