import React from "react";
import { Box } from "@mui/material";
import AjDocumentDownloader from "../AjDocumentDownloader";
import { viewProfileStyles } from "../../Containers/Profile/ViewProfile/ViewProfileStyle";
import { commonStyles } from "../../Style/CommonStyle";

const alignStyle = {
  alignItems: "center",
  gap: "0.25rem",
  flexWrap: "wrap",
};

const documentStyle = {
  marginTop: 0,
  marginBottom: "0 !important",
  textDecoration: "none",
};
const flexStyle = {
  display: "flex",
};

const AjDetailData = (props) => {
  const {
    index,
    metaData,
    data,
    documentDownloader, //This props allows you to use document downloader in this component
    fileName,
    fileId,
    styleData,
    Address,
    secondryIndex,
    secondryMetaData,
    secondryData,
    styleData2,
  } = props;
  return (
    <>
      <Box
        sx={{
          ...viewProfileStyles.addressHeading,
          ...alignStyle,
          ...styleData,
        }}
      >
        <Box sx={{ ...flexStyle, ...alignStyle }}>
          <Box
            sx={{
              ...viewProfileStyles.addressLineHeading,
              ...commonStyles.textCapitalize,
            }}
          >
            {metaData} {index}&nbsp;-
          </Box>
          <Box
            sx={[
              viewProfileStyles.subHeadingColor,
              viewProfileStyles.addressContent,
              styleData2,
            ]}
          >
            {data}
          </Box>

          {documentDownloader && (
            <Box
              sx={[
                viewProfileStyles.subHeadingColor,
                viewProfileStyles.addressContent,
              ]}
            >
              <AjDocumentDownloader
                docName={fileName}
                changeBtnStyle={viewProfileStyles.changeBtnStyle}
                downloadWrapper={{
                  ...viewProfileStyles.downloadWrapper,
                  ...documentStyle,
                }}
                docId={fileId}
                docTextStyle={viewProfileStyles.docTextStyle}
                showIcon={true}
                iconGap={{ gap: "0.625rem" }}
              />
            </Box>
          )}
        </Box>
        <Box sx={{ ...flexStyle, ...alignStyle }}>
          {Address && (
            <>
              <Box
                sx={{
                  ...viewProfileStyles.addressLineHeading,
                  ...commonStyles.textCapitalize,
                }}
              >
                {secondryMetaData} {secondryIndex}&nbsp;-
              </Box>
              <Box
                sx={[
                  viewProfileStyles.subHeadingColor,
                  viewProfileStyles.addressContent,
                ]}
              >
                {secondryData}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default AjDetailData;
