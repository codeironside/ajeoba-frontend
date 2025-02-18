import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, InputBase } from "@mui/material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AjInputLabel from "../AjInputLabel";
import AjDropDown from "../AjDropdown/AjDropDown";
import AjTypography from "../AjTypography";
import { commonStyles } from "../../Style/CommonStyle";
import { AddFarmerLandSchema } from "../../validationSchema/addFarmerSchema";
import AjButton from "../AjButton";
import { styles } from "./AddFarmerModalContentStyles";
import { addLand } from "../../Redux/FarmingAssociation/Farmers/farmersActions";
import { showToast } from "../../Services/toast";
import AjGeoLocater from "../AjGeoLocater/AjGeoLocater";
import {
  getMasterData,
  getMasterDataAction,
} from "../../Redux/common/GetMasterData/getMasterDataActions";
import {
  LAND_NOT_ADDED,
  LAND_NOT_ENCLOSED,
} from "../../Constant/ErrorConstant";
import AjAddMultipleCoordinates from "../AjAddMultipleCoordinates/AjAddMultipleCoordinates";

const AddFarmerModalContent = (props) => {
  const { edit, closeModal } = props;
  const [typeOfSoil, setTypeOfSoil] = useState(null);
  const [geoLocation, setGeoLocation] = useState();
  const [isUpdated, setIsUpdated] = useState(null);
  const [showGeoLocater, setShowGeoLocater] = useState(true);

  const [error, setError] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();
  const landData = useSelector((state) => state.farmers.landData);
  const typeOfSoilMasterData = useSelector(
    (state) => state.masterData.masterData
  );

  const dropDownChangeHandler = (e, selectedDropDown) => {
    setTypeOfSoil(selectedDropDown.props.value);
  };

  useEffect(() => {
    dispatch(getMasterDataAction({ itemType: "SOIL_TYPE" }));
    return () => dispatch(getMasterData(null));
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddFarmerLandSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (isUpdated) {
      handleSubmit(onSubmit)();
    }
  }, [isUpdated]);

  const onSubmit = (data) => {
    setIsSubmit(true);
    if (!isUpdated && !showGeoLocater) {
      return;
    }
    if (!geoLocation) {
      showToast(error ? LAND_NOT_ENCLOSED : LAND_NOT_ADDED, "error");
      setIsSubmit(false);
      setIsUpdated(false);
      return;
    }

    if (geoLocation) {
      const landDetailData = {
        typeOfSoil: typeOfSoil ? typeOfSoil : typeOfSoilMasterData[0]?.name,
        landSize: data.landSize,
        geo_mapping_land: geoLocation,
      };
      dispatch(
        addLand({
          landDetail: landDetailData,
          landListing: [...landData.landListing, landDetailData],
        })
      );
      setIsUpdated(false);
      showToast("Land added successfully", "success");
      closeModal(false);
    }
  };

  const onCancelClick = () => {
    closeModal(false);
  };

  useEffect(() => {
    if (!edit && landData?.landDetail) {
      setTypeOfSoil(landData?.landDetail?.typeOfSoil);
      setValue("landSize", landData?.landDetail?.landSize, {
        shouldValidate: true,
      });
      setGeoLocation(landData?.landDetail?.geo_mapping_land);
    }
  }, []);

  return (
    <>
      <Grid sx={styles.modalContainer}>
        <Grid container sx={styles.mainContainer} columnSpacing={2}>
          <Grid item xs={12} sm={6}>
            <AjInputLabel
              required={true}
              styleData={commonStyles.inputLabel}
              displayText="Type of Soil"
            />
            <AjDropDown
              options={typeOfSoilMasterData}
              value={typeOfSoil}
              onChange={dropDownChangeHandler}
              source="name"
              defaultValue={
                typeOfSoilMasterData && typeOfSoilMasterData[0]?.name
              }
              readOnly={!edit}
              styleData={{ ...(!edit && commonStyles.disableInput) }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AjInputLabel
              displayText="Land size (Hectare)"
              required
              styleData={commonStyles.inputLabel}
            />
            <InputBase
              required
              fullWidth
              id="LandSize"
              type="number"
              name="LandSize"
              placeholder="Enter Land size"
              readOnly={!edit}
              sx={{
                ...commonStyles.inputStyle,
                ...(!edit && commonStyles.disableInput),
              }}
              {...register("landSize")}
              error={errors.landSize ? true : false}
            />
            <AjTypography
              styleData={{
                ...commonStyles.errorText,
                ...commonStyles.customErrorText,
              }}
              displayText={errors.landSize?.message}
            />
          </Grid>
        </Grid>
        <Grid xs={12} sm={12}>
          <Box sx={{ display: "flex" }}>
            <AjInputLabel
              required={true}
              styleData={commonStyles.inputLabel}
              displayText="Set location"
            />
            {edit && (
              <AjButton
                variant="text"
                displayText={showGeoLocater ? "Add Coordinates" : "Mark Land"}
                styleData={styles.addCoordsButton}
                onClick={() => setShowGeoLocater((prev) => !prev)}
              />
            )}
          </Box>
          {showGeoLocater && (
            <AjGeoLocater
              setGeoLocation={setGeoLocation}
              setError={setError}
              geoLocation={edit ? null : landData?.landDetail?.geo_mapping_land}
              edit={edit}
            />
          )}
          {!showGeoLocater && (
            <AjAddMultipleCoordinates
              setGeoLocation={setGeoLocation}
              submit={isSubmit}
              setError={setError}
              setIsUpdated={setIsUpdated}
            />
          )}
        </Grid>
      </Grid>
      {edit && (
        <Box
          sx={{
            ...commonStyles.buttonBox,
            ...styles.customButtonBox,
          }}
        >
          <AjButton
            variant="text"
            displayText="Cancel"
            styleData={{
              ...commonStyles.buttonStyle,
              ...commonStyles.cancelButton,
            }}
            onClick={onCancelClick}
          />

          <AjButton
            variant="text"
            styleData={{
              ...commonStyles.buttonStyle,
              ...commonStyles.applyFilterButton,
            }}
            displayText="Add Land"
            onClick={handleSubmit(onSubmit)}
          />
        </Box>
      )}
    </>
  );
};

export default AddFarmerModalContent;
