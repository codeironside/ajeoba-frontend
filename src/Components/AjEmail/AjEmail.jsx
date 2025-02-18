import React, { useEffect } from "react";
import { Box, InputBase } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import AjInputLabel from "../AjInputLabel";

import { commonStyles } from "../../Style/CommonStyle";
import AjTypography from "../AjTypography";

const emailSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is invalid"),
});

const AjEmail = (props) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(emailSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (props.defaultEmail) {
      setValue("email", props.defaultEmail, {
        shouldValidate: true,
      });
    }
  }, []);
  
  useEffect(() => {
    if (props.submit) {
      handleSubmit(onSubmit, onError)();
    }
  }, [props.submit]);

  const onSubmit = (data) => {
    props.data(data);
  };

  const onError = (_err) => {
    props.data(null);
  };

  return (
    <Box
      sx={{
        ...commonStyles.signupFormFieldContainer,
        ...commonStyles.fullWidth,
        ...props.customStyle,
      }}
    >
      <AjInputLabel
        required={true}
        styleData={commonStyles.inputLabel}
        displayText="E-mail Id"
      />
      <InputBase
        required
        placeholder="Enter your email"
        sx={commonStyles.inputStyle}
        {...register("email")}
        error={errors.email ? true : false}
      />
      <AjTypography
        styleData={commonStyles.errorText}
        displayText={errors.email?.message}
      />
    </Box>
  );
};

export default AjEmail;
