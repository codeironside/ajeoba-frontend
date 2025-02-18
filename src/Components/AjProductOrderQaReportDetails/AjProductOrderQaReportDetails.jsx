import React from "react";
import { Box } from "@mui/material";
import AjTypography from "../AjTypography";
import { viewProfileStyles } from "../../Containers/Profile/ViewProfile/ViewProfileStyle";

import AjDetailData from "../AjDetailData/AjDetailData";

function AjProductOrderQaReportDetails({
  label,
  statusLabel,
  labelDescription,
  description,
  qaStatus,
  docId,
}) {
  return (
    <>
      <Box>
        <AjTypography
          displayText={label}
          styleData={viewProfileStyles.addressMainHeading}
        />
        <Box sx={viewProfileStyles.addressHeading}>
          <Box sx={viewProfileStyles.addressLineHeading}>
            {statusLabel} &nbsp;-
          </Box>
          <Box
            sx={[
              viewProfileStyles.subHeadingColor,
              viewProfileStyles.addressContent,
            ]}
          >
            {qaStatus}
          </Box>
        </Box>

        <Box sx={viewProfileStyles.addressHeading}>
          <Box sx={viewProfileStyles.addressLineHeading}>
            {labelDescription} &nbsp;-
          </Box>
          <Box
            sx={[
              viewProfileStyles.subHeadingColor,
              viewProfileStyles.addressContent,
            ]}
          >
            {description}
          </Box>
        </Box>

        <Box sx={viewProfileStyles.addressHeading}>
          <Box sx={viewProfileStyles.addressLineHeading}>Certificate</Box>
          <Box>
            <AjDetailData
              documentDownloader
              fileName={"Download Certificate"}
              fileId={docId}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AjProductOrderQaReportDetails;
