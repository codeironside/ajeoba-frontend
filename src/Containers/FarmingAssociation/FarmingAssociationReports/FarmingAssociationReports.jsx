import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import AjTypography from "../../../Components/AjTypography";
import ProductsReport from "../../../Components/ProductsReport/ProductsReport";
import InputPurchasedReport from "../../../Components/InputPurhasedReport/InputPurchasedReport";
import { REPORTS } from "../../../Routes/Routes";
import { customCommonStyles } from "../../../Style/CommonStyle";
import { getUserData } from "../../../Services/localStorageService";
import { ROLES } from "../../../Constant/RoleConstant";
const FarmingAssociationReports = () => {
  const navigate = useNavigate();
  const roleId = getUserData().role_id;
  const [searchParams] = useSearchParams();

  const activeTab = searchParams.get("activeTab") || "";
  return (
    <Grid container sx={{ ...customCommonStyles.mainContainer }}>
      <Box sx={customCommonStyles.flexStyle}>
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
        {roleId === ROLES.FARMING_ASSOCIATION && (
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
        )}
      </Box>
      {(activeTab === "products" || activeTab === "") && (
        <ProductsReport type="productSold" />
      )}
      {activeTab === "aggregations" && <ProductsReport type="aggregation" />}
      {activeTab === "inputs-purchased" &&
        roleId === ROLES.FARMING_ASSOCIATION && (
          <InputPurchasedReport type="inputPurchased" />
        )}
    </Grid>
  );
};

export default FarmingAssociationReports;
