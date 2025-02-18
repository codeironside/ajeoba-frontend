import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Box, Divider, Grid } from "@mui/material";
import * as _ from "lodash";
import * as moment from "moment";
import AjDetailTypography from "../../../../../../Components/AjDetailTypography/AjDetailTypography";
import AjTypography from "../../../../../../Components/AjTypography";
import TableActions from "../../../../../../Components/TableActions/TableActions";
import AjPersonalDetails from "../../../../../../Components/AjPersonalDetails/AjPersonalDetails";
import AjButton from "../../../../../../Components/AjButton";
import AjCompanyDetails from "../../../../../../Components/AjCompanyDetails/AjCompanyDetails";
import AjAdress from "../../../../../../Components/AjAdress/AjAdress";
import AjMultipleTruck from "../../../../../../Components/AjMultipleTruck/AjMultipleTruck";
import AjUploadCACDocument from "../../../../../../Components/AjUploadCACDocument/AjUploadCACDocument";
import { showToast } from "../../../../../../Services/toast";
import { ROLES } from "../../../../../../Constant/RoleConstant";
import { getUserData } from "../../../../../../Services/localStorageService";
import { styles } from "./LogisticCompanyStyles";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../../../Style/CommonStyle";
import {
  getLogisticCompanyDetailsById,
  getLogisticCompanyDetailsByIdAction,
  editLogisticCompanyAction,
  editLogisticCompanyDetails,
} from "../../../../../../Redux/common/LogisticCompany/logisticCompanyActions";
import {
  getPhoneCodeSymbol,
  getStatus,
} from "../../../../../../Services/commonService/commonService";

const LogisticCompanyDetails = () => {
  const [edit, setEdit] = useState(false);
  const [cancel, setCancel] = useState(false);

  const [selectedTrucks, setSelectedTrucks] = useState([]);
  const [logisticCompanyData, setLogisticCompanyData] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const roleId = getUserData().role_id;
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logisticCompanyDataRef = useRef(logisticCompanyData);

  const logisticCompanyDetails = useSelector(
    (state) => state.logisticCommonData.logisticCompanyDetails
  );

  useEffect(() => {
    if (logisticCompanyDetails?.claimedTruckDetails?.truckDetails)
      setSelectedTruckDetails();
  }, [logisticCompanyDetails]);

  useEffect(() => {
    dispatch(getLogisticCompanyDetailsByIdAction(id));
    if (location.pathname.includes("edit")) {
      setEdit(true);
    }
    return () => {
      dispatch(getLogisticCompanyDetailsById({}));
    };
  }, [id]);

  useEffect(() => {
    const {
      logisticCompanyPersonalDetails,
      logisticCompanyAddressDetails,
      logisticCompanyFormalDetails,
      truckDetails,
      passportPhotoDetails,
      CACDocumentDetails,
    } = logisticCompanyData;
    if (
      logisticCompanyPersonalDetails &&
      logisticCompanyAddressDetails &&
      logisticCompanyFormalDetails &&
      truckDetails &&
      passportPhotoDetails &&
      CACDocumentDetails
    ) {
      onFinalSubmit();
    }
  }, [logisticCompanyData]);

  const setSelectedTruckDetails = () => {
    if (logisticCompanyDetails?.claimedTruckDetails?.truckDetails) {
      const temporaryTruck =
        logisticCompanyDetails?.claimedTruckDetails?.truckDetails?.map(
          (truck) => ({
            truckCount: truck?.no_of_trucks,
            truckData: { id: truck?.item_id, name: truck?.name },
          })
        );
      setSelectedTrucks(temporaryTruck.reverse());
    } else {
      setSelectedTrucks([{}]);
    }
  };

  const handleEdit = () => {
    setEdit(true);
    setCancel(false);
    navigate(`/admin/user-management/logistics/edit/${id}`);
  };

  const handleCancel = () => {
    setEdit(false);
    setCancel(true);
    navigate(`/admin/user-management/logistics/detail/${id}`);
    setSelectedTruckDetails();
  };

  const onSave = () => {
    setIsSubmit(true);
  };

  const onFinalSubmit = () => {
    const {
      logisticCompanyPersonalDetails,
      logisticCompanyAddressDetails,
      logisticCompanyFormalDetails,
      truckDetails,
      passportPhotoDetails,
      CACDocumentDetails,
    } = logisticCompanyData;
    if (
      !logisticCompanyPersonalDetails ||
      !logisticCompanyAddressDetails ||
      !logisticCompanyFormalDetails ||
      !truckDetails ||
      !passportPhotoDetails ||
      !CACDocumentDetails
    ) {
      return;
    }
    const edittedData = {
      firstName: logisticCompanyPersonalDetails?.firstName,
      lastName: logisticCompanyPersonalDetails?.lastName,
      gender: logisticCompanyPersonalDetails?.gender,
      dateOfBirth: moment(
        logisticCompanyPersonalDetails?.dateOfBirth
      ).toISOString(true),
      passportPhotoId: parseInt(passportPhotoDetails.CACDocument),
      companyName: logisticCompanyFormalDetails.companyName,
      registrationNumber: logisticCompanyFormalDetails.registrationNumber,
      orgVerificationNumber: logisticCompanyFormalDetails.orgVerificationNumber,
      orgVerificationType:
        logisticCompanyFormalDetails.verificationTextRef.current,
      cacDocumentId: parseInt(CACDocumentDetails.CACDocument),
      addressLine1: logisticCompanyAddressDetails.addressLine1,
      country: parseInt(logisticCompanyAddressDetails.country),
      countryId: parseInt(logisticCompanyDetails?.personalDetails?.country_id),
      stateId: parseInt(logisticCompanyAddressDetails.state),
      city: logisticCompanyAddressDetails.city,
      addressLine2: logisticCompanyAddressDetails.addressLine2,
      zipCode: parseInt(logisticCompanyAddressDetails.zipCode),
      truckDetails: truckDetails,
    };
    let flag = true;
    if (truckDetails) {
      truckDetails.forEach((item) => {
        if (item?.no_of_trucks > 1000) {
          flag = false;
        }
      });
    }
    if (flag) {
      dispatch(editLogisticCompanyDetails(id, edittedData, navigate));
      setEdit(false);
    }
  };

  const options = [
    {
      name: "Active",
      actionClickHandler: (company_id) =>
        dispatch(editLogisticCompanyAction(company_id, { status: "ACTIVE" })),
    },
    {
      name: "Inactive",
      actionClickHandler: (company_id) =>
        dispatch(editLogisticCompanyAction(company_id, { status: "INACTIVE" })),
    },
    {
      name: "On Hold",
      actionClickHandler: (company_id) =>
        dispatch(editLogisticCompanyAction(company_id, { status: "ONHOLD" })),
    },
  ];

  const updateState = (newState) => {
    logisticCompanyDataRef.current = newState;
    setLogisticCompanyData(newState);
    setIsSubmit(false);
  };

  const getLogisticCompanyPersonalDetails = (data) => {
    updateState({
      ...logisticCompanyDataRef.current,
      logisticCompanyPersonalDetails: data,
    });
  };

  const getLogisticCompanyAddressDetails = (data) =>
    updateState({
      ...logisticCompanyDataRef.current,
      logisticCompanyAddressDetails: data,
    });

  const getLogisticCompanyDetails = (data) =>
    updateState({
      ...logisticCompanyDataRef.current,
      logisticCompanyFormalDetails: data,
    });

  const getTruckDetails = (data, countValid) => {
    const lastItem = _.last(data);
    if (lastItem?.truckCount > 0) {
      updateState({
        ...logisticCompanyDataRef.current,
        truckDetails: data?.map((truck) => ({
          no_of_trucks: parseInt(truck.truckCount),
          item_id: truck.truckData.id,
        })),
      });
    } else {
      showToast("Number of trucks is required", "error");
      setIsSubmit(false);
    }
  };

  const getPassportPhotoDetails = (data) => {
    updateState({
      ...logisticCompanyDataRef.current,
      passportPhotoDetails: data,
    });
  };
  const getCACDocumentDetails = (data) => {
    updateState({
      ...logisticCompanyDataRef.current,
      CACDocumentDetails: data,
    });
  };

  return (
    <Grid
      container
      item
      sx={{
        ...commonStyles.whiteContainerBackgroundTabs,
        ...commonStyles.customSrollBar,
      }}
    >
      <Grid
        sx={{
          ...commonStyles.detailsContainer,
        }}
      >
        <Grid
          sx={{ ...commonStyles.signupContentContainer, ...{ marginTop: 0 } }}
        >
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
          <Grid item sx={styles.contentTopContainer}>
            <Grid item sm={4} xs={12}>
              <AjDetailTypography
                displayText1="Email"
                displayText2={logisticCompanyDetails?.personalDetails?.email}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <AjDetailTypography
                displayText1="Phone Number"
                displayText2={`${getPhoneCodeSymbol(
                  logisticCompanyDetails?.personalDetails?.phone_code
                )} ${logisticCompanyDetails?.personalDetails?.mobile_no}`}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <AjDetailTypography
                displayText1="Count of truck"
                displayText2={
                  logisticCompanyDetails?.accountDetails?.total_truck_count
                }
              />
            </Grid>
          </Grid>
          <Grid item sx={customCommonStyles.statusContainer}>
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
                logisticCompanyDetails?.prsonalDetails?.status
              )}
            />
          </Grid>

          <Box
            component="form"
            sx={{
              ...commonStyles.signupFormContainer,
              ...(!edit && ROLES.ADMIN !== roleId && styles.formMarginTop),
            }}
          >
            {logisticCompanyDetails?.personalDetails && (
              <AjPersonalDetails
                isDisable={!edit}
                submit={isSubmit}
                reset={cancel}
                data={getLogisticCompanyPersonalDetails}
                defaultFirstName={
                  logisticCompanyDetails?.personalDetails?.first_name
                }
                defaultLastName={
                  logisticCompanyDetails?.personalDetails?.last_name
                }
                defaultGender={logisticCompanyDetails?.personalDetails?.gender}
                defaultDateOfBirth={
                  logisticCompanyDetails?.personalDetails?.date_of_birth
                }
              />
            )}
            {logisticCompanyDetails?.personalDetails && (
              <AjUploadCACDocument
                label="Passport photo: (JPEG, PNG or PDF only)"
                error="Passport photo is required"
                docType="PASSPORT_PHOTO"
                reset={cancel}
                submit={isSubmit}
                data={getPassportPhotoDetails}
                styleData={customCommonStyles.certificateContainer}
                defaultCACDocument={{
                  id: logisticCompanyDetails?.personalDetails
                    ?.passport_photo_id,
                  file_name: logisticCompanyDetails?.personalDetails?.file_name,
                }}
                documentRequired={true}
                isDisable={!edit}
              />
            )}
            <Divider sx={commonStyles.dividerStyle} />
            {logisticCompanyDetails?.accountDetails && (
              <AjCompanyDetails
                isDisable={!edit}
                reset={cancel}
                type="Logistic"
                submit={isSubmit}
                data={getLogisticCompanyDetails}
                companyNameLabel="Logistic Company name"
                registrationNumberLabel="Logistic Company registration number"
                registrationRequired={true}
                companyNamePlaceholder="Enter Logistic Company name"
                defaultCompanyName={
                  logisticCompanyDetails?.accountDetails?.company_name
                }
                defaultRegistrationNumber={
                  logisticCompanyDetails?.accountDetails?.registration_number
                }
                defaultOrgNumber={
                  logisticCompanyDetails?.accountDetails
                    ?.org_verification_number
                }
                tinRequired={true}
                countryId={logisticCompanyDetails?.personalDetails?.country_id}
              />
            )}
            {logisticCompanyDetails?.accountDetails && (
              <AjUploadCACDocument
                isDisable={!edit}
                docType="CAC_PHOTO"
                submit={isSubmit}
                reset={cancel}
                data={getCACDocumentDetails}
                styleData={customCommonStyles.certificateContainer}
                defaultCACDocument={{
                  id: logisticCompanyDetails?.accountDetails?.cac_document,
                  file_name: logisticCompanyDetails?.accountDetails?.file_name,
                }}
                documentRequired={true}
              />
            )}
            <Divider sx={commonStyles.dividerStyle} />
            {logisticCompanyDetails?.accountDetails && (
              <AjAdress
                isDisable={!edit}
                submit={isSubmit}
                reset={cancel}
                data={getLogisticCompanyAddressDetails}
                defaultAddressLine1={
                  logisticCompanyDetails?.accountDetails?.address_1
                }
                defaultAddressLine2={
                  logisticCompanyDetails?.accountDetails?.address_2
                }
                defaultCity={logisticCompanyDetails?.accountDetails?.city}
                defaultZipCode={
                  logisticCompanyDetails?.accountDetails?.zip_code
                }
                defaultCountry={logisticCompanyDetails?.accountDetails?.country}
                defaultState={logisticCompanyDetails?.accountDetails?.state}
              />
            )}
            <Divider sx={commonStyles.dividerStyle} />
            {selectedTrucks && (
              <AjMultipleTruck
                defaultValue={selectedTrucks}
                disableReq={!edit}
                submit={isSubmit}
                data={getTruckDetails}
              />
            )}
          </Box>
          <Grid
            sx={{
              ...commonStyles.centerContainerContent,
              ...styles.btnContainer,
            }}
          >
            {edit && (
              <>
                <AjButton
                  styleData={commonStyles.cancelBtnStyle}
                  variant="outlined"
                  displayText="Cancel"
                  onClick={handleCancel}
                />
                <AjButton
                  variant="contained"
                  displayText="Save Changes"
                  onClick={onSave}
                />
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LogisticCompanyDetails;
