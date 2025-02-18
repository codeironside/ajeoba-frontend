import React from "react";
import { Grid } from "@mui/material";

import AjTab from "../AjTab/AjTab";
import InputSoldContainer from "./InputSoldContainer/InputSoldContainer";

import { commonStyles, customCommonStyles } from "../../Style/CommonStyle";
import { useSelector } from "react-redux";
import { ROLES } from "../../Constant/RoleConstant";
import { getUserData } from "../../Services/localStorageService";

const InputSoldReport = (props) => {
  const roleId = getUserData().role_id;
  const inputReportsList = useSelector((state) =>
    roleId === ROLES.INPUT_SUPPLIER
      ? state.inputSupplierReports.inputSupplierReportsList
      : state.reportsAdmin.adminReportsInputList
  );

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
            component: (
              <InputSoldContainer type={props.type} name={props?.name} />
            ),
            index: 0,
            label: `Total quantity ${
              props.type === "inputSold" || props.type === "adminInputSold"
                ? `of Input Sold (${inputReportsList?.data?.totalCount || 0})`
                : props.type === "inputPurchased"
                ? `of Input purchased (${
                    inputReportsList?.data?.totalCount || 0
                  })`
                : `Aggregated (${inputReportsList?.data?.totalCount || 0})`
            }`,
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

export default InputSoldReport;
