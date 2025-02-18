import React from "react";
import { Grid } from "@mui/material";

import AjTab from "../../../../Components/AjTab/AjTab";

import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";
import TotalAndActiveUsersContainer from "./TotalAndActiveUsers/TotalAndActiveUsersContainer/TotalAndActiveUsersContainer";
import { useSelector } from "react-redux";

const TotalAndActiveUsers = () => {
  const usersList = useSelector(
    (state) => state.reportsAdmin.adminReportsUsersList
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
            component: <TotalAndActiveUsersContainer />,
            index: 0,
            label: `Total number of users (${
              usersList?.data?.total_users || 0
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

export default TotalAndActiveUsers;
