import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Grid, Box, IconButton } from "@mui/material";
import * as moment from "moment";
import * as _ from "lodash";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import AjTypography from "../../../../../Components/AjTypography";
import AjInputLabel from "../../../../../Components/AjInputLabel";
import AjEmail from "../../../../../Components/AjEmail/AjEmail";
import AjPasswordBase from "../../../../../Components/AjPasswordBase/AjPasswordBase";
import AjPhoneNumber from "../../../../../Components/AjPhoneNumber/AjPhoneNumber";
import AjPersonalDetails from "../../../../../Components/AjPersonalDetails/AjPersonalDetails";
import AjUploadCACDocument from "../../../../../Components/AjUploadCACDocument/AjUploadCACDocument";
import AjCompanyDetails from "../../../../../Components/AjCompanyDetails/AjCompanyDetails";
import AjAdress from "../../../../../Components/AjAdress/AjAdress";
import AjButton from "../../../../../Components/AjButton";
import AjChipDropdown from "../../../../../Components/AjChipDropdown";

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
import { addInputSupplierSchema } from "../../../../../validationSchema/addInputSupplierSchema";
import {
  ADMIN_INPUT_SUPPLIER,
  ADMIN_USER_MANAGEMENT,
} from "../../../../../Routes/Routes";
import { addInputSupplierAction } from "../../../../../Redux/SuperAdmin/UserManagement/InputSupplier/inputSupplierActions";
import { getInputListAction } from "../../../../../Redux/SuperAdmin/InputMaster/inputMasterActions";
import { styles as btnStyle } from "../../LogisticCompany/AddLogisticCompany/AddLogisticCompanyStyle";
import styles from "./AddInputSupplierStyle";

function AddInputSupplier() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = getUserData();

  const inputs = useSelector((state) => state.inputMaster.inputList);

  const [countryId, setCountryId] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [addInputTypeValue, setAddInputTypeValue] = useState([]);
  const [isAddInputTypeValueUpdated, setIsAddInputTypeValueUpdated] =
    useState(false);
  const [inputData, setInputData] = useState({});
  const defaultCountryId = useSelector((state) => state.countries.countryId);

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addInputSupplierSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (isAddInputTypeValueUpdated) {
      const inputItems = [];
      addInputTypeValue.map((item) => {
        inputItems.push(_.find(inputs.result, { name: item }).id);
      });
      setValue("inputType", inputItems, {
        shouldValidate: true,
      });
    }
  }, [addInputTypeValue]);

  useEffect(() => {
    dispatch(getInputListAction({}));
  }, []);

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
      inputPersonalDetails,
      inputCompanyDetails,
      inputAddressDetails,
    } = inputData;
    if (
      passportDetails &&
      cacDetails &&
      emailDetail &&
      passwordDetails &&
      mobileNumberDetails &&
      inputPersonalDetails &&
      inputCompanyDetails &&
      inputAddressDetails
    ) {
      handleSubmit(onSubmit)();
    }
  }, [inputData]);

  const inputDataRef = useRef(inputData);
  const isDoneRef = useRef(false);

  const addInput = () => {
    if (!isAddInputTypeValueUpdated) handleSubmit(onSubmit)();
    setIsSubmit(true);
    isDoneRef.current = true;
  };

  const updateState = (newState) => {
    inputDataRef.current = newState;
    setInputData(newState);
    setIsSubmit(false);
  };

  const getInputPersonalDetails = (data) => {
    updateState({
      ...inputDataRef.current,
      inputPersonalDetails: data,
    });
  };

  const getPassportDetails = (data) =>
    updateState({ ...inputDataRef.current, passportDetails: data });

  const getCACDetails = (data) =>
    updateState({ ...inputDataRef.current, cacDetails: data });

  const getPhoneNumberDetails = (data) =>
    updateState({ ...inputDataRef.current, mobileNumberDetails: data });

  const getInputAddressDetails = (data) =>
    updateState({ ...inputDataRef.current, inputAddressDetails: data });

  const getInputCompanyDetails = (data) =>
    updateState({ ...inputDataRef.current, inputCompanyDetails: data });

  const getInputPasswordDetails = (data) =>
    updateState({ ...inputDataRef.current, passwordDetails: data });

  const getInputEmailDetails = (data) =>
    updateState({ ...inputDataRef.current, emailDetail: data });

  const onCountryCodeSelect = (selectedCountry) => {
    setCountryId(selectedCountry.countryId);
  };

  const onChangeInputType = (event) => {
    const {
      target: { value },
    } = event;
    setIsAddInputTypeValueUpdated(true);
    setAddInputTypeValue(value);
  };

  const handleDeleteInputType = (value) => {
    setAddInputTypeValue(addInputTypeValue.filter((name) => name !== value));
  };

  const onSubmit = (data) => {
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
      inputPersonalDetails,
      inputCompanyDetails,
      inputAddressDetails,
    } = inputData;

    if (
      !mobileNumberDetails ||
      !passportDetails ||
      !inputPersonalDetails ||
      !inputCompanyDetails ||
      !inputAddressDetails ||
      !passwordDetails ||
      !emailDetail ||
      !cacDetails
    )
      return;
    const addInputData = {
      email: emailDetail.email,
      countryId: countryId || userData?.country_id,
      mobileNumber: mobileNumberDetails.mobileNumber,
      password: encrypt(passwordDetails.password, PASSWORD_ENCRYPTION_SECRET),
      firstName: inputPersonalDetails.firstName,
      lastName: inputPersonalDetails.lastName,
      gender: inputPersonalDetails.gender,
      dateOfBirth: moment(inputPersonalDetails.dateOfBirth),
      inputSupplierName: inputCompanyDetails.companyName,
      addressLine1: inputAddressDetails.addressLine1,
      country: parseInt(inputAddressDetails.country),
      state: parseInt(inputAddressDetails.state),
      city: inputAddressDetails.city,
      zipCode: parseInt(inputAddressDetails.zipCode),
      inputs: data.inputType,
    };

    if (passportDetails.CACDocument)
      addInputData["passportPhotoId"] = parseInt(passportDetails.CACDocument);

    if (cacDetails.CACDocument)
      addInputData["cacDocumentId"] = parseInt(cacDetails.CACDocument);

    if (inputCompanyDetails.registrationNumber)
      addInputData["registrationNumber"] =
        inputCompanyDetails.registrationNumber;

    if (inputCompanyDetails.orgVerificationNumber)
      addInputData["orgVerificationNumber"] =
        inputCompanyDetails.orgVerificationNumber;

    if (inputCompanyDetails.orgVerificationNumber)
      addInputData["orgVerificationType"] =
        inputCompanyDetails.verificationTextRef.current;

    if (inputAddressDetails.addressLine2)
      addInputData["addressLine2"] = inputAddressDetails.addressLine2;

    dispatch(addInputSupplierAction(addInputData, navigate));

    setIsSubmit(false);
  };

  const backArrowHandler = () => {
    navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_INPUT_SUPPLIER}`);
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
            displayText="Add Input Supplier"
          />
          <AjEmail
            submit={isSubmit}
            data={getInputEmailDetails}
            customStyle={AddPageStyle.responsiveCustomWidth}
          />
          <AjPasswordBase
            submit={isSubmit}
            data={getInputPasswordDetails}
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
              data={getInputPersonalDetails}
              customStyles={AddPageStyle.responsiveFullWidth}
            />
            <AjUploadCACDocument
              label={"Passport Photo: (JPEG, PNG or PDF only)"}
              error={"Passport Photo is required"}
              submit={isSubmit}
              data={getPassportDetails}
              styleData={AddPageStyle.normalMarginTop}
              docType="PASSPORT_PHOTO"
            />
            <AjCompanyDetails
              submit={isSubmit}
              data={getInputCompanyDetails}
              styleData={customCommonStyles.tinNumberContainer}
              companyNameLabel="Input supplier name"
              registrationNumberLabel="Registration number"
              companyNamePlaceholder="Enter input supplier name"
              type="Input supplier"
              registrationRequired={false}
              tinRequired={false}
              countryId={countryId}
            />
            <Box
              sx={{
                ...commonStyles.signupFormFieldContainer,
                ...styles.fieldStyles,
                ...commonStyles.fullWidth,
              }}
            >
              <AjInputLabel
                displayText="Type of inputs"
                id="inputs"
                name="inputs"
                styleData={commonStyles.inputLabel}
                required
              />
              <AjChipDropdown
                id="inputType"
                name="inputType"
                styleData={commonStyles.multiSelectChipDropDown}
                fullWidth
                options={inputs?.result}
                source="name"
                value={addInputTypeValue}
                onChange={onChangeInputType}
                onDelete={handleDeleteInputType}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.inputType?.message}
              />
            </Box>
            <AjUploadCACDocument
              submit={isSubmit}
              data={getCACDetails}
              styleData={AddPageStyle.normalMarginTop}
              docType="CAC_PHOTO"
            />
            <AjAdress
              submit={isSubmit}
              data={getInputAddressDetails}
              customStyle={AddPageStyle.responsiveFullWidth}
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
                  onClick={addInput}
                  variant="contained"
                  displayText="Add Input Supplier"
                  styleData={btnStyle.logisticBtnWidth}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default AddInputSupplier;
