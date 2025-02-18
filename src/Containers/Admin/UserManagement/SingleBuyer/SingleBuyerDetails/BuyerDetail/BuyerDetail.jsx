import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Box, Divider, Grid, useMediaQuery } from "@mui/material";
import * as moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import AjAdress from "../../../../../../Components/AjAdress/AjAdress";
import AjButton from "../../../../../../Components/AjButton";
import AjEmploymentDetails from "../../../../../../Components/AjEmploymentDetails/AjEmploymentDetails";
import AjPersonalDetails from "../../../../../../Components/AjPersonalDetails/AjPersonalDetails";
import AjTypography from "../../../../../../Components/AjTypography";
import AjUploadCACDocument from "../../../../../../Components/AjUploadCACDocument/AjUploadCACDocument";
import TableActions from "../../../../../../Components/TableActions/TableActions";

import { useNavigate } from "react-router-dom";
import { ROLES } from "../../../../../../Constant/RoleConstant";
import {
  editSingleBuyerDetailsAction,
  editSingleBuyerStatusAction,
  getSingleBuyerDetailsById,
  getSingleBuyerDetailsByIdAction,
} from "../../../../../../Redux/SuperAdmin/UserManagement/SingleBuyer/singleBuyerActions";
import {
  ADMIN_SINGLE_BUYER,
  ADMIN_USER_MANAGEMENT,
} from "../../../../../../Routes/Routes";
import {
  getPhoneCodeSymbol,
  getStatus,
  replaceWithUnderScore,
} from "../../../../../../Services/commonService/commonService";
import { getUserData } from "../../../../../../Services/localStorageService";
import { commonStyles } from "../../../../../../Style/CommonStyle";
import { styles as wareHouseStyles } from "../../../../../FarmingAssociation/WareHouses/WareHousesDetails/WareHouseDetail/WareHouseDetailStyles";
import { styles as qaCompanyStyles } from "../../../QACompanies/QACompaniesStyles";

const BuyerDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const roleId = getUserData().role_id;
  const isDesktop = useMediaQuery("(min-width: 600px)");
  const { id } = params;

  const singleBuyerDetailsById = useSelector(
    (state) => state.singleBuyer.singleBuyerDetails
  );

  const [edit, setEdit] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [singleBuyerEditData, setSingleBuyerEditData] = useState({});

  useEffect(() => {
    if (location.pathname.includes("edit")) setEdit(true);
    dispatch(getSingleBuyerDetailsByIdAction(id));
    return () => {
      dispatch(getSingleBuyerDetailsById({}));
    };
  }, [id]);

  useEffect(() => {
    const {
      singleBuyerPersonalDataByAdmin,
      singleBuyerPassportPhotoDetailsByAdmin,
      singleBuyerEmploymentDetailsByAdmin,
      singleBuyerAddressDataByAdmin,
    } = singleBuyerEditData;
    if (
      singleBuyerPersonalDataByAdmin &&
      singleBuyerPassportPhotoDetailsByAdmin &&
      singleBuyerEmploymentDetailsByAdmin &&
      singleBuyerAddressDataByAdmin
    ) {
      adminSingleBuyerSubmitHandler();
    }
  }, [singleBuyerEditData]);

  const singleBuyerRef = useRef(singleBuyerEditData);

  const updateState = (newState) => {
    singleBuyerRef.current = newState;
    setSingleBuyerEditData(newState);
    setIsSubmit(false);
  };

  const adminSingleBuyerSaveHandler = () => {
    setIsSubmit(true);
  };

  const getBuyerPersonalDetailByAdmin = (data) => {
    updateState({
      ...singleBuyerRef.current,
      singleBuyerPersonalDataByAdmin: data,
    });
  };

  const getBuyerPassportPhotoDetailsByAdmin = (data) => {
    updateState({
      ...singleBuyerRef.current,
      singleBuyerPassportPhotoDetailsByAdmin: data,
    });
  };

  const getBuyerEmploymentDetailsByAdmin = (data) => {
    updateState({
      ...singleBuyerRef.current,
      singleBuyerEmploymentDetailsByAdmin: data,
    });
  };

  const getBuyerAddressDataByAdmin = (data) => {
    updateState({
      ...singleBuyerRef.current,
      singleBuyerAddressDataByAdmin: data,
    });
  };

  const handleEdit = () => {
    setEdit(true);
    setCancel(false);
    navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_SINGLE_BUYER}/edit/${id}`);
  };

  const handleCancel = () => {
    setEdit(false);
    setCancel(true);
    navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_SINGLE_BUYER}/detail/${id}`);
  };

  const adminSingleBuyerSubmitHandler = () => {
    const {
      singleBuyerPersonalDataByAdmin,
      singleBuyerPassportPhotoDetailsByAdmin,
      singleBuyerEmploymentDetailsByAdmin,
      singleBuyerAddressDataByAdmin,
    } = singleBuyerEditData;
    if (
      !singleBuyerPersonalDataByAdmin ||
      !singleBuyerPassportPhotoDetailsByAdmin ||
      !singleBuyerEmploymentDetailsByAdmin ||
      !singleBuyerAddressDataByAdmin
    )
      return;
    const singleBuyerEditedData = {
      firstName: singleBuyerPersonalDataByAdmin.firstName,
      lastName: singleBuyerPersonalDataByAdmin.lastName,
      gender: singleBuyerPersonalDataByAdmin.gender,
      dateOfBirth: moment(singleBuyerPersonalDataByAdmin.dateOfBirth),
      passportPhotoId: parseInt(
        singleBuyerPassportPhotoDetailsByAdmin.CACDocument
      ),
      employmentType: singleBuyerEmploymentDetailsByAdmin.employmentTypeToSend,
      experience: singleBuyerEmploymentDetailsByAdmin.experience,
      countryOfBirth: parseInt(
        singleBuyerEmploymentDetailsByAdmin.countryOfBirth
      ),
      citizenship: parseInt(singleBuyerEmploymentDetailsByAdmin.citizenship),
      taxCountry: parseInt(singleBuyerEmploymentDetailsByAdmin.countryOfTax),
      uinTypeValue: replaceWithUnderScore(singleBuyerEmploymentDetailsByAdmin.UinPinTypeToSend),
      uniqueIdentificationNumber:
        singleBuyerEmploymentDetailsByAdmin.uniqueIdentificationNumber,
      taxId: parseInt(singleBuyerEmploymentDetailsByAdmin?.taxId),
      addressLine1: singleBuyerAddressDataByAdmin.addressLine1,
      addressLine2: singleBuyerAddressDataByAdmin.addressLine2,
      countryId: parseInt(singleBuyerAddressDataByAdmin.country),
      stateId: parseInt(singleBuyerAddressDataByAdmin.state),
      zipCode: parseInt(singleBuyerAddressDataByAdmin.zipCode),
    };
    dispatch(editSingleBuyerDetailsAction(id, singleBuyerEditedData));
    setEdit(false);
    navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_SINGLE_BUYER}`);
  };

  const options = [
    {
      name: "Active",
      actionClickHandler: (userId) =>
        dispatch(editSingleBuyerStatusAction(userId, "ACTIVE")),
    },
    {
      name: "Inactive",
      actionClickHandler: (userId) =>
        dispatch(editSingleBuyerStatusAction(userId, "INACTIVE")),
    },
    {
      name: "On Hold",
      actionClickHandler: (userId) =>
        dispatch(editSingleBuyerStatusAction(userId, "ONHOLD")),
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
      {singleBuyerDetailsById?.personalDetails && (
        <>
          <Box
            sx={{
              ...wareHouseStyles.statusEditContainer,
              ...qaCompanyStyles.adminQaEditContainer,
            }}
          >
            <Box
              sx={{
                ...qaCompanyStyles.qaCompanyEmailPhoneContainer,
                ...(!edit &&
                  ROLES.SUPER_ADMIN === roleId &&
                  qaCompanyStyles.shiftAdminContainer),
              }}
            >
              <Box sx={qaCompanyStyles.responsiveEmailPhone}>
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
                  displayText={singleBuyerDetailsById?.personalDetails?.email}
                />
              </Box>
              <Box sx={qaCompanyStyles.responsiveEmailPhone}>
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
                  displayText={`${getPhoneCodeSymbol(
                    singleBuyerDetailsById?.personalDetails?.phone_code
                  )} ${singleBuyerDetailsById?.personalDetails?.mobile_no}`}
                />
              </Box>
            </Box>
            <Box sx={!isDesktop && qaCompanyStyles.editQACompanyBtn}>
              {!edit && ROLES.SUPER_ADMIN === roleId && (
                <AjButton
                  onClick={handleEdit}
                  styleData={{
                    ...wareHouseStyles.wareHouseDetailEditBtn,
                    ...qaCompanyStyles.adminEditBtn,
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
              isActive={getStatus(
                singleBuyerDetailsById?.personalDetails?.status
              )}
            />
          </Box>
          <Box sx={isDesktop && qaCompanyStyles.editQACompanyBtn}>
            {!edit && ROLES.SUPER_ADMIN === roleId && (
              <AjButton
                onClick={handleEdit}
                styleData={wareHouseStyles.wareHouseDetailEditBtn}
                variant="outlined"
                displayText="Edit Details"
              />
            )}
          </Box>
        </>
      )}
      <Box
        sx={{
          ...commonStyles.signupContentContainer,
          ...commonStyles.marginTop0,
        }}
      >
        <Box component="form" sx={commonStyles.signupFormContainer}>
          {singleBuyerDetailsById?.personalDetails && (
            <>
              <AjPersonalDetails
                reset={cancel}
                submit={isSubmit}
                isDisable={!edit}
                data={getBuyerPersonalDetailByAdmin}
                defaultFirstName={
                  singleBuyerDetailsById.personalDetails?.first_name
                }
                defaultLastName={
                  singleBuyerDetailsById.personalDetails?.last_name
                }
                defaultGender={singleBuyerDetailsById.personalDetails?.gender}
                defaultDateOfBirth={
                  singleBuyerDetailsById.personalDetails?.date_of_birth
                }
              />
              <AjUploadCACDocument
                reset={cancel}
                data={getBuyerPassportPhotoDetailsByAdmin}
                edit={edit}
                label="Passport photo: (JPEG, PNG or PDF only)"
                error="Passport photo is required"
                docType="PASSPORT_PHOTO"
                submit={isSubmit}
                defaultCACDocument={{
                  id: singleBuyerDetailsById.personalDetails?.passport_photo_id,
                  file_name: singleBuyerDetailsById.personalDetails?.file_name,
                }}
                documentRequired={true}
                isDisable={!edit}
              />
            </>
          )}
          <Divider sx={commonStyles.dividerStyle} />
          {singleBuyerDetailsById?.buyerDetails && (
            <>
              <AjEmploymentDetails
                data={getBuyerEmploymentDetailsByAdmin}
                reset={cancel}
                isDisable={!edit}
                adminTaxIdNoOptions
                submit={isSubmit}
                defaultEmploymentType={
                  singleBuyerDetailsById.buyerDetails?.employment_type
                }
                defaultExperience={
                  singleBuyerDetailsById.buyerDetails?.experience
                }
                defaultCountryOfBirth={
                  singleBuyerDetailsById.buyerDetails?.country_of_birth
                }
                defaultCitizenship={
                  singleBuyerDetailsById.buyerDetails?.citizenship
                }
                defaultCountryOfTax={
                  singleBuyerDetailsById.buyerDetails?.tax_country
                }
                defaultUINPinType={
                  singleBuyerDetailsById.buyerDetails?.uin_type
                }
                defaultUniqueIdentificationNumber={
                  singleBuyerDetailsById.buyerDetails?.uin
                }
                countryId={singleBuyerDetailsById?.personalDetails?.country_id}
                defaultTaxId={singleBuyerDetailsById.buyerDetails?.tax_id}
                resetEmpTypeInitialValue
                resetUINTypeInitialValue
              />
              <Divider sx={commonStyles.dividerStyle} />
              <AjAdress
                data={getBuyerAddressDataByAdmin}
                submit={isSubmit}
                reset={cancel}
                isDisable={!edit}
                defaultAddressLine1={
                  singleBuyerDetailsById.buyerDetails?.address_1
                }
                defaultAddressLine2={
                  singleBuyerDetailsById.buyerDetails?.address_2
                }
                defaultCity={singleBuyerDetailsById.buyerDetails?.city}
                defaultZipCode={singleBuyerDetailsById.buyerDetails?.zip_code}
                defaultCountry={singleBuyerDetailsById.buyerDetails?.country}
                defaultState={singleBuyerDetailsById.buyerDetails?.state}
              />
            </>
          )}
          <Grid
            sx={{
              ...commonStyles.centerContainerContent,
              ...commonStyles.fullWidth,
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
                  onClick={adminSingleBuyerSaveHandler}
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

export default BuyerDetail;
