import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import ManageSupportRequestDetail from "./ManageSupportRequestDetail/ManageSupportRequestDetail";
import AjTab from "../../../../Components/AjTab/AjTab";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { commonStyles } from "../../../../Style/CommonStyle";
import { MANAGE_SUPPORT } from "../../../../Routes/Routes";

const ManageSupportRequestDetailView = () => {
  const navigate = useNavigate();
  const backArrowHandler = () => {
    navigate(`${MANAGE_SUPPORT}`);
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
            component: <ManageSupportRequestDetail />,
            label: "Support Request Details",
          },
        ]}
        isTabPanelDisplay={true}
        displayMyProfile={false}
      />
    </Grid>
  );
};

export default ManageSupportRequestDetailView;
