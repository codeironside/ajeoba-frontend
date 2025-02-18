import React from "react";
import { Grid, IconButton } from "@mui/material";
import { commonStyles } from "../../../../../Style/CommonStyle";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { TRADING } from "../../../../../Routes/Routes";
import { useNavigate } from "react-router-dom";
import AjTab from "../../../../../Components/AjTab/AjTab";
import TradingActiveAdDetailById from "./TradingActiveAdDetailById/TradingActiveAdDetailById";

const TradingActiveAdDetails = () => {
  const navigate = useNavigate();
  const backArrowHandler = () => {
    navigate(TRADING);
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
          <ArrowBackRoundedIcon sx={commonStyles.backButtonBlackFont} />
        </IconButton>
        <AjTab
          components={[
            {
              component: <TradingActiveAdDetailById />,
              index: 0,
              label: "Active ad Details",
            },
          ]}
          displayMyProfile={false}
          isTabPanelDisplay={true}
        />
      </Grid>
    </>
  );
};

export default TradingActiveAdDetails;