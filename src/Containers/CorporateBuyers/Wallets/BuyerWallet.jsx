import React from "react";
import { dashboardStyles } from "../../../Style/CommonStyle";
import { Box } from "@mui/material";
import BuyerWalletHistoryListing from "./BuyerWalletHistoryListing/BuyerWalletHistoryListing";
import BuyerWalletBalance from "./BuyerWalletBalance/BuyerWalletBalance";

function BuyerWallet() {
  return (
    <div>
      <Box sx={{ ...dashboardStyles.dashboardContainer }}>
        <BuyerWalletBalance />
        <BuyerWalletHistoryListing />
      </Box>
    </div>
  );
}

export default BuyerWallet;
