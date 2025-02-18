import { yupResolver } from "@hookform/resolvers/yup";
import * as _ from "lodash";
import * as moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, Grid, IconButton, InputBase, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useNavigate } from "react-router-dom";
import { HtmlTooltip } from "../../../../../Components/AjSignupAggregatorDetails/AjSignupAggregatorDetailsStyles";

import AjAdress from "../../../../../Components/AjAdress/AjAdress";
import AjButton from "../../../../../Components/AjButton";
import AjChipDropdown from "../../../../../Components/AjChipDropdown";
import AjCountry from "../../../../../Components/AjCountry/AjCountry";
import AjDatePicker from "../../../../../Components/AjDatePicker";
import AjDocumentDownloader from "../../../../../Components/AjDocumentDownloader";
import AjDocumentUploader from "../../../../../Components/AjDocumentUploader";
import AjInputLabel from "../../../../../Components/AjInputLabel";
import AjRadioOptions from "../../../../../Components/AjRadioOptions";
import AjSearchDropDown from "../../../../../Components/AjSearchDropDown";
import AjSearchInput from "../../../../../Components/AjSearchInput";
import AjTypography from "../../../../../Components/AjTypography";

import toolTipIcon from "../../../../../Assets/Images/toolTipIcon.svg";
import {
  employmentOption,
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
import { addAggregatorAction } from "../../../../../Redux/SuperAdmin/UserManagement/Aggregators/aggregatorsActions";
import {
  ADMIN_AGGREGATORS,
  ADMIN_USER_MANAGEMENT,
} from "../../../../../Routes/Routes";
import { encrypt } from "../../../../../Services/localStorageService";
import { commonStyles } from "../../../../../Style/CommonStyle";
import { addAggregatorSchema } from "../../../../../validationSchema/addAggregatorSchema";
import { styles } from "./AddAggregatorStyles";
import { replaceWithUnderScore } from "../../../../../Services/commonService/commonService";
import AjDialog from "../../../../../Components/AjDialog/AjDialog";
import VninModalContent from "../../../../../Components/VninHow/VninModal";

const AddAggregator = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [passwordType, setPasswordType] = useState(true);
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);
  const [gender, setGender] = useState(genderOptions[0].value);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [passportImageData, setPassportImageData] = useState(null);
  const [employmentType, setEmploymentType] = useState(employmentOption[0]);
  const [myUinPinType, setMyUinPinType] = useState(null);
  const [chipValue, setChipValue] = useState([]);
  const [isChipValueUpdated, setIsChipValueUpdated] = useState(false);
  const [countryCodeValue, setCountryCodeValue] = useState(null);
  const [openvninModal, setOpenvninModal] = useState(false);
  const countryMenuOptions = useSelector(
    (state) => state.countries.countryMenuOptions || null
  );

  const handleModal = () => setOpenvninModal((prev) => !prev);

  const countryId = useSelector((state) => state.countries.countryId || "");

  const products = useSelector((state) => state.products.products || "");

  const profileVerificationData = useSelector(
    (state) => state.profileVerification.profileVerificationData
  );

  const orgUINOptions = profileVerificationData?.orgUINOptions;

  let addressData = null;

  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    if (countryId)
      dispatch(getProfileVerificationDataAction({ countryId: countryId }));
  }, [countryId]);

  useEffect(() => {
    if (profileVerificationData) {
      setValue("uniqueIdentifictionType", orgUINOptions[0].label, {
        shouldValidate: true,
      });
      setMyUinPinType(orgUINOptions[0]);
    }
  }, [profileVerificationData]);

  useEffect(() => {
    setValue("addAggregatorGender", gender, { shouldValidate: true });

    if (dateOfBirth !== null) {
      setValue("addAggregatorDateOfBirth", dateOfBirth, {
        shouldValidate: true,
      });
    }

    if (passportImageData != null) {
      setValue("addAggregatorPassportPhoto", passportImageData?.id, {
        shouldValidate: true,
      });
    }

    setValue("addAggregatorUniqueIdentifictionType", myUinPinType?.label, {
      shouldValidate: true,
    });

    if (isChipValueUpdated) {
      const productItems = [];
      chipValue.map((item) => {
        productItems.push(_.find(products, { productName: item }).productId);
      });
      setValue("addAggregatorTypeOfProducts", productItems, {
        shouldValidate: true,
      });
    }
  }, [gender, dateOfBirth, passportImageData, myUinPinType, chipValue]);

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
      setCountryCodeValue(country);
    }
  }, [countryMenuOptions]);

  const changeToggle = () => {
    setPasswordType(!passwordType);
  };

  const changeConfirmPasswordToggle = () => {
    setConfirmPasswordType(!confirmPasswordType);
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
    setPassportImageData(data);
  };

  const changePassportImage = (e) => {
    e.preventDefault();
    setPassportImageData("");
  };

  const onChangeEmployeeHandler = (e, selectedEmploymentType) => {
    setEmploymentType(selectedEmploymentType);
  };

  const countryOfBirthChangeHandler = (selectedCountry) => {
    setValue("addAggregatorCountryOfBirth", selectedCountry.countryId, {
      shouldValidate: true,
    });
  };

  const citizenshipChangeHandler = (selectedCountry) => {
    setValue("addAggregatorCitizenship", selectedCountry.countryId, {
      shouldValidate: true,
    });
  };

  const countryOfTaxChangeHandler = (selectedCountry) => {
    setValue("addAggregatorCountryOfTax", selectedCountry.countryId, {
      shouldValidate: true,
    });
  };

  const UINPinTypeChangeHandler = (e, selectedUINPinType) => {
    setMyUinPinType(selectedUINPinType);
  };

  const onChangeDropdownChipHandler = (event) => {
    const {
      target: { value },
    } = event;
    setIsChipValueUpdated(true);
    setChipValue(value);
  };

  const handleDelete = (value) => {
    setChipValue(chipValue.filter((name) => name !== value));
  };

  const countryCodeChangeHandler = (_event, selectedCountry) => {
    dispatch(setCountryCode(selectedCountry.countryCode));
    dispatch(setCountryId(selectedCountry.countryId));
    const countryIndex = _.findIndex(countryMenuOptions, {
      countryId: selectedCountry.countryId,
    });
    setCountryCodeValue(countryMenuOptions[countryIndex]);
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addAggregatorSchema),
    mode: "onChange",
  });

  const addAggregator = () => {
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
    const aggregatorAddData = {
      email: data.addAggregatorEmail,
      mobileNumber: data.addAggregatorMobile,
      password: encrypt(data.addAggregatorPassword, PASSWORD_ENCRYPTION_SECRET),
      firstName: data.addAggregatorFirstName,
      lastName: data.addAggregatorLastName,
      gender: data.addAggregatorGender,
      dateOfBirth: moment(data.addAggregatorDateOfBirth),
      products: data.addAggregatorTypeOfProducts,
      addressLine1: addressData.addressLine1,
      country: parseInt(addressData.country),
      countryId: countryId,
      stateId: parseInt(addressData.state),
      city: addressData.city,
    };
    if (data.addAggregatorPassportPhoto) {
      aggregatorAddData["passportPhotoId"] = parseInt(
        data.addAggregatorPassportPhoto
      );
    }
    if (employmentType.value) {
      aggregatorAddData["employmentType"] = employmentType.value;
    }
    if (data.addAggregatorCountryOfBirth) {
      aggregatorAddData["countryOfBirth"] = parseInt(
        data.addAggregatorCountryOfBirth
      );
    }
    if (data.addAggregatorCitizenship) {
      aggregatorAddData["citizenship"] = parseInt(
        data.addAggregatorCitizenship
      );
    }
    if (data.addAggregatorCountryOfTax) {
      aggregatorAddData["taxCountry"] = parseInt(
        data.addAggregatorCountryOfTax
      );
    }
    if (data.addAggregatorTaxId) {
      aggregatorAddData["taxId"] = parseInt(data.addAggregatorTaxId);
    }
    if (data.addAggregatorUniqueIdentifictionType) {
      aggregatorAddData["uinTypeValue"] = replaceWithUnderScore(
        data.addAggregatorUniqueIdentifictionType
      );
    }
    if (data.addAggregatorUniqueIdentificationNumber) {
      aggregatorAddData["uniqueIdentificationNumber"] =
        data.addAggregatorUniqueIdentificationNumber;
    }
    if (addressData.addressLine2) {
      aggregatorAddData["addressLine2"] = addressData.addressLine2;
    }
    if (addressData.zipCode) {
      aggregatorAddData["zipCode"] = parseInt(addressData.zipCode);
    }
    dispatch(addAggregatorAction(aggregatorAddData, navigate));
  };

  const backArrowHandler = () => {
    navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_AGGREGATORS}`);
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
          ...commonStyles.signupFormMainContentContainerAgr,
          ...commonStyles.customSrollBar,
        }}
      >
        <Box sx={commonStyles.signupContentContainer}>
          <AjTypography
            styleData={commonStyles.mainHeading}
            displayText="Add Aggregator"
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
                id="addAggregatorEmail"
                name="addAggregatorEmail"
                placeholder="Enter your email"
                sx={commonStyles.inputStyle}
                {...register("addAggregatorEmail")}
                error={errors.addAggregatorEmail ? true : false}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.addAggregatorEmail?.message}
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
                  value={countryCodeValue}
                  onChange={countryCodeChangeHandler}
                />
                <InputBase
                  required
                  id="addAggregatorMobile"
                  name="addAggregatorMobile"
                  sx={[commonStyles.inputStyle, styles.mobileNumberInput]}
                  {...register("addAggregatorMobile")}
                  error={errors.addAggregatorMobile ? true : false}
                  placeholder="Enter phone number"
                />
              </Box>
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.addAggregatorMobile?.message}
              />
            </Grid>
            <Grid item sx={commonStyles.marginTop20}>
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="Password"
              />
              <OutlinedInput
                id="addAggregatorPassword"
                name="addAggregatorPassword"
                placeholder="Enter your password"
                sx={[commonStyles.inputStyle, commonStyles.passwordInput]}
                type={passwordType ? "password" : "text"}
                {...register("addAggregatorPassword")}
                error={errors.addAggregatorPassword ? true : false}
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
                displayText={errors.addAggregatorPassword?.message}
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
                id="addAggregatorConfirmPassword"
                name="addAggregatorConfirmPassword"
                placeholder="Re-enter your password"
                sx={[commonStyles.inputStyle, commonStyles.passwordInput]}
                type={confirmPasswordType ? "password" : "text"}
                {...register("addAggregatorConfirmPassword")}
                error={errors.confirmPassword ? true : false}
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
                displayText={errors.addAggregatorConfirmPassword?.message}
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
                  id="addAggregatorFirstName"
                  name="addAggregatorFirstName"
                  placeholder="Enter first name"
                  sx={commonStyles.inputStyle}
                  {...register("addAggregatorFirstName")}
                  error={errors.addAggregatorFirstName ? true : false}
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.addAggregatorFirstName?.message}
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
                  placeholder="Enter last name"
                  id="addAggregatorLastName"
                  name="addAggregatorLastName"
                  sx={commonStyles.inputStyle}
                  {...register("addAggregatorLastName")}
                  error={errors.addAggregatorLastName ? true : false}
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.addAggregatorLastName?.message}
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
                  defaultValue={gender}
                  onSelect={genderSelectHandler}
                  items={genderOptions}
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.addAggregatorGender?.message}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}>
                <AjInputLabel
                  displayText="Date of Birth"
                  required
                  styleData={commonStyles.inputLabel}
                />
                <AjDatePicker
                  value={dateOfBirth ? dateOfBirth : null}
                  dateSelectHandler={dateSelectionHandler}
                  agePicker
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.addAggregatorDateOfBirth?.message}
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
                {passportImageData && passportImageData.id ? (
                  <AjDocumentDownloader
                    docId={passportImageData.id}
                    docName={passportImageData.file_name}
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
                  displayText={errors.addAggregatorPassportPhoto?.message}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}>
                <AjInputLabel
                  displayText="Employment type"
                  styleData={commonStyles.inputLabel}
                />
                <AjSearchInput
                  id="addAggregatorEmploymentType"
                  name="addAggregatorEmploymentType"
                  value={employmentType}
                  onChange={onChangeEmployeeHandler}
                  styleData={commonStyles.searchDropdownInput}
                  source="label"
                  options={employmentOption || []}
                />
              </Grid>
            </Grid>
            <Grid
              container
              columnSpacing={"1.25rem"}
              sx={commonStyles.marginTop20}
            >
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <AjCountry
                  displayText="Country of birth"
                  defaultValue={countryCodeValue?.countryId}
                  onCountrySelect={countryOfBirthChangeHandler}
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.addAggregatorCountryOfBirth?.message}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <AjCountry
                  displayText="Citizenship"
                  defaultValue={countryCodeValue?.countryId}
                  onCountrySelect={citizenshipChangeHandler}
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.addAggregatorCitizenship?.message}
                />
              </Grid>
            </Grid>

            <Grid
              container
              columnSpacing={"1.25rem"}
              sx={{ ...commonStyles.marginTop20, ...styles.responsiveFields }}
            >
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <AjCountry
                  displayText="Country of tax"
                  defaultValue={countryCodeValue?.countryId}
                  onCountrySelect={countryOfTaxChangeHandler}
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.countryOfTax?.message}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <AjInputLabel
                  styleData={commonStyles.inputLabel}
                  displayText="Tax Id"
                />
                <InputBase
                  id="addAggregatorTaxId"
                  placeholder="Enter tax Id (optional)"
                  name="addAggregatorTaxId"
                  sx={commonStyles.inputStyle}
                  {...register("addAggregatorTaxId")}
                  error={errors.addAggregatorTaxId ? true : false}
                  type="number"
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.addAggregatorTaxId?.message}
                />
              </Grid>
            </Grid>

            <Grid item>
              <AjInputLabel
                styleData={commonStyles.inputLabel}
                displayText="Unique identification type"
              />
              <AjSearchInput
                id="addAggregatorUniqueIdentifictionType"
                name="addAggregatorUniqueIdentifictionType"
                value={myUinPinType}
                displayText="Type to search"
                styleData={commonStyles.searchDropdownInput}
                onChange={UINPinTypeChangeHandler}
                source="label"
                options={profileVerificationData?.orgUINOptions}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={
                  errors.addAggregatorUniqueIdentifictionType?.message
                }
              />
            </Grid>
            <Grid item>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <AjInputLabel
                  styleData={commonStyles.inputLabel}
                  displayText="Unique identification number"
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={handleModal}
                >
                  <HtmlTooltip
                    title={
                      <React.Fragment>
                        <Typography color="inherit" sx={styles.toolTipText}>
                          vNIN, Voter's Identification Number
                        </Typography>
                      </React.Fragment>
                    }
                  >
                    <Typography
                      component="img"
                      src={toolTipIcon}
                      sx={{ marginRight: "4px" }}
                    />
                  </HtmlTooltip>

                  <AjTypography
                    sx={{
                      fontWeight: "600",
                      textAlign: "center",
                      fontSize: "0.875rem",
                      lineHeight: "1.313rem",
                      textDecoration: "underline",
                    }}
                    displayText="How to get vNIN"
                  />
                </Box>
              </Box>

              <AjDialog
                open={openvninModal}
                closeModal={setOpenvninModal}
                title="VNIN"
                styleData={commonStyles.buyDialogModalContainer}
              >
                <VninModalContent />
              </AjDialog>
              <InputBase
                id="addAggregatorUniqueIdentificationNumber"
                name="addAggregatorUniqueIdentificationNumber"
                placeholder="Enter unique identification number"
                {...register("addAggregatorUniqueIdentificationNumber")}
                sx={{
                  ...commonStyles.inputStyle,
                  ...styles.inputBaseCustomStyle,
                }}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={
                  errors.addAggregatorUniqueIdentificationNumber?.message
                }
              />
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
                id="addAggregatorTypeOfProducts"
                name="addAggregatorTypeOfProducts"
                styleData={commonStyles.inputLabel}
              />
              <AjChipDropdown
                id="addAggregatorTypeOfProducts"
                name="addAggregatorTypeOfProducts"
                value={chipValue}
                onChange={onChangeDropdownChipHandler}
                fullWidth
                onDelete={handleDelete}
                options={products}
                styleData={commonStyles.multiSelectChipDropDown}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.addAggregatorTypeOfProducts?.message}
              />
            </Grid>

            <Grid container sx={commonStyles.spaceBetween}>
              <AjAdress
                submit={isSubmit}
                data={getAddressData}
                defaultCountry={countryCodeValue?.countryId}
              />
            </Grid>
            <Grid
              container
              sx={{ ...commonStyles.marginTop20, ...styles.responsiveFields }}
              columnSpacing={"1.25rem"}
            >
              <Grid sx={styles.saveBtnContainer}>
                <AjButton
                  onClick={addAggregator}
                  variant="contained"
                  displayText="Add Aggregator"
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddAggregator;
