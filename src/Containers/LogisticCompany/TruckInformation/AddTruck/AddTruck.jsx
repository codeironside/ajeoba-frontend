import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Box, IconButton, InputBase } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AjButton from "../../../../Components/AjButton";
import AjTypography from "../../../../Components/AjTypography";
import AjInputLabel from "../../../../Components/AjInputLabel";
import AjDropDown from "../../../../Components/AjDropdown/AjDropDown";
import AjMultipleFileUpload from "../../../../Components/AjMultipleFileUpload";
import AjUploadCACDocument from "../../../../Components/AjUploadCACDocument/AjUploadCACDocument";
import { styles as addProductStyles } from "../../../../Components/AjAddProduct/AjAddProductStyle";
import {
  getMasterData,
  getMasterDataAction,
} from "../../../../Redux/common/GetMasterData/getMasterDataActions";
import { addTruckAction } from "../../../../Redux/Logistics/logisticsActions";
import { TRUCK_INFORMATION } from "../../../../Routes/Routes";
import {
  minFilesAllowedForPhotoOfTruck,
  maxFilesAllowedForPhotoOfTruck,
} from "../../../../Constant/AppConstant";

import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";
import { styles } from "./AddTruckStyles";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addTruckSchema } from "../../../../validationSchema/addTruckSchema";

export default function AddTruck() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addTruckSchema),
    mode: "onChange",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSubmit, setIsSubmit] = useState(false);

  const [photoOfTruck, setPhotoOfTruck] = useState([]);
  const [photoOfTruckError, setPhotoOfTruckError] = useState("");
  const [truckData, setTruckData] = useState({});

  const [typeOfTruck, setTypeOfTruck] = useState(null);
  const truckDataRef = useRef(truckData);

  const typeOfTruckMasterData = useSelector(
    (state) => state.masterData.masterData
  );

  useEffect(() => {
    dispatch(getMasterDataAction({ itemType: "TYPE_OF_TRUCK" }));
    return () => dispatch(getMasterData(null));
  }, []);

  useEffect(() => {
    const { licenseFrontViewDetails, licenseBackViewDetails } = truckData;
    if (licenseFrontViewDetails && licenseBackViewDetails) {
      handleSubmit(onSubmit)();
    }
  }, [truckData]);

  const dropDownChangeHandler = (_e, selectedDropDown) => {
    setTypeOfTruck(selectedDropDown.props.value);
    setValue("typeOfTruck", selectedDropDown.props.value, {
      shouldValidate: true,
    });
  };

  const backArrowHandler = () => {
    navigate(TRUCK_INFORMATION);
  };

  const clickHandler = () => {
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
    setIsSubmit(true);
  };

  const updateState = (newState) => {
    truckDataRef.current = newState;
    setTruckData(newState);
    setIsSubmit(false);
  };

  const getLicenseFrontViewDetails = (data) => {
    updateState({ ...truckDataRef.current, licenseFrontViewDetails: data });
  };

  const getLicenseBackViewDetails = (data) => {
    updateState({ ...truckDataRef.current, licenseBackViewDetails: data });
  };

  const getRoadWorthinessViewDetails = (data) => {
    updateState({ ...truckDataRef.current, roadWorthinessViewDetails: data });
  };

  const getVehicleInsuranceViewDetails = (data) => {
    updateState({ ...truckDataRef.current, vehicleInsuranceViewDetails: data });
  };

  const onSubmit = (data) => {
    if (
      !truckData?.licenseFrontViewDetails ||
      !truckData?.licenseBackViewDetails
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
          parseInt(truckData?.licenseFrontViewDetails?.CACDocument),
          parseInt(truckData?.licenseBackViewDetails?.CACDocument),
        ],
      };

      if (truckData?.roadWorthinessViewDetails?.CACDocument) {
        dataToSend["roadWorthinessCertificateId"] = parseInt(
          truckData?.roadWorthinessViewDetails?.CACDocument
        );
      }

      if (truckData?.vehicleInsuranceViewDetails?.CACDocument) {
        dataToSend["vehicleInsuranceId"] = parseInt(
          truckData?.vehicleInsuranceViewDetails?.CACDocument
        );
      }
      dispatch(addTruckAction(dataToSend, navigate));
    }
  };

  return (
    <Grid
      container
      sx={{
        ...commonStyles.signupFormMainGridContainer,
      }}
    >
      <Box sx={commonStyles.relativePosition}>
        <IconButton
          disableRipple
          onClick={backArrowHandler}
          sx={commonStyles.backButtonPosition}
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
            displayText="Add Truck"
            styleData={{
              ...commonStyles.signupHeadingStyle,
              ...commonStyles.marginBottom0,
            }}
          />
          <Box
            sx={{
              ...commonStyles.signupContentContainer,
              ...styles.mainContainerResponsive,
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
                  sx={commonStyles.inputStyle}
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
                  styleData={addProductStyles.dropDownResponsive}
                  placeHolder="Select type of truck"
                  isPlaceholderCapiltalize={false}
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
                  sx={commonStyles.inputStyle}
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
                  sx={commonStyles.inputStyle}
                  {...register("registeredNumberPlate")}
                  error={errors.registeredNumberPlate ? true : false}
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.registeredNumberPlate?.message}
                />
              </Box>
              <Box sx={styles.uploadButtonBox}>
                <AjUploadCACDocument
                  submit={isSubmit}
                  data={getLicenseFrontViewDetails}
                  docType="CERTIFICATION"
                  styleData={customCommonStyles.certificateContainer}
                  label="License Certificate (Front View)"
                  error="License Certificate (Front View) is required"
                  documentRequired={true}
                />
                <AjUploadCACDocument
                  submit={isSubmit}
                  data={getLicenseBackViewDetails}
                  docType="CERTIFICATION"
                  styleData={customCommonStyles.certificateContainer}
                  label="License Certificate (Back View)"
                  error="License Certificate (Back View) is required"
                  documentRequired={true}
                />
              </Box>
              <Box sx={styles.uploadButtonBox}>
                <AjUploadCACDocument
                  submit={isSubmit}
                  data={getRoadWorthinessViewDetails}
                  docType="CERTIFICATION"
                  styleData={customCommonStyles.certificateContainer}
                  label="Road Worthiness"
                  error="Road Worthiness is required"
                  documentRequired={false}
                />
                <AjUploadCACDocument
                  submit={isSubmit}
                  data={getVehicleInsuranceViewDetails}
                  docType="CERTIFICATION"
                  styleData={customCommonStyles.certificateContainer}
                  label="Vehicle Insurance"
                  error="Vehicle Insurance is required"
                  documentRequired={false}
                />
              </Box>
              <Box
                sx={{
                  ...commonStyles.signupFormFieldContainer,
                  ...styles.marginTopresponsive,
                }}
              >
                <AjInputLabel
                  required={true}
                  styleData={commonStyles.inputLabel}
                  displayText="Photo of Truck"
                />
                <AjMultipleFileUpload
                  maxNoOfFilesAllowed={maxFilesAllowedForPhotoOfTruck}
                  getCertificates={setPhotoOfTruck}
                  docType="AJEOBA_DOCS"
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={!photoOfTruck.length && photoOfTruckError}
                />
              </Box>
            </Box>
            <AjButton
              variant="contained"
              displayText="Add Truck"
              styleData={styles.marginTop3}
              onClick={clickHandler}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
