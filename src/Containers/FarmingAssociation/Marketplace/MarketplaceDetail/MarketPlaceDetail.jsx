import React from "react";
import { Grid, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AjTab from "../../../../Components/AjTab/AjTab";
import ActiveAdsDetail from "./ActiveAdsDetail/ActiveAdsDetail";
import { commonStyles } from "../../../../Style/CommonStyle";
import { MARKETPLACE } from "../../../../Routes/Routes";

const MarketplaceDetail = () => {
  const navigate = useNavigate();
  const backArrowHandler = () => {
    navigate(MARKETPLACE);
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
            component: <ActiveAdsDetail />,
            index: 0,
            label: "Active ad Details",
          },
        ]}
        displayMyProfile={false}
        isTabPanelDisplay={true}
      />
    </Grid>
  );
};

export default MarketplaceDetail;
