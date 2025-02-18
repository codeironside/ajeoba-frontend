import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { styles as detailsstyle } from "../LandingPage/ProductListing/ProductListingExpanded/ProductList";
import { formatDate } from "../../Services/commonService/commonService";

function AjPersonalDetailsNew(props) {
  useEffect(() => {
    if (props.submit) {
      onSubmit();
    }
  }, [props.submit]);

  const getPersonalDetails = (props) => {
    let personalDetails = {};
    if (props.defaultFirstName) {
      personalDetails.firstName = props.defaultFirstName;
    }
    if (props.defaultLastName) {
      personalDetails.lastName = props.defaultLastName;
    }
    if (props.defaultDateOfBirth) {
      personalDetails.dateOfBirth = props.defaultDateOfBirth;
    }
    if (props.defaultGender) {
      personalDetails.gender = props.defaultGender;
    }
    return personalDetails;
  };

  const onSubmit = () => {
    props.data(getPersonalDetails(props));
  };

  return (
    <>
      <Box
        sx={{
          ...detailsstyle.farmerdetailsheadetablecontainer,
        }}
      >
        <Box
          sx={{
            ...detailsstyle.farmerdetailsheadetablecontainerdetailpair,
          }}
        >
          <Box sx={{ ...detailsstyle.farmerdetailsheadetabledetailpair }}>
            {" "}
            <Typography
              sx={{ ...detailsstyle.farmerdetailsheadetablecontainerdetailkey }}
            >
              First Name:
            </Typography>
            <Typography
              sx={{
                ...detailsstyle.farmerdetailsheadetablecontainerdetailvalue,
              }}
            >
              {props.defaultFirstName}
            </Typography>
          </Box>
          <Box sx={{ ...detailsstyle.farmerdetailsheadetabledetailpair }}>
            {" "}
            <Typography
              sx={{ ...detailsstyle.farmerdetailsheadetablecontainerdetailkey }}
            >
              Last Name:
            </Typography>
            <Typography
              sx={{
                ...detailsstyle.farmerdetailsheadetablecontainerdetailvalue,
              }}
            >
              {props.defaultLastName}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            ...detailsstyle.farmerdetailsheadetablecontainerdetailpair,
          }}
        >
          <Box sx={{ ...detailsstyle.farmerdetailsheadetabledetailpair }}>
            {" "}
            <Typography
              sx={{ ...detailsstyle.farmerdetailsheadetablecontainerdetailkey }}
            >
              Gender:
            </Typography>
            <Typography
              sx={{
                ...detailsstyle.farmerdetailsheadetablecontainerdetailvalue,
              }}
            >
              {props.defaultGender}
            </Typography>
          </Box>
          <Box sx={{ ...detailsstyle.farmerdetailsheadetabledetailpair }}>
            {" "}
            <Typography
              sx={{ ...detailsstyle.farmerdetailsheadetablecontainerdetailkey }}
            >
              Date Of Birth:
            </Typography>
            <Typography
              sx={{
                ...detailsstyle.farmerdetailsheadetablecontainerdetailvalue,
              }}
            >
              {formatDate(props.defaultDateOfBirth)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AjPersonalDetailsNew;
