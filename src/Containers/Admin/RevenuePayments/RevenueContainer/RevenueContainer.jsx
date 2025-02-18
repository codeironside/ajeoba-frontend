import { Grid } from "@mui/material";
import React from "react";
import AjTab from "../../../../Components/AjTab/AjTab";
import { ROLES } from "../../../../Constant/RoleConstant";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";
import Revenue from "./Revenue/Revenue";

const RevenueContainer = ({ props }) => {
  return (
    <Grid
      container
      sx={{
        ...customCommonStyles.mainContainer,
        ...commonStyles.relativePosition,
        ...customCommonStyles.reportsMainContainer,
      }}
    >
      <AjTab
        components={[
          {
            component: <Revenue level={{ isAssociationLevel: true }} />,
            index: 0,
            label: "Farming Association",
          },
          {
            component: <Revenue level={{ isAggregatorLevel: true }} />,
            index: 1,
            label: "Aggregator",
          },
          {
            component: <Revenue level={{ isInputSupplierLevel: true }} />,
            index: 2,
            label: "Input Supplier",
          },
        ]}
        backgroundTabs={false}
        displayMyProfile={false}
        isTabPanelDisplay={true}
        noIconTabStyle={true}
      />
    </Grid>
  );
};

export default RevenueContainer;
