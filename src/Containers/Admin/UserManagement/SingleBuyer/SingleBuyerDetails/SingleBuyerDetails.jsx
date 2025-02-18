import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Grid, IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import AjTab from "../../../../../Components/AjTab/AjTab";
import BuyerDetail from './BuyerDetail/BuyerDetail';
import AjOrderTrackerContainer from "../../../../../Components/AjOrderTracker/AjOrderTracker";

import {
  ADMIN_SINGLE_BUYER, ADMIN_USER_MANAGEMENT
} from "../../../../../Routes/Routes";

import { commonStyles } from "../../../../../Style/CommonStyle";

const SingleBuyerDetails = () => {
  const navigate = useNavigate();

  const backButtonHandler = () => {
    navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_SINGLE_BUYER}`);
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
        onClick={backButtonHandler}
      >
        <ArrowBackRoundedIcon sx={commonStyles.backButtonBlackFont} />
      </IconButton>
      <AjTab
        components={[
          {
            component: <BuyerDetail />,
            index: 0,
            label: "Buyer Details",
          },
        ]}
        displayMyProfile={false}
        isTabPanelDisplay={true}
      />
    </Grid>
  );
};

export default SingleBuyerDetails;
