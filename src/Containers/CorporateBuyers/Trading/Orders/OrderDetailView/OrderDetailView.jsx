import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import AjTab from "../../../../../Components/AjTab/AjTab";

import OrderDetails from "./OrderDetails/OrderDetails";
import AJOrderTracker from "../../../../../Components/AjOrderTracker/AjOrderTracker";
import { commonStyles } from "../../../../../Style/CommonStyle";
import { TRADING } from "../../../../../Routes/Routes";

const OrderDetailView = () => {
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState(null);

  const backArrowHandler = () => {
    navigate(`${TRADING}?activeTab=1`);
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
              component: <OrderDetails setOrderStatus={setOrderStatus} />,
              index: 0,
              label: "Order Details",
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

export default OrderDetailView;