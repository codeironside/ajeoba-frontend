import React from "react";
import { Box, Skeleton } from "@mui/material";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../../Style/CommonStyle";
import AjTypography from "../../../../../Components/AjTypography";
import AjTradingActiveAdsCard from "../../../../../Components/AjTradingActiveAdsCard/AjTradingActiveAdsCard";

const TradingActiveAdsListing = (props) => {
  const { dataToList, loading } = props;

  return (
    <>
      {dataToList?.length === 0 ? (
        <Box
          sx={[commonStyles.noContentBox, customCommonStyles.noDataContainer]}
        >
          <AjTypography
            styleData={commonStyles.noDataText}
            displayText="No data found"
          />
        </Box>
      ) : (
        dataToList?.result?.map((data, index) => <AjTradingActiveAdsCard data={data} index={index} loading={loading} />)
      )}
    </>
  );
};

export default TradingActiveAdsListing;