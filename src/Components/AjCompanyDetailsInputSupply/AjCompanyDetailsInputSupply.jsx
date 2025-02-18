import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, InputBase } from "@mui/material";
import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { commonStyles } from "../../Style/CommonStyle";
import { CorporateDetailsSchema } from "../../validationSchema/coporateDetailsSchema";
import AjInputLabel from "../AjInputLabel";
import AjTypography from "../AjTypography";
import { getUserData } from "../../Services/localStorageService";

function AjCompanyDetailsInputSupply(props) {
  const {
    companyNameLabel,
    registrationNumberLabel,
    companyNamePlaceholder,
    type,
    registrationRequired = true,
    tinRequired = true,
    countryId,
    isUserVerification,
  } = props;
  const userData = getUserData();
  const dispatch = useDispatch();

  const profileVerificationData = useSelector(
    (state) => state.profileVerification.profileVerificationData
  );

  const verificationText = "TIN";
  const verificationTextRef = useRef(verificationText);
  // console.log(verificationText, "verificationText");

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      CorporateDetailsSchema(
        type,
        verificationText,
        registrationRequired,
        tinRequired
      )
    ),
    mode: "onChange",
  });

  useEffect(() => {
    if (countryId) {
      // dispatch(getProfileVerificationDataAction({ countryId: countryId }));
    }
  }, [countryId]);

  useEffect(() => {
    if (props.submit) {
      handleSubmit(onSubmit, onError)();
    }
  }, [props.submit]);

  const setValues = () => {
    if (props.defaultCompanyName) {
      setValue("companyName", props.defaultCompanyName, {
        shouldValidate: true,
      });
    }
    if (props.defaultRegistrationNumber) {
      setValue("registrationNumber", props.defaultRegistrationNumber, {
        shouldValidate: false,
      });
    }
    if (props.defaultOrgNumber) {
      setValue("orgVerificationNumber", props.defaultOrgNumber, {
        shouldValidate: false,
      });
    }
    verificationTextRef.current = verificationText;
  };

  useEffect(() => {
    setValues();
  }, []);

  useEffect(() => {
    if (verificationText) verificationTextRef.current = verificationText;
  }, [verificationText]);

  useEffect(() => {
    if (props.reset) {
      setValue("registrationNumber", props.defaultRegistrationNumber || "", {
        shouldValidate: false,
      });
      setValue("orgVerificationNumber", props.defaultOrgNumber || "", {
        shouldValidate: false,
      });
      setValues();
      clearErrors();
    }
  }, [props.reset]);

  const onError = () => {
    props.data(null);
  };

  const onSubmit = (data) => {
    props.data({ ...data, verificationTextRef });
  };
  return (
    <>
      <Box sx={{ ...commonStyles.signupFormFieldInputSupplyContainer }}>
        <Box sx={{ ...commonStyles.signupFormFieldInputSupplyName }}>
          <AjInputLabel
            displayText={companyNameLabel}
            required={true}
            styleData={commonStyles.inputLabel}
          />
          <InputBase
            required
            placeholder={companyNamePlaceholder}
            id="companyName"
            name="companyName"
            readOnly={props.isDisable}
            sx={{
              ...commonStyles.inputStyle,
              ...(props.isDisable && commonStyles.disableInput),
            }}
            {...register("companyName")}
            error={errors.companyName ? true : false}
          />
          <AjTypography
            styleData={commonStyles.errorText}
            displayText={errors.companyName?.message}
          />
        </Box>
      </Box>
      <Box sx={{ ...commonStyles.signupFormFieldInputSupplyContainer }}>
        <Box sx={{ ...commonStyles.signupFormField }}>
          <AjInputLabel
            displayText={registrationNumberLabel}
            required={true}
            styleData={commonStyles.inputLabel}
          />
          <InputBase
            required
            fullWidth
            placeholder="Enter registration number"
            id="registrationNumber"
            name="registrationNumber"
            readOnly={props.isDisable}
            sx={{
              ...commonStyles.inputStyle,
              ...(props.isDisable && commonStyles.disableInput),
            }}
            {...register("registrationNumber")}
            error={errors.registrationNumber ? true : false}
          />
          <AjTypography
            styleData={commonStyles.errorText}
            displayText={errors.registrationNumber?.message}
          />
        </Box>

        <Box sx={{ ...commonStyles.signupFormField }}>
          <AjInputLabel
            displayText={`${verificationText} number`}
            required={!tinRequired ? false : true}
            styleData={commonStyles.inputLabel}
          />
          <InputBase
            required
            fullWidth
            id="orgVerificationNumber"
            name="orgVerificationNumber"
            placeholder={`Enter ${verificationText} number`}
            readOnly={props.isDisable}
            sx={{
              ...commonStyles.inputStyle,
              ...(props.isDisable && commonStyles.disableInput),
            }}
            {...register("orgVerificationNumber")}
            error={errors.orgVerificationNumber ? true : false}
          />
          <AjTypography
            styleData={commonStyles.errorText}
            displayText={errors.orgVerificationNumber?.message}
          />
        </Box>
      </Box>
    </>
  );
}

export default AjCompanyDetailsInputSupply;
