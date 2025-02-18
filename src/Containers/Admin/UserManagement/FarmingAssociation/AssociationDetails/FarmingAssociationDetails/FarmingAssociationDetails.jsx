import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import * as _ from "lodash";
import moment from "moment";
import { Grid, Box, InputBase, Divider } from "@mui/material";

import AjButton from "../../../../../../Components/AjButton";
import AjTypography from "../../../../../../Components/AjTypography";
import AjInputLabel from "../../../../../../Components/AjInputLabel";
import AjChipDropdown from "../../../../../../Components/AjChipDropdown";
import TableActions from "../../../../../../Components/TableActions/TableActions";
import AjRadioOptions from "../../../../../../Components/AjRadioOptions";
import AjDatePicker from "../../../../../../Components/AjDatePicker";
import AjDocumentDownloader from "../../../../../../Components/AjDocumentDownloader";
import AjDocumentUploader from "../../../../../../Components/AjDocumentUploader";
import AjAdress from "../../../../../../Components/AjAdress/AjAdress";
import { AjRating } from "../../../../../../Components/AjRating";

import {
  ADMIN_USER_MANAGEMENT,
  ADMIN_FARMING_ASSOCIATION,
} from "../../../../../../Routes/Routes";
import { detailFarmingAssociation } from "../../../../../../validationSchema/detailFarmingAssociation";
import {
  getAssociationDetailsByIdAction,
  editFarmingAssociation,
} from "../../../../../../Redux/SuperAdmin/UserManagement/FarmingAssociationDetails/farmingAssociationDetailActions.";
import { editFarmingAssociationAction } from "../../../../../../Redux/SuperAdmin/UserManagement/FarmingAssociation/farmingAssociationActions";
import { getProducts } from "../../../../../../Redux/common/Products/productsActions";
import { getCountries } from "../../../../../../Redux/common/Countries/getCountriesActions";
import {
  getPhoneCodeSymbol,
  getStatus,
  maskFields,
} from "../../../../../../Services/commonService/commonService";
import { genderOptions } from "../../../../../../Constant/AppConstant";
import { getUserData } from "../../../../../../Services/localStorageService";
import { ROLES } from "../../../../../../Constant/RoleConstant";
import { styles } from "./FarmingAsssociationDetailsStyles";
import { commonStyles } from "../../../../../../Style/CommonStyle";
import { getProfileVerificationDataAction } from "../../../../../../Redux/common/ProfileVerification/profileVerificationActions";
import { useValidateBankDetails } from "../../../../../../Hooks/validateBankDetails";
import AjSearchInput from "../../../../../../Components/AjSearchInput";
const FarmingAssociationDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [validateBankReqm, bankPayload, getBanklist, getBank] =
    useValidateBankDetails();

  const [myBank, setMyBank] = useState(null);
  const [newAccountNumber, setNewAccountNumber] = useState(null);

  const bankChangeHandler = (_event, selectedBank) => {
    setMyBank(selectedBank);
  };

  const handleAccountNumberChange = (event) => {
    setNewAccountNumber(event.target?.value);
  };

  useEffect(() => {
    if (
      myBank?.bankCode &&
      newAccountNumber &&
      newAccountNumber.length === 10
    ) {
      dispatch(
        validateBankReqm({
          bankCode: myBank?.bankCode,
          accountNumber: newAccountNumber,
        })
      );
    }
  }, [newAccountNumber, myBank?.bankCode]);

  useEffect(() => {
    if (bankPayload?.status === "success") {
      setValue(
        "associationDetailAccountHolderName",
        bankPayload?.data?.account_name,
        {
          shouldValidate: true,
        }
      );

      setValue("associationDetailBankName", myBank?.label, {
        shouldValidate: true,
      });

      setValue(
        "associationDetailAccountNumber",
        bankPayload?.data?.account_number,
        {
          shouldValidate: true,
        }
      );
    } else {
      setValue("associationDetailAccountHolderName", "", {
        shouldValidate: true,
      });

      setValue("associationDetailBankName", "", { shouldValidate: true });

      setValue("associationDetailAccountNumber", "", {
        shouldValidate: true,
      });
    }
  }, [bankPayload]);

  const { id } = params;
  const location = useLocation();

  const roleId = getUserData().role_id;

  let addressData = null;

  const [isSubmit, setIsSubmit] = useState(false);

  const [associationDetails, setAssociationDetails] = useState(null);
  const [personalDetails, setPersonalDetails] = useState(null);
  const [bankDetails, setBankDetails] = useState(null);
  const [chipValue, setChipValue] = useState([]);

  const [gender, setGender] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [CACDocument, setCACDocument] = useState(null);
  const [passportImage, setPassportImage] = useState(null);
  const [accountHolderName, setAccountHolderName] = useState(null);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [edit, setEdit] = useState(false);

  const [cancel, setCancel] = useState(false);

  const associationDetailsById = useSelector(
    (state) => state.userManagementAssociationDetails.associationDetails
  );

  const products = useSelector((state) => state.products.products || "");

  const profileVerificationData = useSelector(
    (state) => state.profileVerification.profileVerificationData
  );
  const verificationText = profileVerificationData?.orgVerificationType[0];

  useEffect(() => {
    if (location.pathname.includes("edit")) setEdit(true);
    dispatch(getAssociationDetailsByIdAction(id));
    dispatch(getProducts());
    dispatch(getCountries());
  }, [id]);

  useEffect(() => {
    if (personalDetails)
      dispatch(
        getProfileVerificationDataAction({
          countryId: personalDetails?.country_id,
        })
      );
  }, [personalDetails]);

  useEffect(() => {
    const productItems = [];
    chipValue.map((item) => {
      productItems.push(_.find(products, { productName: item }).productId);
    });
    setValue("associationDetailTypeOfProducts", productItems, {
      shouldValidate: true,
    });
    if (dateOfBirth !== null) {
      setValue("associationDetailDateOfBirth", dateOfBirth, {
        shouldValidate: true,
      });
    }
    if (CACDocument !== null) {
      setValue("associationDetailCACDocument", CACDocument?.id, {
        shouldValidate: true,
      });
    }
    if (passportImage != null) {
      setValue("associationDetailPassportPhoto", passportImage?.id, {
        shouldValidate: true,
      });
    }
    setValue("associationDetailGender", gender, { shouldValidate: false });
  }, [chipValue, gender, dateOfBirth, CACDocument, passportImage]);

  useEffect(() => {
    if (!edit) {
      setValue("associationDetailAccountHolderName", accountHolderName, {
        shouldValidate: true,
      });
      setValue("associationDetailBankName", bankName, {
        shouldValidate: true,
      });
      setValue("associationDetailAccountNumber", accountNumber, {
        shouldValidate: true,
      });
    } else {
      setValue("associationDetailAccountHolderName", "", {
        shouldValidate: false,
      });
      setValue("associationDetailBankName", "", { shouldValidate: false });
      setValue("associationDetailAccountNumber", "", { shouldValidate: false });
    }
  }, [accountHolderName, bankName, accountNumber, edit]);

  useEffect(() => {
    if (associationDetailsById) {
      setAssociationDetails(associationDetailsById?.associationDetails);
      setPersonalDetails(associationDetailsById?.personalDetails);
      setBankDetails(associationDetailsById?.bankDetails);
    }
    if (products && associationDetailsById) {
      setTimeout(() => {
        updateProductChipValue();
      });
    }
  }, [products, associationDetailsById]);

  useEffect(() => {
    if (associationDetailsById) {
      if (personalDetails) {
        updateGender();
      }
      if (bankDetails) {
        updateBankingDetails();
      }
    }
  }, [associationDetailsById, personalDetails, bankDetails]);

  useEffect(() => {
    setValue("associationDetailFirstName", personalDetails?.first_name);
    setValue("associationDetailLastName", personalDetails?.last_name);
    setValue(
      "associationDetailAssociationName",
      associationDetails?.association_name
    );
    setValue(
      "associationDetailAssociationRegNumber",
      associationDetails?.registration_number
    );
    setValue(
      "orgVerificationNumber",
      associationDetails?.org_verification_number
    );
    setValue("associationDetailMemberSize", associationDetails?.member_size);
    setDateOfBirth(moment(personalDetails?.date_of_birth));
    setCACDocument({
      file_name: associationDetails?.file_name,
      id: associationDetails?.cac_document,
    });
    setPassportImage({
      file_name: personalDetails?.file_name,
      id: personalDetails?.passport_photo_id,
    });
  }, [associationDetails, personalDetails]);

  const updateProductChipValue = () => {
    if (associationDetailsById?.associationDetails?.products) {
      const productItems = [];
      associationDetailsById.associationDetails.products.map((item) => {
        productItems.push(_.find(products, { productId: item }).productName);
      });
      setChipValue(productItems);
    }
  };

  const updateGender = () => {
    setGender(personalDetails.gender);
  };

  const updateBankingDetails = () => {
    const accountNumberFormatted = maskFields(bankDetails?.account_number);
    setAccountHolderName(bankDetails?.account_name);
    setBankName(bankDetails?.bank_name);
    setAccountNumber(accountNumberFormatted);
  };

  const changeCACImageData = (e) => {
    e.preventDefault();
    setCACDocument("");
  };

  const uploadCACImage = (data) => {
    setCACDocument(data);
  };

  const passportUpload = (data) => {
    setPassportImage(data);
  };

  const changePassportImage = (e) => {
    e.preventDefault();
    setPassportImage("");
  };

  const onChangeDropdownChipHandler = (event) => {
    const {
      target: { value },
    } = event;
    setChipValue(value);
  };
  const handleDelete = (value) => {
    setChipValue(chipValue.filter((name) => name !== value));
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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(detailFarmingAssociation(verificationText)),
    mode: "onChange",
  });

  const editAssociation = () => {
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
      firstName: data.associationDetailFirstName,
      lastName: data.associationDetailLastName,
      gender: data.associationDetailGender,
      dateOfBirth: moment(data.associationDetailDateOfBirth).toISOString(true),
      passportPhotoId: parseInt(data.associationDetailPassportPhoto),
      associationName: data.associationDetailAssociationName,
      registrationNumber: data.associationDetailAssociationRegNumber,
      orgVerificationNumber: data.orgVerificationNumber,
      orgVerificationType: verificationText,
      products: data.associationDetailTypeOfProducts,
      memberSize: parseInt(data.associationDetailMemberSize),
      cacDocumentId: parseInt(data.associationDetailCACDocument),
      addressLine1: addressData.addressLine1,
      country: parseInt(addressData.country),
      countryId: parseInt(personalDetails.country_id),
      stateId: parseInt(addressData.state),
      city: addressData.city,
      addressLine2: addressData.addressLine2,
      zipCode: parseInt(addressData.zipCode),
    };
    if (data.associationDetailAccountHolderName) {
      edittedData["accountHolderName"] =
        data.associationDetailAccountHolderName;
    }
    if (data.associationDetailBankName) {
      edittedData["bankName"] = data.associationDetailBankName;
    }
    if (data.associationDetailAccountNumber) {
      edittedData["accountNumber"] = data.associationDetailAccountNumber;
    }
    dispatch(editFarmingAssociation(id, edittedData));
    setEdit(false);
    navigate(
      `${ADMIN_USER_MANAGEMENT}/${ADMIN_FARMING_ASSOCIATION}/detail/${id}`
    );
  };
  const handleEdit = () => {
    setEdit(true);
    setAccountHolderName("");
    setBankName("");
    setAccountNumber("");
    setCancel(false);
    navigate(
      `${ADMIN_USER_MANAGEMENT}/${ADMIN_FARMING_ASSOCIATION}/edit/${id}`
    );
  };

  const handleCancel = (e, value) => {
    setEdit(false);
    setCancel(true);
    clearErrors();
    setValue("associationDetailFirstName", personalDetails.first_name);
    setValue("associationDetailLastName", personalDetails.last_name);
    setValue("associationDetailMemberSize", associationDetails.member_size);
    setValue(
      "associationDetailAssociationName",
      associationDetails.association_name
    );
    setValue(
      "associationDetailAssociationRegNumber",
      associationDetails.registration_number
    );
    setValue(
      "orgVerificationNumber",
      associationDetails.org_verification_number
    );
    setValue("associationDetailDateOfBirth", personalDetails.date_of_birth);
    setDateOfBirth(personalDetails.date_of_birth);
    setCACDocument({
      file_name: associationDetails?.file_name,
      id: associationDetails.cac_document,
    });
    setPassportImage({
      file_name: personalDetails?.file_name,
      id: personalDetails.passport_photo_id,
    });
    updateGender();
    updateProductChipValue();
    if (bankDetails) updateBankingDetails();
    navigate(
      `${ADMIN_USER_MANAGEMENT}/${ADMIN_FARMING_ASSOCIATION}/detail/${id}`
    );
  };

  const options = [
    {
      name: "Active",
      actionClickHandler: (userId) =>
        dispatch(editFarmingAssociationAction(userId, "ACTIVE")),
    },
    {
      name: "Inactive",
      actionClickHandler: (userId) =>
        dispatch(editFarmingAssociationAction(userId, "INACTIVE")),
    },
    {
      name: "On Hold",
      actionClickHandler: (userId) =>
        dispatch(editFarmingAssociationAction(userId, "ONHOLD")),
    },
  ];

  return (
    <Grid
      container
      item
      sx={{
        ...commonStyles.whiteContainerBackgroundTabs,
        ...commonStyles.customSrollBar,
      }}
    >
      <Box sx={[commonStyles.signupContentContainer, styles.marginTopZero]}>
        <Grid sx={styles.farmingAssociationDetailsContainer}>
          {!edit && ROLES.SUPER_ADMIN === roleId && (
            <AjButton
              onClick={handleEdit}
              styleData={{
                ...commonStyles.editBtn,
                ...styles.editRespnsiveBtn,
              }}
              variant="outlined"
              displayText="Edit Details"
            />
          )}
          <Box sx={styles.associtionDetailsBoxes}>
            <AjTypography
              align="center"
              styleData={commonStyles.inputLabel}
              displayText="Email"
            />
            <AjTypography
              align="center"
              styleData={{ ...styles.typoColor, ...commonStyles.textEllipsis }}
              displayText={personalDetails?.email}
            />
          </Box>
          <Box sx={styles.associtionDetailsBoxes}>
            <AjTypography
              align="center"
              styleData={commonStyles.inputLabel}
              displayText="Phone Number"
            />
            <AjTypography
              align="center"
              styleData={{ ...styles.typoColor, ...commonStyles.textEllipsis }}
              displayText={`${getPhoneCodeSymbol(
                personalDetails?.phone_code
              )} ${personalDetails?.mobile_no}`}
            />
          </Box>
          <Box sx={styles.associtionDetailsBoxes}>
            <AjTypography
              align="center"
              styleData={commonStyles.inputLabel}
              displayText="Onboarded Members"
            />
            <AjTypography
              align="center"
              styleData={{ ...styles.typoColor, ...commonStyles.textEllipsis }}
              displayText={associationDetails?.farmersonboard}
            />
          </Box>
        </Grid>

        <Grid
          sx={{
            ...styles.farmingAssociationDetailsContainer,
            ...styles.ratingStatusContainer,
          }}
        >
          <Box sx={[styles.associtionDetailsBoxes, styles.ratingStatus]}>
            <AjTypography
              align="center"
              styleData={commonStyles.inputLabel}
              displayText="Rating"
            />
            <AjRating readOnly={!edit} />
          </Box>

          <Box sx={[styles.associtionDetailsBoxes, styles.ratingStatus]}>
            <AjTypography
              align="center"
              styleData={commonStyles.inputLabel}
              displayText="Status"
            />
            <TableActions
              isReadOnly={!edit}
              options={options}
              id={id}
              isActive={getStatus(personalDetails?.status)}
            />
          </Box>
        </Grid>
        <Box
          component="form"
          sx={[commonStyles.signupFormContainer, styles.responsiveBox]}
        >
          {personalDetails && (
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
                    id="associationDetailFirstName"
                    name="associationDetailFirstName"
                    readOnly={!edit}
                    sx={{
                      ...commonStyles.inputStyle,
                      ...(!edit && commonStyles.disableInput),
                    }}
                    {...register("associationDetailFirstName")}
                    error={errors.associationDetailFirstName ? true : false}
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={
                      edit && errors.associationDetailFirstName?.message
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
                    id="associationDetailLastName"
                    name="associationDetailLastName"
                    readOnly={!edit}
                    sx={{
                      ...commonStyles.inputStyle,
                      ...(!edit && commonStyles.disableInput),
                    }}
                    {...register("associationDetailLastName")}
                    error={errors.associationDetailLastName ? true : false}
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={
                      edit && errors.associationDetailLastName?.message
                    }
                  />
                </Grid>
              </Grid>
              <Grid
                container
                columnSpacing={"1.25rem"}
                sx={styles.farmingsociationFieldContainer}
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
                    readOnly={!edit}
                    disableStyling={commonStyles.disableInput}
                    items={genderOptions}
                  />

                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={
                      edit && errors.associationDetailGender?.message
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
                    value={dateOfBirth ? dateOfBirth : null}
                    dateSelectHandler={dateSelectionHandler}
                    readOnly={!edit}
                    agePicker
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={
                      edit && errors.associationDetailDateOfBirth?.message
                    }
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}>
                <AjInputLabel
                  displayText="Passport Photo: (JPEG, PNG or PDF only)"
                  id="associationDetailPassportPhoto"
                  name="associationDetailPassportPhoto"
                  required
                  styleData={commonStyles.inputLabel}
                />
                {passportImage && passportImage.id ? (
                  <AjDocumentDownloader
                    docId={passportImage?.id}
                    docName={passportImage?.file_name}
                    changeBtnStyle={!edit && styles.changeDownloadBtnStyle}
                    changeDocument={changePassportImage}
                    readOnly={!edit}
                    displayText="Change Photo"
                    showIcon={true}
                  />
                ) : (
                  <AjDocumentUploader
                    type="image"
                    docType="PASSPORT_PHOTO"
                    onUpload={passportUpload}
                    readOnly={!edit}
                  />
                )}
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={
                    edit && errors.associationDetailPassportPhoto?.message
                  }
                />
              </Grid>
            </>
          )}
          <Divider sx={styles.dividerStyles} />
          {associationDetails && (
            <>
              <Grid item xs={12} sm={12}>
                <AjInputLabel
                  displayText="Association name"
                  required={true}
                  styleData={commonStyles.inputLabel}
                />
                <InputBase
                  required
                  id="associationDetailAssociationName"
                  name="associationDetailAssociationName"
                  readOnly={!edit}
                  sx={{
                    ...commonStyles.inputStyle,
                    ...(!edit && commonStyles.disableInput),
                  }}
                  {...register("associationDetailAssociationName")}
                  error={
                    edit && errors.associationDetailAssociationName
                      ? true
                      : false
                  }
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={
                    edit && errors.associationDetailAssociationName?.message
                  }
                />
              </Grid>

              <Grid
                container
                columnSpacing={"1.25rem"}
                sx={styles.farmingsociationFieldContainer}
              >
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <AjInputLabel
                    displayText="Association registration number"
                    required
                    styleData={commonStyles.inputLabel}
                  />
                  <InputBase
                    required
                    fullWidth
                    id="associationDetailAssociationRegNumber"
                    name="associationDetailAssociationRegNumber"
                    readOnly={!edit}
                    sx={{
                      ...commonStyles.inputStyle,
                      ...(!edit && commonStyles.disableInput),
                    }}
                    {...register("associationDetailAssociationRegNumber")}
                    error={
                      errors.associationDetailAssociationRegNumber
                        ? true
                        : false
                    }
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={
                      edit &&
                      errors.associationDetailAssociationRegNumber?.message
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <AjInputLabel
                    displayText={`${verificationText} number`}
                    required
                    styleData={commonStyles.inputLabel}
                  />
                  <InputBase
                    required
                    fullWidth
                    id="orgVerificationNumber"
                    name="orgVerificationNumber"
                    readOnly={!edit}
                    sx={{
                      ...commonStyles.inputStyle,
                      ...(!edit && commonStyles.disableInput),
                    }}
                    {...register("orgVerificationNumber")}
                    error={errors.orgVerificationNumber ? true : false}
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={edit && errors.orgVerificationNumber?.message}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12} sx={styles.typeOfProductField}>
                <AjInputLabel
                  displayText="Type of Products"
                  required
                  id="associationDetailTypeOfProducts"
                  name="associationDetailTypeOfProducts"
                  styleData={commonStyles.inputLabel}
                />
                <AjChipDropdown
                  value={chipValue}
                  onChange={onChangeDropdownChipHandler}
                  fullWidth
                  onDelete={handleDelete}
                  options={products}
                  sx={{
                    ...styles.chipDropDown,
                    ...(!edit && commonStyles.disableInput),
                  }}
                  isReadOnly={!edit}
                />
              </Grid>
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={
                  edit && errors.associationDetailTypeOfProducts?.message
                }
              />

              <Grid
                container
                columnSpacing={"1.25rem"}
                sx={styles.farmingAssocitionMember}
              >
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <AjInputLabel
                    displayText="Member size"
                    required
                    styleData={commonStyles.inputLabel}
                  />
                  <InputBase
                    required
                    fullWidth
                    id="associationDetailMemberSize"
                    name="associationDetailMemberSize"
                    readOnly={!edit}
                    sx={{
                      ...commonStyles.inputStyle,
                      ...(!edit && commonStyles.disableInput),
                    }}
                    {...register("associationDetailMemberSize")}
                    error={errors.associationDetailMemberSize ? true : false}
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={
                      edit && errors.associationDetailMemberSize?.message
                    }
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  sx={styles.cacDocument}
                >
                  <AjInputLabel
                    displayText="CAC document : (JPEG, PNG or PDF only)"
                    required
                    id="associationDetailCACDocument"
                    name="associationDetailCACDocument"
                    styleData={commonStyles.inputLabel}
                  />
                  {CACDocument && CACDocument.id ? (
                    <AjDocumentDownloader
                      docId={CACDocument?.id}
                      docName={CACDocument?.file_name}
                      changeDocument={changeCACImageData}
                      changeBtnStyle={!edit && styles.changeDownloadBtnStyle}
                      readOnly={!edit}
                      showIcon={true}
                    />
                  ) : (
                    <AjDocumentUploader
                      type="image"
                      readOnly={!edit}
                      docType="CAC_PHOTO"
                      onUpload={uploadCACImage}
                    />
                  )}
                  <AjTypography
                    styleData={styles.cacDocErrorText}
                    displayText={
                      edit && errors.associationDetailCACDocument?.message
                    }
                  />
                </Grid>
              </Grid>
              <Divider sx={styles.dividerStyles} />

              <Grid
                container
                columnSpacing={"1.25rem"}
                sx={styles.farmingAssocitionMember}
              >
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <AjInputLabel
                    displayText="Bank name"
                    styleData={commonStyles.inputLabel}
                  />
                  <AjSearchInput
                    clearIcon={<></>}
                    id="associationDetailBankName"
                    name="associationDetailBankName"
                    value={
                      edit
                        ? myBank
                        : {
                            label: bankDetails?.bank_name,
                            bankCode: bankDetails?.bank_code,
                          }
                    }
                    displayText="Type to search"
                    styleData={{
                      ...commonStyles.searchDropdownInput,
                      ...(!edit && commonStyles.disableInput),
                      ...(!edit && commonStyles.disableSearchInputIconColor),
                    }}
                    onChange={bankChangeHandler}
                    readOnly={!edit}
                    source="label"
                    options={getBanklist()}
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={
                      edit && errors.associationDetailBankName?.message
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <AjInputLabel
                    displayText="Account number"
                    styleData={commonStyles.inputLabel}
                  />
                  <InputBase
                    readOnly={!edit}
                    fullWidth
                    placeholder={edit && "Enter account number (optional)"}
                    id="associationDetailAccountNumber"
                    name="associationDetailAccountNumber"
                    value={edit ? newAccountNumber : accountNumber}
                    onChange={handleAccountNumberChange}
                    sx={{
                      ...commonStyles.inputStyle,
                      ...(!edit && commonStyles.disableInput),
                    }}
                    error={errors.associationDetailAccountNumber ? true : false}
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={
                      edit && errors.associationDetailAccountNumber?.message
                    }
                  />
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                sx={styles.farmingsociationFieldContainer}
              >
                <AjInputLabel
                  displayText="Account holder name"
                  styleData={commonStyles.inputLabel}
                />
                <InputBase
                  readOnly={true}
                  id="associationDetailAccountHolderName"
                  placeholder={""}
                  name="associationDetailAccountHolderName"
                  value={
                    edit
                      ? bankPayload?.isError
                        ? ""
                        : bankPayload?.data?.account_name
                      : accountHolderName
                  }
                  sx={{
                    ...commonStyles.inputStyle,
                    ...(!edit && commonStyles.disableInput),
                  }}
                  error={
                    errors.associationDetailAccountHolderName ||
                    (edit && bankPayload?.isError)
                      ? true
                      : false
                  }
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={
                    (edit &&
                      errors.associationDetailAccountHolderName?.message) ||
                    (bankPayload?.isError && bankPayload?.message)
                  }
                />
              </Grid>
              <Divider sx={styles.dividerStyles} />
              {associationDetailsById?.associationDetails && (
                <AjAdress
                  submit={isSubmit}
                  data={getAddressData}
                  isDisable={!edit}
                  reset={cancel}
                  customStyle={commonStyles.marginTop20}
                  defaultAddressLine1={
                    associationDetailsById?.associationDetails?.address_1
                  }
                  defaultAddressLine2={
                    associationDetailsById?.associationDetails?.address_2
                  }
                  defaultCity={associationDetailsById?.associationDetails?.city}
                  defaultZipCode={
                    associationDetailsById?.associationDetails?.zip_code
                  }
                  defaultCountry={
                    associationDetailsById?.associationDetails?.country
                  }
                  defaultState={
                    associationDetailsById?.associationDetails?.state
                  }
                />
              )}
            </>
          )}
          <Grid sx={styles.btnContainer} container>
            {edit && (
              <>
                <AjButton
                  onClick={handleCancel}
                  styleData={commonStyles.cancelBtnStyle}
                  variant="outlined"
                  displayText="Cancel"
                />
                <AjButton
                  onClick={editAssociation}
                  variant="contained"
                  displayText="Save Changes"
                />
              </>
            )}
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default FarmingAssociationDetails;
