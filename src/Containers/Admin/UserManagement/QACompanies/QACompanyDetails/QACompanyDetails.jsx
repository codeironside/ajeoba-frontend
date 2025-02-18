import React from "react";
import { Grid, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import AjTab from "../../../../../Components/AjTab/AjTab";
import AdminQACompanyDetail from "./AdminQACompanyDetail/AdminQACompanyDetail";
import {
  ADMIN_USER_MANAGEMENT,
  ADMIN_QA_COMPANIES,
} from "../../../../../Routes/Routes";

import { commonStyles } from "../../../../../Style/CommonStyle";

const QACompanyDetails = () => {
  const navigate = useNavigate();

  const backButtonHandler = () => {
    navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_QA_COMPANIES}`);
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
        onClick={backButtonHandler}
      >
        <ArrowBackRoundedIcon sx={commonStyles.backButtonBlackFont} />
      </IconButton>
      <AjTab
        components={[
          {
            component: <AdminQACompanyDetail />,
            index: 0,
            label: "QA Company Details",
          },
        ]}
        displayMyProfile={false}
        isTabPanelDisplay={true}
      />
    </Grid>
  );
};

export default QACompanyDetails;
