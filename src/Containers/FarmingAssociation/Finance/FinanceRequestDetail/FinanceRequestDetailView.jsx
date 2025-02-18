import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import AjTab from "../../../../Components/AjTab/AjTab";
import { FINANCE } from "../../../../Routes/Routes";
import FinanceRequestDetail from "./FinanceRequestDetail";

import { commonStyles } from "../../../../Style/CommonStyle";
import { styles as FinanceRequestDetailStyle } from "./FinanceRequestDetailStyle";

const FinanceRequestDetailView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const backArrowHandler = () => {
    navigate(`${FINANCE}?activeTab=${activeTab}`);
  };
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("activeTab");

  return (
    <Grid
      container
      sx={{
        ...commonStyles.signupFormMainGridContainer,
        ...commonStyles.relativePosition,
        ...commonStyles.containerpadding,
        ...FinanceRequestDetailStyle.scrollFlexWrap,
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
            component: <FinanceRequestDetail />,
            index: 0,
            label: "Finance Request details",
          },
        ]}
        onChange={(currIndex) =>
          navigate(`${FINANCE}/detail/${id}?activeTab=${currIndex}`)
        }
        displayMyProfile={false}
        isTabPanelDisplay={true}
      />
    </Grid>
  );
};

export default FinanceRequestDetailView;
