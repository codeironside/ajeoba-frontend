import React from "react";
import { Box } from "@mui/material";
import AjTypography from "../../../../Components/AjTypography";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";
import AjProductInputCard from "../../../../Components/AjProductInputCard/AjProductInputCard";

const ProductInputListing = (props) => {
  const { dataToList, adRequested, itemRequestedFor } = props;
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
        dataToList?.map((data, index) => {
          return (
            <AjProductInputCard
              key={index}
              data={data}
              adRequested={adRequested}
              itemRequestedFor={itemRequestedFor}
            />
          );
        })
      )}
    </>
  );
};

export default ProductInputListing;
