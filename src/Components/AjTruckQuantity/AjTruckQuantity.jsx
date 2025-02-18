import React, { useState, useEffect } from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import { commonStyles } from "../../Style/CommonStyle";
import AjInputLabel from "../AjInputLabel";
import AjDropDown from "../AjDropdown/AjDropDown";
import AjTypography from "../AjTypography";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { styles as batchStyles } from "../../Containers/FarmingAssociation/Inventory/Batches/CreateBatches/CreateBatchStyles";
import { styles } from "../AjMultipleWarehouse/AjMultipleWarehouseStyles";
import { selectTruckStyles } from "./AjTruckQuantityStyles";

const truckCountSchema = Yup.object().shape({
  truckCount: Yup.number()
    .required("Number of truck is required")
    .typeError("Number of truck is required")
    .test(
      "min",
      `This value should be more than 1 and less than 1000`,
      function (val) {
        return val > 0;
      }
    )
    .test(
      "min",
      `This value should be more than 1 and less than 1000`,
      function (val) {
        return val <= 1000;
      }
    ),
});

const AjTruckQuantity = (props) => {
  const {
    register,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(truckCountSchema),
    mode: "onChange",
  });
  const { masterData, disableReq } = props;
  const [particularTruckCount, setParticularTruckCount] = useState();
  const [particularTruckData, setParticularTruckData] = useState();

  useEffect(() => {
    if (props.defaultValue?.truckData) {
      setParticularTruckData(props.defaultValue.truckData);
      setParticularTruckCount(props.defaultValue.truckCount);
    } else if (props.masterData && props.masterData.length) {
      setParticularTruckData(props.masterData[0]);
      props.onChange(
        {
          truckData: props.masterData[0],
          truckCount: null,
        },
        props.index
      );
    }
  }, [props.defaultValue, props.masterData]);

  const truckCountHandler = (data) => {
    setParticularTruckCount(data.target.value);
    setValue("truckCount", data.target.value, { shouldValidate: true });
    props.truckCountData(data.target.value);
    props.onChange(
      {
        truckData: particularTruckData,
        truckCount: data.target.value,
      },
      props.index
    );
  };
  const truckChangeHandler = (selectedDocument) => {
    setValue("truckCount", "");
    setParticularTruckData(selectedDocument.target.value);
    props.onChange(
      {
        truckData: selectedDocument.target.value,
        truckCount: particularTruckCount,
      },
      props.index
    );
  };

  const deleteHandler = () => {
    clearErrors();
    if (props.index === 0 && props.length === 1) {
      setParticularTruckCount(null);
      props.onChange({
        truckData: particularTruckData,
        truckCount: null,
      });
      setValue("truckCount", "");
    } else {
      props.onDelete({
        truckData: particularTruckData,
        truckCount: particularTruckCount,
      });
    }
  };

  useEffect(() => {
    if (disableReq) {
      clearErrors();
    }
  }, [disableReq]);

  return (
    <>
      <Box
        key={props.index}
        sx={[
          batchStyles.batchFields,
          selectTruckStyles.selectTypeCountContainer,
        ]}
      >
        <Box
          sx={{
            ...commonStyles.fieldTopMargin,
            ...selectTruckStyles.truckDropdown,
          }}
        >
          {props.isLabel ? (
            <AjInputLabel
              displayText="Truck Name"
              required
              styleData={commonStyles.inputLabel}
            />
          ) : (
            ""
          )}
          <AjDropDown
            options={masterData}
            value={particularTruckData}
            onChange={truckChangeHandler}
            source="name"
            placeHolder="Select truck name"
            defaultValue={particularTruckData?.name}
            disableSourceForValue
            readOnly={particularTruckCount ? true : false}
            styleData={{
              ...commonStyles.ajDropDownEllipsis,
              ...selectTruckStyles.customDropdown,
            }}
            isPlaceholderCapiltalize={false}
          />
          <AjTypography styleData={commonStyles.errorText} />
        </Box>
        <Box
          sx={{
            ...commonStyles.signupFormFieldContainer,
            ...batchStyles.fieldInputResponsive,
            ...selectTruckStyles.truckDropdown,
          }}
        >
          {props.isLabel ? (
            <AjInputLabel
              displayText="Number of Truck"
              required
              styleData={commonStyles.inputLabel}
            />
          ) : (
            ""
          )}
          <InputBase
            required
            type="number"
            placeholder="Enter number of trucks"
            fullWidth
            id="truckCount"
            name="truckCount"
            value={particularTruckCount}
            sx={{
              ...commonStyles.inputStyle,
              ...(disableReq && commonStyles.disableInput),
            }}
            {...register("truckCount", {
              onChange: truckCountHandler,
            })}
            readOnly={
              !particularTruckData ||
              particularTruckData?.length === 1 ||
              disableReq
            }
            error={errors?.truckCount}
          />
          <AjTypography
            styleData={commonStyles.errorText}
            displayText={errors.truckCount?.message}
          />
        </Box>

        {particularTruckCount && (
          <IconButton
            disableRipple
            sx={[styles.deleteBtnStyle, selectTruckStyles.deleteIcon]}
            onClick={deleteHandler}
            disabled={disableReq}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
    </>
  );
};

export default AjTruckQuantity;
