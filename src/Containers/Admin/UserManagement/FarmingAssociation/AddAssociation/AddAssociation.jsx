import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, Grid, IconButton, InputBase } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import * as _ from "lodash";
import * as moment from "moment";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AjAdress from "../../../../../Components/AjAdress/AjAdress";
import AjButton from "../../../../../Components/AjButton";
import AjChipDropdown from "../../../../../Components/AjChipDropdown";
import AjDatePicker from "../../../../../Components/AjDatePicker";
import AjDocumentDownloader from "../../../../../Components/AjDocumentDownloader";
import AjDocumentUploader from "../../../../../Components/AjDocumentUploader";
import AjInputLabel from "../../../../../Components/AjInputLabel";
import AjRadioOptions from "../../../../../Components/AjRadioOptions";
import AjSearchDropDown from "../../../../../Components/AjSearchDropDown";
import AjTypography from "../../../../../Components/AjTypography";
import {
  genderOptions,
  PASSWORD_ENCRYPTION_SECRET,
} from "../../../../../Constant/AppConstant";
import {
  getCountries,
  setCountryCode,
  setCountryId,
} from "../../../../../Redux/common/Countries/getCountriesActions";
import { getProducts } from "../../../../../Redux/common/Products/productsActions";
import { getProfileVerificationDataAction } from "../../../../../Redux/common/ProfileVerification/profileVerificationActions";
import { addFarmingAssociationAction } from "../../../../../Redux/SuperAdmin/UserManagement/FarmingAssociation/farmingAssociationActions";
import {
  ADMIN_FARMING_ASSOCIATION,
  ADMIN_USER_MANAGEMENT,
} from "../../../../../Routes/Routes";
import { encrypt } from "../../../../../Services/localStorageService";
import { commonStyles } from "../../../../../Style/CommonStyle";
import { addAssociationSchema } from "../../../../../validationSchema/addAssociationSchema";
import { styles } from "../../Aggregators/AddAggregator/AddAggregatorStyles";

const AddAssociation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let addressData = null;

  const [isSubmit, setIsSubmit] = useState(false);

  const [addAssociationPasswordType, setAddAssociationPasswordType] =
    useState(true);
  const [
    addAssociationConfirmPasswordType,
    setAddAssociationConfirmPasswordType,
  ] = useState(true);
  const [addAssociationGender, setGender] = useState(genderOptions[0].value);
  const [addAssociationDateOfBirth, setDateOfBirth] = useState(null);
  const [addAssociationPassportImageData, setAddAssociationPassportImageData] =
    useState(null);
  const [addAssociationCACDocument, setAddAssociationCACDocument] =
    useState(null);
  const [addAssociationChipValue, setAddAssociationChipValue] = useState([]);
  const [
    addAssociationIsChipValueUpdated,
    setAddAssociationIsChipValueUpdated,
  ] = useState(false);
  const [addAssociationCountryCodeValue, setAddAssociationCountryCodeValue] =
    useState(null);

  const countryMenuOptions = useSelector(
    (state) => state.countries.countryMenuOptions || null
  );
  const countryId = useSelector((state) => state.countries.countryId || "");
  const products = useSelector((state) => state.products.products || "");
  const profileVerificationData = useSelector(
    (state) => state.profileVerification.profileVerificationData
  );

  const verificationText = profileVerificationData?.orgVerificationType[0];

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    if (countryId)
      dispatch(getProfileVerificationDataAction({ countryId: countryId }));
  }, [countryId]);

  useEffect(() => {
    setValue("addAs_Gender", addAssociationGender, { shouldValidate: true });
    if (addAssociationDateOfBirth !== null) {
      setValue("addAs_DateOfBirth", addAssociationDateOfBirth, {
        shouldValidate: true,
      });
    }
    if (addAssociationPassportImageData != null) {
      setValue("addAs_PassportPhoto", addAssociationPassportImageData?.id, {
        shouldValidate: true,
      });
    }
    if (addAssociationCACDocument !== null) {
      setValue("addAs_CACDocument", addAssociationCACDocument?.id, {
        shouldValidate: true,
      });
    }
    if (addAssociationIsChipValueUpdated) {
      const productItems = [];
      addAssociationChipValue.map((item) => {
        productItems.push(_.find(products, { productName: item }).productId);
      });
      setValue("addAs_TypeOfProducts", productItems, {
        shouldValidate: true,
      });
    }
  }, [
    addAssociationGender,
    addAssociationDateOfBirth,
    addAssociationPassportImageData,
    addAssociationCACDocument,
    addAssociationChipValue,
  ]);

  useEffect(() => {
    if (countryMenuOptions && countryMenuOptions.length) {
      let countryIndex = -1;
      if (!countryId) {
        countryIndex = _.findIndex(countryMenuOptions, { countryCode: "+234" });
      } else {
        countryIndex = _.findIndex(countryMenuOptions, {
          countryId: countryId,
        });
      }
      let country = countryMenuOptions[countryIndex];
      dispatch(setCountryCode(country.countryCode));
      dispatch(setCountryId(country.countryId));
      setAddAssociationCountryCodeValue(country);
    }
  }, [countryMenuOptions]);

  const changePasswordToggle = () => {
    setAddAssociationPasswordType(!addAssociationPasswordType);
  };

  const changeConfirmPasswordToggle = () => {
    setAddAssociationConfirmPasswordType(!addAssociationConfirmPasswordType);
  };

  const genderSelectHandler = (option) => {
    setGender(option);
  };

  const dateSelectionHandler = (date) => {
    if (date === null) {
      setDateOfBirth("");
    } else {
      setDateOfBirth(date);
    }
  };

  const passportUpload = (data) => {
    setAddAssociationPassportImageData(data);
  };

  const changePassportImage = (e) => {
    e.preventDefault();
    setAddAssociationPassportImageData("");
  };

  const onChangeDropdownChipHandler = (event) => {
    const {
      target: { value },
    } = event;
    setAddAssociationIsChipValueUpdated(true);
    setAddAssociationChipValue(value);
  };

  const uploadImage = (data) => {
    setAddAssociationCACDocument(data);
  };

  const changeImageData = (e) => {
    e.preventDefault();
    setAddAssociationCACDocument("");
  };

  const handleDelete = (value) => {
    setAddAssociationChipValue(
      addAssociationChipValue.filter((name) => name !== value)
    );
  };

  const countryCodeChangeHandler = (_event, selectedCountry) => {
    dispatch(setCountryCode(selectedCountry.countryCode));
    dispatch(setCountryId(selectedCountry.countryId));
    const countryIndex = _.findIndex(countryMenuOptions, {
      countryId: selectedCountry.countryId,
    });
    setAddAssociationCountryCodeValue(countryMenuOptions[countryIndex]);
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addAssociationSchema(verificationText)),
    mode: "onChange",
  });

  const addAssociation = () => {
    setIsSubmit(true);
  };

  const getAddressData = (data) => {
    addressData = data;
    setIsSubmit(false);
    handleSubmit(onSubmit)();
  };

  const onSubmit = (data) => {
    if (!addressData) {
      return;
    }
    const addAssociationData = {
      email: data.addAs_Email,
      mobileNumber: data.addAs_Mobile,
      password: encrypt(data.addAs_Password, PASSWORD_ENCRYPTION_SECRET),
      firstName: data.addAs_FirstName,
      lastName: data.addAs_LastName,
      gender: data.addAs_Gender,
      dateOfBirth: moment(data.addAs_DateOfBirth),
      associationName: data.addAs_associationName,
      products: data.addAs_TypeOfProducts,
      cacDocumentId: data.addAs_CACDocument,
      addressLine1: addressData.addressLine1,
      country: parseInt(addressData.country),
      countryId: countryId,
      stateId: parseInt(addressData.state),
      city: addressData.city,
    };
    if (data.addAs_PassportPhoto) {
      addAssociationData["passportPhotoId"] = parseInt(
        data.addAs_PassportPhoto
      );
    }

    if (data.addAs_associationRegNumber) {
      addAssociationData["registrationNumber"] =
        data.addAs_associationRegNumber;
    }
    if (data.orgVerificationNumber) {
      addAssociationData["orgVerificationNumber"] = data.orgVerificationNumber;
    }
    if (data.orgVerificationNumber) {
      addAssociationData["orgVerificationType"] = verificationText;
    }

    if (data.addAs_memberSize) {
      addAssociationData["memberSize"] = parseInt(data.addAs_memberSize);
    }

    if (data.addAs_CACDocument) {
      addAssociationData["cacDocumentId"] = parseInt(data.addAs_CACDocument);
    }
    if (addressData.addressLine2) {
      addAssociationData["addressLine2"] = addressData.addressLine2;
    }
    if (addressData.zipCode) {
      addAssociationData["zipCode"] = parseInt(addressData.zipCode);
    }
    dispatch(addFarmingAssociationAction(addAssociationData, navigate));
  };

  const backArrowHandler = () => {
    navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_FARMING_ASSOCIATION}`);
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
            displayText="Add Association"
          />
          <Grid sx={styles.addAggregatorContainer}>
            <Grid item>
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="E-mail Id"
              />
              <InputBase
                required
                id="addAs_Email"
                name="addAs_Email"
                sx={commonStyles.inputStyle}
                placeholder="Enter your email"
                {...register("addAs_Email")}
                error={errors.addAs_Email ? true : false}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.addAs_Email?.message}
              />
            </Grid>
            <Grid sx={styles.addAggregatorContainer}>
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="Phone number"
              />
              <Box sx={styles.phoneNumberContainer}>
                <AjSearchDropDown
                  id="combo-box-demo"
                  options={countryMenuOptions || []}
                  value={addAssociationCountryCodeValue}
                  onChange={countryCodeChangeHandler}
                />
                <InputBase
                  required
                  id="addAs_Mobile"
                  name="addAs_Mobile"
                  sx={[commonStyles.inputStyle, styles.mobileNumberInput]}
                  {...register("addAs_Mobile")}
                  error={errors.addAs_Mobile ? true : false}
                  placeholder="Enter your phone number"
                />
              </Box>
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.addAs_Mobile?.message}
              />
            </Grid>
            <Grid item sx={commonStyles.marginTop20}>
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="Password"
              />
              <OutlinedInput
                id="addAs_Password"
                name="addAs_Password"
                placeholder="Enter your password"
                sx={[commonStyles.inputStyle, commonStyles.passwordInput]}
                type={addAssociationPasswordType ? "password" : "text"}
                {...register("addAs_Password")}
                error={errors.addAs_Password ? true : false}
                endAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={changePasswordToggle}
                      edge="end"
                    >
                      {addAssociationPasswordType ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.addAs_Password?.message}
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
            </Grid>
            <Grid>
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="Confirm Password"
              />
              <OutlinedInput
                id="addAs_ConfirmPassword"
                name="addAs_ConfirmPassword"
                placeholder="Re-enter your password"
                sx={[commonStyles.inputStyle, commonStyles.passwordInput]}
                type={addAssociationConfirmPasswordType ? "password" : "text"}
                {...register("addAs_ConfirmPassword")}
                error={errors.confirmPassword ? true : false}
                endAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={changeConfirmPasswordToggle}
                      edge="end"
                    >
                      {addAssociationConfirmPasswordType ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.addAs_ConfirmPassword?.message}
              />
            </Grid>
            <Grid
              container
              columnSpacing={"1.25rem"}
              sx={commonStyles.marginTop20}
            >
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <AjInputLabel
                  displayText="First name"
                  required
                  styleData={commonStyles.inputLabel}
                />
                <InputBase
                  required
                  fullWidth
                  id="addAs_FirstName"
                  name="addAs_FirstName"
                  sx={commonStyles.inputStyle}
                  placeholder="Enter your first name"
                  {...register("addAs_FirstName")}
                  error={errors.addAs_FirstName ? true : false}
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.addAs_FirstName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <AjInputLabel
                  displayText="Last name"
                  required
                  styleData={commonStyles.inputLabel}
                />
                <InputBase
                  required
                  fullWidth
                  id="addAs_LastName"
                  name="addAs_LastName"
                  sx={commonStyles.inputStyle}
                  placeholder="Enter your last name"
                  {...register("addAs_LastName")}
                  error={errors.addAs_LastName ? true : false}
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.addAs_LastName?.message}
                />
              </Grid>
            </Grid>
            <Grid
              container
              columnSpacing={"1.25rem"}
              sx={commonStyles.marginTop20}
            >
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <AjInputLabel
                  displayText="Gender"
                  required
                  styleData={commonStyles.inputLabel}
                />
                <AjRadioOptions
                  defaultValue={addAssociationGender}
                  onSelect={genderSelectHandler}
                  items={genderOptions}
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.addAs_Gender?.message}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <AjInputLabel
                  displayText="Date of Birth"
                  required
                  styleData={commonStyles.inputLabel}
                />
                <AjDatePicker
                  value={
                    addAssociationDateOfBirth ? addAssociationDateOfBirth : null
                  }
                  dateSelectHandler={dateSelectionHandler}
                  agePicker
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.addAs_DateOfBirth?.message}
                />
              </Grid>
            </Grid>
            <Grid
              container
              columnSpacing={"1.25rem"}
              sx={commonStyles.marginTop20}
            >
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <AjInputLabel
                  styleData={commonStyles.inputLabel}
                  displayText="Passport photo: (JPEG, PNG or PDF only)"
                />
                {addAssociationPassportImageData &&
                addAssociationPassportImageData.id ? (
                  <AjDocumentDownloader
                    docId={addAssociationPassportImageData.id}
                    docName={addAssociationPassportImageData.file_name}
                    showIcon={true}
                    changeDocument={changePassportImage}
                  />
                ) : (
                  <AjDocumentUploader
                    type="image"
                    docType="PASSPORT_PHOTO"
                    onUpload={passportUpload}
                  />
                )}
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.addAs_PassportPhoto?.message}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} sx={commonStyles.marginTop20}>
              <AjInputLabel
                displayText="Association name"
                required={true}
                styleData={commonStyles.inputLabel}
              />
              <InputBase
                required
                placeholder="Enter association name"
                id="addAs_associationName"
                name="addAs_associationName"
                sx={commonStyles.inputStyle}
                {...register("addAs_associationName")}
                error={errors.addAs_associationName ? true : false}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.addAs_associationName?.message}
              />
            </Grid>
            <Grid
              container
              columnSpacing={"1.25rem"}
              sx={commonStyles.marginTop20}
            >
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <AjInputLabel
                  displayText="Association registration number"
                  styleData={commonStyles.inputLabel}
                />
                <InputBase
                  required
                  fullWidth
                  placeholder="Enter registration number"
                  id="addAs_associationRegNumber"
                  name="addAs_associationRegNumber"
                  sx={commonStyles.inputStyle}
                  {...register("addAs_associationRegNumber")}
                  error={errors.addAs_associationRegNumber ? true : false}
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.addAs_associationRegNumber?.message}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <AjInputLabel
                  displayText={`${verificationText} number`}
                  styleData={commonStyles.inputLabel}
                />
                <InputBase
                  required
                  fullWidth
                  id="orgVerificationNumber"
                  name="orgVerificationNumber"
                  placeholder={`Enter ${verificationText} number`}
                  sx={commonStyles.inputStyle}
                  {...register("orgVerificationNumber")}
                  error={errors.orgVerificationNumber ? true : false}
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.orgVerificationNumber?.message}
                />
              </Grid>
            </Grid>
            <Grid
              sx={styles.aggregatorFieldContainer}
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
            >
              <AjInputLabel
                displayText="Type of Products"
                required
                id="addAs_TypeOfProducts"
                name="addAs_TypeOfProducts"
                styleData={commonStyles.inputLabel}
              />
              <AjChipDropdown
                id="addAs_TypeOfProducts"
                name="addAs_TypeOfProducts"
                value={addAssociationChipValue}
                onChange={onChangeDropdownChipHandler}
                fullWidth
                onDelete={handleDelete}
                options={products}
                styleData={commonStyles.multiSelectChipDropDown}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.addAs_TypeOfProducts?.message}
              />
            </Grid>
            <Grid
              container
              columnSpacing={"1.25rem"}
              sx={commonStyles.marginTop20}
            >
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <AjInputLabel
                  displayText="Member size"
                  styleData={commonStyles.inputLabel}
                />
                <InputBase
                  required
                  fullWidth
                  id="addAs_memberSize"
                  name="addAs_memberSize"
                  placeholder="Enter member size"
                  sx={commonStyles.inputStyle}
                  {...register("addAs_memberSize")}
                  error={errors.addAs_memberSize ? true : false}
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.addAs_memberSize?.message}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <AjInputLabel
                  displayText="CAC document : (JPEG, PNG or PDF only)"
                  id="addAs_CACDocument"
                  name="addAs_CACDocument"
                  styleData={commonStyles.inputLabel}
                />
                {addAssociationCACDocument && addAssociationCACDocument.id ? (
                  <AjDocumentDownloader
                    docId={addAssociationCACDocument.id}
                    docName={addAssociationCACDocument.file_name}
                    changeDocument={changeImageData}
                    showIcon={true}
                  />
                ) : (
                  <AjDocumentUploader
                    type="image"
                    docType="CAC_PHOTO"
                    onUpload={uploadImage}
                  />
                )}
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.addAs_CACDocument?.message}
                />
              </Grid>
            </Grid>
            <Grid container sx={commonStyles.spaceBetween}>
              <AjAdress
                submit={isSubmit}
                data={getAddressData}
                defaultCountry={addAssociationCountryCodeValue?.countryId}
              />
            </Grid>
            <Grid
              container
              sx={{ ...commonStyles.marginTop20, ...styles.responsiveFields }}
              columnSpacing={"1.25rem"}
            >
              <Grid sx={styles.saveBtnContainer}>
                <AjButton
                  onClick={addAssociation}
                  variant="contained"
                  displayText="Add Association"
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddAssociation;
