import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AjTab from "../../../../Components/AjTab/AjTab";
import TruckDetails from "./TruckDetails/TruckDetails";
import { TRUCK_INFORMATION } from "../../../../Routes/Routes";
import { commonStyles } from "../../../../Style/CommonStyle";

const TruckDetailsView = () => {
  const navigate = useNavigate();
  const backArrowHandler = () => {
    navigate(TRUCK_INFORMATION);
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
              component: <TruckDetails />,
              label: "Truck Details",
            },
          ]}
          isTabPanelDisplay={true}
        />
      </Grid>
    </>
  );
};

export default TruckDetailsView;
