import React from "react";
import SellerWalletBalance from "./SellerWalletBalance/SellerWalletBalance";
import SellerWalletHistoryListing from "./SellerWalletHistoryListing/SellerWalletHistoryListing";
import { dashboardStyles } from "../../../../src/Style/CommonStyle";
import { Box } from "@mui/material";



function SellerWallet() {

  return <>
      <Box sx={{ ...dashboardStyles.dashboardContainer }}>
        <SellerWalletBalance />
        <SellerWalletHistoryListing />
      </Box>
  </>;
}

export default SellerWallet;

