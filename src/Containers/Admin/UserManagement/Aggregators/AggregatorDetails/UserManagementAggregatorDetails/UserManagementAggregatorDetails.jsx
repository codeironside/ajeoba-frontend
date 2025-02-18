import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as _ from "lodash";
import moment from "moment";
import { useValidateBankDetails } from "../../../../../../Hooks/validateBankDetails";

import { Box, Grid, IconButton, InputBase, Divider } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import AjButton from "../../../../../../Components/AjButton";
import AjTypography from "../../../../../../Components/AjTypography";
import TableActions from "../../../../../../Components/TableActions/TableActions";
import AjInputLabel from "../../../../../../Components/AjInputLabel";
import AjRadioOptions from "../../../../../../Components/AjRadioOptions";
import AjDatePicker from "../../../../../../Components/AjDatePicker";
import AjDocumentUploader from "../../../../../../Components/AjDocumentUploader";
import AjDocumentDownloader from "../../../../../../Components/AjDocumentDownloader";
import AjSearchInput from "../../../../../../Components/AjSearchInput";
import AjChipDropdown from "../../../../../../Components/AjChipDropdown";
import AjCountry from "../../../../../../Components/AjCountry/AjCountry";
import AjAdress from "../../../../../../Components/AjAdress/AjAdress";

import {
  formatDate,
  getPhoneCodeSymbol,
  getStatus,
  maskFields,
} from "../../../../../../Services/commonService/commonService";
import { getCountries } from "../../../../../../Redux/common/Countries/getCountriesActions";
import { DetailAggregatorSchema } from "../../../../../../validationSchema/detailAggregatorSchema";
import {
  genderOptions,
  employmentOption,
  UIN_TYPE_VALUE,
} from "../../../../../../Constant/AppConstant";
import { getUserData } from "../../../../../../Services/localStorageService";
import { getProducts } from "../../../../../../Redux/common/Products/productsActions";
import {
  ADMIN_AGGREGATORS,
  ADMIN_USER_MANAGEMENT,
} from "../../../../../../Routes/Routes";
import {
  getAggregatorDetailsByIdAction,
  editAggregator,
  getAggregatorDetailsById,
} from "../../../../../../Redux/SuperAdmin/UserManagement/AggregatorDetails/aggregatorDetailsActions";
import { ROLES } from "../../../../../../Constant/RoleConstant";
import { editAggregatorAction } from "../../../../../../Redux/SuperAdmin/UserManagement/Aggregators/aggregatorsActions";
import { commonStyles } from "../../../../../../Style/CommonStyle";
import { styles } from "./UserManagementAggregatorDetailsStyle";
import { getProfileVerificationDataAction } from "../../../../../../Redux/common/ProfileVerification/profileVerificationActions";

function UserManagementAggregatorDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const location = useLocation();
  const roleId = getUserData().role_id;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(DetailAggregatorSchema),
    mode: "onChange",
  });

  let addressData = null;

  const [isSubmit, setIsSubmit] = useState(false);

  const [editState, setEditState] = useState(false);
  const [aggregatorPassportImage, setAggregatorPassportImage] = useState(null);
  const [aggregatorEmploymentType, setAggregatorEmploymentType] =
    useState(null);
  const [aggregatorChipValue, setAggregatorChipValue] = useState([]);
  const [aggregatorGender, setAggregatorGender] = useState(null);
  const [aggregatorDateOfBirth, setAggregatorDateOfBirth] = useState(null);
  const [aggregatorUinPinType, setAggregatorMyUinPinType] = useState(null);
  const [cancel, setCancel] = useState(false);

  const aggregatorDetailsById = useSelector(
    (state) => state.userManagementAggregatorDetails.aggregatorDetails
  );

  const products = useSelector((state) => state.products.products || "");

  const countryMenuOptions = useSelector(
    (state) => state.countries.countryMenuOptions || null
  );

  const profileVerificationData = useSelector(
    (state) => state.profileVerification.profileVerificationData
  );

  const orgUINOptions = profileVerificationData?.orgUINOptions;

  useEffect(() => {
    if (location.pathname.includes("edit")) {
      setEditState(true);
    }
    dispatch(getAggregatorDetailsByIdAction(id));
    dispatch(getCountries());
    dispatch(getProducts());
    return () => {
      dispatch(getAggregatorDetailsById({}));
    };
  }, [id]);

  useEffect(() => {
    if (aggregatorDetailsById?.personalDetails) {
      dispatch(
        getProfileVerificationDataAction({
          countryId: aggregatorDetailsById?.personalDetails?.country_id,
        })
      );
    }
  }, [aggregatorDetailsById]);

  function settingTheValues() {
    setValue(
      "aggregatorDetailFirstName",
      aggregatorDetailsById?.personalDetails?.first_name
    );
    setValue(
      "aggregatorDetailLastName",
      aggregatorDetailsById?.personalDetails?.last_name
    );
    setValue(
      "aggregatorDetailTaxId",
      aggregatorDetailsById?.aggregatorDetails?.tax_id,
      { shouldValidate: true }
    );

    setValue(
      "aggregatorDetailUniqueIdentificationNumber",
      aggregatorDetailsById?.aggregatorDetails?.uin,
      { shouldValidate: true }
    );
  }

  useEffect(() => {
    setTimeout(() => {
      const productItems = [];
      aggregatorChipValue.map((item) => {
        productItems.push(_.find(products, { productName: item }).productId);
      });
      setValue("aggregatorDetailTypeOfProducts", productItems, {
        shouldValidate: true,
      });
    });

    if (aggregatorPassportImage != null) {
      setValue("aggregatorDetailPassportPhoto", aggregatorPassportImage?.id, {
        shouldValidate: true,
      });
    }
    if (aggregatorDateOfBirth !== null) {
      setValue(
        "aggregatorDetailDateOfBirth",
        aggregatorDetailsById?.personalDetails?.date_of_birth,
        {
          shouldValidate: true,
        }
      );
    }

    setValue(
      "aggregatorDetailState",
      aggregatorDetailsById?.aggregatorDetails?.state,
      {
        shouldValidate: true,
      }
    );

    setValue(
      "aggregatorDetailUniqueIdentifictionType",
      aggregatorDetailsById?.aggregatorDetails?.uin_type,
      {
        shouldValidate: true,
      }
    );

    setValue("aggregatorDetailGender", aggregatorGender, {
      shouldValidate: false,
    });
  }, [
    aggregatorChipValue,
    aggregatorPassportImage,
    aggregatorUinPinType,
    products,
    aggregatorDetailsById,
  ]);

  useEffect(() => {
    if (!editState) {
      if (aggregatorDetailsById?.bankDetails) {
        setValue(
          "aggregatorDetailAccountHolderName",
          aggregatorDetailsById?.bankDetails?.account_name,
          {
            shouldValidate: false,
          }
        );
        setValue(
          "aggregatorDetailBankName",
          aggregatorDetailsById?.bankDetails?.bank_name,
          { shouldValidate: false }
        );
        setValue(
          "aggregatorDetailAccountNumber",
          maskFields(aggregatorDetailsById?.bankDetails?.account_number),
          {
            shouldValidate: false,
          }
        );
      }
    } else {
      setValue("aggregatorDetailAccountHolderName", "", {
        shouldValidate: false,
      });
      setValue("aggregatorDetailBankName", "", { shouldValidate: false });
      setValue("aggregatorDetailAccountNumber", "", { shouldValidate: false });
    }
    settingTheValues();
    setAggregatorDateOfBirth(
      moment(aggregatorDetailsById?.personalDetails?.date_of_birth)
    );
    setAggregatorPassportImage({
      file_name: aggregatorDetailsById?.personalDetails?.file_name,
      id: aggregatorDetailsById?.personalDetails?.passport_photo_id,
    });
  }, [
    aggregatorDetailsById?.aggregatorDetails,
    aggregatorDetailsById?.personalDetails,
    aggregatorDetailsById?.bankDetails?.bank_name,
    aggregatorDetailsById?.bankDetails?.account_name,
    aggregatorDetailsById?.bankDetails?.account_number,
    editState,
  ]);

  useEffect(() => {
    if (products && aggregatorDetailsById) {
      setTimeout(() => {
        updateProductChipValue();
      });
    }
    if (aggregatorDetailsById) {
      setTimeout(() => {
        updateEmploymentType();
      });
    }
    if (aggregatorDetailsById) {
      setTimeout(() => {
        updateUinPinType();
      });
    }
    if (aggregatorDetailsById) {
      if (aggregatorDetailsById?.personalDetails) {
        setAggregatorGender(aggregatorDetailsById?.personalDetails.gender);
      }
      if (aggregatorDetailsById?.bankDetails && !editState) {
        updateBankingDetails();
      }
    }
  }, [
    products,
    aggregatorDetailsById,
    countryMenuOptions,
    aggregatorDetailsById?.personalDetails,
    aggregatorDetailsById?.bankDetails,
  ]);

  useEffect(() => {
    if (aggregatorDetailsById?.aggregatorDetails?.employment_type) {
      setAggregatorEmploymentType(
        aggregatorDetailsById?.aggregatorDetails?.employment_type
      );
    }
  }, []);

  const updateEmploymentType = () => {
    if (aggregatorDetailsById?.aggregatorDetails?.employment_type) {
      const empType = _.find(employmentOption, {
        value: aggregatorDetailsById?.aggregatorDetails?.employment_type,
      });
      setAggregatorEmploymentType(empType);
    }
  };

  const updateUinPinType = () => {
    if (aggregatorDetailsById?.aggregatorDetails?.uin_type) {
      const uinPinType = _.find(UIN_TYPE_VALUE, {
        value: aggregatorDetailsById?.aggregatorDetails?.uin_type,
      });
      setAggregatorMyUinPinType(uinPinType);
    }
  };

  const updateProductChipValue = () => {
    if (aggregatorDetailsById?.aggregatorDetails?.products) {
      const productItems = [];
      aggregatorDetailsById.aggregatorDetails.products.map((item) => {
        productItems.push(_.find(products, { productId: item }).productName);
      });
      setAggregatorChipValue(productItems);
    }
  };

  const updateBankingDetails = () => {
    setValue(
      "aggregatorDetailAccountHolderName",
      aggregatorDetailsById?.bankDetails?.account_name,
      {
        shouldValidate: false,
      }
    );
    setValue(
      "aggregatorDetailBankName",
      aggregatorDetailsById?.bankDetails?.bank_name,
      { shouldValidate: false }
    );
    setValue(
      "aggregatorDetailAccountNumber",
      maskFields(aggregatorDetailsById?.bankDetails?.account_number),
      {
        shouldValidate: false,
      }
    );
  };

  const editAggregatorData = () => {
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
    const edittedData = {
      firstName: data.aggregatorDetailFirstName,
      lastName: data.aggregatorDetailLastName,
      gender: aggregatorGender,
      uniqueIdentificationNumber:
        data.aggregatorDetailUniqueIdentificationNumber,
      employmentType: aggregatorEmploymentType.value,
      dateOfBirth: moment(aggregatorDateOfBirth).toISOString(true),
      countryOfBirth: parseInt(data.aggregatorDetailCountryOfBirth),
      passportPhotoId: parseInt(data.aggregatorDetailPassportPhoto),
      products: data.aggregatorDetailTypeOfProducts,
      addressLine1: addressData.addressLine1,
      taxCountry: parseInt(data.aggregatorDetailCountryOfTax),
      citizenship: parseInt(data.aggregatorDetailCitizenship),
      country: parseInt(addressData.country),
      stateId: parseInt(addressData.state),
      city: addressData.city,
      uinTypeValue: aggregatorUinPinType.label.replace(/ /g, "_"),
      zipCode: parseInt(addressData.zipCode),
      addressLine2: addressData.addressLine2,
      taxId: parseInt(data.aggregatorDetailTaxId),
    };
    if (data.aggregatorDetailAccountHolderName) {
      edittedData["accountHolderName"] = data.aggregatorDetailAccountHolderName;
    }
    if (data.aggregatorDetailBankName) {
      edittedData["bankName"] = data.aggregatorDetailBankName;
    }
    if (data.aggregatorDetailAccountNumber) {
      edittedData["accountNumber"] = data.aggregatorDetailAccountNumber;
    }
    dispatch(editAggregator(id, edittedData));
    setEditState(false);
  };

  const handleCancel = () => {
    setEditState(false);
    setCancel(true);
    clearErrors();
    updateProductChipValue();
    settingTheValues();
    setAggregatorDateOfBirth(
      aggregatorDetailsById?.personalDetails?.date_of_birth
    );
    setAggregatorGender(aggregatorDetailsById?.personalDetails.gender);
    updateBankingDetails();
    updateEmploymentType();
    updateUinPinType();
    setAggregatorPassportImage({
      file_name: aggregatorDetailsById?.personalDetails?.file_name,
      id: aggregatorDetailsById?.personalDetails.passport_photo_id,
    });
  };

  const onChangeDropdownChipHandler = (event) => {
    const {
      target: { value },
    } = event;
    setAggregatorChipValue(value);
  };

  const aggregatorUINPinTypeChangeHandler = (e, selectedUINPinType) => {
    setAggregatorMyUinPinType(selectedUINPinType);
  };

  const aggregatorCountryOfTaxChangeHandler = (selectedCountry) => {
    setValue("aggregatorDetailCountryOfTax", selectedCountry.countryId, {
      shouldValidate: true,
    });
  };

  const aggregatorCitizenshipChangeHandler = (selectedCountry) => {
    setValue("aggregatorDetailCitizenship", selectedCountry.countryId, {
      shouldValidate: true,
    });
  };

  const aggregatorCountryOfBirthChangeHandler = (selectedCountry) => {
    setValue("aggregatorDetailCountryOfBirth", selectedCountry.countryId, {
      shouldValidate: true,
    });
  };

  const aggregatorChangePassportPhotoImage = (e) => {
    e.preventDefault();
    setAggregatorPassportImage("");
  };

  const aggregatorEmploymentTypeChangeHandler = (e, selectedEmploymentType) => {
    setAggregatorEmploymentType(selectedEmploymentType);
  };

  const aggregatorDateSelectionHandler = (date) => {
    if (date === null) {
      setAggregatorDateOfBirth("");
    } else {
      setAggregatorDateOfBirth(date);
    }
  };

  const [validateBankReqm, bankPayload, getBanklist, getBank] =
    useValidateBankDetails();

  const [myBank, setMyBank] = useState(null);
  const [accountNumber, setAccountNumber] = useState(null);

  const bankChangeHandler = (_event, selectedBank) => {
    setMyBank(selectedBank);
  };

  const handleAccountNumberChange = (event) => {
    setAccountNumber(event.target?.value);
  };

  useEffect(() => {
    if (myBank?.bankCode && accountNumber && accountNumber?.length === 10) {
      dispatch(validateBankReqm({ bankCode: myBank?.bankCode, accountNumber }));
    }
  }, [accountNumber, myBank?.bankCode]);

  useEffect(() => {
    if (bankPayload?.status === "success") {
      setValue(
        "aggregatorDetailAccountHolderName",
        bankPayload?.data?.account_name,
        {
          shouldValidate: true,
        }
      );

      setValue("aggregatorDetailBankName", myBank?.label, {
        shouldValidate: true,
      });

      setValue(
        "aggregatorDetailAccountNumber",
        bankPayload?.data?.account_number,
        {
          shouldValidate: true,
        }
      );
    } else {
      setValue("aggregatorDetailAccountHolderName", "", {
        shouldValidate: true,
      });

      setValue("aggregatorDetailBankName", "", {
        shouldValidate: true,
      });

      setValue("aggregatorDetailAccountNumber", "", {
        shouldValidate: true,
      });
    }
  }, [bankPayload]);

  const aggregatorGenderSelectHandler = (option) => {
    setAggregatorGender(option);
  };

  const handleEditState = () => {
    setEditState(true);
    setValue("aggregatorDetailAccountHolderName", "", {
      shouldValidate: true,
    });
    setValue("aggregatorDetailBankName", "", { shouldValidate: true });
    setValue("aggregatorDetailAccountNumber", "", { shouldValidate: true });
    setCancel(false);
    navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_AGGREGATORS}/edit/${id}`);
  };
  const handleDelete = (value) => {
    setAggregatorChipValue(
      aggregatorChipValue.filter((name) => name !== value)
    );
  };

  const passportPhotoUpload = (data) => {
    setAggregatorPassportImage(data);
  };

  const options = [
    {
      name: "Active",
      actionClickHandler: (userId) =>
        dispatch(editAggregatorAction(userId, "ACTIVE")),
    },
    {
      name: "Inactive",
      actionClickHandler: (userId) =>
        dispatch(editAggregatorAction(userId, "INACTIVE")),
    },
    {
      name: "On Hold",
      actionClickHandler: (userId) =>
        dispatch(editAggregatorAction(userId, "ONHOLD")),
    },
  ];

  const backArrowHandler = () => {
    navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_AGGREGATORS}`);
  };

  return (
    <Grid
      container
      sx={{
        ...commonStyles.signupFormMainGridContainer,
        ...commonStyles.containerpadding,
      }}
    >
      <IconButton
        sx={commonStyles.whiteBackButtonPosition}
        onClick={backArrowHandler}
      >
        <ArrowBackRoundedIcon sx={commonStyles.backButtonBlackFont} />
      </IconButton>
      <Grid container item sx={styles.aggregatorDetailsContentContainer}>
        <Box sx={[styles.headingContentContainer, styles.marginTopZero]}>
          <Grid sx={styles.aggregatorDetailsContainer}>
            {!editState && ROLES.SUPER_ADMIN === roleId && (
              <AjButton
                onClick={handleEditState}
                styleData={{
                  ...commonStyles.editBtn,
                  ...styles.editResponsiveBtn,
                }}
                variant="outlined"
                displayText="Edit Details"
              />
            )}
            <Box sx={styles.aggregatorDetailsBoxes}>
              <AjTypography
                align="center"
                styleData={commonStyles.inputLabel}
                displayText="Email"
              />
              <AjTypography
                align="center"
                styleData={{
                  ...styles.typoColor,
                  ...commonStyles.textEllipsis,
                }}
                displayText={aggregatorDetailsById?.personalDetails?.email}
              />
            </Box>
            <Box sx={styles.aggregatorDetailsBoxes}>
              <AjTypography
                align="center"
                styleData={commonStyles.inputLabel}
                displayText="Phone Number"
              />
              <AjTypography
                align="center"
                styleData={{
                  ...styles.typoColor,
                  ...commonStyles.textEllipsis,
                }}
                displayText={`${getPhoneCodeSymbol(
                  aggregatorDetailsById?.aggregatorDetails?.phone_code
                )} ${aggregatorDetailsById?.personalDetails?.mobile_no}`}
              />
            </Box>
            <Box sx={styles.aggregatorDetailsBoxes}>
              <AjTypography
                align="center"
                styleData={commonStyles.inputLabel}
                displayText="Added on"
              />
              <AjTypography
                align="center"
                styleData={{
                  ...styles.typoColor,
                }}
                displayText={`${formatDate(
                  aggregatorDetailsById?.personalDetails?.created_at
                )}`}
              />
            </Box>
          </Grid>
        </Box>
        <Box sx={[commonStyles.signupContentContainer, styles.marginTopZero]}>
          <Grid>
            <Box
              sx={[styles.aggregatorDetailsBoxes, styles.customRatingStatus]}
            >
              <AjTypography
                align="center"
                styleData={commonStyles.inputLabel}
                displayText="Status"
              />
              <TableActions
                isReadOnly={!editState}
                options={options}
                id={id}
                isActive={getStatus(
                  aggregatorDetailsById?.personalDetails?.status
                )}
              />
            </Box>
          </Grid>
          <Box
            component="form"
            sx={[styles.customFormContainer, styles.customResponsiveBox]}
          >
            <>
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
                    id="firstName"
                    name="firstName"
                    readOnly={!editState}
                    sx={{
                      ...commonStyles.inputStyle,
                      ...(!editState && commonStyles.disableInput),
                    }}
                    {...register("aggregatorDetailFirstName")}
                    error={errors.aggregatorDetailFirstName ? true : false}
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={
                      editState && errors.aggregatorDetailFirstName?.message
                    }
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
                    id="lastName"
                    name="lastName"
                    readOnly={!editState}
                    sx={{
                      ...commonStyles.inputStyle,
                      ...(!editState && commonStyles.disableInput),
                    }}
                    {...register("aggregatorDetailLastName")}
                    error={errors.aggregatorDetailLastName ? true : false}
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={
                      editState && errors.aggregatorDetailLastName?.message
                    }
                  />
                </Grid>
              </Grid>
              <Grid
                container
                columnSpacing={"1.25rem"}
                sx={{
                  ...commonStyles.marginTop20,
                  ...styles.customResponsiveFields,
                }}
              >
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <AjInputLabel
                    displayText="Gender"
                    required
                    styleData={commonStyles.inputLabel}
                  />
                  <AjRadioOptions
                    defaultValue={aggregatorGender}
                    onSelect={aggregatorGenderSelectHandler}
                    readOnly={!editState}
                    disableStyling={commonStyles.disableInput}
                    items={genderOptions}
                  />

                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={
                      editState && errors.aggregatorDetailGender?.message
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <AjInputLabel
                    displayText="Date of Birth"
                    required
                    styleData={commonStyles.inputLabel}
                  />
                  <AjDatePicker
                    value={aggregatorDateOfBirth ? aggregatorDateOfBirth : null}
                    dateSelectHandler={aggregatorDateSelectionHandler}
                    readOnly={!editState}
                    agePicker
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={
                      editState && errors.aggregatorDetailDateOfBirth?.message
                    }
                  />
                </Grid>
              </Grid>
              <Grid
                container
                columnSpacing={"1.25rem"}
                sx={{
                  ...commonStyles.marginTop20,
                  ...styles.customResponsiveFields,
                }}
              >
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <AjInputLabel
                    displayText="Passport Photo: (JPEG, PNG or PDF only)"
                    id="passportPhoto"
                    name="passportPhoto"
                    required
                    styleData={commonStyles.inputLabel}
                  />
                  {aggregatorPassportImage && aggregatorPassportImage.id ? (
                    <AjDocumentDownloader
                      docId={aggregatorPassportImage?.id}
                      docName={aggregatorPassportImage?.file_name}
                      changeBtnStyle={
                        !editState && commonStyles.changeDownloadBtnStyle
                      }
                      changeDocument={aggregatorChangePassportPhotoImage}
                      readOnly={!editState}
                      displayText="Change Photo"
                      showIcon={true}
                    />
                  ) : (
                    <AjDocumentUploader
                      type="image"
                      docType="PASSPORT_PHOTO"
                      onUpload={passportPhotoUpload}
                      readOnly={!editState}
                    />
                  )}
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={
                      editState && errors.aggregatorDetailPassportPhoto?.message
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <AjInputLabel
                    required={true}
                    styleData={commonStyles.inputLabel}
                    displayText="Employment Type"
                  />
                  <AjSearchInput
                    readOnly={!editState}
                    id="employmentType"
                    name="employmentType"
                    value={aggregatorEmploymentType}
                    styleData={
                      !editState
                        ? [
                            commonStyles.searchDropdownInput,
                            commonStyles.disableInput,
                            commonStyles.disableSearchInputIconColor,
                          ]
                        : commonStyles.searchDropdownInput
                    }
                    onChange={aggregatorEmploymentTypeChangeHandler}
                    source="label"
                    options={employmentOption}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                columnSpacing={"1.25rem"}
                rowSpacing={"1.25rem"}
                sx={{
                  ...commonStyles.marginTop20,
                  ...styles.customResponsiveFields,
                }}
              >
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <AjCountry
                    cancel={cancel}
                    displayText="Country of birth"
                    defaultValue={
                      aggregatorDetailsById?.aggregatorDetails?.country_of_birth
                    }
                    styleData={{
                      ...(!editState && commonStyles.disableInput),
                      ...(!editState &&
                        commonStyles.disableSearchInputIconColor),
                    }}
                    onCountrySelect={aggregatorCountryOfBirthChangeHandler}
                    readOnly={!editState}
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={errors.aggregatorDetailCountryOfBirth?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <AjCountry
                    cancel={cancel}
                    displayText="Citizenship"
                    defaultValue={
                      aggregatorDetailsById?.aggregatorDetails?.citizenship
                    }
                    styleData={{
                      ...(!editState && commonStyles.disableInput),
                      ...(!editState &&
                        commonStyles.disableSearchInputIconColor),
                    }}
                    onCountrySelect={aggregatorCitizenshipChangeHandler}
                    readOnly={!editState}
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={errors.aggregatorDetailCitizenship?.message}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                columnSpacing={"1.25rem"}
                sx={{
                  ...commonStyles.marginTop20,
                  ...styles.customResponsiveFields,
                }}
              >
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <AjCountry
                    cancel={cancel}
                    displayText="Country of tax"
                    defaultValue={
                      aggregatorDetailsById?.aggregatorDetails?.tax_country
                    }
                    styleData={{
                      ...(!editState && commonStyles.disableInput),
                      ...(!editState &&
                        commonStyles.disableSearchInputIconColor),
                    }}
                    onCountrySelect={aggregatorCountryOfTaxChangeHandler}
                    readOnly={!editState}
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={errors.aggregatorDetailCountryOfTax?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <AjInputLabel
                    styleData={commonStyles.inputLabel}
                    displayText="Tax id"
                  />
                  <InputBase
                    required
                    id="taxId"
                    name="taxId"
                    placeholder="Enter tax id"
                    readOnly={!editState}
                    {...register("aggregatorDetailTaxId")}
                    sx={{
                      ...commonStyles.inputStyle,
                      ...(!editState && commonStyles.disableInput),
                    }}
                    type="number"
                    error={errors.aggregatorDetailTaxId ? true : false}
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={
                      editState && errors.aggregatorDetailTaxId?.message
                    }
                  />
                </Grid>
              </Grid>
              <Grid
                container
                columnSpacing={"1.25rem"}
                sx={{
                  ...commonStyles.marginTop20,
                  ...styles.customResponsiveFields,
                }}
              >
                {orgUINOptions && (
                  <>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <AjInputLabel
                        required={true}
                        styleData={commonStyles.inputLabel}
                        displayText="Unique identification type"
                      />
                      <AjSearchInput
                        clearIcon={<></>}
                        id="aggregatorDetailUniqueIdentifictionType"
                        name="aggregatorDetailUniqueIdentifictionType"
                        readOnly={!editState}
                        value={aggregatorUinPinType}
                        displayText="Type to search"
                        styleData={
                          !editState
                            ? [
                                commonStyles.searchDropdownInput,
                                commonStyles.disableInput,
                                commonStyles.disableSearchInputIconColor,
                              ]
                            : commonStyles.searchDropdownInput
                        }
                        onChange={aggregatorUINPinTypeChangeHandler}
                        source="label"
                        options={orgUINOptions}
                      />
                      <AjTypography
                        styleData={commonStyles.errorText}
                        displayText={
                          errors.aggregatorDtailUniqueIdentificationType
                            ?.message
                        }
                      />
                    </Grid>
                  </>
                )}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <AjInputLabel
                    required={true}
                    styleData={{
                      ...commonStyles.inputLabel,
                      width: "fit-content",
                    }}
                    displayText="Unique identification number"
                  />
                  <InputBase
                    required
                    id="uniqueIdentificationNumber"
                    name="uniqueIdentificationNumber"
                    placeholder="Enter unique identification number "
                    readOnly={!editState}
                    {...register("aggregatorDetailUniqueIdentificationNumber")}
                    sx={{
                      ...commonStyles.inputStyle,
                      ...(!editState && commonStyles.disableInput),
                    }}
                    error={
                      errors.aggregatorDetailUniqueIdentificationNumber
                        ? true
                        : false
                    }
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={
                      editState &&
                      errors.aggregatorDetailUniqueIdentificationNumber?.message
                    }
                  />
                </Grid>
              </Grid>
              <Grid
                container
                columnSpacing={"1.25rem"}
                sx={{
                  ...commonStyles.marginTop20,
                  ...styles.customResponsiveFields,
                }}
              >
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <AjInputLabel
                    displayText="Type of Products"
                    required
                    id="aggregatorDetailTypeOfProducts"
                    name="aggregatorDetailTypeOfProducts"
                    styleData={commonStyles.inputLabel}
                  />
                  <AjChipDropdown
                    id="typeOfProducts"
                    name="typeOfProducts"
                    isReadOnly={!editState}
                    value={aggregatorChipValue}
                    onChange={onChangeDropdownChipHandler}
                    fullWidth
                    onDelete={handleDelete}
                    options={products}
                    sx={{
                      ...commonStyles.multiSelectChipDropDown,
                      ...(!editState && commonStyles.disableInput),
                    }}
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={
                      editState &&
                      errors.aggregatorDetailTypeOfProducts?.message
                    }
                  />
                </Grid>
              </Grid>
              <Divider sx={commonStyles.dividerStyle} />

              <Grid
                container
                columnSpacing={"1.25rem"}
                sx={{
                  ...commonStyles.marginTop20,
                  ...styles.customResponsiveFields,
                }}
              >
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <AjInputLabel
                    displayText="Bank name"
                    styleData={commonStyles.inputLabel}
                  />

                  <AjSearchInput
                    clearIcon={<></>}
                    id="bankName"
                    name="bankName"
                    value={
                      editState
                        ? myBank
                        : {
                            label:
                              aggregatorDetailsById?.bankDetails?.bank_name,
                            bankCode:
                              aggregatorDetailsById?.bankDetails?.bank_code,
                          }
                    }
                    displayText="Type to search"
                    styleData={
                      !editState
                        ? [
                            commonStyles.searchDropdownInput,
                            commonStyles.disableInput,
                            commonStyles.disableSearchInputIconColor,
                          ]
                        : commonStyles.searchDropdownInput
                    }
                    onChange={bankChangeHandler}
                    readOnly={!editState}
                    source="label"
                    options={getBanklist()}
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={
                      editState && errors.aggregatorDetailBankName?.message
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <AjInputLabel
                    displayText="Account number"
                    styleData={commonStyles.inputLabel}
                  />
                  <InputBase
                    readOnly={!editState}
                    fullWidth
                    id="accountNumber"
                    name="accountNumber"
                    placeholder={
                      editState ? "Enter account number (optional)" : ""
                    }
                    value={
                      editState
                        ? accountNumber
                        : aggregatorDetailsById?.bankDetails?.account_number
                    }
                    sx={{
                      ...commonStyles.inputStyle,
                      ...(!editState && commonStyles.disableInput),
                    }}
                    onChange={handleAccountNumberChange}
                    error={errors.aggregatorDetailAccountNumber ? true : false}
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={
                      editState && errors.aggregatorDetailAccountNumber?.message
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12} sx={commonStyles.marginTop20}>
                  <AjInputLabel
                    displayText="Account holder name"
                    styleData={commonStyles.inputLabel}
                  />
                  <InputBase
                    readOnly={true}
                    id="accountHolderName"
                    name="accountHolderName"
                    placeholder={""}
                    value={
                      editState
                        ? bankPayload?.isError
                          ? ""
                          : bankPayload?.data?.account_name
                        : aggregatorDetailsById?.bankDetails?.account_name
                    }
                    sx={{
                      ...commonStyles.inputStyle,
                      ...(!editState && commonStyles.disableInput),
                    }}
                    error={
                      errors.aggregatorDetailAccountHolderName ||
                      bankPayload?.isError
                        ? true
                        : false
                    }
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={
                      (editState &&
                        errors.aggregatorDetailAccountHolderName?.message) ||
                      (bankPayload?.isError && bankPayload?.message)
                    }
                  />
                </Grid>
              </Grid>
              <Divider sx={commonStyles.dividerStyle} />
              {aggregatorDetailsById?.aggregatorDetails && (
                <AjAdress
                  submit={isSubmit}
                  data={getAddressData}
                  isDisable={!editState}
                  reset={cancel}
                  customStyle={commonStyles.marginTop20}
                  defaultAddressLine1={
                    aggregatorDetailsById?.aggregatorDetails?.address_1
                  }
                  defaultAddressLine2={
                    aggregatorDetailsById?.aggregatorDetails?.address_2
                  }
                  defaultCity={aggregatorDetailsById?.aggregatorDetails?.city}
                  defaultZipCode={
                    aggregatorDetailsById?.aggregatorDetails?.zip_code
                  }
                  defaultCountry={
                    aggregatorDetailsById?.aggregatorDetails?.country
                  }
                  defaultState={aggregatorDetailsById?.aggregatorDetails?.state}
                />
              )}

              <Grid sx={styles.btnContainer} container>
                {editState && (
                  <>
                    <AjButton
                      onClick={handleCancel}
                      styleData={styles.cancelBtnStyle}
                      variant="outlined"
                      displayText="Cancel"
                    />
                    <AjButton
                      onClick={editAggregatorData}
                      variant="contained"
                      displayText="Save Changes"
                    />
                  </>
                )}
              </Grid>
            </>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default UserManagementAggregatorDetails;
