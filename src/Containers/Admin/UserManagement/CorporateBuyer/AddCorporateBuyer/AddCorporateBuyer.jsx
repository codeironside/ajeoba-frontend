import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Grid, Box, IconButton } from "@mui/material";
import * as moment from "moment";

import AjTypography from "../../../../../Components/AjTypography";
import AjEmail from "../../../../../Components/AjEmail/AjEmail";
import AjPasswordBase from "../../../../../Components/AjPasswordBase/AjPasswordBase";
import AjPhoneNumber from "../../../../../Components/AjPhoneNumber/AjPhoneNumber";
import AjPersonalDetails from "../../../../../Components/AjPersonalDetails/AjPersonalDetails";
import AjCompanyDetails from "../../../../../Components/AjCompanyDetails/AjCompanyDetails";
import AjButton from "../../../../../Components/AjButton";

import {
  ADMIN_CORPORATE_BUYER,
  ADMIN_USER_MANAGEMENT,
} from "../../../../../Routes/Routes";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../../Style/CommonStyle";
import styles from "./AddCorporateBuyerStyle";
import AjUploadCACDocument from "../../../../../Components/AjUploadCACDocument/AjUploadCACDocument";
import AjAdress from "../../../../../Components/AjAdress/AjAdress";
import { styles as buttonStyles } from "../../Aggregators/AddAggregator/AddAggregatorStyles";
import {
  getUserData,
  encrypt,
} from "../../../../../Services/localStorageService";
import { PASSWORD_ENCRYPTION_SECRET } from "../../../../../Constant/AppConstant";
import { addCorporateAction } from "../../../../../Redux/SuperAdmin/UserManagement/CorporateBuyer/corporateBuyerActions";
import { useDispatch } from "react-redux";

function AddCorporateBuyer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = getUserData();

  const [countryId, setCountryId] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [corporateData, setCorporateData] = useState({});
  const defaultCountryId = useSelector((state) => state.countries.countryId);

  useEffect(() => {
    if (defaultCountryId) {
      setCountryId(defaultCountryId);
    }
  }, [defaultCountryId]);

  useEffect(() => {
    const {
      passportDetails,
      cacDetails,
      emailDetail,
      passwordDetails,
      mobileNumberDetails,
      corporatePersonalDetails,
      corporateCompanyDetails,
      corporateAddressDetails,
    } = corporateData;
    if (
      passportDetails &&
      cacDetails &&
      emailDetail &&
      passwordDetails &&
      mobileNumberDetails &&
      corporatePersonalDetails &&
      corporateCompanyDetails &&
      corporateAddressDetails
    ) {
      onFinalSubmit();
    }
  }, [corporateData]);

  const corporateDataRef = useRef(corporateData);
  const isDoneRef = useRef(false);

  const addCorporate = () => {
    setIsSubmit(true);
    isDoneRef.current = true;
  };

  const updateState = (newState) => {
    corporateDataRef.current = newState;
    setCorporateData(newState);
    setIsSubmit(false);
  };

  const getCorporatePersonalDetails = (data) => {
    updateState({
      ...corporateDataRef.current,
      corporatePersonalDetails: data,
    });
  };

  const getPassportDetails = (data) => {
    updateState({ ...corporateDataRef.current, passportDetails: data });
  };

  const getCACDetails = (data) => {
    updateState({ ...corporateDataRef.current, cacDetails: data });
  };

  const getPhoneNumberDetails = (data) => {
    updateState({ ...corporateDataRef.current, mobileNumberDetails: data });
  };

  const getCorporateAddressDetails = (data) => {
    updateState({ ...corporateDataRef.current, corporateAddressDetails: data });
  };

  const getCorporateCompanyDetails = (data) => {
    updateState({ ...corporateDataRef.current, corporateCompanyDetails: data });
  };

  const getCorporatePasswordDetails = (data) => {
    updateState({ ...corporateDataRef.current, passwordDetails: data });
  };

  const getCorporateEmailDetails = (data) => {
    updateState({ ...corporateDataRef.current, emailDetail: data });
  };

  const onCountryCodeSelect = (selectedCountry) => {
    setCountryId(selectedCountry.countryId);
  };

  const onFinalSubmit = (data) => {
    if (!isDoneRef.current) {
      return;
    }
    isDoneRef.current = false;
    const {
      cacDetails,
      passportDetails,
      emailDetail,
      passwordDetails,
      mobileNumberDetails,
      corporatePersonalDetails,
      corporateCompanyDetails,
      corporateAddressDetails,
    } = corporateData;

    if (
      !mobileNumberDetails ||
      !passportDetails ||
      !corporatePersonalDetails ||
      !corporateCompanyDetails ||
      !corporateAddressDetails ||
      !passwordDetails ||
      !emailDetail ||
      !cacDetails
    )
      return;

    const addCorporateData = {
      email: emailDetail.email,
      countryId: countryId || userData.country_id,
      mobileNumber: mobileNumberDetails.mobileNumber,
      password: encrypt(passwordDetails.password, PASSWORD_ENCRYPTION_SECRET),
      firstName: corporatePersonalDetails.firstName,
      lastName: corporatePersonalDetails.lastName,
      gender: corporatePersonalDetails.gender,
      dateOfBirth: moment(corporatePersonalDetails.dateOfBirth),
      corporateName: corporateCompanyDetails.companyName,
      addressLine1: corporateAddressDetails.addressLine1,
      country: parseInt(corporateAddressDetails.country),
      stateId: parseInt(corporateAddressDetails.state),
      city: corporateAddressDetails.city,
      zipCode: parseInt(corporateAddressDetails.zipCode),
    };

    if (passportDetails.CACDocument)
      addCorporateData["passportPhotoId"] = parseInt(
        passportDetails.CACDocument
      );

    if (cacDetails.CACDocument)
      addCorporateData["cacDocumentId"] = parseInt(cacDetails.CACDocument);

    if (corporateCompanyDetails.registrationNumber)
      addCorporateData["registrationNumber"] =
        corporateCompanyDetails.registrationNumber;

    if (corporateCompanyDetails.orgVerificationNumber)
      addCorporateData["orgVerificationNumber"] =
        corporateCompanyDetails.orgVerificationNumber;

    if (corporateCompanyDetails.orgVerificationNumber)
      addCorporateData["orgVerificationType"] =
        corporateCompanyDetails.verificationTextRef.current;

    if (corporateAddressDetails.addressLine2)
      addCorporateData["addressLine2"] = corporateAddressDetails.addressLine2;

    dispatch(addCorporateAction(addCorporateData, navigate));

    setIsSubmit(false);
  };

  const backArrowHandler = () => {
    navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_CORPORATE_BUYER}`);
  };
  return (
    <Grid container sx={commonStyles.signupFormMainGridContainer}>
      <Box sx={commonStyles.relativePosition}>
        <IconButton
          sx={commonStyles.backButtonPosition}
          onClick={backArrowHandler}
        >
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
            displayText="Add Corporate Buyer"
          />
          <AjEmail
            submit={isSubmit}
            data={getCorporateEmailDetails}
            customStyle={styles.responsiveCustomWidth}
          />

          <AjPasswordBase
            submit={isSubmit}
            data={getCorporatePasswordDetails}
            customStyle={styles.responsiveCustomWidth}
          />

          <AjPhoneNumber
            submit={isSubmit}
            data={getPhoneNumberDetails}
            onCountryCodeSelect={onCountryCodeSelect}
            customStyle={styles.responsiveCustomWidth}
          />

          <Box
            component="form"
            sx={{
              ...commonStyles.signupFormContainer,
              ...styles.formMarginTop,
            }}
          >
            <AjPersonalDetails
              submit={isSubmit}
              data={getCorporatePersonalDetails}
              customStyles={styles.responsiveFullWidth}
            />

            <AjUploadCACDocument
              label={"Passport Photo: (JPEG, PNG or PDF only)"}
              documentRequired={true}
              error={"Passport Photo is required"}
              submit={isSubmit}
              data={getPassportDetails}
              styleData={styles.normalMarginTop}
              docType="PASSPORT_PHOTO"
            />

            <AjCompanyDetails
              submit={isSubmit}
              data={getCorporateCompanyDetails}
              styleData={customCommonStyles.tinNumberContainer}
              companyNameLabel="Corporate Name"
              registrationNumberLabel="Corporate registration number"
              companyNamePlaceholder="Enter corporate name"
              type="Corporate"
              registrationRequired={false}
              tinRequired={false}
              countryId={countryId}
            />

            <AjUploadCACDocument
              submit={isSubmit}
              data={getCACDetails}
              styleData={styles.normalMarginTop}
              docType="CAC_PHOTO"
            />

            <AjAdress
              submit={isSubmit}
              data={getCorporateAddressDetails}
              customStyle={styles.responsiveFullWidth}
              defaultCountry={countryId || userData?.country_id}
              isStateReset={true}
              zipCodeRequired
            />
            <Grid
              container
              sx={{
                ...commonStyles.marginTop20,
                ...buttonStyles.responsiveFields,
              }}
              columnSpacing={"1.25rem"}
            >
              <Grid sx={buttonStyles.saveBtnContainer}>
                <AjButton
                  onClick={addCorporate}
                  variant="contained"
                  displayText="Add Corporate Buyer"
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default AddCorporateBuyer;
