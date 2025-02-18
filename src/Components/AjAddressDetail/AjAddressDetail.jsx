import React from "react";
import { Box } from "@mui/material";
import AjTypography from "../AjTypography";
import { viewProfileStyles } from "../../Containers/Profile/ViewProfile/ViewProfileStyle";
import { styles } from "../../Containers/Profile/ViewProfile/AssociationDetails/AssociationDetailsStyles";

const AjAddressDetail = (props) => {
  const {
    address1,
    address2,
    state,
    country,
    zipCode,
    city,
    customAddressDetailStyle,
    addressHeading
  } = props;
  return (
    <>
      <Box sx={{ ...styles.addressDetails, ...customAddressDetailStyle }}>
        <AjTypography
          displayText={addressHeading || "Address"}
          styleData={viewProfileStyles.addressMainHeading}
        />

        <Box sx={viewProfileStyles.addressHeading}>
          <Box sx={viewProfileStyles.addressLineHeading}>
            Address line 1&nbsp;-{" "}
          </Box>
          <Box
            sx={[
              viewProfileStyles.subHeadingColor,
              viewProfileStyles.addressContent,
            ]}
          >
            {address1}
          </Box>
        </Box>
        {address2 && (
          <Box sx={viewProfileStyles.addressHeading}>
            <Box sx={viewProfileStyles.addressLineHeading}>
              Address line 2&nbsp;-{" "}
            </Box>
            <Box
              sx={[
                viewProfileStyles.subHeadingColor,
                viewProfileStyles.addressContent,
              ]}
            >
              {address2}
            </Box>
          </Box>
        )}
        <Box sx={styles.wrapper}>
          <div className="box box1" style={viewProfileStyles.addressHeading}>
            Country&nbsp;-{" "}
            <span style={{...viewProfileStyles.subHeadingColor, ...viewProfileStyles.addressContent}}>{country}</span>
          </div>
          <div className="box box2" style={viewProfileStyles.addressHeading}>
            State&nbsp;-{" "}
            <span style={{...viewProfileStyles.subHeadingColor, ...viewProfileStyles.addressContent}}>{state}</span>
          </div>
          {zipCode && (
            <div className="box box3" style={viewProfileStyles.addressHeading}>
              Zip Code&nbsp;-{" "}
              <span style={viewProfileStyles.subHeadingColor}>{zipCode}</span>
            </div>
          )}
          <div className="box box4" style={viewProfileStyles.addressHeading}>
            City&nbsp;-{" "}
            <span style={{...viewProfileStyles.subHeadingColor, ...viewProfileStyles.addressContent}}>{city}</span>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default AjAddressDetail;
