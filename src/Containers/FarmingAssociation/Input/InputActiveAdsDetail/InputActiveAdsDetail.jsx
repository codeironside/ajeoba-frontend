import React from "react";
import { Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate } from "react-router-dom";
import InputActiveAdDetailsById from "./InputActiveAdsDetailsById/InputActiveAdDetailsById";
import { commonStyles } from "../../../../Style/CommonStyle";
import AjTab from "../../../../Components/AjTab/AjTab";
import { INPUT } from "../../../../Routes/Routes";

const InputActiveAdsDetail = () => {
  const navigate = useNavigate();
  const backArrowHandler = () => {
    navigate(INPUT);
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
          <ArrowBackRoundedIcon sx={commonStyles.backButtonBlackFont} />
        </IconButton>
        <AjTab
          components={[
            {
              component: <InputActiveAdDetailsById />,
              index: 0,
              label: "Purchase Input Details",
            },
          ]}
          displayMyProfile={false}
          isTabPanelDisplay={true}
        />
      </Grid>
    </>
  );
};

export default InputActiveAdsDetail;
