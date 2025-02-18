import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import AjTab from "../../../../Components/AjTab/AjTab";

import InputOrderDetailView from "./InputOrderDetailView/InputOrderDetailView";
import { commonStyles } from "../../../../Style/CommonStyle";
import { INPUT } from "../../../../Routes/Routes";

const InputOrderDetail = () => {
  const navigate = useNavigate();
  const backArrowHandler = () => {
    navigate(`${INPUT}?activeTab=1`);
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
        <ArrowBackRoundedIcon
          sx={commonStyles.backButtonBlackFont}
          onClick={backArrowHandler}
        />
      </IconButton>
      <AjTab
        components={[
          {
            component: <InputOrderDetailView />,
            index: 0,
            label: "Order details",
          },
        ]}
        isTabPanelDisplay={true}
      />
    </Grid>
  );
};

export default InputOrderDetail;
