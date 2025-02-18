import React, { useState, useEffect } from "react";
import AjTypography from "../AjTypography";
import AjInputLabel from "../AjInputLabel";
import Box from "@mui/material/Box";
import { InputBase } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { commonStyles } from "../../Style/CommonStyle";
import { genderOptions } from "../../Constant/AppConstant";
import AjDatePicker from "../AjDatePicker";
import AjRadioOptions from "../AjRadioOptions";
import { CommonPersonalDetailsSchema } from "../../validationSchema/commonPersonalDetailsSchema";

const AjPersonalDetails = (props) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CommonPersonalDetailsSchema),
    mode: "onChange",
  });

  const [gender, setGender] = useState(genderOptions[0].value);
  const [dateOfBirth, setDateOfBirth] = useState(null);

  useEffect(() => {
    if (dateOfBirth !== null)
      setValue("dateOfBirth", dateOfBirth, { shouldValidate: true });
    setValue("gender", gender, { shouldValidate: true });
  }, [gender, dateOfBirth]);

  useEffect(() => {
    setValues();
  }, []);

  useEffect(() => {
    if (props.reset) {
      setValues();
    }
  }, [props.reset]);

  const setValues = () => {
    if (props.defaultFirstName) {
      setValue("firstName", props.defaultFirstName, { shouldValidate: true });
    }
    if (props.defaultLastName) {
      setValue("lastName", props.defaultLastName, { shouldValidate: true });
    }
    if (props.defaultGender) {
      setValue("gender", props.defaultGender || gender, {
        shouldValidate: true,
      });
      setGender(props.defaultGender);
    }
    if (props.defaultDateOfBirth) {
      setValue("dateOfBirth", props.defaultDateOfBirth || dateOfBirth, {
        shouldValidate: true,
      });
      setDateOfBirth(props.defaultDateOfBirth);
    }
  };

  useEffect(() => {
    if (props.submit) {
      handleSubmit(onSubmit, onError)();
    }
  }, [props.submit]);

  const onError = (err) => {
    props.data(null);
  };

  const onSubmit = (data) => {
    props.data(data);
  };

  const dateSelectionHandler = (date) => {
    if (date === null) setDateOfBirth("");
    else setDateOfBirth(date);
  };

  const genderSelectHandler = (option) => {
    setGender(option);
  };

  return (
    <>
      <Box
        sx={{ ...commonStyles.signupFormFieldContainer, ...props.customStyles }}
      >
        <AjInputLabel
          required={true}
          styleData={commonStyles.inputLabel}
          displayText="First name"
        />
        <InputBase
          required
          id="firstName"
          readOnly={props.uneditable && true}
          name="firstName"
          placeholder="Enter your first name"
          value={props.uneditable && props.defaultFirstName}
          sx={{
            ...commonStyles.inputStyle,
            ...((props.isDisable || props.uneditable) && commonStyles.disableInput),
          }}
          {...register("firstName")}
          error={errors.firstName ? true : false}
        />
        <AjTypography
          styleData={commonStyles.errorText}
          displayText={errors.firstName?.message}
        />
      </Box>
      <Box
        sx={{ ...commonStyles.signupFormFieldContainer, ...props.customStyles }}
      >
        <AjInputLabel
          required={true}
          styleData={commonStyles.inputLabel}
          displayText="Last name"
        />
        <InputBase
          required
          id="lastName"
          name="lastName"
          placeholder="Enter your last name"
          readOnly={props.uneditable && true}
          value={props.uneditable && props.defaultLastName}
          sx={{
            ...commonStyles.inputStyle,
            ...((props.isDisable || props.uneditable) && commonStyles.disableInput),
          }}
          {...register("lastName")}
          error={errors.lastName ? true : false}
        />
        <AjTypography
          styleData={commonStyles.errorText}
          displayText={errors.lastName?.message}
        />
      </Box>
      <Box
        sx={{ ...commonStyles.signupFormFieldContainer, ...props.customStyles }}
      >
        <AjInputLabel
          required={true}
          readOnly={props.isDisable}
          styleData={commonStyles.inputLabel}
          displayText="Gender"
        />
        <AjRadioOptions
          items={genderOptions}
          readOnly={props.uneditable && true}
          disableStyling={commonStyles.disableInput}
          defaultValue={props.uneditable ? props.defaultGender : gender}
          onSelect={genderSelectHandler}
        />
        <AjTypography
          styleData={commonStyles.errorText}
          displayText={errors.gender?.message}
        />
      </Box>
      <Box
        sx={{ ...commonStyles.signupFormFieldContainer, ...props.customStyles }}
      >
        <AjInputLabel
          required={true}
          styleData={commonStyles.inputLabel}
          displayText="Date of birth"
        />
        <AjDatePicker
          uneditable = {props.uneditable? true : false}
          readOnly={props.isDisable}
          value={props.uneditable ? props.defaultDateOfBirth : dateOfBirth}
          dateSelectHandler={dateSelectionHandler}
          agePicker
          styleData={commonStyles.disableInput}
        />
        <AjTypography
          styleData={commonStyles.errorText}
          displayText={errors.dateOfBirth?.message}
        />
      </Box>
    </>
  );
};

export default AjPersonalDetails;
