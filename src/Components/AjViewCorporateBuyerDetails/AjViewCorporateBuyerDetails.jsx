import React from "react";
import { Grid } from "@mui/material";
import AjInputLabel from "../AjInputLabel";
import { commonStyles } from "../../Style/CommonStyle";
import { viewProfileStyles } from "../../Containers/Profile/ViewProfile/ViewProfileStyle";
import AjDocumentDownloader from "../AjDocumentDownloader";
import AjDetailTypography from "../AjDetailTypography/AjDetailTypography";

const AjViewCorporateBuyerDetails = (props) => {
  const { workDetails, verificationText } = props;
  console.log("Work details: ", workDetails);

  return (
    <>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <AjDetailTypography
          displayText1="Registered number"
          displayText2={workDetails.corporate_registration_number}
          styleData1={{
            ...commonStyles.inputLabel,
            ...viewProfileStyles.itemLabel,
          }}
          styleData2={{
            ...viewProfileStyles.subHeadingColor,
            ...viewProfileStyles.setWidth,
            ...viewProfileStyles.subHeadingStyle,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <AjDetailTypography
          displayText1={`${verificationText} number`}
          displayText2={workDetails.org_verification_number}
          styleData1={{
            ...commonStyles.inputLabel,
            ...viewProfileStyles.itemLabel,
          }}
          styleData2={{
            ...viewProfileStyles.subHeadingColor,
            ...viewProfileStyles.setWidth,
            ...viewProfileStyles.subHeadingStyle,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <AjInputLabel
          displayText="CAC document : (JPEG, PNG or PDF only)"
          styleData={[commonStyles.inputLabel, viewProfileStyles.itemLabel]}
        />

        <AjDocumentDownloader
          docId={workDetails.cac_document}
          docName={workDetails.file_name}
          showIcon={false}
          downloadWrapper={viewProfileStyles.downloadWrapper}
          changeBtnStyle={viewProfileStyles.changeBtnStyle}
          docTextStyle={viewProfileStyles.docTextStyle}
        />
      </Grid>
    </>
  );
};

export default AjViewCorporateBuyerDetails;
