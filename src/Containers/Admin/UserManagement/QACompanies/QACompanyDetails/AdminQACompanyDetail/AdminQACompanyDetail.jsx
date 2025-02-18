import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, InputBase, useMediaQuery } from "@mui/material";
import * as _ from "lodash";
import * as moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import AjAdress from "../../../../../../Components/AjAdress/AjAdress";
import AjButton from "../../../../../../Components/AjButton";
import AjChipDropdown from "../../../../../../Components/AjChipDropdown";
import AjDocumentDownloader from "../../../../../../Components/AjDocumentDownloader";
import AjDocumentUploader from "../../../../../../Components/AjDocumentUploader";
import AjInputLabel from "../../../../../../Components/AjInputLabel";
import AjTypography from "../../../../../../Components/AjTypography";
import TableActions from "../../../../../../Components/TableActions/TableActions";

import {
  ADMIN_USER_MANAGEMENT,
  ADMIN_QA_COMPANIES,
} from "../../../../../../Routes/Routes";
import { getStatus } from "../../../../../../Services/commonService/commonService";
import AjPersonalDetails from "../../../../../../Components/AjPersonalDetails/AjPersonalDetails";
import { qaCertificateListType } from "../../../../../../Constant/AppConstant";
import { getItemListAction } from "../../../../../../Redux/SuperAdmin/MasterManagement/masterManagementActions";
import {
  editQACompanyDetailsAction,
  editQACompanyStatusAction,
  getQACompanyDetailsById,
  getQACompanyDetailsByIdAction,
} from "../../../../../../Redux/SuperAdmin/UserManagement/QACompany/qaCompanyActions";
import { ROLES } from "../../../../../../Constant/RoleConstant";
import { getUserData } from "../../../../../../Services/localStorageService";
import { commonStyles } from "../../../../../../Style/CommonStyle";
import { adminQACompanySchema } from "../../../../../../validationSchema/adminQACompanySchema";
import { styles as wareHouseStyles } from "../../../../../FarmingAssociation/WareHouses/WareHousesDetails/WareHouseDetail/WareHouseDetailStyles";
import { styles } from "../../QACompaniesStyles";
import { getProfileVerificationDataAction } from "../../../../../../Redux/common/ProfileVerification/profileVerificationActions";

const AdminQACompanyDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { id } = params;
  const roleId = getUserData().role_id;

  const [adminQACompanyCACDocument, setAdminQACompanyCACDocument] =
    useState(null);
  const [adminQACompanyPassportImage, setAdminQACompanyPassportImage] =
    useState(null);
  const [adminQACompanyCertificateValue, setAdminQACompanyCertificateValue] =
    useState([]);

  const [edit, setEdit] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [editData, setEditData] = useState({});
  const [cancel, setCancel] = useState(false);

  const qaCertificates = useSelector(
    (state) => state.masterManagement.itemList
  );
  const qaComponyDetailsById = useSelector(
    (state) => state.qaCompanyDetail.qaCompanyDetails
  );

  const isDesktop = useMediaQuery("(min-width: 600px)");

  const profileVerificationData = useSelector(
    (state) => state.profileVerification.profileVerificationData
  );
  const verificationText = profileVerificationData?.orgVerificationType[0];

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(adminQACompanySchema(verificationText)),
    mode: "onChange",
  });

  useEffect(() => {
    if (location.pathname.includes("edit")) setEdit(true);
    dispatch(getItemListAction(qaCertificateListType));
    dispatch(getQACompanyDetailsByIdAction(id));
    return () => {
      dispatch(getQACompanyDetailsById({}));
    };
  }, [id]);

  useEffect(() => {
    if (qaComponyDetailsById?.personalDetails)
      dispatch(
        getProfileVerificationDataAction({
          countryId: qaComponyDetailsById?.personalDetails?.country_id,
        })
      );
  }, [qaComponyDetailsById]);

  useEffect(() => {
    const adminQACompnayCertificateItems = [];
    adminQACompanyCertificateValue.map((item) => {
      adminQACompnayCertificateItems.push(
        _.find(qaCertificates.result, { name: item }).id
      );
    });
    setValue(
      "adminQACompanyCertificationType",
      adminQACompnayCertificateItems,
      {
        shouldValidate: true,
      }
    );

    if (adminQACompanyCACDocument !== null) {
      setValue("associationDetailCACDocument", adminQACompanyCACDocument?.id, {
        shouldValidate: true,
      });
    }
    if (adminQACompanyPassportImage != null) {
      setValue(
        "associationDetailPassportPhoto",
        adminQACompanyPassportImage?.id,
        {
          shouldValidate: true,
        }
      );
    }
  }, [
    adminQACompanyCACDocument,
    adminQACompanyPassportImage,
    adminQACompanyCertificateValue,
  ]);

  const updateValues = () => {
    setValue(
      "adminQaCompanyName",
      qaComponyDetailsById?.qaCompanyDetails?.company_name
    );
    setValue(
      "adminQaComonayRegisrationNumber",
      qaComponyDetailsById?.qaCompanyDetails?.registration_number
    );
    setValue(
      "orgVerificationNumber",
      qaComponyDetailsById?.qaCompanyDetails?.org_verification_number
    );
    if (
      qaCertificates?.result &&
      qaComponyDetailsById?.qaCompanyDetails?.certificates
    ) {
      updateCertificateValue();
    }
    setAdminQACompanyCACDocument({
      file_name: qaComponyDetailsById?.qaCompanyDetails?.file_name,
      id: qaComponyDetailsById?.qaCompanyDetails?.cac_document,
    });
    setAdminQACompanyPassportImage({
      file_name: qaComponyDetailsById?.personalDetails?.file_name,
      id: qaComponyDetailsById?.personalDetails?.passport_photo_id,
    });
  };

  const updateCertificateValue = () => {
    if (qaComponyDetailsById?.qaCompanyDetails?.certificates) {
      const productItems = [];
      qaComponyDetailsById.qaCompanyDetails.certificates.map((item) => {
        productItems.push(_.find(qaCertificates.result, { id: item }).name);
      });
      setAdminQACompanyCertificateValue(productItems);
    }
  };

  useEffect(() => {
    updateValues();
  }, [qaComponyDetailsById, qaCertificates?.result]);

  useEffect(() => {
    const { adminQACompanyAddressData, adminQACompanyPersonalData } = editData;
    if (adminQACompanyAddressData && adminQACompanyPersonalData) {
      handleSubmit(onSubmit)();
    }
  }, [editData]);

  const onChangeCertificateHandler = (event) => {
    const {
      target: { value },
    } = event;
    setAdminQACompanyCertificateValue(value);
  };

  const handleDelete = (value) => {
    setAdminQACompanyCertificateValue(
      adminQACompanyCertificateValue.filter((name) => name !== value)
    );
  };

  const changeCACDocAdminQACompanyData = (e) => {
    e.preventDefault();
    setAdminQACompanyCACDocument("");
  };

  const uploadCACAdminQACompanyDoc = (data) => {
    setAdminQACompanyCACDocument(data);
  };

  const passportUploadAdminQACompany = (data) => {
    setAdminQACompanyPassportImage(data);
  };

  const changePassportImageAdminQACompany = (e) => {
    e.preventDefault();
    setAdminQACompanyPassportImage("");
  };

  const editDataRef = useRef(editData);

  const updateState = (newState) => {
    editDataRef.current = newState;
    setEditData(newState);
    setIsSubmit(false);
  };
  const adminQaCompanies = () => {
    const submitData = getValues([
      "adminQaCompanyName",
      "adminQACompanyCertificationType",
    ]);
    if (submitData[0] === "" || submitData[1].length < 1) {
      handleSubmit(onSubmit)();
    }
    setIsSubmit(true);
  };
  const getAddressData = (data) => {
    updateState({ ...editDataRef.current, adminQACompanyAddressData: data });
  };

  const getPersonalDetails = (data) => {
    updateState({ ...editDataRef.current, adminQACompanyPersonalData: data });
  };

  const onSubmit = (data) => {
    const { adminQACompanyAddressData, adminQACompanyPersonalData } = editData;
    if (!adminQACompanyAddressData || !adminQACompanyPersonalData) {
      return;
    }
    const qaCompanyData = {
      firstName: adminQACompanyPersonalData.firstName,
      lastName: adminQACompanyPersonalData.lastName,
      gender: adminQACompanyPersonalData.gender,
      dateOfBirth: moment(adminQACompanyPersonalData.dateOfBirth),
      companyName: data.adminQaCompanyName,
      registrationNumber: data.adminQaComonayRegisrationNumber,
      orgVerificationNumber: data.orgVerificationNumber,
      orgVerificationType: verificationText,
      certificates: data.adminQACompanyCertificationType,
      addressLine1: adminQACompanyAddressData.addressLine1,
      addressLine2: adminQACompanyAddressData.addressLine2,
      country: parseInt(adminQACompanyAddressData.country),
      countryId: parseInt(qaComponyDetailsById?.personalDetails?.country_id),
      state: parseInt(adminQACompanyAddressData.state),
      city: adminQACompanyAddressData.city,
      zipCode: parseInt(adminQACompanyAddressData.zipCode),
    };
    if (data.associationDetailCACDocument) {
      qaCompanyData["cacDocumentId"] = parseInt(
        data.associationDetailCACDocument
      );
    }
    if (data.associationDetailPassportPhoto) {
      qaCompanyData["passportPhotoId"] = parseInt(
        data.associationDetailPassportPhoto
      );
    }
    dispatch(editQACompanyDetailsAction(id, qaCompanyData));
    setEdit(false);
    navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_QA_COMPANIES}`);
  };
  const handleEdit = () => {
    setEdit(true);
    setCancel(false);
    navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_QA_COMPANIES}/edit/${id}`);
  };

  const handleCancel = () => {
    setEdit(false);
    setCancel(true);
    clearErrors();
    updateValues();
    navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_QA_COMPANIES}/detail/${id}`);
  };

  const options = [
    {
      name: "Active",
      actionClickHandler: (userId) =>
        dispatch(editQACompanyStatusAction(userId, "ACTIVE")),
    },
    {
      name: "Inactive",
      actionClickHandler: (userId) =>
        dispatch(editQACompanyStatusAction(userId, "INACTIVE")),
    },
    {
      name: "On Hold",
      actionClickHandler: (userId) =>
        dispatch(editQACompanyStatusAction(userId, "ONHOLD")),
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
      <Box
        sx={{
          ...wareHouseStyles.statusEditContainer,
          ...styles.adminQaEditContainer,
        }}
      >
        <Box
          sx={{
            ...styles.qaCompanyEmailPhoneContainer,
            ...(!edit &&
              ROLES.SUPER_ADMIN === roleId &&
              styles.shiftAdminContainer),
          }}
        >
          <Box sx={styles.responsiveEmailPhone}>
            <AjTypography
              align="center"
              styleData={commonStyles.inputLabel}
              displayText="Email"
            />
            <AjTypography
              align="center"
              styleData={{
                ...commonStyles.subHeadingColor,
                ...commonStyles.textEllipsis,
              }}
              displayText={qaComponyDetailsById?.personalDetails?.email}
            />
          </Box>
          <Box sx={styles.responsiveEmailPhone}>
            <AjTypography
              align="center"
              styleData={commonStyles.inputLabel}
              displayText="Phone Number"
            />
            <AjTypography
              align="center"
              styleData={{
                ...commonStyles.subHeadingColor,
                ...commonStyles.textEllipsis,
              }}
              displayText={`+${qaComponyDetailsById?.personalDetails?.phone_code} ${qaComponyDetailsById?.personalDetails?.mobile_no}`}
            />
          </Box>
        </Box>
        <Box sx={!isDesktop && styles.editQACompanyBtn}>
          {!edit && ROLES.SUPER_ADMIN === roleId && (
            <AjButton
              onClick={handleEdit}
              styleData={{
                ...wareHouseStyles.wareHouseDetailEditBtn,
                ...styles.adminEditBtn,
              }}
              variant="outlined"
              displayText="Edit Details"
            />
          )}
        </Box>
      </Box>
      <Box sx={wareHouseStyles.statusUpdate}>
        <AjTypography
          align="center"
          styleData={commonStyles.inputLabel}
          displayText="Status"
        />
        <TableActions
          isReadOnly={!edit}
          options={options}
          id={id}
          isActive={getStatus(qaComponyDetailsById?.personalDetails?.status)}
        />
      </Box>
      <Box sx={isDesktop && styles.editQACompanyBtn}>
        {!edit && ROLES.SUPER_ADMIN === roleId && (
          <AjButton
            onClick={handleEdit}
            styleData={wareHouseStyles.wareHouseDetailEditBtn}
            variant="outlined"
            displayText="Edit Details"
          />
        )}
      </Box>
      <Box sx={commonStyles.signupContentContainer}>
        <Box component="form" sx={commonStyles.signupFormContainer}>
          {qaComponyDetailsById?.personalDetails && (
            <AjPersonalDetails
              submit={isSubmit}
              reset={cancel}
              isDisable={!edit}
              data={getPersonalDetails}
              defaultFirstName={
                qaComponyDetailsById?.personalDetails?.first_name
              }
              defaultLastName={qaComponyDetailsById?.personalDetails?.last_name}
              defaultGender={qaComponyDetailsById?.personalDetails?.gender}
              defaultDateOfBirth={
                qaComponyDetailsById?.personalDetails?.date_of_birth
              }
            />
          )}
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
            {adminQACompanyPassportImage && adminQACompanyPassportImage.id ? (
              <AjDocumentDownloader
                docId={adminQACompanyPassportImage.id}
                docName={adminQACompanyPassportImage.file_name}
                showIcon={true}
                readOnly={!edit}
                displayText="Change Photo"
                changeDocument={changePassportImageAdminQACompany}
              />
            ) : (
              <AjDocumentUploader
                type="image"
                docType="PASSPORT_PHOTO"
                readOnly={!edit}
                onUpload={passportUploadAdminQACompany}
              />
            )}
            <AjTypography styleData={commonStyles.errorText} />
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
            {adminQACompanyCACDocument && adminQACompanyCACDocument.id ? (
              <AjDocumentDownloader
                docId={adminQACompanyCACDocument.id}
                docName={adminQACompanyCACDocument.file_name}
                showIcon={true}
                readOnly={!edit}
                changeDocument={changeCACDocAdminQACompanyData}
              />
            ) : (
              <AjDocumentUploader
                type="image"
                docType="CAC_PHOTO"
                readOnly={!edit}
                onUpload={uploadCACAdminQACompanyDoc}
              />
            )}
            <AjTypography styleData={commonStyles.errorText} />
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
              readOnly={!edit}
              placeholder="Enter QA company name"
              sx={{
                ...commonStyles.inputStyle,
                ...(!edit && commonStyles.disableInput),
              }}
              {...register("adminQaCompanyName")}
              error={errors.adminQaCompanyName ? true : false}
            />
            <AjTypography
              styleData={commonStyles.errorText}
              displayText={errors.adminQaCompanyName?.message}
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
              readOnly={!edit}
              placeholder="Enter QA company registration number"
              sx={{
                ...commonStyles.inputStyle,
                ...(!edit && commonStyles.disableInput),
              }}
              {...register("adminQaComonayRegisrationNumber")}
              error={errors.addQaCompanyName ? true : false}
            />
            <AjTypography
              styleData={commonStyles.errorText}
              displayText={errors.adminQaComonayRegisrationNumber?.message}
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
              readOnly={!edit}
              placeholder={`Enter ${verificationText} number`}
              sx={{
                ...commonStyles.inputStyle,
                ...(!edit && commonStyles.disableInput),
              }}
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
              styleData={commonStyles.inputLabel}
            />
            <AjChipDropdown
              isReadOnly={!edit}
              sx={{
                ...commonStyles.multiSelectChipDropDown,
                ...(!edit && commonStyles.disableInput),
              }}
              fullWidth
              options={qaCertificates?.result}
              source="name"
              value={adminQACompanyCertificateValue}
              onChange={onChangeCertificateHandler}
              onDelete={handleDelete}
            />
            <AjTypography
              styleData={commonStyles.errorText}
              displayText={errors.adminQACompanyCertificationType?.message}
            />
          </Box>
          {qaComponyDetailsById?.personalDetails && (
            <AjAdress
              submit={isSubmit}
              isDisable={!edit}
              zipCodeRequired
              reset={cancel}
              data={getAddressData}
              defaultAddressLine1={
                qaComponyDetailsById?.qaCompanyDetails?.address_1
              }
              defaultAddressLine2={
                qaComponyDetailsById?.qaCompanyDetails?.address_2
              }
              defaultCity={qaComponyDetailsById?.qaCompanyDetails?.city}
              defaultZipCode={qaComponyDetailsById?.qaCompanyDetails?.zip_code}
              defaultCountry={qaComponyDetailsById?.qaCompanyDetails?.country}
              defaultState={qaComponyDetailsById?.qaCompanyDetails?.state}
            />
          )}
        </Box>
        <Grid
          sx={{
            ...commonStyles.centerContainerContent,
            ...styles.adminQAComapanyBtn,
          }}
        >
          {edit && (
            <>
              <AjButton
                onClick={handleCancel}
                styleData={commonStyles.cancelBtnStyle}
                variant="outlined"
                displayText="Cancel"
              />
              <AjButton
                onClick={adminQaCompanies}
                variant="contained"
                displayText="Save Changes"
              />
            </>
          )}
        </Grid>
      </Box>
    </Grid>
  );
};

export default AdminQACompanyDetail;
