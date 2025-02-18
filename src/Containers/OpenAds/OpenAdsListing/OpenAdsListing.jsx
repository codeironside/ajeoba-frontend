import React from "react";
import { Box } from "@mui/system";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";
import AjTypography from "../../../Components/AjTypography";
import AjAdsCertificateReqPost from "../../../Components/AjAdsCertificateReqPost/AjAdsCertificateReqPost";

const OpenAdsListing = ({ dataToList }) => {
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
        <Box sx={{ ...customCommonStyles.tableHeightNoDataFoundSearchFilter }}>
          {dataToList?.map((data) => {
            return <AjAdsCertificateReqPost data={data} />;
          })}
        </Box>
      )}
    </>
  );
};

export default OpenAdsListing;
