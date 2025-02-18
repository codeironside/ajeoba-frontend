import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import AjTab from "../../../../../Components/AjTab/AjTab";
import { commonStyles } from "../../../../../Style/CommonStyle";

import SubscriptionDetail from "../SubscriptionDetail/SubscriptionDetail";
import { FARMER_SUBSCRIPTION } from "../../../../../Routes/Routes";

const SubscriptionDetailTab = () => {
  const navigate = useNavigate();

  const backArrowHandler = () => {
    navigate(FARMER_SUBSCRIPTION);
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
        sx={commonStyles.whiteBackButtonPosition}
        onClick={backArrowHandler}
      >
        <ArrowBackRoundedIcon sx={commonStyles.backButtonBlackFont} />
      </IconButton>
      <AjTab
        components={[
          {
            component: <SubscriptionDetail />,
            label: "Subscription Details",
          },
        ]}
        displayMyProfile={false}
        isTabPanelDisplay={true}
      />
    </Grid>
  );
};

export default SubscriptionDetailTab;
