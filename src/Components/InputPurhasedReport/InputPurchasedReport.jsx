import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";

import AjTab from "../AjTab/AjTab";
import InputSoldContainer from "../InputSoldReport/InputSoldContainer/InputSoldContainer";
import { commonStyles, customCommonStyles } from "../../Style/CommonStyle";

//input purchased main container that input input sold container as type=inputPurchased
const InputPurchasedReport = (props) => {
  const inputList = useSelector((state) => state.reports.inputList);

  return (
    <Grid
      container
      sx={{
        ...customCommonStyles.mainContainer,
        ...commonStyles.relativePosition,
        ...customCommonStyles.inputReportsMainContainer,
      }}
    >
      <AjTab
        components={[
          {
            component: (
              <InputSoldContainer type={props.type} name={props?.name} />
            ),
            index: 0,
            label: `Total Quantity of Input Purchased (${
              inputList?.data ? inputList?.data?.totalCount : ""
            })`,
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

export default InputPurchasedReport;
