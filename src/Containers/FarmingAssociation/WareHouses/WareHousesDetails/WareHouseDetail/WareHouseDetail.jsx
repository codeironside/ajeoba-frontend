import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Box, InputBase } from "@mui/material";
import * as _ from "lodash";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import AjAdress from "../../../../../Components/AjAdress/AjAdress";
import AjButton from "../../../../../Components/AjButton";
import AjInputLabel from "../../../../../Components/AjInputLabel";
import AjChipDropdown from "../../../../../Components/AjChipDropdown";
import AjTypography from "../../../../../Components/AjTypography";
import TableActions from "../../../../../Components/TableActions/TableActions";

import { getStatus } from "../../../../../Services/commonService/commonService";
import { wareHouseFacilityListType } from "../../../../../Constant/AppConstant";
import { getItemListAction } from "../../../../../Redux/SuperAdmin/MasterManagement/masterManagementActions";
import {
  toggleWareHouseStatusAction,
  editWareHouseDetailsByIdAction,
  getWareHouseDetailsByIdAction,
} from "../../../../../Redux/WareHouses/wareHouseActions";
import { WAREHOUSES } from "../../../../../Routes/Routes";

import { detailWareHouseSchema } from "../../../../../validationSchema/detailWarehouseSchema";
import { styles } from "./WareHouseDetailStyles";
import { commonStyles } from "../../../../../Style/CommonStyle";
import AjUploadMultipleCertificate from "../../../../../Components/AjUploadMultipleCertificate/AjUploadMultipleCertificate";
import { showToast } from "../../../../../Services/toast";

const WareHouseDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [isSubmit, setIsSubmit] = useState(false);
  const [chipValue, setChipValue] = useState([]);
  const [edit, setEdit] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [editWarehouseData, setEditWarehouseData] = useState({});
  const editWarehouseDataRef = useRef(editWarehouseData);
  const isDoneRef = useRef(false);

  const facilityList = useSelector((state) => state.masterManagement.itemList);
  const wareHouseDetailsById = useSelector(
    (state) => state.wareHouse.wareHouseDetails
  );
  useEffect(() => {
    if (location.pathname.includes("edit")) setEdit(true);
    dispatch(getWareHouseDetailsByIdAction(id));
    dispatch(getItemListAction(wareHouseFacilityListType));
  }, [id]);

  useEffect(() => {
    if (facilityList?.result && wareHouseDetailsById) {
      setTimeout(() => {
        updateFacilityChipValue();
      });
    }
    if (wareHouseDetailsById) {
      updateValues();
    }
  }, [facilityList?.result, wareHouseDetailsById]);

  useEffect(() => {
    const facilities = [];
    chipValue.map((item) => {
      facilities.push(_.find(facilityList?.result, { name: item }).id);
    });
    setValue("detailWareHouseFacilities", facilities, {
      shouldValidate: true,
    });
  }, [chipValue]);

  useEffect(() => {
    const { addressData, certificateData } = editWarehouseData;
    if (addressData && certificateData) {
      handleSubmit(onSubmit)();
      setIsSubmit(false);
    }
  }, [editWarehouseData]);

  const updateValues = () => {
    setValue(
      "detailWareHouseName",
      wareHouseDetailsById?.warehouseDetail?.warehouse_name
    );
    setValue(
      "detailWareHouseStorageCapacity",
      wareHouseDetailsById?.warehouseDetail?.storage_capacity
    );
  };

  const updateFacilityChipValue = () => {
    if (wareHouseDetailsById?.warehouseDetail?.facilities) {
      const facilities = [];
      wareHouseDetailsById.warehouseDetail.facilities.forEach((item) => {
        facilities.push(_.find(facilityList.result, { id: item }).name);
      });
      setChipValue(facilities);
    }
  };
  const editWarehouse = () => {
    setIsSubmit(true);
    isDoneRef.current = true;
  };

  const updateState = (newState) => {
    editWarehouseDataRef.current = newState;
    setEditWarehouseData(newState);
    setIsSubmit(false);
  };

  const certDefaultdata = () => {
    return wareHouseDetailsById?.certificationDetails?.map((certificate) => {
      const {
        certification_document_id,
        certification_type_id,
        file_name,
        item_name,
      } = certificate;
      return {
        documentData: {
          id: certification_document_id,
          file_name: file_name,
        },
        documentDataType: {
          id: certification_type_id,
          name: item_name,
        },
      };
    });
  };
  const getCertificatesDetails = (data) => {
    if (data) {
      updateState({ ...editWarehouseDataRef.current, certificateData: data });
    } else {
      showToast("Certificate is required", "error");
    }
  };

  const detailOnChangeDropdownChipHandler = (event) => {
    const {
      target: { value },
    } = event;
    setChipValue(value);
  };

  const detailHandleDeleteChip = (value) => {
    setChipValue(chipValue.filter((name) => name !== value));
  };

  const {
    register,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(detailWareHouseSchema),
    mode: "onChange",
  });

  const getAddressData = (data) => {
    updateState({ ...editWarehouseDataRef.current, addressData: data });
  };

  const onSubmit = (data) => {
    if (!isDoneRef.current) {
      return;
    }
    isDoneRef.current = false;
    const { addressData, certificateData } = editWarehouseData;
    if (!addressData || !certificateData[0]?.documentData) {
      return;
    }
    const edittedWareHouseData = {
      warehouseName: data.detailWareHouseName,
      storageCapacity: parseInt(data.detailWareHouseStorageCapacity),
      facilities: data.detailWareHouseFacilities,
      addressLine1: addressData.addressLine1,
      country: parseInt(addressData.country),
      state: parseInt(addressData.state),
      city: addressData.city,
      zipCode: parseInt(addressData.zipCode),
      addressLine2: addressData.addressLine2,
    };
    if (certificateData[0]?.documentData) {
      const certificatesData = certificateData?.map((item) => {
        return {
          certificationTypeId: item.documentDataType.id,
          certificationDocumentId: item.documentData.id,
        };
      });
      if (certificatesData) {
        edittedWareHouseData["certificationDetails"] = certificatesData;
      }
    }
    dispatch(editWareHouseDetailsByIdAction(id, edittedWareHouseData));
    setEdit(false);
    navigate(`${WAREHOUSES}/detail/${id}`);
  };

  const wareHouseDetailHandleEdit = () => {
    setEdit(true);
    setCancel(false);
    navigate(`${WAREHOUSES}/edit/${id}`);
  };

  const wareHouseDetailHandleCancel = () => {
    setEdit(false);
    setCancel(true);
    clearErrors();
    updateFacilityChipValue();
    updateValues();
    navigate(`${WAREHOUSES}/detail/${id}`);
  };

  const options = [
    {
      name: "Active",
      actionClickHandler: (userId) =>
        dispatch(toggleWareHouseStatusAction(userId, true)),
    },
    {
      name: "Inactive",
      actionClickHandler: (userId) =>
        dispatch(toggleWareHouseStatusAction(userId, false)),
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
          ...styles.statusEditContainer,
          ...(!edit && styles.shiftContainer),
        }}
      >
        <Box sx={styles.statusUpdate}>
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
              wareHouseDetailsById?.warehouseDetail?.is_active
                ? "ACTIVE"
                : "INACTIVE"
            )}
          />
        </Box>
        <Box>
          {!edit && (
            <AjButton
              onClick={wareHouseDetailHandleEdit}
              styleData={styles.wareHouseDetailEditBtn}
              variant="outlined"
              displayText="Edit Details"
            />
          )}
        </Box>
      </Box>
      <Box
        sx={{
          ...commonStyles.signupContentContainer,
          ...styles.responsiveBox,
        }}
      >
        <Grid sx={styles.detailWareHouse}>
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
                id="detailWareHouseName"
                name="detailWareHouseName"
                readOnly={!edit}
                sx={{
                  ...commonStyles.inputStyle,
                  ...(!edit && commonStyles.disableInput),
                }}
                {...register("detailWareHouseName")}
                error={errors.detailWareHouseName ? true : false}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={edit && errors.detailWareHouseName?.message}
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
                id="detailWareHouseStorageCapacity"
                name="detailWareHouseStorageCapacity"
                readOnly={!edit}
                sx={{
                  ...commonStyles.inputStyle,
                  ...(!edit && commonStyles.disableInput),
                }}
                {...register("detailWareHouseStorageCapacity")}
                error={errors.detailWareHouseStorageCapacity ? true : false}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={
                  edit && errors.detailWareHouseStorageCapacity?.message
                }
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
              id="detailWareHouseFacilities"
              name="detailWareHouseFacilities"
              styleData={commonStyles.inputLabel}
            />
            <AjChipDropdown
              value={chipValue}
              onChange={detailOnChangeDropdownChipHandler}
              fullWidth
              onDelete={detailHandleDeleteChip}
              source="name"
              options={facilityList.result}
              sx={{
                ...commonStyles.multiSelectChipDropDown,
                ...(!edit && commonStyles.disableInput),
              }}
              isReadOnly={!edit}
            />
            <AjTypography
              styleData={commonStyles.errorText}
              displayText={edit && errors.detailWareHouseFacilities?.message}
            />
          </Grid>
          {(!!wareHouseDetailsById?.certificationDetails?.length || edit) && (
            <AjUploadMultipleCertificate
              submit={isSubmit}
              isDisable={!edit}
              isRequired={true}
              data={getCertificatesDetails}
              defaultValue={
                !!wareHouseDetailsById?.certificationDetails?.length
                  ? certDefaultdata
                  : ""
              }
              type="warehouse_certficate"
              reset={cancel}
            />
          )}
          <Grid container sx={commonStyles.spaceBetween}>
            {wareHouseDetailsById?.warehouseDetail && (
              <AjAdress
                submit={isSubmit}
                data={getAddressData}
                isDisable={!edit}
                reset={cancel}
                customStyle={commonStyles.marginTop20}
                defaultAddressLine1={
                  wareHouseDetailsById?.warehouseDetail?.address_1
                }
                defaultAddressLine2={
                  wareHouseDetailsById?.warehouseDetail?.address_2
                }
                defaultCity={wareHouseDetailsById?.warehouseDetail?.city}
                defaultZipCode={wareHouseDetailsById?.warehouseDetail?.zip_code}
                defaultCountry={wareHouseDetailsById?.warehouseDetail?.country}
                defaultState={wareHouseDetailsById?.warehouseDetail?.state}
              />
            )}
          </Grid>
          <Grid
            sx={{
              ...commonStyles.centerContainerContent,
              ...styles.btnContainer,
            }}
          >
            {edit && (
              <>
                <AjButton
                  onClick={wareHouseDetailHandleCancel}
                  styleData={commonStyles.cancelBtnStyle}
                  variant="outlined"
                  displayText="Cancel"
                />
                <AjButton
                  onClick={editWarehouse}
                  variant="contained"
                  displayText="Save Changes"
                />
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default WareHouseDetail;
