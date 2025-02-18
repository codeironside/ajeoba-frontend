import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AjTypography from "../../../Components/AjTypography";
import InputSoldReport from "../../../Components/InputSoldReport/InputSoldReport";
import { REPORTS } from "../../../Routes/Routes";
import { customCommonStyles } from "../../../Style/CommonStyle";

const InputSupplierReport = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const activeTab = searchParams.get("activeTab") || "";

  return (
    <Grid container sx={customCommonStyles.mainContainer}>
      <Box sx={customCommonStyles.flexStyle}>
        <Box
          sx={{
            ...customCommonStyles.tabButtonContainer,
            ...((activeTab === "" || activeTab === "input-sold") &&
              customCommonStyles.activeTabButtonStyle),
          }}
          onClick={() => navigate(`${REPORTS}?activeTab=input-sold`)}
        >
          <AjTypography
            displayText="Inputs"
            styleData={{
              textAlign: "center",
              ...((activeTab === "" || activeTab === "input-sold") &&
                customCommonStyles.activeText),
            }}
          />
        </Box>
        <Box
          sx={{
            ...customCommonStyles.tabButtonContainer,
            ...(activeTab === "input-aggregated" &&
              customCommonStyles.activeTabButtonStyle),
          }}
          onClick={() => navigate(`${REPORTS}?activeTab=input-aggregated`)}
        >
          <AjTypography
            displayText="Aggregations"
            styleData={{
              textAlign: "center",
              ...(activeTab === "input-aggregated" &&
                customCommonStyles.activeText),
            }}
          />
        </Box>
      </Box>
      {(activeTab === "input-sold" || activeTab === "") && (
        <InputSoldReport type="inputSold" />
      )}
      {activeTab === "input-aggregated" && (
        <InputSoldReport type="inputAggregated" />
      )}
    </Grid>
  );
};

export default InputSupplierReport;
