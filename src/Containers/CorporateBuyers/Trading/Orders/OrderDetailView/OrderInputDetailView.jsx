import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import AjTab from "../../../../../Components/AjTab/AjTab";

import OrderInputDetails from "./OrderDetails/OrderInputDetails";
import AJOrderTracker from "../../../../../Components/AjOrderTracker/AjOrderTracker";
import { commonStyles } from "../../../../../Style/CommonStyle";
import { TRADING } from "../../../../../Routes/Routes";

const OrderInputDetailView = () => {
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState(null);

  const backArrowHandler = () => {
    navigate(`${TRADING}?activeTab=2`);
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
              component: <OrderInputDetails setOrderStatus={setOrderStatus} />,
              index: 0,
              label: "Input Details",
            },
            {
              component: <AJOrderTracker status={orderStatus} />,
              index: 1,
              label: "Order Tracker",
            },
          ]}
          isTabPanelDisplay={true}
        />
      </Grid>
    </>
  );
};

export default OrderInputDetailView;