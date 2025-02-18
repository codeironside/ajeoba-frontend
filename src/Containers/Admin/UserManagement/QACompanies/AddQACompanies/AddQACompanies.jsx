import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, Grid, IconButton, InputBase } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import * as _ from "lodash";

import AjAdress from "../../../../../Components/AjAdress/AjAdress";
import AjButton from "../../../../../Components/AjButton";
import AjChipDropdown from "../../../../../Components/AjChipDropdown";
import AjDocumentDownloader from "../../../../../Components/AjDocumentDownloader";
import AjDocumentUploader from "../../../../../Components/AjDocumentUploader";
import AjInputLabel from "../../../../../Components/AjInputLabel";
import AjPersonalDetails from "../../../../../Components/AjPersonalDetails/AjPersonalDetails";
import AjTypography from "../../../../../Components/AjTypography";
import AjPhoneNumber from "../../../../../Components/AjPhoneNumber/AjPhoneNumber";

import { addQACompaniesSchema } from "../../../../../validationSchema/addQACompaniesSchema";
import {
  getUserData,
  encrypt,
} from "../../../../../Services/localStorageService";
import { getItemListAction } from "../../../../../Redux/SuperAdmin/MasterManagement/masterManagementActions";
import {
  qaCertificateListType,
  PASSWORD_ENCRYPTION_SECRET,
} from "../../../../../Constant/AppConstant";
import {
  ADMIN_USER_MANAGEMENT,
  ADMIN_QA_COMPANIES,
} from "../../../../../Routes/Routes";
import { addQACompanyAction } from "../../../../../Redux/SuperAdmin/UserManagement/QACompany/qaCompanyActions";
import { commonStyles } from "../../../../../Style/CommonStyle";
import { styles } from "../QACompaniesStyles";
import { getProfileVerificationDataAction } from "../../../../../Redux/common/ProfileVerification/profileVerificationActions";

const AddQACompanies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = getUserData();
  const qaCertificates = useSelector(
    (state) => state.masterManagement.itemList
  );

  const profileVerificationData = useSelector(
    (state) => state.profileVerification.profileVerificationData
  );

  const verificationText = profileVerificationData?.orgVerificationType[0];

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addQACompaniesSchema(verificationText)),
    mode: "onChange",
  });

  const [countryId, setCountryId] = useState(null);
  const [passwordType, setPasswordType] = useState(true);
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [addQACompanyCertificateValue, setAddQACompanyCertificateValue] =
    useState([]);
  const [isAddCertificateValueUpdated, setIsAddCertificateValueUpdated] =
    useState(false);

  const [addQACompanyPassportPhoto, setAddQACompanyPassportPhoto] =
    useState(null);
  const [addQACompanyCACDocument, setaddQACompanyCACDocument] = useState(null);
  const [qaUserData, setQaUserData] = useState({});
  const defaultCountryId = useSelector((state) => state.countries.countryId);

  useEffect(() => {
    if (countryId)
      dispatch(getProfileVerificationDataAction({ countryId: countryId }));
  }, [countryId]);

  useEffect(() => {
    if (defaultCountryId) {
      setCountryId(defaultCountryId);
    }
  }, [defaultCountryId]);

  useEffect(() => {
    dispatch(getItemListAction(qaCertificateListType));
  }, []);

  useEffect(() => {
    if (isAddCertificateValueUpdated) {
      const qaCompnayCertificateItems = [];
      addQACompanyCertificateValue.map((item) => {
        qaCompnayCertificateItems.push(
          _.find(qaCertificates.result, { name: item }).id
        );
      });
      setValue("qaCompanyCertificationType", qaCompnayCertificateItems, {
        shouldValidate: true,
      });
    }
    if (addQACompanyPassportPhoto != null) {
      setValue("addQaCompanyPassportPhoto", addQACompanyPassportPhoto?.id, {
        shouldValidate: true,
      });
    }
    if (addQACompanyCACDocument != null) {
      setValue("addQaCompanyCACDocument", addQACompanyCACDocument?.id, {
        shouldValidate: true,
      });
    }
  }, [
    addQACompanyCertificateValue,
    addQACompanyPassportPhoto,
    addQACompanyCACDocument,
  ]);

  useEffect(() => {
    const {
      mobileNumberDetails,
      qaCompanyPersonalDetails,
      qaCompanyAddressDetails,
    } = qaUserData;
    if (
      mobileNumberDetails &&
      qaCompanyPersonalDetails &&
      qaCompanyAddressDetails
    ) {
      handleSubmit(onSubmit)();
    }
  }, [qaUserData]);

  const qaUserDataRef = useRef(qaUserData);

  const changeToggle = () => {
    setPasswordType(!passwordType);
  };

  const changeConfirmPasswordToggle = () => {
    setConfirmPasswordType(!confirmPasswordType);
  };

  const addQACompanyPassportPhotoUpload = (data) => {
    setAddQACompanyPassportPhoto(data);
  };

  const changeQACompanyPassportPhotoUpload = (e) => {
    e.preventDefault();
    setAddQACompanyPassportPhoto("");
  };
  const addQACompanyCACUpload = (data) => {
    setaddQACompanyCACDocument(data);
  };

  const changeQACompanyCACUpload = (e) => {
    e.preventDefault();
    setaddQACompanyCACDocument("");
  };

  const onChangeQACertificate = (event) => {
    const {
      target: { value },
    } = event;
    setIsAddCertificateValueUpdated(true);
    setAddQACompanyCertificateValue(value);
  };

  const handleDeleteQACertificate = (value) => {
    setAddQACompanyCertificateValue(
      addQACompanyCertificateValue.filter((name) => name !== value)
    );
  };

  const onCountryCodeSelect = (selectedCountry) => {
    setCountryId(selectedCountry.countryId);
  };

  const addQaCompanies = () => {
    if (
      !passwordType ||
      !confirmPasswordType ||
      !isAddCertificateValueUpdated
    ) {
      handleSubmit(onSubmit)();
    }
    setIsSubmit(true);
  };

  const updateState = (newState) => {
    qaUserDataRef.current = newState;
    setQaUserData(newState);
    setIsSubmit(false);
  };

  const getQACompanyPersonalDetails = (data) => {
    updateState({ ...qaUserDataRef.current, qaCompanyPersonalDetails: data });
  };

  const getPhoneNumberDetails = (data) =>
    updateState({ ...qaUserDataRef.current, mobileNumberDetails: data });

  const getQACompanyAddressDetails = (data) =>
    updateState({ ...qaUserDataRef.current, qaCompanyAddressDetails: data });

  const onSubmit = (data) => {
    const {
      mobileNumberDetails,
      qaCompanyPersonalDetails,
      qaCompanyAddressDetails,
    } = qaUserData;

    if (!mobileNumberDetails) return;
    if (!qaCompanyPersonalDetails) return;
    if (!qaCompanyAddressDetails) return;

    const addQACompanyData = {
      email: data.addQACompanyEmail,
      countryId: countryId || userData.country_id,
      mobileNumber: mobileNumberDetails.mobileNumber,
      password: encrypt(data.addQACompanyPassword, PASSWORD_ENCRYPTION_SECRET),
      firstName: qaCompanyPersonalDetails.firstName,
      lastName: qaCompanyPersonalDetails.lastName,
      gender: qaCompanyPersonalDetails.gender,
      dateOfBirth: moment(qaCompanyPersonalDetails.dateOfBirth),
      companyName: data.addQaCompanyName,
      certificates: data.qaCompanyCertificationType,
      addressLine1: qaCompanyAddressDetails.addressLine1,
      country: parseInt(qaCompanyAddressDetails.country),
      state: parseInt(qaCompanyAddressDetails.state),
      city: qaCompanyAddressDetails.city,
      zipCode: parseInt(qaCompanyAddressDetails.zipCode),
    };

    if (data.addQaCompanyPassportPhoto)
      addQACompanyData["passportPhotoId"] = parseInt(
        data.addQaCompanyPassportPhoto
      );

    if (data.addQaCompanyCACDocument)
      addQACompanyData["cacDocumentId"] = parseInt(
        data.addQaCompanyCACDocument
      );

    if (data.addQaComonayRegisrationNumber)
      addQACompanyData["registrationNumber"] =
        data.addQaComonayRegisrationNumber;

    if (data.orgVerificationNumber)
      addQACompanyData["orgVerificationNumber"] = data.orgVerificationNumber;

    if (data.orgVerificationNumber)
      addQACompanyData["orgVerificationType"] = verificationText;

    if (qaCompanyAddressDetails.addressLine2)
      addQACompanyData["addressLine2"] = qaCompanyAddressDetails.addressLine1;

    dispatch(addQACompanyAction(addQACompanyData, navigate));

    setIsSubmit(false);
  };

  const backButtonHandler = () => {
    navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_QA_COMPANIES}`);
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
            displayText="Add QA Company"
          />
          <Box
            component="form"
            sx={{
              ...commonStyles.signupFormContainer,
              ...styles.qaCompaniesFormContainer,
            }}
          >
            <Box
              sx={{
                ...commonStyles.signupFormFieldContainer,
                ...commonStyles.fullWidth,
              }}
            >
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="E-mail Id"
              />
              <InputBase
                required
                placeholder="Enter your email"
                sx={commonStyles.inputStyle}
                {...register("addQACompanyEmail")}
                error={errors.addAggregatorEmail ? true : false}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.addQACompanyEmail?.message}
              />
            </Box>
            <AjPhoneNumber
              customStyle={commonStyles.marginTop20}
              submit={isSubmit}
              data={getPhoneNumberDetails}
              onCountryCodeSelect={onCountryCodeSelect}
            />
            <Box
              sx={{
                ...commonStyles.signupFormFieldContainer,
                ...styles.fieldStyles,
                ...commonStyles.fullWidth,
              }}
            >
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="Password"
              />
              <OutlinedInput
                placeholder="Enter your password"
                sx={{
                  ...commonStyles.inputStyle,
                  ...commonStyles.passwordInput,
                }}
                type={passwordType ? "password" : "text"}
                {...register("addQACompanyPassword")}
                error={errors.addQACompanyPassword ? true : false}
                endAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={changeToggle}
                      edge="end"
                    >
                      {passwordType ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.addQACompanyPassword?.message}
              />
              <Box sx={commonStyles.passwordCenterContent}>
                <Box sx={commonStyles.passwordcontent}>
                  The password should be between 8 and 20 characters and must
                  contain the following
                </Box>
                <ul>
                  <li>an alphabet letter (Eg: a,B,c,D)</li>
                  <li>a number (Eg: 1,2,3,4)</li>
                </ul>
              </Box>
            </Box>
            <Box
              sx={{
                ...commonStyles.signupFormFieldContainer,
                ...styles.fieldStyles,
                ...commonStyles.fullWidth,
              }}
            >
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="Confirm Password"
              />
              <OutlinedInput
                placeholder="Re-enter your password"
                sx={{
                  ...commonStyles.inputStyle,
                  ...commonStyles.passwordInput,
                }}
                type={confirmPasswordType ? "password" : "text"}
                {...register("addQACompanyConfirmPassword")}
                error={errors.addQACompanyConfirmPassword ? true : false}
                endAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={changeConfirmPasswordToggle}
                      edge="end"
                    >
                      {confirmPasswordType ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.addQACompanyConfirmPassword?.message}
              />
            </Box>
            <AjPersonalDetails
              submit={isSubmit}
              data={getQACompanyPersonalDetails}
              customStyles={commonStyles.marginTop20}
            />
            <Box
              sx={{
                ...commonStyles.signupFormFieldContainer,
                ...styles.fieldStyles,
              }}
            >
              <AjInputLabel
                styleData={commonStyles.inputLabel}
                displayText="Passport Photo: (JPEG, PNG or PDF only)"
              />
              {addQACompanyPassportPhoto && addQACompanyPassportPhoto.id ? (
                <AjDocumentDownloader
                  docId={addQACompanyPassportPhoto.id}
                  docName={addQACompanyPassportPhoto.file_name}
                  showIcon={true}
                  changeDocument={changeQACompanyPassportPhotoUpload}
                />
              ) : (
                <AjDocumentUploader
                  type="image"
                  docType="PASSPORT_PHOTO"
                  onUpload={addQACompanyPassportPhotoUpload}
                />
              )}
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.addQaCompanyPassportPhoto?.message}
              />
            </Box>
            <Box
              sx={{
                ...commonStyles.signupFormFieldContainer,
                ...styles.fieldStyles,
              }}
            >
              <AjInputLabel
                styleData={commonStyles.inputLabel}
                displayText="CAC Document : (JPEG, PNG or PDF only)"
              />
              {addQACompanyCACDocument && addQACompanyCACDocument.id ? (
                <AjDocumentDownloader
                  docId={addQACompanyCACDocument.id}
                  docName={addQACompanyCACDocument.file_name}
                  showIcon={true}
                  changeDocument={changeQACompanyCACUpload}
                />
              ) : (
                <AjDocumentUploader
                  type="image"
                  docType="CAC_PHOTO"
                  onUpload={addQACompanyCACUpload}
                />
              )}
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.addQaCompanyCACDocument?.message}
              />
            </Box>
            <Box
              sx={{
                ...commonStyles.signupFormFieldContainer,
                ...styles.fieldStyles,
              }}
            >
              <AjInputLabel
                displayText="QA Company Name"
                required
                styleData={commonStyles.inputLabel}
              />
              <InputBase
                required
                fullWidth
                placeholder="Enter QA company name"
                sx={commonStyles.inputStyle}
                {...register("addQaCompanyName")}
                error={errors.addQaCompanyName ? true : false}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.addQaCompanyName?.message}
              />
            </Box>
            <Box
              sx={{
                ...commonStyles.signupFormFieldContainer,
                ...styles.fieldStyles,
              }}
            >
              <AjInputLabel
                displayText="QA Company Registration Number"
                styleData={commonStyles.inputLabel}
              />
              <InputBase
                required
                fullWidth
                placeholder="Enter registration number"
                sx={commonStyles.inputStyle}
                {...register("addQaComonayRegisrationNumber")}
                error={errors.addQaCompanyName ? true : false}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.addQaComonayRegisrationNumber?.message}
              />
            </Box>
            <Box
              sx={{
                ...commonStyles.signupFormFieldContainer,
                ...styles.fieldStyles,
                ...commonStyles.fullWidth,
              }}
            >
              <AjInputLabel
                displayText={`${verificationText} number`}
                styleData={commonStyles.inputLabel}
              />
              <InputBase
                required
                fullWidth
                placeholder={`Enter ${verificationText} number`}
                sx={commonStyles.inputStyle}
                {...register("orgVerificationNumber")}
                error={errors.orgVerificationNumber ? true : false}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.orgVerificationNumber?.message}
              />
            </Box>
            <Box
              sx={{
                ...commonStyles.signupFormFieldContainer,
                ...styles.fieldStyles,
                ...commonStyles.fullWidth,
              }}
            >
              <AjInputLabel
                displayText="QA Certifications"
                required
                id="certificationType"
                name="certificationType"
                styleData={commonStyles.inputLabel}
              />
              <AjChipDropdown
                id="certificationType"
                name="certificationType"
                styleData={commonStyles.multiSelectChipDropDown}
                fullWidth
                options={qaCertificates?.result}
                source="name"
                value={addQACompanyCertificateValue}
                onChange={onChangeQACertificate}
                onDelete={handleDeleteQACertificate}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.qaCompanyCertificationType?.message}
              />
            </Box>
            <AjAdress
              submit={isSubmit}
              data={getQACompanyAddressDetails}
              customStyle={commonStyles.marginTop20}
              defaultCountry={countryId || userData?.country_id}
              isStateReset={true}
              zipCodeRequired
            />
          </Box>
          <Grid>
            <AjButton
              onClick={addQaCompanies}
              variant="contained"
              displayText="Add QA Company"
            />
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddQACompanies;
