import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, InputBase, Typography } from "@mui/material";
import * as _ from "lodash";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import {
  employmentOption,
  taxOptions,
  UIN_TYPE_VALUE,
} from "../../Constant/AppConstant";
import { styles as detailsstyle } from "../LandingPage/ProductListing/ProductListingExpanded/ProductList.js";
import { EmploymentDetailsSchema } from "../../validationSchema/employmentDetailsSchema";

const AjEmploymentDetailsNew = (props) => {
  const {
  } = useForm({
    resolver: yupResolver(
      EmploymentDetailsSchema(
        props.adminNotRequiredFields,
        props.taxIdNotRequired
      )
    ),
    mode: "onChange",
  });

  const onError = (err) => {
    props.data(null);
  };

  useEffect(() => {
    if (props.submit) {
      onSubmit();
    }
  }, [props.submit]);

  const getTaxOption = (defaultTaxOption) => {
    const taxOption = taxOptions.find((tax) => tax.value === defaultTaxOption);
    return taxOption ? taxOption.label : null;
  };

  const getEmployemtOption = (defaultEmploymentType) => {
    const employemntOption = employmentOption.find(
      (employemnt) => employemnt.value === defaultEmploymentType
    );
    return employemntOption ? employemntOption.label : null;
  };

  const getIDType = (defaultUINPinType) => {
    const idOption = UIN_TYPE_VALUE.find(
      (id) => id.value === defaultUINPinType
    );
    return idOption ? idOption.label : null;
  };

  const getEmploymentDetails = (props) => {
    let employmentDetails = {};

    if (props.defaultUINPinType) {
      employmentDetails.UinPinTypeToSend = props.defaultUINPinType;
    }
    if (props.defaultEmploymentType) {
      employmentDetails.employmentTypeToSend = props.defaultEmploymentType;
    }
    if (props.defaultUniqueIdentificationNumber) {
      employmentDetails.uniqueIdentificationNumber =
        props.defaultUniqueIdentificationNumber;
    }
    if (props.defaultCitizenship) {
      employmentDetails.citizenship = props.defaultCitizenship;
    }
    if (props.defaultCountryOfBirth) {
      employmentDetails.countryOfBirth = props.defaultCountryOfBirth;
    }
    if (props.defaultExperience) {
      employmentDetails.experience = props.defaultExperience;
    }
    if (props.defaultTaxOption) {
      employmentDetails.taxOption = props.defaultTaxOption;
    }
    if (props.defaultCountryOfTax) {
      employmentDetails.countryOfTax = props.defaultCountryOfTax;
    }
    if (props.defaultTaxId) {
      employmentDetails.taxId = props.defaultTaxId;
    }
    return employmentDetails;
  };

  const onSubmit = () => {
    props.data(getEmploymentDetails(props));
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
              Country of Birth:
            </Typography>
            <Typography
              sx={{
                ...detailsstyle.farmerdetailsheadetablecontainerdetailvalue,
              }}
            >
              {props.findCountryById(props.defaultCountryOfBirth)}
            </Typography>
          </Box>

          <Box sx={{ ...detailsstyle.farmerdetailsheadetabledetailpair }}>
            {" "}
            <Typography
              sx={{ ...detailsstyle.farmerdetailsheadetablecontainerdetailkey }}
            >
              Citizenship:
            </Typography>
            <Typography
              sx={{
                ...detailsstyle.farmerdetailsheadetablecontainerdetailvalue,
              }}
            >
              {props.findCountryById(props.defaultCitizenship)}
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
              Employment Type:
            </Typography>
            <Typography
              sx={{
                ...detailsstyle.farmerdetailsheadetablecontainerdetailvalue,
              }}
            >
              {getEmployemtOption(props.defaultEmploymentType)}
            </Typography>
          </Box>

          <Box sx={{ ...detailsstyle.farmerdetailsheadetabledetailpair }}>
            {" "}
            <Typography
              sx={{ ...detailsstyle.farmerdetailsheadetablecontainerdetailkey }}
            >
              Experience:
            </Typography>
            <Typography
              sx={{
                ...detailsstyle.farmerdetailsheadetablecontainerdetailvalue,
              }}
            >
              {props.defaultExperience}
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
              Country of Tax:
            </Typography>
            <Typography
              sx={{
                ...detailsstyle.farmerdetailsheadetablecontainerdetailvalue,
              }}
            >
              {props.findCountryById(props.defaultCountryOfTax)}
            </Typography>
          </Box>

          <Box sx={{ ...detailsstyle.farmerdetailsheadetabledetailpair }}>
            {" "}
            <Typography
              sx={{ ...detailsstyle.farmerdetailsheadetablecontainerdetailkey }}
            >
              Do you have tax ID:
            </Typography>
            <Typography
              sx={{
                ...detailsstyle.farmerdetailsheadetablecontainerdetailvalue,
              }}
            >
              {getTaxOption(props.defaultTaxOption)}
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
              UIN Type:
            </Typography>
            <Typography
              sx={{
                ...detailsstyle.farmerdetailsheadetablecontainerdetailvalue,
              }}
            >
              {getIDType(props.defaultUINPinType)}
            </Typography>
          </Box>

          <Box sx={{ ...detailsstyle.farmerdetailsheadetabledetailpair }}>
            {" "}
            <Typography
              sx={{ ...detailsstyle.farmerdetailsheadetablecontainerdetailkey }}
            >
              UIN Number:
            </Typography>
            <Typography
              sx={{
                ...detailsstyle.farmerdetailsheadetablecontainerdetailvalue,
              }}
            >
              {props.defaultUniqueIdentificationNumber}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AjEmploymentDetailsNew;
