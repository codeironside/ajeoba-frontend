import React from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Grid, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

import AjTab from "../../../Components/AjTab/AjTab";
import FinanceCompanyRequestDetail from "./FinanceRequestDetailView/FinanceCompanyRequestDetail";

import { commonStyles } from "../../../Style/CommonStyle";
import { FINANCE_REQUESTS } from "../../../Routes/Routes";

const FinanceCompanyRequestDetailView = () => {
  const navigate = useNavigate();

  const backArrowHandler = () => {
    navigate(FINANCE_REQUESTS);
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
            component: <FinanceCompanyRequestDetail />,
            index: 0,
            label: "Finance Details",
          },
        ]}
        displayMyProfile={false}
        isTabPanelDisplay={true}
      />
    </Grid>
  );
};

export default FinanceCompanyRequestDetailView;
