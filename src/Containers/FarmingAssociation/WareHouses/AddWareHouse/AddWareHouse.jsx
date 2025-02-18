import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as _ from "lodash";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Box, IconButton, InputBase } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AjAdress from "../../../../Components/AjAdress/AjAdress";
import AjButton from "../../../../Components/AjButton";
import AjInputLabel from "../../../../Components/AjInputLabel";
import AjChipDropdown from "../../../../Components/AjChipDropdown";
import { WAREHOUSES } from "../../../../Routes/Routes";
import AjTypography from "../../../../Components/AjTypography";

import { getUserData } from "../../../../Services/localStorageService";
import { addWareHouseSchema } from "../../../../validationSchema/addWareHouseSchema";
import { getItemListAction } from "../../../../Redux/SuperAdmin/MasterManagement/masterManagementActions";
import { addWareHouseAction } from "../../../../Redux/WareHouses/wareHouseActions";
import { wareHouseFacilityListType } from "../../../../Constant/AppConstant";
import { styles } from "./AddWareHouseStyles";
import { commonStyles } from "../../../../Style/CommonStyle";
import AjUploadMultipleCertificate from "../../../../Components/AjUploadMultipleCertificate/AjUploadMultipleCertificate";

const AddWareHouse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = getUserData();

  const [isSubmit, setIsSubmit] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const [chipValue, setChipValue] = useState([]);
  const [isChipValueUpdated, setIsChipValueUpdated] = useState(false);
  const [addWarehouseData, setAddWarehouseData] = useState({});
  const addWarehouseDataRef = useRef(addWarehouseData);
  const isDoneRef = useRef(false);

  const itemList = useSelector((state) => state.masterManagement.itemList);

  useEffect(() => {
    dispatch(getItemListAction(wareHouseFacilityListType));
  }, []);

  useEffect(() => {
    const { addressData, certificateData } = addWarehouseData;
    if (addressData && (certificateData || isUpdated)) {
      handleSubmit(onSubmit)();
      setIsSubmit(false);
    }
  }, [addWarehouseData, isUpdated]);

  useEffect(() => {
    if (isChipValueUpdated) {
      const productItems = [];
      chipValue.map((item) => {
        productItems.push(_.find(itemList.result, { name: item }).id);
      });
      setValue("addWareHouseFacilities", productItems, {
        shouldValidate: true,
      });
    }
  }, [chipValue]);

  const onChangeDropdownChipHandler = (event) => {
    const {
      target: { value },
    } = event;
    setIsChipValueUpdated(true);
    setChipValue(value);
  };

  const handleDelete = (value) => {
    setChipValue(chipValue.filter((name) => name !== value));
  };

  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addWareHouseSchema),
    mode: "onChange",
  });

  const addWarehouse = () => {
    setIsSubmit(true);
    isDoneRef.current = true;
    const submitData = getValues([
      "addWareHouseName",
      "addWareHouseStorageCapacity",
      "addWareHouseFacilities",
    ]);
    submitData.forEach((item) => {
      if (item === "") handleSubmit(onSubmit)();
    });
  };

  const updateState = (newState) => {
    addWarehouseDataRef.current = newState;
    setAddWarehouseData(newState);
    setIsSubmit(false);
  };

  const getAddressData = (data) => {
    updateState({ ...addWarehouseDataRef.current, addressData: data });
  };

  const getCertificatesDetails = (data) => {
    updateState({ ...addWarehouseDataRef.current, certificateData: data });
  };

  const onSubmit = (data) => {
    if (!isDoneRef.current) {
      return;
    }
    isDoneRef.current = false;
    const { addressData, certificateData } = addWarehouseData;
    if (!addressData) {
      return;
    }
    const addWarehouseDataToSend = {
      warehouseName: data.addWareHouseName,
      storageCapacity: parseInt(data.addWareHouseStorageCapacity),
      facilities: data.addWareHouseFacilities,
      addressLine1: addressData.addressLine1,
      country: parseInt(addressData.country),
      state: parseInt(addressData.state),
      city: addressData.city,
    };
    let certificatesData = [];
    if (certificateData?.length && certificateData[0]?.documentData) {
      certificateData.map((item) => {
        if (item.documentData)
          certificatesData = [
            ...certificatesData,
            {
              certificationTypeId: item.documentDataType.id,
              certificationDocumentId: item.documentData.id,
            },
          ];
      });
      if (certificatesData) {
        addWarehouseDataToSend["certificationDetails"] = certificatesData;
      }
    }

    if (addressData.addressLine2) {
      addWarehouseDataToSend["addressLine2"] = addressData.addressLine2;
    }
    if (addressData.zipCode) {
      addWarehouseDataToSend["zipCode"] = parseInt(addressData.zipCode);
    }
    dispatch(addWareHouseAction(addWarehouseDataToSend, navigate));
    setIsSubmit(false);
  };

  const backArrowHandler = () => {
    navigate(WAREHOUSES);
  };

  return (
    <Grid container sx={commonStyles.signupFormMainGridContainer}>
      <Box sx={commonStyles.relativePosition}>
        <IconButton
          disableRipple
          sx={commonStyles.backButtonPosition}
          onClick={backArrowHandler}
        >
          {" "}
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
            styleData={commonStyles.mainHeading}
            displayText="Add Warehouse"
          />
          <Grid sx={styles.addWareHouseContainer}>
            <Grid
              container
              columnSpacing={"1.25rem"}
              sx={commonStyles.marginTop20}
            >
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <AjInputLabel
                  displayText="Warehouse name"
                  required
                  styleData={commonStyles.inputLabel}
                />
                <InputBase
                  required
                  placeholder="Enter warehouse name"
                  fullWidth
                  id="addWareHouseName"
                  name="addWareHouseName"
                  sx={commonStyles.inputStyle}
                  {...register("addWareHouseName")}
                  error={errors.addWareHouseName ? true : false}
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.addWareHouseName?.message}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}>
                <AjInputLabel
                  displayText="Storage Capacity (metric ton)"
                  required
                  styleData={commonStyles.inputLabel}
                />
                <InputBase
                  required
                  fullWidth
                  placeholder="Enter storage"
                  id="addWareHouseStorageCapacity"
                  name="addWareHouseStorageCapacity"
                  sx={commonStyles.inputStyle}
                  {...register("addWareHouseStorageCapacity")}
                  error={errors.addWareHouseStorageCapacity ? true : false}
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.addWareHouseStorageCapacity?.message}
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              sx={commonStyles.marginTop20}
            >
              <AjInputLabel
                displayText="Available Facilities"
                required
                id="addWareHouseFacilities"
                name="addWareHouseFacilities"
                styleData={commonStyles.inputLabel}
              />
              <AjChipDropdown
                value={chipValue}
                onChange={onChangeDropdownChipHandler}
                fullWidth
                onDelete={handleDelete}
                source="name"
                options={itemList.result}
                styleData={commonStyles.multiSelectChipDropDown}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.addWareHouseFacilities?.message}
              />
            </Grid>
            <AjUploadMultipleCertificate
              submit={isSubmit}
              type="warehouse_certificate"
              data={getCertificatesDetails}
              isRequired={false}
              isUpdated={setIsUpdated}
            />
            <Grid container sx={commonStyles.spaceBetween}>
              <AjAdress
                customStyle={commonStyles.marginTop20}
                submit={isSubmit}
                data={getAddressData}
                defaultCountry={userData?.countryId}
              />
            </Grid>
            <Grid sx={styles.addWareHouseSaveBtnContainer}>
              <AjButton
                onClick={addWarehouse}
                variant="contained"
                displayText="Add Warehouse"
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddWareHouse;
