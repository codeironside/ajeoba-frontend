import React from "react";
import { Grid, IconButton } from "@mui/material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { ADMIN_FARMING_ASSOCIATION, ADMIN_USER_MANAGEMENT } from "../../../../../Routes/Routes";

import AjTab from "../../../../../Components/AjTab/AjTab";
import RefereeDetails from "./RefereeDetails/RefereeDetails";

import { commonStyles } from "../../../../../Style/CommonStyle";

const Referee = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { associationId } = params;
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("activeTab");

  const backArrowHandler = () => {
    navigate(
      `${ADMIN_USER_MANAGEMENT}/${ADMIN_FARMING_ASSOCIATION}/detail/${associationId}?activeTab=${activeTab}`
    );
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
          { component: <RefereeDetails />, index: 0, label: "Referee Details" },
        ]}
        displayMyProfile={false}
        isTabPanelDisplay={true}
      />
    </Grid>
  );
};

export default Referee;
