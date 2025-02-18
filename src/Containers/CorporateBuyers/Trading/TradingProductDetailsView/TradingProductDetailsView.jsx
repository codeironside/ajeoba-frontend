import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AjTab from "../../../../Components/AjTab/AjTab";
import { TRADING } from "../../../../Routes/Routes";
import { commonStyles } from "../../../../Style/CommonStyle";
import AjPurchasedOrderDetail from "../../../../Components/AjPurchasedOrderDetail/AjPurchasedOrderDetail";

const TradingProductDetailsView = () => {
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
          <ArrowBackRoundedIcon
            sx={commonStyles.backButtonBlackFont}
            onClick={backArrowHandler}
          />
        </IconButton>
        <AjTab
          components={[
            {
              component: <AjPurchasedOrderDetail />,
              label: "Product Details",
            },
          ]}
          isTabPanelDisplay={true}
        />
      </Grid>
    </>
  );
};

export default TradingProductDetailsView;
