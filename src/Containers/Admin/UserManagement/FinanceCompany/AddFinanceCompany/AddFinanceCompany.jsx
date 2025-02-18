import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import AjUploadCACDocument from "../../../../../Components/AjUploadCACDocument/AjUploadCACDocument";
import AjAdress from "../../../../../Components/AjAdress/AjAdress";

import {
  getUserData,
  encrypt,
} from "../../../../../Services/localStorageService";
import { PASSWORD_ENCRYPTION_SECRET } from "../../../../../Constant/AppConstant";
import { addFinanceCompanyAction } from "../../../../../Redux/SuperAdmin/UserManagement/FinanceCompany/financeCompanyAction";
import {
  ADMIN_FINANCE,
  ADMIN_USER_MANAGEMENT,
} from "../../../../../Routes/Routes";

import {
  commonStyles,
  customCommonStyles,
} from "../../../../../Style/CommonStyle";
import styles from "../../CorporateBuyer/AddCorporateBuyer/AddCorporateBuyerStyle";
import { styles as addFinanceCompanyStyle } from "./AddFinanceCompanyStyle";
import { styles as buttonStyles } from "../../Aggregators/AddAggregator/AddAggregatorStyles";

function AddFinanceCompany() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = getUserData();

  const [countryId, setCountryId] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [financeData, setfinanceData] = useState({});
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
      financePersonalDetails,
      financeCompanyDetails,
      financeAddressDetails,
    } = financeData;
    if (
      passportDetails &&
      cacDetails &&
      emailDetail &&
      passwordDetails &&
      mobileNumberDetails &&
      financePersonalDetails &&
      financeCompanyDetails &&
      financeAddressDetails
    ) {
      onFinalSubmit();
    }
  }, [financeData]);

  const financeDataRef = useRef(financeData);
  const isDoneRef = useRef(false);

  const addFinance = () => {
    setIsSubmit(true);
    isDoneRef.current = true;
  };
  const updateState = (newState) => {
    financeDataRef.current = newState;
    setfinanceData(newState);
    setIsSubmit(false);
  };
  const getfinancePersonalDetails = (data) => {
    updateState({
      ...financeDataRef.current,
      financePersonalDetails: data,
    });
  };
  const getPassportDetails = (data) =>
    updateState({ ...financeDataRef.current, passportDetails: data });
  const getCACDetails = (data) =>
    updateState({ ...financeDataRef.current, cacDetails: data });
  const getPhoneNumberDetails = (data) =>
    updateState({ ...financeDataRef.current, mobileNumberDetails: data });
  const addFinanceAddressDetails = (data) =>
    updateState({ ...financeDataRef.current, financeAddressDetails: data });
  const getFinanceCompanyDetails = (data) =>
    updateState({ ...financeDataRef.current, financeCompanyDetails: data });
  const addFinancePasswordDetails = (data) =>
    updateState({ ...financeDataRef.current, passwordDetails: data });
  const addFinanceEmailDetails = (data) =>
    updateState({ ...financeDataRef.current, emailDetail: data });
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
      financePersonalDetails,
      financeCompanyDetails,
      financeAddressDetails,
    } = financeData;
    if (
      !mobileNumberDetails ||
      !passportDetails ||
      !financePersonalDetails ||
      !financeCompanyDetails ||
      !financeAddressDetails ||
      !passwordDetails ||
      !emailDetail ||
      !cacDetails
    )
      return;

    const addFinanceCompanyData = {
      email: emailDetail.email,
      countryId: countryId || userData?.country_id,
      mobileNumber: mobileNumberDetails.mobileNumber,
      password: encrypt(passwordDetails.password, PASSWORD_ENCRYPTION_SECRET),
      firstName: financePersonalDetails.firstName,
      lastName: financePersonalDetails.lastName,
      gender: financePersonalDetails.gender,
      dateOfBirth: moment(financePersonalDetails.dateOfBirth),
      financeCompanyName: financeCompanyDetails.companyName,
      addressLine1: financeAddressDetails.addressLine1,
      country: parseInt(financeAddressDetails.country),
      state: parseInt(financeAddressDetails.state),
      city: financeAddressDetails.city,
      zipCode: parseInt(financeAddressDetails.zipCode),
    };

    if (passportDetails.CACDocument)
      addFinanceCompanyData["passportPhotoId"] = parseInt(
        passportDetails.CACDocument
      );
    if (cacDetails.CACDocument)
      addFinanceCompanyData["cacDocumentId"] = parseInt(cacDetails.CACDocument);
    if (financeCompanyDetails.registrationNumber)
      addFinanceCompanyData["registrationNumber"] =
        financeCompanyDetails.registrationNumber;

    if (financeCompanyDetails.orgVerificationNumber)
      addFinanceCompanyData["orgVerificationNumber"] =
        financeCompanyDetails.orgVerificationNumber;

    if (financeCompanyDetails.orgVerificationNumber)
      addFinanceCompanyData["orgVerificationType"] =
        financeCompanyDetails.verificationTextRef.current;

    if (financeAddressDetails.addressLine2)
      addFinanceCompanyData["addressLine2"] =
        financeAddressDetails.addressLine2;
    dispatch(addFinanceCompanyAction(addFinanceCompanyData, navigate));
    setIsSubmit(false);
  };
  const backArrowHandler = () => {
    navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_FINANCE}`);
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
            displayText="Add Finance Company"
          />
          <Grid sx={styles.addCorporateBuyerContainer}>
            <AjEmail submit={isSubmit} data={addFinanceEmailDetails} />
            <AjPasswordBase
              submit={isSubmit}
              data={addFinancePasswordDetails}
            />
            <AjPhoneNumber
              submit={isSubmit}
              data={getPhoneNumberDetails}
              onCountryCodeSelect={onCountryCodeSelect}
            />
            <Box
              component="form"
              sx={{
                ...commonStyles.signupFormContainer,
                ...styles.formMarginTop,
                ...styles.responsiveFullWidth,
              }}
            >
              <AjPersonalDetails
                submit={isSubmit}
                data={getfinancePersonalDetails}
                customStyles={{
                  ...styles.responsiveFullWidth,
                }}
              />
              <AjUploadCACDocument
                label={"Passport Photo: (JPEG, PNG or PDF only)"}
                documentRequired={false}
                error={"Passport Photo is required"}
                submit={isSubmit}
                data={getPassportDetails}
                styleData={styles.normalMarginTop}
                docType="PASSPORT_PHOTO"
              />
              <AjCompanyDetails
                submit={isSubmit}
                data={getFinanceCompanyDetails}
                styleData={customCommonStyles.tinNumberContainer}
                companyNameLabel="Finance Company Name"
                registrationNumberLabel="Finance Company registration number"
                companyNamePlaceholder="Enter Finance Company name"
                type="Finance Company"
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
                data={addFinanceAddressDetails}
                customStyle={styles.responsiveFullWidth}
                defaultCountry={countryId || userData?.country_id}
                isStateReset={true}
              />
              <Grid
                container
                sx={{
                  ...commonStyles.marginTop20,
                  ...buttonStyles.responsiveFields,
                }}
                columnSpacing={"1.25rem"}
              >
                <Grid sx={{ ...buttonStyles.saveBtnContainer }}>
                  <AjButton
                    onClick={addFinance}
                    variant="contained"
                    displayText="Add Finance Company"
                    styleData={addFinanceCompanyStyle.financeBtnWidth}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default AddFinanceCompany;
