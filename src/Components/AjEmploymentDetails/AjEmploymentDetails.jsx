import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, InputBase, Typography } from "@mui/material";
import * as _ from "lodash";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// import toolTipIcon from "../../Assets/Images/toolTipIcon.svg";
import {
  employmentOption,
  taxOptions,
  UIN_TYPE_VALUE,
} from "../../Constant/AppConstant";
import { getProfileVerificationDataAction } from "../../Redux/common/ProfileVerification/profileVerificationActions";
import { commonStyles } from "../../Style/CommonStyle";
import { EmploymentDetailsSchema } from "../../validationSchema/employmentDetailsSchema";
import AjCountry from "../AjCountry/AjCountry";
import AjInputLabel from "../AjInputLabel";
import AjRadioOptions from "../AjRadioOptions";
import AjSearchInput from "../AjSearchInput";
// import { HtmlTooltip } from "../AjSignupSingleSellerDetails/AjSignupAggregatorDetailsStyles";
import AjTypography from "../AjTypography";
import { styles } from "./AjEmploymentDetailsStyles.js";
import { ROLES } from "../../Constant/RoleConstant";
import { getUserData } from "../../Services/localStorageService";
// import AjDialog from "../AjDialog/AjDialog";
// import VninModalContent from "../VninHow/VninModal";
// import AjState from "../AjState/AjState";
// import AjLocalGovernment from "../AjLGAs/AjLocalGovernment";

const AjEmploymentDetails = (props) => {
  const dispatch = useDispatch();
  const userData = getUserData();
  // const [openvninModal, setOpenvninModal] = useState(false);
  // const profileVerificationData = useSelector(
  //   (state) => state.profileVerification.profileVerificationData
  // );
  // const handleModal = () => setOpenvninModal((prev) => !prev);
  // const orgUINOptions = profileVerificationData?.orgUINOptions;
  const {
    register,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      EmploymentDetailsSchema(
        props.adminNotRequiredFields,
        props.taxIdNotRequired
      )
    ),
    mode: "onChange",
  });
  const [employmentType, setEmploymentType] = useState(
    props.resetEmpTypeInitialValue ? props.uneditable? props.defaultEmploymentType : "" : employmentOption[0]
  );
  // const [UinPinType, setUinPinType] = useState(null);
  const [tax, setTax] = useState(taxOptions[0].value);
  const [cancel, setCancel] = useState();
  // const [nigState, setNigState] = useState(null);
  // const [displayNigState, setDisplayNigState] = useState(false);
  // const [stateReset, setStateReset] = useState(false);
  // const [lga, setLga] = useState(null);
  // const [displayLga, setdisplayLga] = useState(false);

  useEffect(() => {
    setValue("taxOption", tax, { shouldValidate: true });
    if (tax === "no") {
      setValue("taxId", "", { shouldValidate: true });
    }
  }, [tax]);

  // useEffect(() => {
  //   if (orgUINOptions) setValues();
  // }, [orgUINOptions]);

  useEffect(() => {
    if (
      (ROLES.SUPER_ADMIN === userData.role_id ||
        ROLES.ADMIN === userData.role_id) &&
      props.countryId
    ) {
      dispatch(
        getProfileVerificationDataAction({ countryId: props.countryId })
      );
    } else if (props.isCountryIdRequired) {
      const farmerIdetification = {
        countryId: props.countryId,
        isCountryIdRequired: true,
      };
      dispatch(getProfileVerificationDataAction(farmerIdetification));
    } else {
      dispatch(getProfileVerificationDataAction());
    }
  }, [props.countryId]);

  // useEffect(() => {
  //   if (!props.resetUINTypeInitialValue) {
  //     if (profileVerificationData) {
  //       setValue(
  //         "UINPinType",
  //         profileVerificationData?.orgUINOptions[0].label,
  //         {
  //           shouldValidate: true,
  //         }
  //       );
  //       // setUinPinType(orgUINOptions[0]);
  //       setUinPinType("");
  //     }
  //   }
  // }, [profileVerificationData]);

  useEffect(() => {
    if (props.reset) {
      setValue("employmentType", props.defaultEmploymentType || "", {
        shouldValidate: false,
      });
      const employemnetObject = _.find(employmentOption, {
        value: props.defaultEmploymentType,
      });
      setEmploymentType(employemnetObject);
      setValue("UINPinType", props.defaultUINPinType || "", {
        shouldValidate: false,
      });
      // const UINPinTypeObject = _.find(orgUINOptions, {
      //   label: props.defaultUINPinType,
      // });
      // setUinPinType(UINPinTypeObject);
      setValue("taxId", props.defaultTaxId, {
        shouldValidate: false,
      });
      // setValue(
      //   "uniqueIdentificationNumber",
      //   props.defaultUniqueIdentificationNumber || "",
      //   {
      //     shouldValidate: false,
      //   }
      // );
      setValues();
      clearErrors();
    }
    setCancel(props.reset);
  }, [props.reset]);

  const setValues = () => {
    if ((props.defaultEmploymentType || employmentType) && !props.reset) {
      setValue(
        "employmentType",
        props.defaultEmploymentType || employmentType.value,
        {
          shouldValidate: true,
        }
      );
      const employemnetObject = _.find(employmentOption, {
        value: props.defaultEmploymentType || employmentType.value,
      });
      setEmploymentType(employemnetObject);
    }
    if (props.defaultExperience) {
      setValue("experience", props.defaultExperience, { shouldValidate: true });
    }
    // if ((props.defaultUINPinType || UinPinType) && !props.reset) {
    //   setValue("UINPinType", props.defaultUINPinType || UinPinType, {
    //     shouldValidate: true,
    //   });
    //   const UINPinTypeObject = _.find(UIN_TYPE_VALUE, {
    //     value: props.defaultUINPinType || UinPinType,
    //   });
    //   setUinPinType(UINPinTypeObject);
    // }
    // if (props.defaultUniqueIdentificationNumber) {
    //   setValue(
    //     "uniqueIdentificationNumber",
    //     props.defaultUniqueIdentificationNumber,
    //     {
    //       shouldValidate: true,
    //     }
    //   );
    // }
    if (props.defaultTaxId) {
      setValue("taxId", props.defaultTaxId, {
        shouldValidate: true,
      });
    }
    if (props.defaultTaxOption) {
      setValue("taxOption", props.defaultTaxOption, {
        shouldValidate: true,
      });
      setTax(props.defaultTaxOption);
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
    const employmentTypeToSend = employmentType.value;
    // console.log("Personal in employment details component: ", data, " = ", employmentType.value);
    // if ((displayNigState && nigState) || !displayNigState) {
    //   const UinPinTypeToSend = UinPinType?.label;
    //   if (lga && nigState) {
    //     data.uniqueIdentificationState = nigState;
    //     data.lga = lga.value
    //   }
    // props.data({ ...data, UinPinTypeToSend, employmentTypeToSend, lga, nigState});
    // }
    props.data({ ...data, employmentTypeToSend});
  };
  const EmploymentTypeChangeHandler = (e, selectedEmploymentType) => {
    setEmploymentType(selectedEmploymentType);
    setValue("employmentType", selectedEmploymentType.value, {
      shouldValidate: true,
    });
  };
  const countryOfBirthChangeHandler = (selectedCountry) => {
    if (selectedCountry)
      setValue("countryOfBirth", selectedCountry.countryId, {
        shouldValidate: true,
      });
  };
  const citizenshipChangeHandler = (selectedCountry) => {
    setValue("citizenship", selectedCountry.countryId, {
      shouldValidate: true,
    });
  };
  const countryOfTaxChangeHandler = (selectedCountry) => {
    setValue("countryOfTax", selectedCountry.countryId, {
      shouldValidate: true,
    });
  };
  // const countryStateIdHandler = (selectedState) => {
  //   setNigState(selectedState.stateName.split(" ")[0]);
  //   setdisplayLga(true);
  //   setStateReset(false);
  // };
  // const localGovtHandler = (selectedLga)=>{
  //   setLga(selectedLga)
  //   setStateReset(false);
  // }
  // const UINPinTypeChangeHandler = (e, selectedUINPinType) => {
  //   if (selectedUINPinType.label === "VOTERS IDENTIFICATION NUMBER") {
  //     setDisplayNigState(true);
  //   } else {
  //     setDisplayNigState(false);
  //     setdisplayLga(false)
  //     setNigState(null);
  //   }
  //   setUinPinType(selectedUINPinType);
  //   setValue("UINPinType", selectedUINPinType.label, {
  //     shouldValidate: true,
  //   });
  // };
  const taxSelectHandler = (option) => {
    setTax(option);
  };

  return (
    <>
      <Box sx={commonStyles.signupFormFieldContainer}>
        <AjInputLabel
          required={props.adminNotRequiredFields ? false : true}
          styleData={commonStyles.inputLabel}
          displayText="Employment Type"
        />
        <AjSearchInput
          source="label"
          uneditable = {props.uneditable? true : false}
          options={employmentOption}
          value={employmentType}
          id="employmentType"
          displayText="Select employment type"
          readOnly={props.isDisable}
          styleData={{
            ...styles.searchInput,
            ...((props.isDisable && props.uneditable) && commonStyles.disableInput),
            ...((props.isDisable && props.uneditable) && commonStyles.disableSearchInputIconColor)
          }}
          onChange={EmploymentTypeChangeHandler}
          name="employmentType"
        />
        <AjTypography
          displayText={errors.employmentType?.message}
          styleData={commonStyles.errorText}
        />
      </Box>
      <Box sx={commonStyles.signupFormFieldContainer}>
        <AjInputLabel
          displayText="Experience"
          styleData={commonStyles.inputLabel}
          required={true}
        />
        <InputBase
          type="number"
          required
          readOnly={props.isDisable}
          value={props.uneditable && props.defaultExperience}
          sx={{
            ...commonStyles.inputStyle,
            ...(props.isDisable && commonStyles.disableInput),
          }}
          placeholder="Enter experience in years"
          name="experience"
          id="experience"
          {...register("experience")}
        />
        <AjTypography
          displayText={errors.experience?.message}
          styleData={commonStyles.errorText}
        />
      </Box>
      <Box sx={commonStyles.signupFormFieldContainer}>
        <AjCountry
          required={props.adminNotRequiredFields ? false : true}
          readOnly={props.isDisable}
          styleData={{
            ...((props.isDisable && props.uneditable) && commonStyles.disableInput),
            ...((props.isDisable && props.uneditable) && commonStyles.disableSearchInputIconColor),
          }}
          cancel={cancel}
          uneditable = {props.uneditable? true : false}
          displayText="Country of birth"
          defaultValue={props?.defaultCountryOfBirth}
          onCountrySelect={countryOfBirthChangeHandler}
        />
        <AjTypography
          displayText={errors.countryOfBirth?.message}
          styleData={commonStyles.errorText}
        />
      </Box>
      <Box sx={commonStyles.signupFormFieldContainer}>
        <AjCountry
          required={props.adminNotRequiredFields ? false : true}
          readOnly={props.isDisable}
          displayText="Citizenship"
          cancel={cancel}
          defaultValue={props?.defaultCitizenship}
          uneditable = {props.uneditable? true : false}
          onCountrySelect={citizenshipChangeHandler}
          styleData={{
            ...((props.isDisable && props.uneditable) && commonStyles.disableInput),
            ...((props.isDisable && props.uneditable) && commonStyles.disableSearchInputIconColor),
          }}
        />
        <AjTypography
          styleData={commonStyles.errorText}
          displayText={errors.citizenship?.message}
        />
      </Box>
      <Box
        sx={{
          ...commonStyles.signupFormFieldContainer,
          ...(!props.adminNotRequiredFields && commonStyles.fixedWidth),
        }}
      >
        <AjCountry
          required={props.adminNotRequiredFields ? false : true}
          readOnly={props.isDisable}
          displayText="Country of tax"
          cancel={cancel}
          defaultValue={props?.defaultCountryOfTax}
          uneditable = {props.uneditable? true : false}
          onCountrySelect={countryOfTaxChangeHandler}
          styleData={{
            ...(props.isDisable && commonStyles.disableInput),
            ...(props.isDisable && commonStyles.disableSearchInputIconColor),
          }}
        />
        <AjTypography
          styleData={commonStyles.errorText}
          displayText={errors.countryOfTax?.message}
        />
      </Box>
      {/* <Box
        sx={{
          ...commonStyles.signupFormFieldContainer,
          ...(!props.adminNotRequiredFields && commonStyles.fixedWidth),
        }}
      >
        <AjInputLabel
          styleData={commonStyles.inputLabel}
          displayText="Unique identification type"
        />
        <AjSearchInput
          clearIcon={<></>}
          id="UINPinType"
          name="UINPinType"
          value={UinPinType}
          uneditable = {props.isUin && props.uneditable? true : false}
          readOnly={!props.isUin? props.isDisable : true}
          source="label"
          options={orgUINOptions}
          onChange={UINPinTypeChangeHandler}
          displayText="Select UIN type"
          styleData={{
            ...styles.searchInput,
            ...(props.isDisable && commonStyles.disableInput),
            ...(props.isDisable && commonStyles.disableSearchInputIconColor),
          }}
          sx={{
            ...(props.uneditable && commonStyles.disableInput),
          }}
        />
        <AjTypography
          displayText={!props.isDisable && errors.UINPinType?.message}
          styleData={commonStyles.errorText}
        />
      </Box> */}
      {/* <Box
        sx={{
          ...commonStyles.signupFormFieldContainer,
          ...(!props.adminNotRequiredFields && commonStyles.fixedWidth),
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <AjInputLabel
            displayText="vNIN"
            styleData={{ ...commonStyles.inputLabel, width: "fit-content" }}
          />
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={handleModal}
          >
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit" sx={styles.toolTipText}>
                    vNIN and Voter's Identification Number
                  </Typography>
                </React.Fragment>
              }
            >
              <Typography
                component="img"
                src={toolTipIcon}
                sx={{ mr: "4px" }}
              />
            </HtmlTooltip>
            <AjTypography
              sx={{
                fontWeight: "600",
                textAlign: "center",
                fontSize: "0.875rem",
                lineHeight: "1.313rem",
                textDecoration: "underline",
              }}
              displayText="How to get vNIN"
            />
          </Box>
        </Box>
        <AjDialog
          open={openvninModal}
          closeModal={setOpenvninModal}
          title="VNIN"
          styleData={commonStyles.buyDialogModalContainer}
        >
          <VninModalContent />
        </AjDialog>
        <InputBase
          readOnly={props.isUin && props.uneditable ? true : false}
          id="uniqueIdentificationNumber"
          name="uniqueIdentificationNumber"
          placeholder="Enter unique identification number"
          value={props.uneditable && props.defaultUniqueIdentificationNumber}
          {...register("uniqueIdentificationNumber")}
          sx={{
            ...commonStyles.inputStyle,
            ...styles.inputBaseCustomStyle,
            ...((props.isDisable && props.uneditable) && commonStyles.disableInput),
          }}
        />
        <AjTypography
          displayText={errors.uniqueIdentificationNumber?.message}
          styleData={commonStyles.errorText}
        />
      </Box> */}
      {/* {displayNigState && (
        <Box
          sx={{
            ...commonStyles.fullWidth,
            // ...props.customStyle,
          }}
        >
          <AjState
            displayText="Voter's Identity State"
            defaultValue={null}
            onStateSelect={countryStateIdHandler}
            codeOfCountry="NG"
            reset={stateReset}
            readOnly={false}
            cancel={cancel}
          />
          <AjTypography
            styleData={commonStyles.errorText}
            displayText={
              displayNigState &&
              nigState === null &&
              "Voter's identity state is required"
            }
          />
        </Box>
      )}
      {displayLga && (
        <Box
          sx={{
            ...commonStyles.fullWidth,
          }}
        >
          <AjLocalGovernment
            displayText="Voter's Local Government"
            defaultValue={null}
            onLgaSelect={localGovtHandler}
            stateName={nigState}
            reset={stateReset}
            readOnly={false}
            cancel={cancel}
          />
          <AjTypography
            styleData={commonStyles.errorText}
            displayText={(displayNigState && lga === null) && "Voter's local goverment is required" }
          />
        </Box>
      )} */}
      <Box
        sx={[
          commonStyles.signupFormFieldContainer,
          styles.signUpFormCustomStyle,
        ]}
      >
        {!props.adminTaxIdNoOptions && (
          <>
            <AjInputLabel
              displayText="Do you have a tax id?"
              styleData={commonStyles.inputLabel}
              required={props.adminTaxIdNoOptions ? false : true}
            />
            <AjRadioOptions
              onSelect={taxSelectHandler}
              defaultValue={tax}
              items={taxOptions}
              readOnly={props.isDisable}
              disableStyling={commonStyles.disableInput}
            />
          </>
        )}
        {tax === "yes" ? (
          <Box sx={!props.taxIdNotRequired && commonStyles.marginTop20}>
            <AjInputLabel
              displayText="Tax id"
              styleData={commonStyles.inputLabel}
              required={props.taxIdNotRequired ? false : true}
            />
            <InputBase
              type="number"
              readOnly={props.isDisable}
              required
              placeholder="Enter tax id"
              value={props.uneditable && props.defaultTaxId}
              {...register("taxId")}
              id="taxId"
              name="taxId"
              sx={{
                ...commonStyles.inputStyle,
                ...((props.isDisable && props.uneditable) && commonStyles.disableInput),
              }}
            />
            <AjTypography
              displayText={errors.taxId?.message}
              styleData={commonStyles.errorText}
            />
          </Box>
        ) : (

          <AjTypography
            styleData={commonStyles.inputLabel}
            displayText="Once farmer form is completed, Ajeoba will try to get your Tax ID"
          />
        )}
      </Box>
    </>
  );
}

export default AjEmploymentDetails;


//  const saveChanges = () => {
//    setIsSubmit(true);
//    console.log(farmerDetails);
//  };
//  const onSubmit = () => {
//    // console.log(farmerDetails);
//  };

//  const [farmerDetails, setFarmerDetails] = useState({
//    firstName: farmersDetailsData?.personalDetails?.first_name || "",
//    lastName: farmersDetailsData?.personalDetails?.last_name || "",
//    phoneNumber:
//      (farmersDetailsData?.personalDetails?.phone_code &&
//        `${getPhoneCodeSymbol(
//          farmersDetailsData?.personalDetails?.phone_code
//        )} ${farmersDetailsData?.personalDetails?.mobile_no}`) ||
//      "",
//    gender: farmersDetailsData?.personalDetails?.gender || "",
//    dateOfBirth:
//      formatDate(farmersDetailsData?.personalDetails?.date_of_birth) || "",
//    countryOfBirth: farmersDetailsData?.personalDetails?.country_name || "",
//    refer1: farmersDetailsData?.refereeName?.[0]?.first_name || "",
//    refer2: farmersDetailsData?.refereeName?.[1]?.first_name || "",
//    citizenship: farmersDetailsData?.personalDetails?.country_name || "",
//    employmentType: farmersDetailsData?.personalDetails?.employment_type || "",
//    countryOfTax: findCountryById(
//      farmersDetailsData?.personalDetails?.country_id || ""
//    ),
//    tax: findCountryById(
//      farmersDetailsData?.personalDetails?.tax_id === null
//        ? "No, I don't"
//        : "Yes, I do" || ""
//    ),
//    uidtype: farmersDetailsData?.personalDetails?.uin_type || "",
//    uidno: farmersDetailsData?.personalDetails?.uin || "",
//    address: addressData.addressData,
//    // certificationDetails: certificateDataToSend || "",
//    // landDetails: landData?.landListing?.length > 0 ? landListingData : "",
//  });
