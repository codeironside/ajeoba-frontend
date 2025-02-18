import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as _ from "lodash";
import { Grid, InputBase } from "@mui/material";

import AjTypography from "../AjTypography";
import AjInputLabel from "../AjInputLabel";
import AjButton from "../AjButton";

import { commonStyles } from "../../Style/CommonStyle";
import { styles } from "./AjAddProductStyle";
import AjDropDown from "../AjDropdown/AjDropDown";
import { isEnabledOption } from "../../Constant/AppConstant";
import { getUserData } from "../../Services/localStorageService";
import { ROLES } from "../../Constant/RoleConstant";

function AjAddProduct(props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(props.schema),
    mode: "onChange",
  });
  const roleId = getUserData().role_id;
  let selectedValue = _.find(props.isEnabledOption, {
    value: props.commissionDropDownValue,
  });
  let selectedValueEdit = _.find(props.dropDownOptions, {
    value: props.dropDownValue,
  })

  useEffect(() => {
    if (ROLES.ADMIN === roleId) {
      setValue("option", "1");
    } else {
      setValue("option", "2");
    }
  }, [roleId])
  

  const [measurementDropDown, setMeasurementDropDown] = useState();
  const [isCommissionEnabledDropDown, setIsCommissionEnabledDropDown] =
    useState();

  useEffect(() => {
    selectedValueEdit = _.find(props.dropDownOptions, {
      value: props.dropDownValue,
    });
    selectedValue = _.find(props.isEnabledOption, {
      value: props.commissionDropDownValue,
    });
    if (props.editableState) {
      setValue(`${props.inputId}`, props.productName, {
        shouldValidate: true,
      });
      setValue(`${props.quantityInputId}`, props.quantityInputName, {
        shouldValidate: true,
      });
      setValue(`${props.commissionInputId}`, props.commissionInputName, {
        shouldValidate: true,
      });
      setMeasurementDropDown(selectedValueEdit?.value);
      setIsCommissionEnabledDropDown(selectedValue?.value);
    }
  }, [
    props.productName,
    props.dropDownValue,
    props.editableState,
    props.quantityInputName,
    props.commissionInputName,
    props.commissionDropDownValue,
  ]);

  const dropDownChangeHandler = (e, selectedDropDown) => {
    const selectedValues = _.find(props.dropDownOptions, {
      label: selectedDropDown.props.value,
    }).value;
    setMeasurementDropDown(selectedValues);
  };

  const isCommissionEnabledDropDownChangeHandler = (e) => {
    const selectedValues = _.find(isEnabledOption, {
      label: e.target.value,
    }).value;
    setIsCommissionEnabledDropDown(selectedValues);
  };

  return (
    <>
      <Grid container sx={styles.itemContainer}>
        <Grid item sx={styles.gridStyle}>
          <AjInputLabel
            required={true}
            styleData={commonStyles.inputLabel}
            displayText={props.inputLabelName}
          />
          <InputBase
            required
            id={props.inputId}
            name={props.inputId}
            placeholder={props.inputPlaceholder}
            sx={commonStyles.inputStyle}
            {...register(props.inputId)}
            error={
              errors.productName || errors.itemName || errors.inputName
                ? true
                : false
            }
          />
          <AjTypography
            styleData={commonStyles.errorText}
            displayText={
              (errors.productName || errors.itemName || errors.inputName)
                ?.message
            }
          />
        </Grid>
        <Grid item sx={styles.gridStyle}>
          <AjInputLabel
            required={true}
            styleData={commonStyles.inputLabel}
            displayText={props.searchInputLabelName}
          />
          <AjDropDown
            options={props.dropDownOptions}
            value={measurementDropDown}
            onChange={dropDownChangeHandler}
            source="label"
            defaultValue={
              props.editableState
                ? selectedValueEdit?.label
                : props.dropDownOptions[0].label
            }
            styleData={styles.dropDownResponsive}
          />
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ ...styles.itemContainer, ...commonStyles.marginTop20 }}
      >
        {props?.quantityInputLabel ? (
          <Grid item sx={styles.gridStyle}>
            <AjInputLabel
              required={true}
              styleData={commonStyles.inputLabel}
              displayText={props.quantityInputLabel}
            />
            <InputBase
              required
              id={props.quantityInputId}
              name={props.quantityInputId}
              placeholder={props.quantityInputPlaceholder}
              sx={{
                ...commonStyles.inputStyle,
              }}
              {...register(props.quantityInputId)}
              error={
                ROLES.SUPER_ADMIN === roleId &&
                (errors?.quantity || errors?.inputQuantity)
                  ? true
                  : false
              }
            />
            <AjTypography
              styleData={commonStyles.errorText}
              displayText={
                ROLES.SUPER_ADMIN !== roleId
                  ? ""
                  : errors.quantity?.message || errors.inputQuantity?.message
              }
            />
          </Grid>
        ) : (
          ""
        )}
        {props?.commissionInputLabel ? (
          <Grid item sx={styles.gridStyle}>
            <AjInputLabel
              required={true}
              styleData={commonStyles.inputLabel}
              displayText={props.commissionInputLabel}
            />
            <InputBase
              required
              id={props.commissionInputId}
              name={props.commissionInputId}
              placeholder={props.commissionInputPlaceholder}
              sx={{
                ...commonStyles.inputStyle,
              }}
              {...register(props.commissionInputId)}
              error={
                ROLES.SUPER_ADMIN === roleId &&
                (errors.Commission || errors.inputCommission)
                  ? true
                  : false
              }
            />
            <AjTypography
              styleData={commonStyles.errorText}
              displayText={
                ROLES.SUPER_ADMIN !== roleId
                  ? ""
                  : errors.Commission?.message ||
                    errors.inputCommission?.message
              }
            />
          </Grid>
        ) : (
          ""
        )}
      </Grid>
      <Grid
        container
        sx={{ ...styles.itemContainer, ...commonStyles.marginTop20 }}
      >
        {props?.fourthInputLabel ? (
          <Grid item sx={styles.gridStyle}>
            <AjInputLabel
              required={true}
              styleData={commonStyles.inputLabel}
              displayText={props.fourthInputLabel}
            />
            <AjDropDown
              options={props.isEnabledOption}
              value={isCommissionEnabledDropDown}
              productTypeStyle={commonStyles.productTypeStyle}
              onChange={isCommissionEnabledDropDownChangeHandler}
              source="label"
              placeHolder="Select is commission enabled"
              isPlaceholderCapiltalize={false}
              defaultValue={
                props.editableState
                  ? selectedValue?.label
                  : props.isEnabledOption[1].label
              }
            />
          </Grid>
        ) : (
          ""
        )}
      </Grid>

      <Grid sx={styles.btnContainer} container>
        <AjButton
          variant="contained"
          styleData={styles.nextBtnStyle}
          displayText={props.editableState ? "Save Changes " : "Add"}
          onClick={handleSubmit((data) =>
            props.onSubmit({
              ...data,
              measurementDropDown,
              isCommissionEnabledDropDown,
            })
          )}
        />
      </Grid>
    </>
  );
}

export default AjAddProduct;
