import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Grid, Box, IconButton } from "@mui/material";
import * as moment from "moment";
import * as _ from "lodash";

import AjTypography from "../../../../../Components/AjTypography";
import AjEmail from "../../../../../Components/AjEmail/AjEmail";
import AjPasswordBase from "../../../../../Components/AjPasswordBase/AjPasswordBase";
import AjPhoneNumber from "../../../../../Components/AjPhoneNumber/AjPhoneNumber";
import AjPersonalDetails from "../../../../../Components/AjPersonalDetails/AjPersonalDetails";
import AjUploadCACDocument from "../../../../../Components/AjUploadCACDocument/AjUploadCACDocument";
import AjCompanyDetails from "../../../../../Components/AjCompanyDetails/AjCompanyDetails";
import AjAdress from "../../../../../Components/AjAdress/AjAdress";
import AjMultipleTruck from "../../../../../Components/AjMultipleTruck/AjMultipleTruck";
import AjButton from "../../../../../Components/AjButton";

import {
  commonStyles,
  customCommonStyles,
} from "../../../../../Style/CommonStyle";
import {
  encrypt,
  getUserData,
} from "../../../../../Services/localStorageService";
import { PASSWORD_ENCRYPTION_SECRET } from "../../../../../Constant/AppConstant";
import { styles as AddPageStyle } from "../../CorporateBuyer/AddCorporateBuyer/AddCorporateBuyerStyle";
import { styles as buttonStyles } from "../../Aggregators/AddAggregator/AddAggregatorStyles";
import {
  ADMIN_LOGISTICS,
  ADMIN_USER_MANAGEMENT,
} from "../../../../../Routes/Routes";
import { showToast } from "../../../../../Services/toast";
import { addLogisticCompanyAction } from "../../../../../Redux/common/LogisticCompany/logisticCompanyActions";
import styles from "./AddLogisticCompanyStyle";

function AddLogisticCompany() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = getUserData();

  const [countryId, setCountryId] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);

  const [logisticData, setLogisticData] = useState({});
  const defaultCountryId = useSelector((state) => state.countries.countryId);

  useEffect(() => {
    if (defaultCountryId) {
      setCountryId(defaultCountryId);
    }
  }, [defaultCountryId]);

  useEffect(() => {
    const {
      passportDetails,
      truckDetails,
      cacDetails,
      emailDetail,
      passwordDetails,
      mobileNumberDetails,
      logisticPersonalDetails,
      logisticCompanyDetails,
      logisticAddressDetails,
    } = logisticData;
    if (
      passportDetails &&
      truckDetails &&
      cacDetails &&
      emailDetail &&
      passwordDetails &&
      mobileNumberDetails &&
      logisticPersonalDetails &&
      logisticCompanyDetails &&
      logisticAddressDetails
    ) {
      onFinalSubmit();
    }
  }, [logisticData]);

  const logisticDataRef = useRef(logisticData);
  const isDoneRef = useRef(false);

  const addLogistic = () => {
    setIsSubmit(true);
    isDoneRef.current = true;
  };

  const updateState = (newState) => {
    logisticDataRef.current = newState;
    setLogisticData(newState);
    setIsSubmit(false);
  };

  const getLogisticPersonalDetails = (data) => {
    updateState({
      ...logisticDataRef.current,
      logisticPersonalDetails: data,
    });
  };

  const getPassportDetails = (data) =>
    updateState({ ...logisticDataRef.current, passportDetails: data });

  const getCACDetails = (data) =>
    updateState({ ...logisticDataRef.current, cacDetails: data });

  const getPhoneNumberDetails = (data) =>
    updateState({ ...logisticDataRef.current, mobileNumberDetails: data });

  const getLogisticAddressDetails = (data) =>
    updateState({ ...logisticDataRef.current, logisticAddressDetails: data });

  const getLogisticCompanyDetails = (data) =>
    updateState({ ...logisticDataRef.current, logisticCompanyDetails: data });

  const getLogisticPasswordDetails = (data) =>
    updateState({ ...logisticDataRef.current, passwordDetails: data });

  const getLogisticEmailDetails = (data) =>
    updateState({ ...logisticDataRef.current, emailDetail: data });

  const onCountryCodeSelect = (selectedCountry) => {
    setCountryId(selectedCountry.countryId);
  };
  const getTruckDetails = (data, countValid) => {
    const lastItem = _.last(data);
    if (lastItem?.truckCount > 0) {
      updateState({
        ...logisticDataRef.current,
        truckDetails: data?.map((truck) => ({
          no_of_trucks: parseInt(truck.truckCount),
          item_id: truck.truckData.id,
        })),
      });
    } else {
      showToast("Number of trucks is required", "error");
    }
  };

  const onFinalSubmit = (data) => {
    if (!isDoneRef.current) {
      return;
    }
    isDoneRef.current = false;
    const {
      cacDetails,
      passportDetails,
      truckDetails,
      emailDetail,
      passwordDetails,
      mobileNumberDetails,
      logisticPersonalDetails,
      logisticCompanyDetails,
      logisticAddressDetails,
    } = logisticData;

    if (
      !mobileNumberDetails ||
      !truckDetails ||
      !passportDetails ||
      !logisticPersonalDetails ||
      !logisticCompanyDetails ||
      !logisticAddressDetails ||
      !passwordDetails ||
      !emailDetail ||
      !cacDetails
    )
      return;

    const addLogisticData = {
      email: emailDetail.email,
      countryId: countryId || userData.country_id,
      mobileNumber: mobileNumberDetails.mobileNumber,
      password: encrypt(passwordDetails.password, PASSWORD_ENCRYPTION_SECRET),
      firstName: logisticPersonalDetails.firstName,
      lastName: logisticPersonalDetails.lastName,
      gender: logisticPersonalDetails.gender,
      dateOfBirth: moment(logisticPersonalDetails.dateOfBirth),
      companyName: logisticCompanyDetails.companyName,
      addressLine1: logisticAddressDetails.addressLine1,
      country: parseInt(logisticAddressDetails.country),
      state: parseInt(logisticAddressDetails.state),
      city: logisticAddressDetails.city,
      zipCode: parseInt(logisticAddressDetails.zipCode),
    };

    if (passportDetails.CACDocument)
      addLogisticData["passportPhotoId"] = parseInt(
        passportDetails.CACDocument
      );

    if (cacDetails.CACDocument)
      addLogisticData["cacDocumentId"] = parseInt(cacDetails.CACDocument);

    if (logisticCompanyDetails.registrationNumber)
      addLogisticData["registrationNumber"] =
        logisticCompanyDetails.registrationNumber;

    if (logisticCompanyDetails.orgVerificationNumber)
      addLogisticData["orgVerificationNumber"] =
        logisticCompanyDetails.orgVerificationNumber;

    if (logisticCompanyDetails.orgVerificationNumber)
      addLogisticData["orgVerificationType"] =
        logisticCompanyDetails.verificationTextRef.current;

    if (logisticAddressDetails.addressLine2)
      addLogisticData["addressLine2"] = logisticAddressDetails.addressLine2;

    if (truckDetails) addLogisticData["truckDetails"] = truckDetails;

    dispatch(addLogisticCompanyAction(addLogisticData, navigate));

    setIsSubmit(false);
  };

  const backArrowHandler = () => {
    navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_LOGISTICS}`);
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
            displayText="Add Logistic Company"
          />
          <AjEmail
            submit={isSubmit}
            data={getLogisticEmailDetails}
            customStyle={AddPageStyle.responsiveCustomWidth}
          />
          <AjPasswordBase
            submit={isSubmit}
            data={getLogisticPasswordDetails}
            customStyle={AddPageStyle.responsiveCustomWidth}
          />
          <AjPhoneNumber
            submit={isSubmit}
            data={getPhoneNumberDetails}
            onCountryCodeSelect={onCountryCodeSelect}
            customStyle={AddPageStyle.responsiveCustomWidth}
          />
          <Box
            component="form"
            sx={{
              ...commonStyles.signupFormContainer,
              ...AddPageStyle.formMarginTop,
            }}
          >
            <AjPersonalDetails
              submit={isSubmit}
              data={getLogisticPersonalDetails}
              customStyles={AddPageStyle.responsiveFullWidth}
            />
            <AjUploadCACDocument
              label={"Passport Photo : (JPEG, PNG or PDF only)"}
              error={"Passport Photo is required"}
              submit={isSubmit}
              data={getPassportDetails}
              styleData={AddPageStyle.normalMarginTop}
              docType="PASSPORT_PHOTO"
            />
            <AjCompanyDetails
              submit={isSubmit}
              data={getLogisticCompanyDetails}
              styleData={customCommonStyles.tinNumberContainer}
              companyNameLabel="Logistic company Name"
              registrationNumberLabel="Logistic company registration number"
              companyNamePlaceholder="Enter logistic company name"
              type="Company"
              registrationRequired={false}
              tinRequired={false}
              countryId={countryId}
            />
            <AjUploadCACDocument
              submit={isSubmit}
              data={getCACDetails}
              styleData={AddPageStyle.normalMarginTop}
              docType="CAC_PHOTO"
            />
            <AjAdress
              submit={isSubmit}
              data={getLogisticAddressDetails}
              customStyle={AddPageStyle.responsiveFullWidth}
              defaultCountry={countryId || userData?.country_id}
              isStateReset={true}
              zipCodeRequired
            />
            <AjMultipleTruck submit={isSubmit} data={getTruckDetails} />
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
                  onClick={addLogistic}
                  variant="contained"
                  displayText="Add Logistic Company"
                  styleData={styles.logisticBtnWidth}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default AddLogisticCompany;
