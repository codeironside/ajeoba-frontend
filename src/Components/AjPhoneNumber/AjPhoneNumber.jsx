import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, InputBase } from "@mui/material";
import * as _ from "lodash";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import {
  getCountries,
  setCountryCode,
  setCountryId,
} from "../../Redux/common/Countries/getCountriesActions";
import AjInputLabel from "../AjInputLabel";
import AjSearchDropDown from "../AjSearchDropDown";
import AjTypography from "../AjTypography";

import { commonStyles } from "../../Style/CommonStyle";
import { mobileNumberSchema } from "../../validationSchema/mobileNumberSchema";

const AjPhoneNumber = (props) => {
  const {
    label,
    defaultValue,
    defaultCountryId,
    customStyle,
    onCountryCodeSelect,
    mobileNumber,
    submit,
    data,
    isDisable,
  } = props;

  const dispatch = useDispatch();

  const [countryCodeValue, setCountryCodeValue] = useState(null);

  const countryMenuOptions = useSelector(
    (state) => state.countries.countryMenuOptions || null
  );
  const countryId = useSelector((state) => state.countries.countryId);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(mobileNumberSchema),
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(getCountries());
    if (mobileNumber) {
      setValue("mobileNumber", mobileNumber, {
        shouldValidate: true,
      });
    }
  }, []);

  useEffect(() => {
    if (countryMenuOptions && countryMenuOptions.length) {
      let countryIndex = -1;
      if (!countryId && !defaultCountryId) {
        countryIndex = _.findIndex(countryMenuOptions, {
          countryCode: "+234",
        });
      } else {
        countryIndex = _.findIndex(countryMenuOptions, {
          countryId: defaultCountryId || countryId,
        });
      }
      let country = countryMenuOptions[countryIndex];
      dispatch(setCountryCode(country?.countryCode));
      dispatch(setCountryId(country?.countryId));
      setCountryCodeValue(country);
      setValue("countryCode", country?.countryCode);
      if (defaultCountryId) setValue("countryId", defaultCountryId.toString());
    }
  }, [countryMenuOptions, defaultCountryId]);

  useEffect(() => {
    if (submit) {
      handleSubmit(onSubmit, onError)();
    }
  }, [submit]);

  const onSubmit = (selectedData) => {
    data(selectedData);
  };

  const onError = (_err) => {
    data(null);
  };

  const countryCodeChangeHandler = (_event, selectedCountry) => {
    dispatch(setCountryCode(selectedCountry.countryCode));
    dispatch(setCountryId(selectedCountry.countryId));
    const countryIndex = _.findIndex(countryMenuOptions, {
      countryId: selectedCountry.countryId,
    });
    setCountryCodeValue(countryMenuOptions[countryIndex]);
    setValue("countryCode", selectedCountry.countryCode);
    setValue("countryId", selectedCountry.countryId);
    onCountryCodeSelect && onCountryCodeSelect(selectedCountry);
  };

  return (
    <Box
      sx={{
        ...commonStyles.signupFormFieldContainer,
        ...commonStyles.fullWidth,
        ...customStyle,
      }}
    >
      <AjInputLabel
        required={true}
        styleData={commonStyles.inputLabel}
        displayText={label || "Phone number"}
      />
      <Box sx={commonStyles.phoneNumberContainer}>
        <AjSearchDropDown
          id="combo-box-demo"
          options={countryMenuOptions || []}
          value={countryCodeValue}
          onChange={countryCodeChangeHandler}
          isDisable={isDisable}
        />
        <InputBase
          required
          readOnly={isDisable}
          defaultValue={defaultValue}
          sx={{
            ...commonStyles.inputStyle,
            ...commonStyles.mobileNumberInput,
            ...(props.isDisable && commonStyles.disableInput),
          }}
          {...register("mobileNumber")}
          error={errors.addQACompanyMobile ? true : false}
          placeholder="Enter phone number"
        />
      </Box>
      <AjTypography
        styleData={commonStyles.errorText}
        displayText={errors.mobileNumber?.message}
      />
    </Box>
  );
};

export default AjPhoneNumber;
