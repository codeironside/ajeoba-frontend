import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Box, Divider, Grid, IconButton, InputBase } from "@mui/material";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import AjAdress from "../../../../../../Components/AjAdress/AjAdress";
import AjButton from "../../../../../../Components/AjButton";
import AjDocumentDownloader from "../../../../../../Components/AjDocumentDownloader";
import AjDocumentUploader from "../../../../../../Components/AjDocumentUploader";
import AjInputLabel from "../../../../../../Components/AjInputLabel";
import AjPersonalDetails from "../../../../../../Components/AjPersonalDetails/AjPersonalDetails";
import AjTypography from "../../../../../../Components/AjTypography";
import TableActions from "../../../../../../Components/TableActions/TableActions";

import { ROLES } from "../../../../../../Constant/RoleConstant";
import { getProfileVerificationDataAction } from "../../../../../../Redux/common/ProfileVerification/profileVerificationActions";
import {
  editCorporateDetails,
  editCorporateStatusAction,
  getCorporateDetailsById,
  getCorporateDetailsByIdAction
} from "../../../../../../Redux/SuperAdmin/UserManagement/CorporateBuyer/corporateBuyerActions";
import {
  ADMIN_CORPORATE_BUYER,
  ADMIN_USER_MANAGEMENT
} from "../../../../../../Routes/Routes";
import {
  getPhoneCodeSymbol,
  getStatus
} from "../../../../../../Services/commonService/commonService";
import { getUserData } from "../../../../../../Services/localStorageService";
import { commonStyles } from "../../../../../../Style/CommonStyle";
import { DetailCorporateBuyer } from "../../../../../../validationSchema/detailCorporateBuyerSchema";
import styles from "./CorporateBuyerDetailStyles";

function CorporateBuyerDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const { id } = params;
  const roleId = getUserData().role_id;

  const [editState, setEditState] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [passportImage, setPassportImage] = useState(null);
  const [CACDocument, setCACDocument] = useState(null);
  const [editData, setEditData] = useState({});

  const editDataRef = useRef(editData);

  const corporateBuyerDetail = useSelector(
    (state) => state.corporateBuyer.corporateDetails
  );

  const profileVerificationData = useSelector(
    (state) => state.profileVerification.profileVerificationData
  );
  const verificationText = profileVerificationData?.orgVerificationType[0];

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(DetailCorporateBuyer(verificationText)),
    mode: "onChange",
  });

  useEffect(() => {
    if (corporateBuyerDetail?.personalDetails)
      dispatch(
        getProfileVerificationDataAction({
          countryId: corporateBuyerDetail?.personalDetails?.country_id,
        })
      );
  }, [corporateBuyerDetail]);

  useEffect(() => {
    dispatch(getCorporateDetailsByIdAction(id));
    if (location.pathname.includes("edit")) {
      setEditState(true);
    }
    return () => {
      dispatch(getCorporateDetailsById({}));
    };
  }, [id]);

  useEffect(() => {
    const { addressData, personalData } = editData;
    if (addressData && personalData) {
      handleSubmit(onSubmit)();
      setEditState(false);
    }
  }, [editData]);

  const updateState = (newState) => {
    editDataRef.current = newState;
    setEditData(newState);
    setIsSubmit(false);
  };

  useEffect(() => {
    if (CACDocument !== null) {
      setValue("corporateBuyerDetailCACDocument", CACDocument?.id, {
        shouldValidate: true,
      });
    }

    if (passportImage != null) {
      setValue("corporateBuyerDetailPassportPhoto", passportImage?.id, {
        shouldValidate: true,
      });
    }
  }, [CACDocument, passportImage]);

  useEffect(() => {
    setValue(
      "corporateBuyerDetailName",
      corporateBuyerDetail?.corporateBuyerDetails?.corporate_name
    );
    setValue(
      "corporateBuyerDetailRegNumber",
      corporateBuyerDetail?.corporateBuyerDetails?.corporate_registration_number
    );
    setValue(
      "orgVerificationNumber",
      corporateBuyerDetail?.corporateBuyerDetails?.org_verification_number
    );
    setCACDocument({
      file_name: corporateBuyerDetail?.corporateBuyerDetails?.file_name,
      id: corporateBuyerDetail?.corporateBuyerDetails?.cac_document,
    });

    setPassportImage({
      file_name: corporateBuyerDetail?.personalDetails?.file_name,
      id: corporateBuyerDetail?.personalDetails?.passport_photo_id,
    });
  }, [
    corporateBuyerDetail?.personalDetails,
    corporateBuyerDetail?.corporateBuyerDetails,
  ]);

  const getAddressData = (data) => {
    updateState({ ...editDataRef.current, addressData: data });
  };

  const getPersonalDetails = (data) => {
    updateState({ ...editDataRef.current, personalData: data });
  };

  const onSubmit = (data) => {
    const { addressData, personalData } = editData;

    if (!addressData || !personalData) {
      return;
    }
    let requiredData = {
      corporateName: data.corporateBuyerDetailName,
      registrationNumber: data.corporateBuyerDetailRegNumber,
      orgVerificationNumber: data.orgVerificationNumber,
      orgVerificationType: verificationText,
      cacDocumentId: parseInt(data.corporateBuyerDetailCACDocument),
      addressLine1: addressData.addressLine1,
      addressLine2: addressData.addressLine2,
      country: parseInt(addressData.country),
      countryId: parseInt(corporateBuyerDetail?.personalDetails?.country_id),
      stateId: parseInt(addressData.state),
      city: addressData.city,
      zipCode: parseInt(addressData.zipCode),
      firstName: personalData.firstName,
      lastName: personalData.lastName,
      gender: personalData.gender,
      dateOfBirth: moment(personalData.dateOfBirth).toISOString(true),
      passportPhotoId: parseInt(data.corporateBuyerDetailPassportPhoto),
    };
    dispatch(editCorporateDetails(id, requiredData, navigate, setEditState));
    setIsSubmit(false);
  };

  const editCorporate = () => {
    setIsSubmit(true);
  };

  const passportUpload = (data) => {
    setPassportImage(data);
  };

  const changePassportImage = (e) => {
    e.preventDefault();
    setPassportImage("");
  };

  const changeCACImageData = (e) => {
    e.preventDefault();
    setCACDocument("");
  };

  const uploadCACImage = (data) => {
    setCACDocument(data);
  };

  const options = [
    {
      name: "Active",
      actionClickHandler: (userId) =>
        dispatch(editCorporateStatusAction(userId, "ACTIVE")),
    },
    {
      name: "Inactive",
      actionClickHandler: (userId) =>
        dispatch(editCorporateStatusAction(userId, "INACTIVE")),
    },
    {
      name: "On Hold",
      actionClickHandler: (userId) =>
        dispatch(editCorporateStatusAction(userId, "ONHOLD")),
    },
  ];

  const handleCancel = (e, value) => {
    setEditState(false);
    setCancel(true);
    clearErrors();
    setValue(
      "corporateBuyerDetailName",
      corporateBuyerDetail?.corporateBuyerDetails?.corporate_name
    );
    setValue(
      "corporateBuyerDetailRegNumber",
      corporateBuyerDetail?.corporateBuyerDetails?.corporate_registration_number
    );
    setValue(
      "orgVerificationNumber",
      corporateBuyerDetail?.corporateBuyerDetails?.org_verification_number
    );
    setCACDocument({
      file_name: corporateBuyerDetail?.corporateBuyerDetails?.file_name,
      id: corporateBuyerDetail?.corporateBuyerDetails?.cac_document,
    });
    setPassportImage({
      file_name: corporateBuyerDetail?.personalDetails?.file_name,
      id: corporateBuyerDetail?.personalDetails?.passport_photo_id,
    });
    navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_CORPORATE_BUYER}/detail/${id}`);
  };

  const handleEditState = () => {
    setEditState(true);
    setCancel(false);
    navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_CORPORATE_BUYER}/edit/${id}`);
  };
  const backArrowHandler = () => {
    navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_CORPORATE_BUYER}`);
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
                displayText={`${corporateBuyerDetail?.personalDetails?.email}`}
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
                  corporateBuyerDetail?.personalDetails?.phone_code
                )} ${corporateBuyerDetail?.personalDetails?.mobile_no}`}
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
                isActive={getStatus(
                  corporateBuyerDetail?.personalDetails?.status
                )}
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
            {corporateBuyerDetail?.personalDetails && (
              <AjPersonalDetails
                isDisable={!editState}
                data={getPersonalDetails}
                reset={cancel}
                submit={isSubmit}
                defaultFirstName={
                  corporateBuyerDetail?.personalDetails?.first_name
                }
                defaultLastName={
                  corporateBuyerDetail?.personalDetails?.last_name
                }
                defaultGender={corporateBuyerDetail?.personalDetails?.gender}
                defaultDateOfBirth={
                  corporateBuyerDetail?.personalDetails?.date_of_birth
                }
              />
            )}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <AjInputLabel
                displayText="Passport Photo: (JPEG, PNG or PDF only)"
                id="corporateBuyerDetailPassportPhoto"
                name="corporateBuyerDetailPassportPhoto"
                required
                styleData={commonStyles.inputLabel}
              />
              {passportImage && passportImage.id ? (
                <AjDocumentDownloader
                  docId={passportImage.id}
                  docName={passportImage.file_name}
                  changeBtnStyle={!editState && styles.changeDownloadBtnStyle}
                  changeDocument={changePassportImage}
                  readOnly={!editState}
                  displayText="Change Photo"
                  showIcon={true}
                />
              ) : (
                <AjDocumentUploader
                  type="image"
                  docType="PASSPORT_PHOTO"
                  onUpload={passportUpload}
                  readOnly={!editState}
                />
              )}
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={
                  editState && errors.corporateBuyerDetailPassportPhoto?.message
                }
              />
            </Grid>

            <Divider sx={styles.dividerStyles} />
            <Grid
              container
              columnSpacing={"1.25rem"}
              rowSpacing={"1.25rem"}
              sx={styles.farmingsociationFieldContainer}
            >
              <Grid item xs={12} sm={12}>
                <AjInputLabel
                  displayText="Corporate buyer name"
                  required={true}
                  styleData={commonStyles.inputLabel}
                />
                <InputBase
                  required
                  id="corporateBuyerDetailName"
                  name="corporateBuyerDetailName"
                  readOnly={!editState}
                  sx={{
                    ...commonStyles.inputStyle,
                    ...(!editState && commonStyles.disableInput),
                  }}
                  {...register("corporateBuyerDetailName")}
                  error={
                    editState && errors.corporateBuyerDetailName ? true : false
                  }
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={
                    editState && errors.corporateBuyerDetailName?.message
                  }
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}>
                <AjInputLabel
                  displayText="Corporate buyer registration number"
                  required
                  styleData={commonStyles.inputLabel}
                />
                <InputBase
                  required
                  fullWidth
                  id="corporateBuyerDetailRegNumber"
                  name="corporateBuyerDetailRegNumber"
                  readOnly={!editState}
                  sx={{
                    ...commonStyles.inputStyle,
                    ...(!editState && commonStyles.disableInput),
                  }}
                  {...register("corporateBuyerDetailRegNumber")}
                  error={errors.corporateBuyerDetailRegNumber ? true : false}
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={
                    editState && errors.corporateBuyerDetailRegNumber?.message
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
                  readOnly={!editState}
                  sx={{
                    ...commonStyles.inputStyle,
                    ...(!editState && commonStyles.disableInput),
                  }}
                  {...register("orgVerificationNumber")}
                  error={errors.orgVerificationNumber ? true : false}
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={
                    editState && errors.orgVerificationNumber?.message
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} sx={styles.cacDocument}>
                <AjInputLabel
                  displayText="CAC document : (JPEG, PNG or PDF only)"
                  required
                  id="corporateBuyerDetailCACDocument"
                  name="corporateBuyerDetailCACDocument"
                  styleData={commonStyles.inputLabel}
                />
                {CACDocument && CACDocument.id ? (
                  <AjDocumentDownloader
                    docId={CACDocument.id}
                    docName={CACDocument.file_name}
                    changeDocument={changeCACImageData}
                    changeBtnStyle={!editState && styles.changeDownloadBtnStyle}
                    readOnly={!editState}
                    showIcon={true}
                  />
                ) : (
                  <AjDocumentUploader
                    type="image"
                    readOnly={!editState}
                    docType="CAC_PHOTO"
                    onUpload={uploadCACImage}
                  />
                )}
                <AjTypography
                  styleData={styles.cacDocErrorText}
                  displayText={
                    editState && errors.corporateBuyerDetailCACDocument?.message
                  }
                />
              </Grid>
            </Grid>
            <Divider sx={styles.dividerStyles} />
            {corporateBuyerDetail?.corporateBuyerDetails && (
              <AjAdress
                isDisable={!editState}
                submit={isSubmit}
                data={getAddressData}
                reset={cancel}
                defaultAddressLine1={
                  corporateBuyerDetail?.corporateBuyerDetails?.address_1
                }
                defaultAddressLine2={
                  corporateBuyerDetail?.corporateBuyerDetails?.address_2
                }
                defaultCity={corporateBuyerDetail?.corporateBuyerDetails?.city}
                defaultZipCode={
                  corporateBuyerDetail?.corporateBuyerDetails?.zip_code
                }
                defaultCountry={
                  corporateBuyerDetail?.corporateBuyerDetails?.country
                }
                defaultState={
                  corporateBuyerDetail?.corporateBuyerDetails?.state
                }
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
                    onClick={editCorporate}
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

export default CorporateBuyerDetail;
