import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { commonStyles } from "../../../../Style/CommonStyle";
import AjTab from "../../../../Components/AjTab/AjTab";
import { REPORTS } from "../../../../Routes/Routes";
import InputPurchasedDetailViewAssociation from "./InputPurchasedDetailViewAssociation/InputPurchasedDetailViewAssociation";

const InputPurchasedAssociation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("activeTab");

  const backArrowHandler = () => {
    navigate(`${REPORTS}?activeTab=inputs-purchased`);
  };
  //input purchasedassociation main container with tabs
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
              component: <InputPurchasedDetailViewAssociation />,
              index: 0,
              label: "Supplier level Info",
            },
          ]}
          displayMyProfile={false}
          defaultIndex={Number.parseInt(activeTab || 0)}
          isTabPanelDisplay={true}
        />
      </Grid>
    </>
  );
};

export default InputPurchasedAssociation;
