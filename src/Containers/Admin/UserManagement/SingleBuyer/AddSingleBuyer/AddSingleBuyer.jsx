import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Box, Grid, IconButton } from "@mui/material";
import * as moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import AjAdress from "../../../../../Components/AjAdress/AjAdress";
import AjEmail from "../../../../../Components/AjEmail/AjEmail";
import AjEmploymentDetails from "../../../../../Components/AjEmploymentDetails/AjEmploymentDetails";
import AjPasswordBase from "../../../../../Components/AjPasswordBase/AjPasswordBase";
import AjPersonalDetails from "../../../../../Components/AjPersonalDetails/AjPersonalDetails";
import AjPhoneNumber from "../../../../../Components/AjPhoneNumber/AjPhoneNumber";
import AjTypography from "../../../../../Components/AjTypography";

import {
  ADMIN_SINGLE_BUYER,
  ADMIN_USER_MANAGEMENT,
} from "../../../../../Routes/Routes";
import {
  encrypt,
  getUserData,
} from "../../../../../Services/localStorageService";

import { useDispatch, useSelector } from "react-redux";
import AjButton from "../../../../../Components/AjButton";
import AjDocumentDownloader from "../../../../../Components/AjDocumentDownloader";
import AjDocumentUploader from "../../../../../Components/AjDocumentUploader";
import AjInputLabel from "../../../../../Components/AjInputLabel";
import { PASSWORD_ENCRYPTION_SECRET } from "../../../../../Constant/AppConstant";
import { addSingleBuyerAction } from "../../../../../Redux/SuperAdmin/UserManagement/SingleBuyer/singleBuyerActions";
import { commonStyles } from "../../../../../Style/CommonStyle";
import { styles } from "../SingleBuyerStyles";
import { replaceWithUnderScore } from "../../../../../Services/commonService/commonService";

const AddSingleBuyer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = getUserData();

  const [isSubmit, setIsSubmit] = useState(false);
  const [countryId, setCountryId] = useState(null);
  const [singleBuyer, setSingleBuyer] = useState({});
  const [passportSingleBuyerData, setPassportSingleBuyerData] = useState();
  const defaultCountryId = useSelector((state) => state.countries.countryId);

  useEffect(() => {
    if (defaultCountryId) {
      setCountryId(defaultCountryId);
    }
  }, [defaultCountryId]);

  useEffect(() => {
    const {
      singleBuyerEmailDetails,
      singleBuyerPhoneNumberDetails,
      singleBuyerPasswordDetails,
      singleBuyerPersonalDetails,
      singleBuyerEmploymentDetails,
      singleBuyerAddressDetails,
    } = singleBuyer;
    if (
      singleBuyerEmailDetails &&
      singleBuyerPhoneNumberDetails &&
      singleBuyerPasswordDetails &&
      singleBuyerPersonalDetails &&
      singleBuyerEmploymentDetails &&
      singleBuyerAddressDetails
    ) {
      submitHandler();
    }
  }, [singleBuyer]);

  const singleBuyerDataRef = useRef(singleBuyer);

  const addSingleBuyer = () => {
    setIsSubmit(true);
  };

  const updateState = (newState) => {
    singleBuyerDataRef.current = newState;
    setSingleBuyer(newState);
    setIsSubmit(false);
  };

  const getSingleBuyerEmailDetails = (data) => {
    updateState({
      ...singleBuyerDataRef.current,
      singleBuyerEmailDetails: data,
    });
  };

  const getSingleBuyerPhoneNumberDetails = (data) => {
    updateState({
      ...singleBuyerDataRef.current,
      singleBuyerPhoneNumberDetails: data,
    });
  };

  const getSingleBuyerPasswordDetails = (data) => {
    updateState({
      ...singleBuyerDataRef.current,
      singleBuyerPasswordDetails: data,
    });
  };

  const getSingleBuyerPersonalDetails = (data) => {
    updateState({
      ...singleBuyerDataRef.current,
      singleBuyerPersonalDetails: data,
    });
  };

  const getSingleBuyerEmploymentDetails = (data) => {
    updateState({
      ...singleBuyerDataRef.current,
      singleBuyerEmploymentDetails: data,
    });
  };

  const getSingleBuyerAddressDetails = (data) => {
    updateState({
      ...singleBuyerDataRef.current,
      singleBuyerAddressDetails: data,
    });
  };

  const onCountryCodeSelect = (selectedCountry) => {
    setCountryId(selectedCountry.countryId);
  };

  const passportUploadSingleBuyer = (data) => {
    setPassportSingleBuyerData(data);
  };

  const changePassportImageSingleBuyer = (e) => {
    e.preventDefault();
    setPassportSingleBuyerData("");
  };

  const submitHandler = () => {
    const {
      singleBuyerEmailDetails,
      singleBuyerPhoneNumberDetails,
      singleBuyerPasswordDetails,
      singleBuyerPersonalDetails,
      singleBuyerEmploymentDetails,
      singleBuyerAddressDetails,
    } = singleBuyer;
    if (
      !singleBuyerEmailDetails ||
      !singleBuyerPhoneNumberDetails ||
      !singleBuyerPasswordDetails ||
      !singleBuyerPersonalDetails ||
      !singleBuyerEmploymentDetails ||
      !singleBuyerAddressDetails
    ) {
      return;
    }
    const addSingleBuyerData = {
      email: singleBuyerEmailDetails.email,
      countryId: countryId || userData.country_id,
      mobileNumber: singleBuyerPhoneNumberDetails.mobileNumber,
      password: encrypt(
        singleBuyerPasswordDetails.password,
        PASSWORD_ENCRYPTION_SECRET
      ),
      firstName: singleBuyerPersonalDetails.firstName,
      lastName: singleBuyerPersonalDetails.lastName,
      gender: singleBuyerPersonalDetails.gender,
      dateOfBirth: moment(singleBuyerPersonalDetails.dateOfBirth),
      experience: singleBuyerEmploymentDetails.experience,
      addressLine1: singleBuyerAddressDetails.addressLine1,
      country: parseInt(singleBuyerAddressDetails.country),
      state: parseInt(singleBuyerAddressDetails.state),
      city: singleBuyerAddressDetails.city,
    };

    if (passportSingleBuyerData?.id)
      addSingleBuyerData["passportPhotoId"] = parseInt(
        passportSingleBuyerData?.id
      );

    if (singleBuyerEmploymentDetails.employmentTypeToSend)
      addSingleBuyerData["employmentType"] =
        singleBuyerEmploymentDetails.employmentTypeToSend;

    if (singleBuyerEmploymentDetails.countryOfBirth)
      addSingleBuyerData["countryOfBirth"] = parseInt(
        singleBuyerEmploymentDetails.countryOfBirth
      );

    if (singleBuyerEmploymentDetails.citizenship)
      addSingleBuyerData["citizenship"] = parseInt(
        singleBuyerEmploymentDetails.citizenship
      );

    if (singleBuyerEmploymentDetails.countryOfTax)
      addSingleBuyerData["taxCountry"] = parseInt(
        singleBuyerEmploymentDetails.countryOfTax
      );

    if (singleBuyerEmploymentDetails.UinPinTypeToSend)
      addSingleBuyerData["uinTypeValue"] = replaceWithUnderScore(
        singleBuyerEmploymentDetails.UinPinTypeToSend
      );

    if (singleBuyerEmploymentDetails.uniqueIdentificationNumber)
      addSingleBuyerData["uniqueIdentificationNumber"] =
        singleBuyerEmploymentDetails.uniqueIdentificationNumber;

    if (singleBuyerEmploymentDetails.uniqueIdentificationState) {
      addSingleBuyerData.uniqueIdentificationState =
        singleBuyerEmploymentDetails.uniqueIdentificationState;
    }
    if (singleBuyerEmploymentDetails.taxId)
      addSingleBuyerData["taxId"] = parseInt(
        singleBuyerEmploymentDetails.taxId
      );

    if (singleBuyerAddressDetails.zipCode)
      addSingleBuyerData["zipCode"] = parseInt(
        singleBuyerAddressDetails.zipCode
      );

    if (singleBuyerAddressDetails.addressLine2)
      addSingleBuyerData["addressLine2"] =
        singleBuyerAddressDetails.addressLine2;

    dispatch(addSingleBuyerAction(addSingleBuyerData, navigate));
    setIsSubmit(false);
  };

  const backButtonHandler = () => {
    navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_SINGLE_BUYER}`);
  };

  return (
    <Grid container sx={commonStyles.signupFormMainGridContainer}>
      <Box sx={commonStyles.relativePosition}>
        <IconButton
          disableRipple
          sx={commonStyles.backButtonPosition}
          onClick={backButtonHandler}
        >
          {" "}
          <ArrowBackRoundedIcon sx={commonStyles.backButtonBlackFont} />
        </IconButton>
      </Box>
      <Grid
        container
        item
        sx={{
          ...commonStyles.signupFormMainContentContainer,
          ...commonStyles.customSrollBar,
        }}
      >
        <Box sx={commonStyles.signupContentContainer}>
          <AjTypography
            styleData={commonStyles.mainHeading}
            displayText="Add Buyer"
          />
          <Box component="form" sx={commonStyles.signupFormContainer}>
            <AjEmail submit={isSubmit} data={getSingleBuyerEmailDetails} />
            <AjPhoneNumber
              customStyle={commonStyles.marginTop20}
              submit={isSubmit}
              data={getSingleBuyerPhoneNumberDetails}
              onCountryCodeSelect={onCountryCodeSelect}
            />
            <AjPasswordBase
              submit={isSubmit}
              data={getSingleBuyerPasswordDetails}
            />
            <AjPersonalDetails
              submit={isSubmit}
              data={getSingleBuyerPersonalDetails}
            />
            <Box
              sx={{
                ...commonStyles.signupFormFieldContainer,
                ...styles.marginFields,
              }}
            >
              <AjInputLabel
                styleData={commonStyles.inputLabel}
                displayText="Passport photo: (JPEG, PNG or PDF only)"
              />
              {passportSingleBuyerData && passportSingleBuyerData.id ? (
                <AjDocumentDownloader
                  docId={passportSingleBuyerData.id}
                  docName={passportSingleBuyerData.file_name}
                  showIcon={true}
                  changeDocument={changePassportImageSingleBuyer}
                />
              ) : (
                <AjDocumentUploader
                  type="image"
                  docType="PASSPORT_PHOTO"
                  onUpload={passportUploadSingleBuyer}
                />
              )}
            </Box>
            {countryId && (
              <AjEmploymentDetails
                submit={isSubmit}
                defaultTaxOption="yes"
                data={getSingleBuyerEmploymentDetails}
                countryId={countryId}
                adminNotRequiredFields
                adminTaxIdNoOptions
                taxIdNotRequired
                resetEmpTypeInitialValue
                resetUINTypeInitialValue
              />
            )}
            <AjAdress
              submit={isSubmit}
              data={getSingleBuyerAddressDetails}
              defaultCountry={countryId || userData?.country_id}
              isStateReset={true}
            />
            <Grid
              sx={{
                ...commonStyles.centerContainerContent,
                ...commonStyles.fullWidth,
              }}
            >
              <AjButton
                onClick={addSingleBuyer}
                variant="contained"
                displayText="Add Buyer"
              />
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddSingleBuyer;
