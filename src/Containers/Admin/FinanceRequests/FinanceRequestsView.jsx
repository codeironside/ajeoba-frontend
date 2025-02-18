import React from "react";
import { useSelector } from "react-redux";
import { Box, Grid, Typography } from "@mui/material";
import FinanceRequestsListing from "./FinanceRequestsListing/FinanceRequestsListing";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";
import { styles as masterManagementStyles } from "../MasterManagement/MasterManagementStyles";

const FinanceRequestsView = () => {
  const financeRequestsList = useSelector(
    (state) => state.adminFinanceRequestsReducer.financeRequestsList
  );

  return (
    <Grid container sx={customCommonStyles.mainContainer}>
      <Grid item sx={customCommonStyles.subContainer}>
        <Box sx={customCommonStyles.headerBox}>
          <Typography sx={commonStyles.tableText}>
            Finance Additional Details Requests (
            {financeRequestsList.totalCount})
          </Typography>
        </Box>
        <Box
          sx={{
            ...masterManagementStyles.customHeight,
          }}
        ></Box>
      </Grid>
      <Box sx={customCommonStyles.subContentBox}>
        <FinanceRequestsListing />
      </Box>
    </Grid>
  );
};

export default FinanceRequestsView;
