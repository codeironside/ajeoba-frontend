import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AjTypography from "../../../Components/AjTypography";
import { REPORTS } from "../../../Routes/Routes";
import { customCommonStyles } from "../../../Style/CommonStyle";
import ProductsReport from "../../../Components/ProductsReport/ProductsReport";
import InputSoldReport from "../../../Components/InputSoldReport/InputSoldReport";
import TotalAndActiveUsers from "./Users/TotalAndActiveUsers";

const AdminReports = () => {
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
            ...((activeTab === "" || activeTab === "products") &&
              customCommonStyles.activeTabButtonStyle),
          }}
          onClick={() => navigate(`${REPORTS}?activeTab=products`)}
        >
          <AjTypography
            displayText="Products"
            styleData={{
              textAlign: "center",
              ...((activeTab === "" || activeTab === "products") &&
                customCommonStyles.activeText),
            }}
          />
        </Box>
        <Box
          sx={{
            ...customCommonStyles.tabButtonContainer,
            ...(activeTab === "aggregations" &&
              customCommonStyles.activeTabButtonStyle),
          }}
          onClick={() => navigate(`${REPORTS}?activeTab=aggregations`)}
        >
          <AjTypography
            displayText="Aggregations"
            styleData={{
              textAlign: "center",
              ...(activeTab === "aggregations" &&
                customCommonStyles.activeText),
            }}
          />
        </Box>
        <Box
          sx={{
            ...customCommonStyles.tabButtonContainer,
            ...(activeTab === "inputs-purchased" &&
              customCommonStyles.activeTabButtonStyle),
          }}
          onClick={() => navigate(`${REPORTS}?activeTab=inputs-purchased`)}
        >
          <AjTypography
            displayText="Inputs Purchased"
            styleData={{
              textAlign: "center",
              ...(activeTab === "inputs-purchased" &&
                customCommonStyles.activeText),
            }}
          />
        </Box>
        <Box
          sx={{
            ...customCommonStyles.tabButtonContainer,
            ...(activeTab === "inputs-sold" &&
              customCommonStyles.activeTabButtonStyle),
          }}
          onClick={() => navigate(`${REPORTS}?activeTab=inputs-sold`)}
        >
          <AjTypography
            displayText="Inputs sold"
            styleData={{
              textAlign: "center",
              ...(activeTab === "inputs-sold" && customCommonStyles.activeText),
            }}
          />
        </Box>
        <Box
          sx={{
            ...customCommonStyles.tabButtonContainer,
            ...(activeTab === "users" &&
              customCommonStyles.activeTabButtonStyle),
          }}
          onClick={() => navigate(`${REPORTS}?activeTab=users`)}
        >
          <AjTypography
            displayText="Users"
            styleData={{
              textAlign: "center",
              ...(activeTab === "users" && customCommonStyles.activeText),
            }}
          />
        </Box>
      </Box>
      {(activeTab === "products" || activeTab === "") && (
        <ProductsReport type="productSold" />
      )}
      {activeTab === "aggregations" && <ProductsReport type="aggregation" />}
      {activeTab === "inputs-purchased" && (
        <InputSoldReport type="inputPurchased" />
      )}
      {activeTab === "inputs-sold" && <InputSoldReport type="adminInputSold" />}
      {activeTab === "users" && <TotalAndActiveUsers />}
    </Grid>
  );
};

export default AdminReports;
