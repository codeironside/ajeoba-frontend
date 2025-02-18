import React from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import InputPurchasedDetailView from "./InputPurchasedDetailView/InputPurchasedDetailView";
import AjTab from "../../../../Components/AjTab/AjTab";
import { REPORTS } from "../../../../Routes/Routes";
import { commonStyles } from "../../../../Style/CommonStyle";

const InputPurchasedListingView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = useParams();
  const activeTab = searchParams.get("activeTab");
  const { id } = params;

  const backArrowHandler = () => {
    navigate(`${REPORTS}?activeTab=inputs-purchased`);
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
              component: <InputPurchasedDetailView />,
              index: 0,
              label: "Association level Info",
            },
          ]}
          onChange={(currIndex) =>
            navigate(
              `${REPORTS}/input-purchased/info/${id}?activeTab=${currIndex}`
            )
          }
          displayMyProfile={false}
          defaultIndex={Number.parseInt(activeTab || 0)}
          isTabPanelDisplay={true}
        />
      </Grid>
    </>
  );
};

export default InputPurchasedListingView;
