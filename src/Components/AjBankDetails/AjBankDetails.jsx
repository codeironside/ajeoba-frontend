import React, { useEffect, useState } from "react";
import { commonStyles } from "../../Style/CommonStyle";
import { Box, InputBase } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BankDetailsSchema } from "../../validationSchema/bankDetailsSchema";
import AjInputLabel from "../AjInputLabel";
import AjTypography from "../AjTypography";
import AjSearchInput from "../AjSearchInput";
import { useValidateBankDetails } from "../../Hooks/validateBankDetails";
import { useDispatch, useSelector } from "react-redux";

const AjBankDetails = (props) => {
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(BankDetailsSchema),
    mode: "onChange",
  });

  const [validateBankReqm, bankPayload, getBanklist, getBank] =
    useValidateBankDetails();

  const [myBank, setMyBank] = useState(null);
  const [accountNumber, setAccountNumber] = useState(null);

  const bankChangeHandler = (_event, selectedBank) => {
    setMyBank(selectedBank);
  };

  const handleAccountNumberChange = (event) => {
    setAccountNumber(event.target?.value);
  };

  useEffect(() => {
    if (myBank?.bankCode && accountNumber && accountNumber?.length === 10) {
      dispatch(validateBankReqm({ bankCode: myBank?.bankCode, accountNumber }));
    }
  }, [accountNumber, myBank?.bankCode]);

  useEffect(() => {
    if (bankPayload?.status === "success") {
      setValue("accountHolderName", bankPayload?.data?.account_name, {
        shouldValidate: true,
      });

      setValue("bankName", myBank?.label, { shouldValidate: true });

      setValue("accountNumber", bankPayload?.data?.account_number, {
        shouldValidate: true,
      });
    }
  }, [bankPayload]);

  useEffect(() => {
    setValues();
  }, [
    props.isDisable,
    props.defaultAccountHolderName,
    props.defaultBankName,
    props.defaultAccountNumber,
  ]);

  const setValues = () => {
    if (props.defaultAccountHolderName !== null) {
      setValue("accountHolderName", props.defaultAccountHolderName, {
        shouldValidate: true,
      });
    }
    if (props.defaultBankName !== null) {
      setValue("bankName", props.defaultBankName, { shouldValidate: true });
    }
    if (props.defaultAccountNumber) {
      setValue("accountNumber", props.defaultAccountNumber, {
        shouldValidate: true,
      });
    }

    if (!props.isDisable) {
      setValue("accountHolderName", "", {
        shouldValidate: true,
      });
      setValue("bankName", "", { shouldValidate: true });
      setValue("accountNumber", "", { shouldValidate: true });
    }
  };

  useEffect(() => {
    if (props.submit) {
      handleSubmit(onSubmit, onError)();
    }
  }, [props.submit]);

  useEffect(() => {
    if (props.reset) {
      setValues();
    }
  }, [props.reset]);

  const onError = (err) => {
    props.data(null);
  };

  const onSubmit = (data) => {
    props.data(data);
  };

  return (
    <>
      
      <Box sx={commonStyles.signupFormFieldContainer} style={{ width: props.width && props.width}}>
        <AjInputLabel
          displayText="Bank name"
          styleData={commonStyles.inputLabel}
        />
        <AjSearchInput
          clearIcon={<></>}
          id="bankName"
          name="bankName"
          value={!props.isDisable ? myBank : getBank(props.defaultBankName)[0]}
          displayText="Type to search"
          styleData={{
            ...commonStyles.searchDropdownInput,
            ...(props.isDisable && commonStyles.disableInput),
            ...(props.isDisable && commonStyles.disableSearchInputIconColor),
          }}
          onChange={bankChangeHandler}
          readOnly={props.isDisable}
          source="label"
          options={getBanklist()}
        />
        <AjTypography
          styleData={commonStyles.errorText}
          displayText={errors.bankName?.message}
        />
      </Box>
      <Box sx={commonStyles.signupFormFieldContainer} style={{ width: props.width && props.width}}>
        <AjInputLabel
          displayText="Account number"
          styleData={commonStyles.inputLabel}
        />
        <InputBase
          fullWidth
          placeholder={!props.isDisable && "Enter account number"}
          id="accountNumber"
          name="accountNumber"
          value={!props.isDisable ? accountNumber : props.defaultAccountNumber}
          onChange={handleAccountNumberChange}
          error={errors.accountNumber ? true : false}
          readOnly={props.isDisable}
          sx={{
            ...commonStyles.inputStyle,
            ...(props.isDisable && commonStyles.disableInput),
          }}
        />
        <AjTypography
          styleData={commonStyles.errorText}
          displayText={errors.accountNumber?.message}
        />
      </Box>

      <Box sx={{ ...commonStyles.signupFormFieldContainer, width: props.width? props.width : "43.75rem" }}>
        <AjInputLabel
          displayText="Account holder name"
          styleData={commonStyles.inputLabel}
        />
        <InputBase
          id="accountHolderName"
          placeholder={""}
          name="accountHolderName"
          value={
            !props.isDisable
              ? bankPayload?.isError
                ? ""
                : bankPayload?.data?.account_name
              : props.defaultAccountHolderName
          }
          error={
            errors.accountHolderName ||
            (!props.isDisable && bankPayload?.isError)
              ? true
              : false
          }
          readOnly={true}
          sx={{
            ...commonStyles.inputStyle,
            ...(props.isDisable && commonStyles.disableInput),
          }}
        />

        <AjTypography
          styleData={commonStyles.errorText}
          displayText={
            errors.accountHolderName?.message ||
            (bankPayload?.isError && bankPayload?.message)
          }
        />
      </Box>
    </>
  );
};

export default AjBankDetails;

