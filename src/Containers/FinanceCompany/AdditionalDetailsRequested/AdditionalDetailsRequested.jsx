import React from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { commonStyles } from "../../../Style/CommonStyle";
import AjTab from "../../../Components/AjTab/AjTab";
import { FINANCE_REQUESTS } from "../../../Routes/Routes";
import AdditionalDetailsRequestedView from "./AdditionalDetailsRequestedView/AdditionalDetailsRequestedView";

const AdditionalDetailsRequested = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = useParams();
  const activeTab = searchParams.get("activeTab");
  const { id } = params;

  const backArrowHandler = () => {
    navigate(`${FINANCE_REQUESTS}/detail/${id}`);
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
          />
        </IconButton>
        <AjTab
          components={[
            {
              component: <AdditionalDetailsRequestedView activeTab={0} />,
              index: 0,
              label: "Association Sales",
            },
            {
              component: <AdditionalDetailsRequestedView activeTab={1} />,
              index: 1,
              label: "Farmer Info",
            },
          ]}
          onChange={(currIndex) =>
            navigate(
              `${FINANCE_REQUESTS}/additional-detail/${id}?activeTab=${currIndex}`
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

export default AdditionalDetailsRequested;
