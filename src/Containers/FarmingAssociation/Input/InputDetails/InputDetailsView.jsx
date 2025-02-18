import React from "react";
import { useNavigate } from "react-router-dom";

import { Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import AjTab from "../../../../Components/AjTab/AjTab";
import AjPurchasedOrderDetail from "../../../../Components/AjPurchasedOrderDetail/AjPurchasedOrderDetail";

import { INPUT } from "../../../../Routes/Routes";

import { commonStyles } from "../../../../Style/CommonStyle";

const InputDetailsView = () => {
  const navigate = useNavigate();
  const backArrowHandler = () => {
    navigate(INPUT);
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
              component: <AjPurchasedOrderDetail />,
              label: "Input Details",
            },
          ]}
          isTabPanelDisplay={true}
        />
      </Grid>
    </>
  );
};

export default InputDetailsView;
