import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AjTab from "../../../../../Components/AjTab/AjTab";
import BatchDetails from "./BatchDetails/BatchDetails";
import { commonStyles } from "../../../../../Style/CommonStyle";
import { INVENTORY } from "../../../../../Routes/Routes";

const BatchDetailView = () => {
  const navigate = useNavigate();
  const backArrowHandler = () => {
    navigate(`${INVENTORY}?activeTab=1`);
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
              component: <BatchDetails />,
              index: 0,
              label: "Batch details",
            },
          ]}
          isTabPanelDisplay={true}
        />
      </Grid>
    </>
  );
};

export default BatchDetailView;
