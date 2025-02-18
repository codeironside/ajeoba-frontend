import React from "react";
import { Box } from "@mui/material";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";
import AjTypography from "../../../../Components/AjTypography";
import AjAdsCertificateReqPost from "../../../../Components/AjAdsCertificateReqPost/AjAdsCertificateReqPost";

const CertificateRequestsListing = ({ dataToList }) => {
  
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
        dataToList?.map((data) => <AjAdsCertificateReqPost data={data} />)
      )}
    </>
  );
};

export default CertificateRequestsListing;
