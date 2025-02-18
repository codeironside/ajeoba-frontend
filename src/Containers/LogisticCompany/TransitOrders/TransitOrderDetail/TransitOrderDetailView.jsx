import React from "react";
import { TRANSIT_ORDERS } from "../../../../Routes/Routes";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import AjTab from "../../../../Components/AjTab/AjTab";
import TransitOrderDetail from "./TransitOrderDetail";

import { commonStyles } from "../../../../Style/CommonStyle";

const TransitOrderDetailView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("activeTab");

  const backArrowHandler = () => {
    navigate(`${TRANSIT_ORDERS}?activeTab=${activeTab}`);
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
            component: <TransitOrderDetail activeTab={0} />,
            index: 0,
            label: "Transit order details",
          },
        ]}
        onChange={(currIndex) =>
          navigate(`${TRANSIT_ORDERS}/detail/${id}?activeTab=${currIndex}`)
        }
        displayMyProfile={false}
        isTabPanelDisplay={true}
      />
    </Grid>
  );
};

export default TransitOrderDetailView;
