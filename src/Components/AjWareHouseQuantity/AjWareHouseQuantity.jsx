import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IconButton, InputBase } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";

import AjTypography from "../AjTypography";
import AjInputLabel from "../AjInputLabel";
import AjDropDown from "../AjDropdown/AjDropDown";

import { styles as batchStyles } from "../../Containers/FarmingAssociation/Inventory/Batches/CreateBatches/CreateBatchStyles";
import { styles } from "../AjMultipleWarehouse/AjMultipleWarehouseStyles";
import { commonStyles } from  "../../Style/CommonStyle";

const wareHouseQuantitySchema = Yup.object().shape({
  wareHouseQuantity: Yup.number()
    .required("Quantity is required")
    .typeError("Quantity is required")
    .test("min", `Quanity should be minimum of 0.01 unit`, function (val) {
      return val >= 0.01;
    })
    .test("max", `Quanity can be maximum of 1000000 unit`, function (val) {
      return val <= 1000000;
    }),
});

const AjWareHouseQuantity = (props) => {
  const [quantity, setQuantity] = useState();
  const [warehouseData, setWarehouseData] = useState();

  const {
    register,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(wareHouseQuantitySchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (props.defaultValue?.warehouseData) {
      setWarehouseData(props.defaultValue.warehouseData);
      setQuantity(props.defaultValue.quantity);
      setValue("wareHouseQuantity", props?.defaultValue?.quantity);
    } else if (props.wareHouseData && props.wareHouseData.length) {
      setWarehouseData(props.wareHouseData[0]);
      props.onChange(
        {
          quantity: null,
          warehouseData: props.wareHouseData[0],
        },
        0
      );
    } else if (!props.wareHouseData) {
      clearErrors();
      setValue("wareHouseQuantity", "");
      setQuantity(undefined);
      setWarehouseData(undefined);
    }
  }, [props.defaultValue, props.wareHouseData]);

  useEffect(() => {
    if (!props.wareHouseData && !props.wareHouseData?.length) {
      setWarehouseData();
    }
  }, [
    props.selectedProductDetails,
    props.selectedQualityType,
    props.selectedProductType,
  ]);

  const wareHouseChangeHandler = (selectedDocument) => {
    setValue("wareHouseQuantity", "");
    setWarehouseData(selectedDocument.target.value);
    props.onChange(
      {
        quantity: quantity,
        warehouseData: selectedDocument.target.value,
      },
      props.index
    );
  };

  const quantityHandler = (data) => {
    setQuantity(data.target.value);
    setValue("wareHouseQuantity", data.target.value, { shouldValidate: true });
    props.quantityData(data.target.value);
    props.onChange(
      {
        quantity: data.target.value,
        warehouseData: warehouseData,
      },
      props.index
    );
  };

  const deleteHandler = () => {
    if (props.index === 0 && props.length === 1) {
      setQuantity(null);
      props.onChange({
        quantity: null,
        warehouseData: warehouseData,
      });
      setValue("wareHouseQuantity", "");
    } else {
      props.onDelete();
    }
  };

  useEffect(() => {
    if (quantity) {
      setValue("wareHouseQuantity", quantity, { shouldValidate: true });
    }
  }, []);
  useEffect(() => {
    if (props.submit) {
      handleSubmit()();
    }
  }, [props.submit]);

  return (
    <Box key={props.index} sx={batchStyles.batchFields}>
      <Box
        sx={{
          ...commonStyles.signupFormFieldContainer,
          ...commonStyles.fieldTopMargin,
        }}
      >
        {props.isLabel ? (
          <AjInputLabel
            displayText="Warehouse Name"
            required
            styleData={commonStyles.inputLabel}
          />
        ) : (
          ""
        )}
        <AjDropDown
          options={props.wareHouseData}
          value={warehouseData || null}
          onChange={wareHouseChangeHandler}
          source="wareHouseName"
          placeHolder="Select warehouse name"
          disableSourceForValue
          readOnly={
            !warehouseData ||
            warehouseData?.length === 1 ||
            props.index < props.length - 1
              ? true
              : false
          }
          styleData={{
            ...commonStyles.ajDropDownEllipsis,
            ...((!warehouseData ||
              warehouseData?.length === 1 ||
              props.index < props.length - 1) &&
              commonStyles.disableInput),
          }}
          isPlaceholderCapiltalize={false}
        />
        <AjTypography styleData={commonStyles.errorText} />
      </Box>
      <Box
        sx={{
          ...commonStyles.signupFormFieldContainer,
          ...batchStyles.fieldInputResponsive,
        }}
      >
        {props.isLabel ? (
          <AjInputLabel
            displayText={`Quantity ${
              props.selectedProductUnit ? `(${props.selectedProductUnit})` : ""
            }`}
            required
            styleData={commonStyles.inputLabel}
          />
        ) : (
          ""
        )}
        <InputBase
          required
          type="number"
          placeholder="Enter quantity"
          fullWidth
          id="aggregationQuantity"
          name="aggregationQuantity"
          sx={{
            ...commonStyles.inputStyle,
            ...((!warehouseData || warehouseData?.length === 1) &&
              commonStyles.disableInput),
          }}
          {...register("wareHouseQuantity", {
            onChange: quantityHandler,
          })}
          readOnly={!warehouseData || warehouseData?.length === 1}
          error={errors?.wareHouseQuantity}
        />
        <AjTypography
          styleData={commonStyles.errorText}
          displayText={warehouseData && errors.wareHouseQuantity?.message}
        />
      </Box>
      {props.selectedBatchType === "WHOLESALE" && quantity && props.length > 1 && (
        <IconButton
          disableRipple
          sx={styles.deleteBtnStyle}
          onClick={deleteHandler}
        >
          <DeleteIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default AjWareHouseQuantity;
