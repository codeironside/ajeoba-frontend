import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Grid, Box, IconButton, CssBaseline } from "@mui/material";
import * as moment from "moment";
import * as _ from "lodash";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { logoRedirection } from "../../../Services/commonService/commonService";
import { styles } from "../SignUpOtp/SignUpOtpStyle";
import AjTypography from "../../../Components/AjTypography";
import AjInputLabel from "../../../Components/AjInputLabel";
import AjEmail from "../../../Components/AjEmail/AjEmail";
import AjPasswordBase from "../../../Components/AjPasswordBase/AjPasswordBase";
import AjPhoneNumber from "../../../Components/AjPhoneNumber/AjPhoneNumber";
import AjPersonalDetails from "../../../Components/AjPersonalDetails/AjPersonalDetails";
import AjUploadCACDocument from "../../../Components/AjUploadCACDocument/AjUploadCACDocument";
import AjCompanyDetails from "../../../Components/AjCompanyDetails/AjCompanyDetails";
import AjAdress from "../../../Components/AjAdress/AjAdress";
import AjButton from "../../../Components/AjButton";
import AjChipDropdown from "../../../Components/AjChipDropdown";

import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";
import { encrypt, getUserData } from "../../../Services/localStorageService";
import { PASSWORD_ENCRYPTION_SECRET } from "../../../Constant/AppConstant";
import { styles as AddPageStyle } from "../../Admin/UserManagement/CorporateBuyer/AddCorporateBuyer/AddCorporateBuyerStyle";
import { styles as buttonStyles } from "../../Admin/UserManagement/Aggregators/AddAggregator/AddAggregatorStyles";
import { addInputSupplierSchema } from "../../../validationSchema/addInputSupplierSchema";
import {
  SIGNUPOTPINPUTSUPPLIER,
} from "../../../Routes/Routes";
import { getInputListLandingPageAction } from "../../../Redux/CorporateBuyer/Trading/tradingActions";
import { signUpAsInputSupplierAction } from "../../../Redux/SuperAdmin/UserManagement/InputSupplier/inputSupplierActions";
import { styles as btnStyle } from "../../Admin/UserManagement/LogisticCompany/AddLogisticCompany/AddLogisticCompanyStyle";

import AjCompanyDetailsInputSupply from "../../../Components/AjCompanyDetailsInputSupply/AjCompanyDetailsInputSupply";
import AjDocumentUploaderInputSupply from "../../../Components/AjDocumentUploaderInputSupply";

import AJPerosnaDetailsInputSupply from "../../../Components/AjPersonalDetails/AJPerosnaDetailsInputSupply";
import AjPasswordBaseFlex from "../../../Components/AjPasswordBase/AjPasswordBaseFlex";
import AjUploadCACDocumentInputSupply from "../../../Components/AjUploadCACDocument/AjUploadCACDocumentInputSupply";
import AjAddressNew from "../../../Components/AjAdress/AjAddressNew";
import AjAddressInputSuppSignUp from "../../../Components/AjAdress/AjAddressInputSuppSignUp";
function SignUpInputSupplyDetailsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = getUserData();

  const inputs = useSelector(
    (state) => state.tradingActiveAds.inputListLandingPage
  );
  const tempUserId = useSelector((state) => state.otp.tempUserId);
  console.log(tempUserId, "tempUserId on the details page");

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
    dispatch(getInputListLandingPageAction({}));
  }, []);

  useEffect(() => {
    if (defaultCountryId) {
      setCountryId(defaultCountryId);
    }
  }, [defaultCountryId]);

  useEffect(() => {
    if (!tempUserId) {
      navigate(SIGNUPOTPINPUTSUPPLIER);
    }
  }, []);

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
    if (isAddInputTypeValueUpdated) handleSubmit(onSubmit)();
    setIsSubmit(true);
    isDoneRef.current = true;
  };
  console.log(isSubmit, "isSubmit");

  const updateState = (newState) => {
    inputDataRef.current = newState;
    setInputData(newState);
    // setIsSubmit(false);
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

  const getInputAddressDetails = (data) =>
    updateState({ ...inputDataRef.current, inputAddressDetails: data });

  const getInputCompanyDetails = (data) =>
    updateState({ ...inputDataRef.current, inputCompanyDetails: data });

  const getInputPasswordDetails = (data) =>
    updateState({ ...inputDataRef.current, passwordDetails: data });

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
      passwordDetails,
      inputPersonalDetails,
      inputCompanyDetails,
      inputAddressDetails,
    } = inputData;

    if (
      !passportDetails ||
      !inputPersonalDetails ||
      !inputCompanyDetails ||
      !inputAddressDetails ||
      !passwordDetails ||
      !cacDetails
    )
      return;
    const addInputData = {
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
      tempUserId: tempUserId && tempUserId,
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
    console.log(addInputData);
    dispatch(signUpAsInputSupplierAction(addInputData, navigate));
  };

  return (
    <Grid container sx={commonStyles.mainGridContainer}>
      <CssBaseline />
      <Grid
        xs={12}
        sm={5}
        item
        sx={[commonStyles.leftGrid, styles.signUpOtpBg]}
      >
        <Grid
          item
          sx={commonStyles.logoImageContainer}
          onClick={() => logoRedirection()}
        ></Grid>
      </Grid>
      <Grid xs={12} sm={7} item sx={commonStyles.rightGridBuyer}>
        <Box sx={commonStyles.mainHeadingContainerInp}>
          <Box sx={commonStyles.headingContainer}>
            {" "}
            <AjTypography
              styleData={commonStyles.mainHeadingBuyer}
              displayText="Sign up to Ajeoba Agro"
            />
          </Box>

          {/* <Box> */}
          <AJPerosnaDetailsInputSupply
            submit={isSubmit}
            data={getInputPersonalDetails}
            customStyles={AddPageStyle.responsiveFullWidth}
          />
          <AjPasswordBaseFlex
            submit={isSubmit}
            data={getInputPasswordDetails}
            customStyle={AddPageStyle.responsiveCustomWidth}
          />

          <AjCompanyDetailsInputSupply
            submit={isSubmit}
            data={getInputCompanyDetails}
            styleData={customCommonStyles.tinNumberContainer}
            companyNameLabel="Input supplier name"
            registrationNumberLabel="Registration number"
            companyNamePlaceholder="Enter input supplier name"
            type="Input supplier"
            registrationRequired={true}
            tinRequired={true}
            regNumberType="TIN"
            countryId={countryId}
          />
          <Box sx={{ display: "flex", width: "100%", gap: "2rem" }}>
            <AjUploadCACDocumentInputSupply
              label={"Passport Photo: (JPEG, PNG or PDF only)"}
              error={"Passport Photo is required"}
              submit={isSubmit}
              data={getPassportDetails}
              styleData={AddPageStyle.normalMarginTop}
              docType="PASSPORT_PHOTO"
            />
            <AjUploadCACDocumentInputSupply
              label={"CAC Document : (JPEG, PNG or PDF only)"}
              error={"CAC is required"}
              submit={isSubmit}
              data={getCACDetails}
              styleData={AddPageStyle.normalMarginTop}
              docType="CAC_PHOTO"
            />
          </Box>
          <Box
            sx={{
              ...commonStyles.signupFormFieldInputSupplyName,
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
          <AjAddressInputSuppSignUp
            submit={isSubmit}
            data={getInputAddressDetails}
            customStyle={AddPageStyle.responsiveFullWidth}
            defaultCountry={countryId || userData?.country_id}
            isStateReset={true}
            zipCodeRequired
          />
          {/* </Box> */}
          <Box sx={{ paddingBottom: "2rem" }}>
            <AjButton
              onClick={addInput}
              variant="contained"
              displayText="Add Input Supplier"
              styleData={btnStyle.logisticBtnWidth}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
    // <Grid container sx={commonStyles.signupFormMainGridContainerInputSupply}>
    //   <Box sx={commonStyles.relativePosition}>
    //     <IconButton
    //       sx={commonStyles.backButtonPosition}
    //       // onClick={backArrowHandler}
    //     >
    //       <ArrowBackRoundedIcon sx={commonStyles.backButtonBlackFont} />
    //     </IconButton>
    //   </Box>
    //   <Grid
    //     container
    //     item
    //     sx={{
    //       ...commonStyles.signupFormMainContentContainerinputSupply,
    //       ...commonStyles.customSrollBar,
    //     }}
    //   >
    //     <Box sx={commonStyles.signupContentContainer}>
    //       <AjTypography
    //         styleData={commonStyles.mainHeading}
    //         displayText="Add Input Supplier"
    //       />
    //       <Box
    //         component="form"
    //         sx={{
    //           ...commonStyles.signupFormContainer,
    //           ...AddPageStyle.formMarginTop,
    //         }}
    //       >
    //         <AjPersonalDetails
    // submit={isSubmit}
    // data={getInputPersonalDetails}
    // customStyles={AddPageStyle.responsiveFullWidth}
    //         />
    // <AjPasswordBaseFlex
    //   submit={isSubmit}
    //   data={getInputPasswordDetails}
    //   customStyle={AddPageStyle.responsiveCustomWidth}
    // />
    //         <AjPhoneNumber
    //           submit={isSubmit}
    //           data={getPhoneNumberDetails}
    //           onCountryCodeSelect={onCountryCodeSelect}
    //           customStyle={AddPageStyle.responsiveCustomWidth}
    //         />
    //         <AjDocumentUploaderInputSupply
    //           label={"Passport Photo: (JPEG, PNG or PDF only)"}
    //           error={"Passport Photo is required"}
    //           submit={isSubmit}
    //           data={getPassportDetails}
    //           styleData={AddPageStyle.normalMarginTop}
    //           docType="PASSPORT_PHOTO"
    //         />
    //         <AjCompanyDetailsInputSupply
    //           submit={isSubmit}
    //           data={getInputCompanyDetails}
    //           styleData={customCommonStyles.tinNumberContainer}
    //           companyNameLabel="Input supplier name"
    //           registrationNumberLabel="Registration number"
    //           companyNamePlaceholder="Enter input supplier name"
    //           type="Input supplier"
    //           registrationRequired={false}
    //           tinRequired={false}
    //           regNumberType="TIN"
    //           countryId={countryId}
    //         />
    // <Box
    //   sx={{
    //     ...commonStyles.signupFormFieldContainer,
    //     ...styles.fieldStyles,
    //     ...commonStyles.fullWidth,
    //   }}
    // >
    //   <AjInputLabel
    //     displayText="Type of inputs"
    //     id="inputs"
    //     name="inputs"
    //     styleData={commonStyles.inputLabel}
    //     required
    //   />
    //   <AjChipDropdown
    //     id="inputType"
    //     name="inputType"
    //     styleData={commonStyles.multiSelectChipDropDown}
    //     fullWidth
    //     options={inputs?.result}
    //     source="name"
    //     value={addInputTypeValue}
    //     onChange={onChangeInputType}
    //     onDelete={handleDeleteInputType}
    //   />
    //   <AjTypography
    //     styleData={commonStyles.errorText}
    //     displayText={errors.inputType?.message}
    //   />
    // </Box>
    //         <AjDocumentUploaderInputSupply
    //           submit={isSubmit}
    //           data={getCACDetails}
    //           styleData={AddPageStyle.normalMarginTop}
    //           docType="CAC_PHOTO"
    //         />
    //         <AjAdress
    //           submit={isSubmit}
    //           data={getInputAddressDetails}
    //           customStyle={AddPageStyle.responsiveFullWidth}
    //           defaultCountry={countryId || userData?.country_id}
    //           isStateReset={true}
    //           zipCodeRequired
    //         />
    //         <Grid
    //           container
    //           sx={{
    //             ...commonStyles.marginTop20,
    //             ...buttonStyles.responsiveFields,
    //           }}
    //           columnSpacing={"1.25rem"}
    //         >
    //           <Grid sx={buttonStyles.saveBtnContainer}>
    //             <AjButton
    //               onClick={addInput}
    //               variant="contained"
    //               displayText="Add Input Supplier"
    //               styleData={btnStyle.logisticBtnWidth}
    //             />
    //           </Grid>
    //         </Grid>
    //       </Box>
    //     </Box>
    //   </Grid>
    // </Grid>
  );
}

export default SignUpInputSupplyDetailsPage;
