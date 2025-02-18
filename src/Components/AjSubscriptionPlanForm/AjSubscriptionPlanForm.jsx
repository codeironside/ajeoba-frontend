import React, { useEffect, useState } from "react";
import { Box, InputBase } from "@mui/material";
import { commonStyles } from "../../Style/CommonStyle";
import AjInputLabel from "../AjInputLabel";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import AjTypography from "../AjTypography";
import AjDropDown from "../AjDropdown/AjDropDown";
import { useDispatch, useSelector } from "react-redux";
import { getUserRoles } from "../../Redux/UserRoleSelection/userRoleSelectionActions";
import { statusOptions } from "../../Constant/AppConstant";
import { CreateSubscriptionSchema } from "../../validationSchema/createSubscriptionSchema";
import { styles } from "./AjSubscriptionPlanFormStyles.js";
import { getCurrencySymbol } from "../../Services/commonService/commonService";
import NumberFormat from "react-number-format";

const AjSubscriptionPlanForm = (props) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateSubscriptionSchema),
    mode: "onChange",
  });
  const userRoleMenuOptions = useSelector(
    (state) => state.userRoleSelection.userRoleMenuOptions
  );
  const dispatch = useDispatch();
  const [selectedUserRole, setSelectedUserRole] = useState();
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[1]);
  const [tempUserRole, setTempUserRole] = useState();
  useEffect(() => {
    if (props.submit) {
      handleSubmit(onSubmit, onError)();
    }
  }, [props.submit]);

  const onError = (err) => {
    props.data(null);
  };

  const onSubmit = (data) => {
    const status = selectedStatus.value === "ACTIVE" ? true : false;
    props.data({ ...data, status });
  };

  useEffect(() => {
    dispatch(getUserRoles());
  }, []);

  useEffect(() => {
    if (userRoleMenuOptions) {
      setTempUserRole(
        userRoleMenuOptions?.filter(
          (item) =>
            item.name === "QA Company" || item.name === "Logistics Company" || item.name === "Farming Association"
        )
      );
    }
  }, [userRoleMenuOptions]);

  const userRoleChangeHandler = (selectedOption) => {
    setSelectedUserRole(selectedOption.target.value);
    setValue("userRole", selectedOption.target.value, { shouldValidate: true });
  };

  const statusChangeHandler = (selectionOption) => {
    setSelectedStatus(selectionOption.target.value);
    setValue("status", selectionOption.target.value);
  };

  return (
    <>
      <Box sx={commonStyles.signupFormFieldContainer}>
        <AjInputLabel
          required={true}
          styleData={commonStyles.inputLabel}
          displayText="Plan name"
        />
        <InputBase
          required
          id="planName"
          name="planName"
          placeholder="Enter your plan name"
          sx={commonStyles.inputStyle}
          {...register("planName")}
          error={errors.planName ? true : false}
        />
        <AjTypography
          styleData={commonStyles.errorText}
          displayText={errors.planName?.message}
        />
      </Box>
      <Box sx={commonStyles.signupFormFieldContainer}>
        <AjInputLabel
          required={true}
          styleData={commonStyles.inputLabel}
          displayText="User Role Selection"
        />
        <AjDropDown
          options={tempUserRole}
          value={selectedUserRole}
          onChange={userRoleChangeHandler}
          source="name"
          placeHolder="Select User Role"
          disableSourceForValue
          isPlaceholder={true}
          styleData={styles.dropdownContainer}
        />
        <AjTypography
          styleData={commonStyles.errorText}
          displayText={errors.userRole?.message}
        />
      </Box>
      <Box sx={commonStyles.signupFormFieldContainer}>
        <AjInputLabel
          required={true}
          styleData={commonStyles.inputLabel}
          displayText={`Cost Price ${
            getCurrencySymbol(props.currency)
              ? getCurrencySymbol(props.currency)
              : ""
          }(${props.currency ? props.currency : ""})`}
        />
        <NumberFormat
          customInput={InputBase}
          thousandSeparator={true}
          prefix={`${
            getCurrencySymbol(props.currency)
              ? getCurrencySymbol(props.currency)
              : ""
          } `}
          style={{
            ...commonStyles.inputStyle,
          }}
          placeholder="Enter Price"
          decimalScale={2}
          onValueChange={(value) =>
            setValue("cost", value.value, { shouldValidate: true })
          }
        />
        <AjTypography
          styleData={commonStyles.errorText}
          displayText={errors.cost?.message}
        />
      </Box>
      <Box sx={commonStyles.signupFormFieldContainer}>
        <AjInputLabel
          required={true}
          styleData={commonStyles.inputLabel}
          displayText="Duration(months)"
        />
        <InputBase
          required
          id="duration"
          name="duration"
          type="number"
          placeholder="Enter your duration"
          sx={commonStyles.inputStyle}
          {...register("duration")}
          error={errors.duration ? true : false}
        />
        <AjTypography
          styleData={commonStyles.errorText}
          displayText={errors.duration?.message}
        />
      </Box>
      <Box sx={commonStyles.signupFormFieldContainer}>
        <AjInputLabel
          required={true}
          styleData={commonStyles.inputLabel}
          displayText="Status"
        />
        <AjDropDown
          options={[statusOptions[0], statusOptions[1]]}
          value={selectedStatus}
          onChange={statusChangeHandler}
          source="label"
          disableSourceForValue
          isPlaceholder={true}
          styleData={styles.dropdownContainer}
        />
      </Box>
      <Box
        sx={[commonStyles.signupFormFieldContainer, commonStyles.fixedWidth]}
      >
        <AjInputLabel
          required={true}
          styleData={commonStyles.inputLabel}
          displayText="Description"
        />

        <InputBase
          required
          id="description"
          name="description"
          placeholder="Enter your description"
          sx={commonStyles.inputStyle}
          {...register("description")}
          error={errors.description ? true : false}
        />
        <AjTypography
          styleData={commonStyles.errorText}
          displayText={errors.description?.message}
        />
      </Box>
    </>
  );
};

export default AjSubscriptionPlanForm;
