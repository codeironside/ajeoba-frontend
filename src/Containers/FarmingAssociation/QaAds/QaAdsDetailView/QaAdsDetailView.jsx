import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AjTab from "../../../../Components/AjTab/AjTab";
import QaAdsDetails from "./QaAdsDetails/QaAdsDetails";
import { QAADS } from "../../../../Routes/Routes";
import { commonStyles } from "../../../../Style/CommonStyle";

const QaAdsDetailView = () => {
  const navigate = useNavigate();
  const backArrowHandler = () => {
    navigate(QAADS);
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
              component: <QaAdsDetails />,
              label: "QA Ad Details",
            },
          ]}
          isTabPanelDisplay={true}
        />
      </Grid>
    </>
  );
};

export default QaAdsDetailView;
