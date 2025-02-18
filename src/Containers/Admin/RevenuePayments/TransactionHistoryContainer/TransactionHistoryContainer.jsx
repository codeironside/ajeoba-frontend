import React from "react";
import { Grid } from "@mui/material";
import TransactionHistory from "./TransactionHistory/TransactionHistory";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";

const TransactionHistoryContainer = () => {
  return (
    <Grid
      container
      sx={{
        ...customCommonStyles.mainContainer,
        ...commonStyles.relativePosition,
        ...customCommonStyles.reportsMainContainer,
      }}
    >
      <TransactionHistory />
    </Grid>
  );
};

export default TransactionHistoryContainer;
