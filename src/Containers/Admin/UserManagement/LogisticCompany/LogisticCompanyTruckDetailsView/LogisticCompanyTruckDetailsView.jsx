import React from "react";
import { Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate, useParams } from "react-router-dom";

import AjTab from "../../../../../Components/AjTab/AjTab";

import { commonStyles } from "../../../../../Style/CommonStyle";
import LogisticCompanyTruckDetails from "./LogisticCompanyTruckDetails/LogisticCompanyTruckDetails";
import { ADMIN_USER_MANAGEMENT } from "../../../../../Routes/Routes";

const LogisticCompanyTruckDetailsView = () => {
  const navigate = useNavigate();
  const { logisticCompanyId } = useParams();

  const backArrowHandler = () => {
    navigate(
      `${ADMIN_USER_MANAGEMENT}/logistics/detail/${logisticCompanyId}?activeTab=1`
    );
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
            component: <LogisticCompanyTruckDetails />,
            index: 0,
            label: "Truck Details",
          },
        ]}
        displayMyProfile={false}
        isTabPanelDisplay={true}
      />
    </Grid>
  );
};

export default LogisticCompanyTruckDetailsView;
