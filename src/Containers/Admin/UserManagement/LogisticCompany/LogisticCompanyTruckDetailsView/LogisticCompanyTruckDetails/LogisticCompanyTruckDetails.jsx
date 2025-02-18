import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, InputBase } from "@mui/material";
import AjButton from "../../../../../../Components/AjButton";
import AjDropDown from "../../../../../../Components/AjDropdown/AjDropDown";
import AjInputLabel from "../../../../../../Components/AjInputLabel";
import AjMultipleFileUpload from "../../../../../../Components/AjMultipleFileUpload";
import AjTypography from "../../../../../../Components/AjTypography";
import AjUploadCACDocument from "../../../../../../Components/AjUploadCACDocument/AjUploadCACDocument";
import TableActions from "../../../../../../Components/TableActions/TableActions";

import { addTruckSchema } from "../../../../../../validationSchema/addTruckSchema";
import { useDispatch, useSelector } from "react-redux";
import {
  getMasterData,
  getMasterDataAction,
} from "../../../../../../Redux/common/GetMasterData/getMasterDataActions";
import {
  editLogisticCompanyTruckAction,
  getTruckDetailsByIdAction,
  toggleTruckStatusAction,
} from "../../../../../../Redux/Logistics/logisticsActions";
import { ROLES } from "../../../../../../Constant/RoleConstant";
import { getUserData } from "../../../../../../Services/localStorageService";
import {
  ADMIN_LOGISTICS,
  ADMIN_USER_MANAGEMENT,
} from "../../../../../../Routes/Routes";
import { getBooleanStatus } from "../../../../../../Services/commonService/commonService";
import {
  maxFilesAllowedForPhotoOfTruck,
  minFilesAllowedForPhotoOfTruck,
} from "../../../../../../Constant/AppConstant";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../../../Style/CommonStyle";
import { styles } from "../../../../../LogisticCompany/TruckInformation/AddTruck/AddTruckStyles";

const LogisticCompanyTruckDetails = () => {
  const [typeOfTruck, setTypeOfTruck] = useState(null);
  const [edit, setEdit] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [photoOfTruckError, setPhotoOfTruckError] = useState(false);
  const [photoOfTruck, setPhotoOfTruck] = useState([]);
  const [logisticCompanyTruckData, setLogisticCompanyTruckData] = useState([]);

  const typeOfTruckMasterData = useSelector(
    (state) => state.masterData.masterData
  );

  const truckDetails = useSelector((state) => state.logistics.truckDetails);

  const dispatch = useDispatch();
  const { logisticCompanyId, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const roleId = getUserData().role_id;
  const logisticCompanyTruckDataRef = useRef(logisticCompanyTruckData);

  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addTruckSchema),
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(getMasterDataAction({ itemType: "TYPE_OF_TRUCK" }));
    return () => dispatch(getMasterData(null));
  }, []);

  useEffect(() => {
    dispatch(getTruckDetailsByIdAction(id));
    if (location.pathname.includes("edit")) {
      setEdit(true);
    }
  }, [id]);

  useEffect(() => {
    const { licenseFrontViewDetails, licenseBackViewDetails } =
      logisticCompanyTruckData;
    if (licenseFrontViewDetails && licenseBackViewDetails) {
      handleSubmit(onSubmit)();
    }
  }, [logisticCompanyTruckData]);

  useEffect(() => {
    if (truckDetails?.truckDetail) {
      setValues();
    }
  }, [truckDetails, typeOfTruckMasterData]);

  useEffect(() => {
    if (cancel) {
      setValues();
    }
  }, [cancel]);

  const setValues = () => {
    setValue("truckModel", truckDetails?.truckDetail?.model, {
      shouldValidate: true,
    });
    setValue("colorOfTruck", truckDetails?.truckDetail?.color, {
      shouldValidate: true,
    });
    setValue(
      "registeredNumberPlate",
      truckDetails?.truckDetail?.registered_plate_number,
      { shouldValidate: true }
    );
    const truck = typeOfTruckMasterData?.find(
      (item) => item.id === truckDetails?.truckDetail?.type_of_truck
    );
    setValue("typeOfTruck", truck?.name, { shouldValidate: true });
    setTypeOfTruck(truck?.name);
    setPhotoOfTruck(truckDetails?.photoIdDetails);
  };
  const dropDownChangeHandler = (_e, selectedDropDown) => {
    setTypeOfTruck(selectedDropDown.props.value);
    setValue("typeOfTruck", selectedDropDown.props.value, {
      shouldValidate: true,
    });
  };

  const updateState = (newState) => {
    logisticCompanyTruckDataRef.current = newState;
    setLogisticCompanyTruckData(newState);
    setIsSubmit(false);
  };

  const getLicenseFrontViewDetails = (data) => {
    updateState({
      ...logisticCompanyTruckDataRef.current,
      licenseFrontViewDetails: data,
    });
  };

  const getLicenseBackViewDetails = (data) => {
    updateState({
      ...logisticCompanyTruckDataRef.current,
      licenseBackViewDetails: data,
    });
  };

  const getRoadWorthinessViewDetails = (data) => {
    updateState({
      ...logisticCompanyTruckDataRef.current,
      roadWorthinessViewDetails: data,
    });
  };

  const getVehicleInsuranceViewDetails = (data) => {
    updateState({
      ...logisticCompanyTruckDataRef.current,
      vehicleInsuranceViewDetails: data,
    });
  };

  const handleEdit = () => {
    setEdit(true);
    setCancel(false);
    navigate(
      `${ADMIN_USER_MANAGEMENT}/${ADMIN_LOGISTICS}/${logisticCompanyId}/truck/edit/${id}`
    );
  };

  const handleCancel = () => {
    setEdit(false);
    setCancel(true);
    navigate(
      `${ADMIN_USER_MANAGEMENT}/${ADMIN_LOGISTICS}/${logisticCompanyId}/truck/detail/${id}`
    );
  };

  const handleSave = () => {
    setIsSubmit(true);
    if (photoOfTruck.length === 0) {
      setPhotoOfTruckError("Photo of Truck is required");
    }
    const submitData = getValues([
      "colorOfTruck",
      "registeredNumberPlate",
      "truckModel",
      "typeOfTruck",
    ]);

    submitData.forEach((item) => {
      if (item === "") handleSubmit(onSubmit)();
    });
  };

  const onSubmit = (data) => {
    if (
      !logisticCompanyTruckData?.licenseFrontViewDetails ||
      !logisticCompanyTruckData?.licenseBackViewDetails
    ) {
      return;
    }

    if (photoOfTruck.length >= minFilesAllowedForPhotoOfTruck) {
      const photoIdsOfTruck = [];
      photoOfTruck.forEach((item) => photoIdsOfTruck.push(item.id));
      const obj = typeOfTruckMasterData.find(
        (item) => item.name === data.typeOfTruck
      );
      let dataToSend = {
        typeOfTruck: obj.id,
        model: data.truckModel,
        color: data.colorOfTruck,
        registeredPlateNumber: data.registeredNumberPlate,
        photoId: photoIdsOfTruck,
        driverLicenseCertificateId: [
          parseInt(
            logisticCompanyTruckData?.licenseFrontViewDetails?.CACDocument
          ),
          parseInt(
            logisticCompanyTruckData?.licenseBackViewDetails?.CACDocument
          ),
        ],
      };

      if (logisticCompanyTruckData?.roadWorthinessViewDetails?.CACDocument) {
        dataToSend["roadWorthinessCertificateId"] = parseInt(
          logisticCompanyTruckData?.roadWorthinessViewDetails?.CACDocument
        );
      }

      if (logisticCompanyTruckData?.vehicleInsuranceViewDetails?.CACDocument) {
        dataToSend["vehicleInsuranceId"] = parseInt(
          logisticCompanyTruckData?.vehicleInsuranceViewDetails?.CACDocument
        );
      }
      dispatch(
        editLogisticCompanyTruckAction(
          id,
          dataToSend,
          navigate,
          logisticCompanyId
        )
      );
      setEdit(false);
    }
  };
  const options = [
    {
      name: "Active",
      actionClickHandler: (truckId) =>
        dispatch(toggleTruckStatusAction(truckId, true)),
    },
    {
      name: "Inactive",
      actionClickHandler: (truckId) =>
        dispatch(toggleTruckStatusAction(truckId, false)),
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
      <Grid
        sx={{
          ...commonStyles.detailsContainer,
        }}
      >
        {!edit && ROLES.SUPER_ADMIN === roleId && (
          <AjButton
            onClick={handleEdit}
            styleData={{
              ...commonStyles.editBtn,
              ...commonStyles.editBtnCustom,
              ...commonStyles.truckDetailEditBtn,
            }}
            variant="outlined"
            displayText="Edit Details"
          />
        )}
        <Grid item sx={customCommonStyles.statusContainer}>
          <AjTypography
            align="center"
            styleData={commonStyles.inputLabel}
            displayText="Status"
          />
          <TableActions
            isReadOnly={!edit}
            options={options}
            id={truckDetails?.truckDetail?.id}
            isActive={getBooleanStatus(truckDetails?.truckDetail?.is_active)}
            isConfirmModalRequired={true}
            modalConfirmationMessage="Are you sure you want to change the status of the truck?"
          />
        </Grid>
        <Box
          sx={{
            ...commonStyles.signupContentContainer,
            ...styles.mainContainerResponsive,
            ...styles.mainContainerNone,
          }}
        >
          <Box
            component="form"
            sx={{
              ...commonStyles.signupFormContainer,
              ...commonStyles.fixedWidth,
              ...commonStyles.marginTop0,
            }}
          >
            {truckDetails?.truckDetail && (
              <>
                <Box sx={commonStyles.signupFormFieldContainer}>
                  <AjInputLabel
                    required={true}
                    styleData={commonStyles.inputLabel}
                    displayText="Truck Model"
                  />
                  <InputBase
                    required
                    id="truckModel"
                    name="truckModel"
                    placeholder="Enter your truck model"
                    sx={{
                      ...commonStyles.inputStyle,
                      ...(!edit && commonStyles.disableInput),
                    }}
                    readOnly={!edit}
                    {...register("truckModel")}
                    error={errors.truckModel ? true : false}
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={errors.truckModel?.message}
                  />
                </Box>
                <Box sx={commonStyles.signupFormFieldContainer}>
                  <AjInputLabel
                    required={true}
                    styleData={commonStyles.inputLabel}
                    displayText={"Type of Truck"}
                  />
                  <AjDropDown
                    options={typeOfTruckMasterData}
                    value={typeOfTruck}
                    onChange={dropDownChangeHandler}
                    source="name"
                    placeHolder="Select type of truck"
                    isPlaceholderCapiltalize={false}
                    readOnly={!edit}
                    styleData={{
                      ...commonStyles.dropDownResponsive,
                      ...(!edit && commonStyles.disableInput),
                    }}
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={errors.typeOfTruck?.message}
                  />
                </Box>
                <Box sx={commonStyles.signupFormFieldContainer}>
                  <AjInputLabel
                    required={true}
                    styleData={commonStyles.inputLabel}
                    displayText="Color of Truck"
                  />
                  <InputBase
                    required
                    id="colorOfTruck"
                    name="colorOfTruck"
                    placeholder="Enter your color of truck"
                    sx={{
                      ...commonStyles.inputStyle,
                      ...(!edit && commonStyles.disableInput),
                    }}
                    readOnly={!edit}
                    {...register("colorOfTruck")}
                    error={errors.colorOfTruck ? true : false}
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={errors.colorOfTruck?.message}
                  />
                </Box>
                <Box sx={commonStyles.signupFormFieldContainer}>
                  <AjInputLabel
                    required={true}
                    styleData={commonStyles.inputLabel}
                    displayText="Registered number plate"
                  />
                  <InputBase
                    required
                    id="registeredNumberPlate"
                    name="registeredNumberPlate"
                    placeholder="Enter your registered number plate"
                    sx={{
                      ...commonStyles.inputStyle,
                      ...(!edit && commonStyles.disableInput),
                    }}
                    readOnly={!edit}
                    {...register("registeredNumberPlate")}
                    error={errors.registeredNumberPlate ? true : false}
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={errors.registeredNumberPlate?.message}
                  />
                </Box>
              </>
            )}
            <Box sx={styles.uploadButtonBox}>
              {truckDetails?.driverLicenseCertificateId && (
                <AjUploadCACDocument
                  isDisable={!edit}
                  submit={isSubmit}
                  reset={cancel}
                  data={getLicenseFrontViewDetails}
                  docType="CERTIFICATION"
                  styleData={customCommonStyles.certificateContainer}
                  label="License Certificate (Front View)"
                  error="License Certificate (Front View) is required"
                  documentRequired={true}
                  defaultCACDocument={{
                    id: truckDetails?.driverLicenseCertificateId[0]?.id,
                    file_name:
                      truckDetails?.driverLicenseCertificateId[0]?.file_name,
                  }}
                />
              )}
              {truckDetails?.driverLicenseCertificateId && (
                <AjUploadCACDocument
                  isDisable={!edit}
                  docType="CERTIFICATION"
                  submit={isSubmit}
                  reset={cancel}
                  data={getLicenseBackViewDetails}
                  styleData={customCommonStyles.certificateContainer}
                  label="License Certificate (Back View)"
                  error="License Certificate (Back View) is required"
                  documentRequired={true}
                  defaultCACDocument={{
                    id: truckDetails?.driverLicenseCertificateId[1]?.id,
                    file_name:
                      truckDetails?.driverLicenseCertificateId[1]?.file_name,
                  }}
                />
              )}
            </Box>
            <Box sx={styles.uploadButtonBox}>
              {!!truckDetails?.roadWorthinessCertificateId?.length && (
                <AjUploadCACDocument
                  isDisable={!edit}
                  docType="CERTIFICATION"
                  submit={isSubmit}
                  reset={cancel}
                  data={getRoadWorthinessViewDetails}
                  styleData={customCommonStyles.certificateContainer}
                  label="Road Worthiness"
                  error="Road Worthiness is required"
                  documentRequired={false}
                  defaultCACDocument={{
                    id: truckDetails?.roadWorthinessCertificateId[0]?.id,
                    file_name:
                      truckDetails?.roadWorthinessCertificateId[0]?.file_name,
                  }}
                />
              )}

              {!!truckDetails?.vehicleInsuranceId?.length && (
                <AjUploadCACDocument
                  isDisable={!edit}
                  docType="CERTIFICATION"
                  submit={isSubmit}
                  reset={cancel}
                  data={getVehicleInsuranceViewDetails}
                  styleData={customCommonStyles.certificateContainer}
                  label="Vehicle Insurance"
                  error="Vehicle Insurance is required"
                  documentRequired={false}
                  defaultCACDocument={{
                    id: truckDetails?.vehicleInsuranceId[0]?.id,
                    file_name: truckDetails?.vehicleInsuranceId[0]?.file_name,
                  }}
                />
              )}
            </Box>
            {truckDetails?.photoIdDetails && (
              <Box
                sx={{
                  ...commonStyles.signupFormFieldContainer,
                  ...styles.marginTopresponsive,
                }}
              >
                <AjInputLabel
                  required={!edit}
                  styleData={commonStyles.inputLabel}
                  displayText="Photo of Truck"
                />
                <AjMultipleFileUpload
                  maxNoOfFilesAllowed={maxFilesAllowedForPhotoOfTruck}
                  docType="AJEOBA_DOCS"
                  getCertificates={setPhotoOfTruck}
                  defaultValue={truckDetails?.photoIdDetails}
                  isDisable={!edit}
                  reset={cancel}
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={!photoOfTruck.length && photoOfTruckError}
                />
              </Box>
            )}
          </Box>
          <Grid
            sx={{
              ...commonStyles.centerContainerContent,
              ...commonStyles.btnContainer,
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
                  onClick={handleSave}
                />
              </>
            )}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LogisticCompanyTruckDetails;
