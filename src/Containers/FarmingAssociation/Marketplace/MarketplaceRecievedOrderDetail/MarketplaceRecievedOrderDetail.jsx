import React, { useState } from "react";
import { getUserData } from "../../../../Services/localStorageService";
import { Grid, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AjTab from "../../../../Components/AjTab/AjTab";
import { ROLES } from "../../../../Constant/RoleConstant";
import { commonStyles } from "../../../../Style/CommonStyle";
import {
  INPUT_SUPPLIER_RECEIVED_ORDERS,
  MARKETPLACE,
} from "../../../../Routes/Routes";
import RecievedOrderDetail from "./RecievedOrderDetail/RecievedOrderDetail";
import AjOrderTrackerContainer from "../../../../Components/AjOrderTracker/AjOrderTracker";

const MarketplaceRecievedOrderDetail = () => {
  const navigate = useNavigate();
  const userData = getUserData();
  const [orderStatus, setOrderStatus] = useState(null);

  const backArrowHandler = () => {
    if (userData.role_id === ROLES.INPUT_SUPPLIER) {
      navigate(`${INPUT_SUPPLIER_RECEIVED_ORDERS}`);
    } else {
      navigate(`${MARKETPLACE}?activeTab=1`);
    }
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
            component: <RecievedOrderDetail setOrderStatus={ setOrderStatus }  />,
            index: 0,
            label: "Received Order Details",
          },
          {
            component: <AjOrderTrackerContainer status={orderStatus}/>,
            index: 1,
            label: "Order Tracker",
          },
        ]}
        displayMyProfile={false}
        isTabPanelDisplay={true}
      />
    </Grid>
  );
};

export default MarketplaceRecievedOrderDetail;
