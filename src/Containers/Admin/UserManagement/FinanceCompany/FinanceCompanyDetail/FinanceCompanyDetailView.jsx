import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, IconButton, Divider } from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import moment from "moment";

import AjTypography from "../../../../../Components/AjTypography";
import AjButton from "../../../../../Components/AjButton";
import AjPersonalDetails from "../../../../../Components/AjPersonalDetails/AjPersonalDetails";
import AjAdress from "../../../../../Components/AjAdress/AjAdress";
import TableActions from "../../../../../Components/TableActions/TableActions";
import AjUploadCACDocument from "../../../../../Components/AjUploadCACDocument/AjUploadCACDocument";
import AjCompanyDetails from "../../../../../Components/AjCompanyDetails/AjCompanyDetails";

import {
  commonStyles,
  customCommonStyles,
} from "../../../../../Style/CommonStyle";
import { ROLES } from "../../../../../Constant/RoleConstant";
import {
  getPhoneCodeSymbol,
  getStatus,
} from "../../../../../Services/commonService/commonService";
import { getUserData } from "../../../../../Services/localStorageService";
import styles from "../../CorporateBuyer/CorporateBuyerDetails/CorporateBuyerDetailView/CorporateBuyerDetailStyles";
import {
  ADMIN_FINANCE,
  ADMIN_USER_MANAGEMENT,
} from "../../../../../Routes/Routes";
import {
  getFinanceDetailsByIdAction,
  getFinanceDetailsById,
  toggleFinanceCompanyStatusAction,
  editFinanceDetails,
} from "../../../../../Redux/SuperAdmin/UserManagement/FinanceCompany/financeCompanyAction";

function FinanceCompanyDetailView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const { id } = params;
  const roleId = getUserData().role_id;

  const [editState, setEditState] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [editData, setEditData] = useState({});

  const editDataRef = useRef(editData);
  const isDoneRef = useRef(false);

  const financeDetail = useSelector(
    (state) => state.financeCompany.financeDetails
  );

  useEffect(() => {
    dispatch(getFinanceDetailsByIdAction(id));
    if (location.pathname.includes("edit")) {
      setEditState(true);
    }

    return () => {
      dispatch(getFinanceDetailsById({}));
    };
  }, [id]);

  useEffect(() => {
    const { addressData, personalData, companyData, passportData } = editData;
    if (addressData && personalData && companyData && passportData) {
      onFinalSubmit();
      setEditState(false);
    }
  }, [editData]);

  const updateState = (newState) => {
    editDataRef.current = newState;
    setEditData(newState);
    setIsSubmit(false);
  };

  const getPassportDetails = (data) =>
    updateState({ ...editDataRef.current, passportData: data });

  const getCACDetails = (data) =>
    updateState({ ...editDataRef.current, cacData: data });

  const getCompanyDetails = (data) =>
    updateState({ ...editDataRef.current, companyData: data });

  const getAddressData = (data) => {
    updateState({ ...editDataRef.current, addressData: data });
  };

  const getPersonalDetails = (data) => {
    updateState({ ...editDataRef.current, personalData: data });
  };

  const onFinalSubmit = () => {
    if (!isDoneRef.current) {
      return;
    }
    isDoneRef.current = false;
    const { addressData, personalData, companyData, passportData, cacData } =
      editData;

    if (!addressData || !personalData || !companyData || !passportData) {
      return;
    }

    let requiredData = {
      financeCompanyName: companyData.companyName,
      registrationNumber: companyData.registrationNumber,
      tinNumber: companyData.tinNumber,
      addressLine1: addressData.addressLine1,
      country: parseInt(addressData.country),
      countryId: parseInt(financeDetail?.personalDetails?.country_id),
      stateId: parseInt(addressData.state),
      city: addressData.city,
      zipCode: parseInt(addressData.zipCode),
      firstName: personalData.firstName,
      lastName: personalData.lastName,
      gender: personalData.gender,
      dateOfBirth: moment(personalData.dateOfBirth).toISOString(true),
    };
    if (cacData?.CACDocument) {
      requiredData["cacDocumentId"] = parseInt(cacData?.CACDocument);
    }
    if (addressData?.addressLine2) {
      requiredData["addressLine2"] = addressData.addressLine2;
    }
    if (passportData?.CACDocument) {
      requiredData["passportPhotoId"] = parseInt(passportData.CACDocument);
    }
    if (addressData?.zipCode) {
      requiredData["zipCode"] = parseInt(addressData.zipCode);
    }
    if (companyData?.registrationNumber) {
      requiredData["registrationNumber"] = companyData.registrationNumber;
    }
    if (companyData.orgVerificationNumber)
      requiredData["orgVerificationNumber"] = companyData.orgVerificationNumber;

    if (companyData.orgVerificationNumber)
      requiredData["orgVerificationType"] =
        companyData.verificationTextRef.current;

    dispatch(editFinanceDetails(id, requiredData, navigate, setEditState));
    setIsSubmit(false);
  };

  const editFinance = () => {
    setIsSubmit(true);
    isDoneRef.current = true;
  };

  const options = [
    {
      name: "Active",
      actionClickHandler: (userId) =>
        dispatch(
          toggleFinanceCompanyStatusAction(userId, { status: "ACTIVE" })
        ),
    },
    {
      name: "Inactive",
      actionClickHandler: (userId) =>
        dispatch(
          toggleFinanceCompanyStatusAction(userId, { status: "INACTIVE" })
        ),
    },
  ];

  const handleCancel = (e, value) => {
    setEditState(false);
    setCancel(true);
    navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_FINANCE}/detail/${id}`);
  };

  const handleEditState = () => {
    setEditState(true);
    setCancel(false);
    navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_FINANCE}/edit/${id}`);
  };
  const backArrowHandler = () => {
    navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_FINANCE}`);
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
      <Grid container item sx={styles.corporateDetailsContentContainer}>
        <Box sx={[styles.headingContentContainer, styles.marginTopZero]}>
          <Grid sx={styles.corporateDetailsContainer}>
            {!editState && ROLES.SUPER_ADMIN === roleId && (
              <AjButton
                onClick={handleEditState}
                styleData={{
                  ...commonStyles.editBtn,
                  ...styles.editRespnsiveBtn,
                }}
                variant="outlined"
                displayText="Edit Details"
              />
            )}
            <Box sx={styles.corporateDetailsBoxes}>
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
                displayText={`${financeDetail?.personalDetails?.email}`}
              />
            </Box>
            <Box sx={styles.corporateDetailsBoxes}>
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
                  financeDetail?.personalDetails?.phone_code
                )} ${financeDetail?.personalDetails?.mobile_no}`}
              />
            </Box>
          </Grid>
        </Box>
        <Box sx={[commonStyles.signupContentContainer, styles.marginTopZero]}>
          <Grid>
            <Box sx={[styles.corporateDetailsBoxes]}>
              <AjTypography
                align="center"
                styleData={commonStyles.inputLabel}
                displayText="Status"
              />
              <TableActions
                isReadOnly={!editState}
                options={options}
                id={id}
                isActive={getStatus(financeDetail?.personalDetails?.status)}
              />
            </Box>
          </Grid>
          <Box
            component="form"
            sx={{
              ...commonStyles.signupFormContainer,
              ...(!editState && ROLES.ADMIN !== roleId && styles.formMarginTop),
            }}
          >
            {financeDetail?.personalDetails && (
              <AjPersonalDetails
                isDisable={!editState}
                data={getPersonalDetails}
                reset={cancel}
                submit={isSubmit}
                defaultFirstName={financeDetail?.personalDetails?.first_name}
                defaultLastName={financeDetail?.personalDetails?.last_name}
                defaultGender={financeDetail?.personalDetails?.gender}
                defaultDateOfBirth={
                  financeDetail?.personalDetails?.date_of_birth
                }
              />
            )}
            {financeDetail?.personalDetails && (
              <AjUploadCACDocument
                submit={isSubmit}
                data={getPassportDetails}
                reset={cancel}
                isDisable={!editState}
                styleData={customCommonStyles.certificateContainer}
                label={"Passport Photo: (JPEG, PNG or PDF only)"}
                error={"Passport Photo is required"}
                docType="PASSPORT_PHOTO"
                defaultCACDocument={{
                  id: financeDetail?.personalDetails?.passport_photo_id,
                  file_name: financeDetail?.personalDetails?.file_name,
                }}
              />
            )}
            <Divider sx={styles.dividerStyles} />
            {financeDetail?.financeCompanyDetails && (
              <AjCompanyDetails
                isDisable={!editState}
                submit={isSubmit}
                reset={cancel}
                data={getCompanyDetails}
                styleData={customCommonStyles.tinNumberContainer}
                companyNameLabel="Finance Company Name"
                registrationNumberLabel="Finance Company registration number"
                companyNamePlaceholder="Enter Finance Company name"
                type="Finance Company"
                registrationRequired={false}
                tinRequired={false}
                defaultCompanyName={
                  financeDetail?.financeCompanyDetails?.finance_company_name
                }
                defaultRegistrationNumber={
                  financeDetail?.financeCompanyDetails?.registration_number
                }
                defaultOrgNumber={
                  financeDetail?.financeCompanyDetails?.org_verification_number
                }
                countryId={financeDetail?.personalDetails?.country_id}
              />
            )}
            {financeDetail?.financeCompanyDetails && (
              <AjUploadCACDocument
                submit={isSubmit}
                isDisable={!editState}
                reset={cancel}
                data={getCACDetails}
                docType="CAC_PHOTO"
                styleData={customCommonStyles.certificateContainer}
                defaultCACDocument={{
                  id: financeDetail?.financeCompanyDetails?.cac_document,
                  file_name: financeDetail?.financeCompanyDetails?.file_name,
                }}
              />
            )}
            <Divider sx={styles.dividerStyles} />
            {financeDetail?.financeCompanyDetails && (
              <AjAdress
                isDisable={!editState}
                submit={isSubmit}
                data={getAddressData}
                reset={cancel}
                defaultAddressLine1={
                  financeDetail?.financeCompanyDetails?.address_1
                }
                defaultAddressLine2={
                  financeDetail?.financeCompanyDetails?.address_2
                }
                defaultCity={financeDetail?.financeCompanyDetails?.city}
                defaultZipCode={financeDetail?.financeCompanyDetails?.zip_code}
                defaultCountry={financeDetail?.financeCompanyDetails?.country}
                defaultState={financeDetail?.financeCompanyDetails?.state}
              />
            )}
            <Grid sx={styles.btnContainer} container>
              {editState && (
                <>
                  <AjButton
                    onClick={handleCancel}
                    styleData={commonStyles.cancelBtnStyle}
                    variant="outlined"
                    displayText="Cancel"
                  />
                  <AjButton
                    onClick={editFinance}
                    variant="contained"
                    displayText="Save Changes"
                  />
                </>
              )}
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default FinanceCompanyDetailView;
