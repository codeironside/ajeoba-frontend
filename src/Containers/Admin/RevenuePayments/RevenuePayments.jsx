import React from "react";
import { Box, Grid } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import AjTypography from "../../../Components/AjTypography";
import { ADMIN_REVENUE_PAYMENTS } from "../../../Routes/Routes";
import RevenueContainer from "./RevenueContainer/RevenueContainer";
import TransactionHistoryContainer from "./TransactionHistoryContainer/TransactionHistoryContainer";
import { customCommonStyles } from "../../../Style/CommonStyle";

const RevenuePayments = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const activeTab = searchParams.get("activeTab") || "";
  return (
    <Grid container sx={customCommonStyles.mainContainer}>
      <Box
        sx={{
          ...customCommonStyles.flexStyle,
          ...customCommonStyles.responsiveFlexStyle,
        }}
      >
        <Box
          sx={{
            ...customCommonStyles.tabButtonContainer,
            ...((activeTab === "" || activeTab === "revenue") &&
              customCommonStyles.activeTabButtonStyle),
          }}
          onClick={() =>
            navigate(`${ADMIN_REVENUE_PAYMENTS}?activeTab=revenue`)
          }
        >
          <AjTypography
            displayText="Revenue"
            styleData={{
              textAlign: "center",
              ...((activeTab === "" || activeTab === "revenue") &&
                customCommonStyles.activeText),
            }}
          />
        </Box>

        <Box
          sx={{
            ...customCommonStyles.tabButtonContainer,
            ...(activeTab === "history" &&
              customCommonStyles.activeTabButtonStyle),
          }}
          onClick={() =>
            navigate(`${ADMIN_REVENUE_PAYMENTS}?activeTab=history`)
          }
        >
          <AjTypography
            displayText="Transaction History"
            styleData={{
              textAlign: "center",
              ...(activeTab === "history" && customCommonStyles.activeText),
            }}
          />
        </Box>
      </Box>
      {(activeTab === "revenue" || activeTab === "") && (
        <RevenueContainer type="revenue" />
      )}
      {activeTab === "history" && (
        <TransactionHistoryContainer type="history" />
      )}
    </Grid>
  );
};

export default RevenuePayments;
