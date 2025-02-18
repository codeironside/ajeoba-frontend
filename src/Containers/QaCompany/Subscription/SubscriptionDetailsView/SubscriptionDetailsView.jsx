import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AjTab from "../../../../Components/AjTab/AjTab";
import { SUBSCRIPTION } from "../../../../Routes/Routes";
import { commonStyles } from "../../../../Style/CommonStyle";
import SubscriptionDetails from "./SubscriptionDetails/SubscriptionDetails";

const SubscriptionDetailsView = () => {
  const navigate = useNavigate();
  const backArrowHandler = () => {
    navigate(SUBSCRIPTION);
  };
  return (
    <>
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
          <ArrowBackRoundedIcon
            sx={commonStyles.backButtonBlackFont}
            onClick={backArrowHandler}
          />
        </IconButton>
        <AjTab
          components={[
            {
              component: <SubscriptionDetails />,
              label: "Subscription Details",
            },
          ]}
          isTabPanelDisplay={true}
        />
      </Grid>
    </>
  );
};

export default SubscriptionDetailsView;
