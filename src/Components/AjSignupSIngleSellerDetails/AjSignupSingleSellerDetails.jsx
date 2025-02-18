import { yupResolver } from "@hookform/resolvers/yup";
import { InputBase, Box, Typography } from "@mui/material";
import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import toolTipIcon from "../../Assets/Images/toolTipIcon.svg";
import AjButton from "../../Components/AjButton";
import AjChipDropdown from "../../Components/AjChipDropdown";
import AjInputLabel from "../../Components/AjInputLabel";
import AjRadioOptions from "../../Components/AjRadioOptions";
import AjSearchInput from "../../Components/AjSearchInput";
import AjTypography from "../../Components/AjTypography";
import { employmentOption, taxOptions } from "../../Constant/AppConstant";
import { getProducts } from "../../Redux/common/Products/productsActions";
import { getProfileVerificationDataAction } from "../../Redux/common/ProfileVerification/profileVerificationActions";
import { signUpSingleSellerDetails } from "../../Redux/SignUpSIngleSellerDetails/signUpSingleSellerDetailsActions";
import { replaceWithUnderScore } from "../../Services/commonService/commonService";
import {
  getUserAccountData,
  getUserData,
} from "../../Services/localStorageService";
import { commonStyles } from "../../Style/CommonStyle";
import { aggregatorDetailsSchema } from "../../validationSchema/aggregatorDetailsSchema";
import AjAdress from "../AjAdress/AjAdress";
import AjCountry from "../AjCountry/AjCountry";
import AjTnCLink from "../AjTnCLink/AjTnCLink";
import { HtmlTooltip, styles } from "./AjSignupSingleSellerDetailsStyles";
import AjDialog from "../AjDialog/AjDialog";
import VninModalContent from "../VninHow/VninModal";
import { singleSellerDetailsSchema } from "../../validationSchema/singleSellerDetailsSchema";

const AjSignupSingleSellerDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userAccountData = getUserAccountData();
  const userData = getUserData();
  let addressData = null;
  const [openvninModal, setOpenvninModal] = useState(false);

  const [isSubmit, setIsSubmit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [chipValue, setChipValue] = useState([]);
  const [isChipValueUpdated, setIsChipValueUpdated] = useState(false);

  const [employmentType, setEmploymentType] = useState(employmentOption[0]);
  const [myUinPinType, setMyUinPinType] = useState(null);
  const [tax, setTax] = useState(taxOptions[0].value);

  const products = useSelector((state) => state.products.products || "");

  const profileVerificationData = useSelector(
    (state) => state.profileVerification.profileVerificationData
  );

  const orgUINOptions = profileVerificationData?.orgUINOptions;

  const handleModal = () => setOpenvninModal((prev) => !prev);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(singleSellerDetailsSchema),
    mode: "onChange",
  });
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getProfileVerificationDataAction());
  }, []);

  useEffect(() => {
    if (profileVerificationData) {
      setValue("uniqueIdentifictionType", orgUINOptions[0].label, {
        shouldValidate: true,
      });
      setMyUinPinType(orgUINOptions[0]);
    }
  }, [profileVerificationData]);

  useEffect(() => {
    setValue("taxOption", tax, { shouldValidate: true });
    if (tax === "no") {
      setValue("taxId", "", { shouldValidate: true });
    }
    if (isChipValueUpdated) {
      const productItems = [];
      chipValue.map((item) => {
        productItems.push(_.find(products, { productName: item }).productId);
      });
      setValue("typeOfProducts", productItems, { shouldValidate: true });
    }
  }, [chipValue, tax]);

  useEffect(() => {
    if (!products) {
      return;
    }
    if (userData.is_account_detail_filled) {
      setValue("experience", userAccountData.experience, {
        shouldValidate: true,
      });
      setValue("uniqueIdentificationNumber", userAccountData.uin, {
        shouldValidate: true,
      });
      if (userAccountData.tax_id) {
        setTax(taxOptions[0].value);
        setValue("taxId", userAccountData?.tax_id, {
          shouldValidate: true,
        });
      } else {
        setTax(taxOptions[1].value);
        setValue("taxId", "", {
          shouldValidate: true,
        });
      }
      setValue("memberSize", userAccountData.member_size, {
        shouldValidate: true,
      });
      const productItems = [];
      userAccountData.products.map((item) => {
        productItems.push(_.find(products, { productId: item }).productName);
      });
      setChipValue(productItems);
      setValue("typeOfProducts", userAccountData.products, {
        shouldValidate: true,
      });
    }
  }, [products]);

  const countryOfBirthChangeHandler = (selectedCountry) => {
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

  const UINPinTypeChangeHandler = (e, selectedUINPinType) => {
    setValue("uniqueIdentifictionType", selectedUINPinType.label, {
      shouldValidate: true,
    });
    setMyUinPinType(selectedUINPinType);
  };

  const EmploymentTypeChangeHandler = (e, selectedEmploymentType) => {
    setEmploymentType(selectedEmploymentType);
  };

  const taxSelectHandler = (option) => {
    setTax(option);
  };

  const onChangeDropdownChipHandler = (event) => {
    const {
      target: { value },
    } = event;
    setIsChipValueUpdated(true);
    setChipValue(value);
  };

  const handleDelete = (value) => {
    setIsChipValueUpdated(true);
    setChipValue(chipValue.filter((name) => name !== value));
  };

  const addSeller = () => {
    setIsSubmit(true);
  };

  const getAddressData = (data) => {
    addressData = data;
    setIsSubmit(false);
    handleSubmit(onSubmit)();
  };

  const onSubmit = (data) => {
    if (!addressData) {
      return;
    }
    const sellersDetail = {
      employmentType: employmentType.value,
      experience: data.experience,
      countryOfBirth: parseInt(data.countryOfBirth),
      citizenship: parseInt(data.citizenship),
      taxCountry: parseInt(data.countryOfTax),
      uinTypeValue: replaceWithUnderScore(data.uniqueIdentifictionType),
      uniqueIdentificationNumber: data.uniqueIdentificationNumber,
      taxId: parseInt(data?.taxId),
      products: data.typeOfProducts,
      addressLine1: addressData.addressLine1,
      addressLine2: addressData.addressLine2 || "",
      countryId: parseInt(addressData.country),
      stateId: parseInt(addressData.state),
      city: addressData.city,
    };
    if (addressData.zipCode) {
      sellersDetail["zipCode"] = parseInt(addressData.zipCode);
    }
    dispatch(signUpSingleSellerDetails(sellersDetail, navigate));
  };

  return (
    <>
      <Box component="form" sx={styles.signupFormContainer}>
        <Box sx={commonStyles.signupFormFieldContainer}>
          <AjInputLabel
            required={true}
            styleData={commonStyles.inputLabel}
            displayText="Employment Type"
          />
          <AjSearchInput
            id="employmentType"
            name="employmentType"
            value={employmentType}
            styleData={styles.searchInput}
            onChange={EmploymentTypeChangeHandler}
            source="label"
            options={employmentOption}
          />
        </Box>
        <Box sx={commonStyles.signupFormFieldContainer}>
          <AjCountry
            displayText="Country of birth"
            defaultValue={
              userAccountData?.country_of_birth || userData?.country_id
            }
            onCountrySelect={countryOfBirthChangeHandler}
          />
          <AjTypography
            styleData={commonStyles.errorText}
            displayText={errors.countryOfBirth?.message}
          />
        </Box>
        <Box sx={commonStyles.signupFormFieldContainer}>
          <AjCountry
            displayText="Citizenship"
            defaultValue={userAccountData?.citizenship || userData?.country_id}
            onCountrySelect={citizenshipChangeHandler}
          />
          <AjTypography
            styleData={commonStyles.errorText}
            displayText={errors.citizenship?.message}
          />
        </Box>
        <Box
          sx={{ ...commonStyles.signupFormFieldContainer, }}
        >
          <AjCountry
            displayText="Country of tax"
            defaultValue={userAccountData?.tax_country || userData?.country_id}
            onCountrySelect={countryOfTaxChangeHandler}
          />
          <AjTypography
            styleData={commonStyles.errorText}
            displayText={errors.countryOfTax?.message}
          />
        </Box>
        <Box sx={commonStyles.signupFormFieldContainer}>
          <AjInputLabel
            required={true}
            styleData={commonStyles.inputLabel}
            displayText="Unique identification type"
          />
          <AjSearchInput
            clearIcon={<></>}
            id="UINPinType"
            name="UINPinType"
            value={myUinPinType}
            displayText="Type to search"
            styleData={styles.searchInput}
            onChange={UINPinTypeChangeHandler}
            source="label"
            options={profileVerificationData?.orgUINOptions}
          />
          <AjTypography
            styleData={commonStyles.errorText}
            displayText={errors.uniqueIdentificationType?.message}
          />
        </Box>
        <Box sx={{
          ...commonStyles.signupFormFieldContainer,
          ...commonStyles.fixedWidth,
        }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <AjInputLabel
              required={true}
              styleData={{ ...commonStyles.inputLabel, width: "fit-content" }}
              displayText="Unique identification number"
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={handleModal}
            >
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit" sx={styles.toolTipText}>
                      vNIN, Voter's Identification Number
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
            required
            id="uniqueIdentificationNumber"
            name="uniqueIdentificationNumber"
            placeholder="Enter unique identification number "
            {...register("uniqueIdentificationNumber")}
            sx={{ ...commonStyles.inputStyle, ...styles.inputBaseCustomStyle }}
          />
          <AjTypography
            styleData={commonStyles.errorText}
            displayText={errors.uniqueIdentificationNumber?.message}
          />
        </Box>

        <Box
          sx={{
            ...commonStyles.signupFormFieldContainer,
            ...styles.signUpFormCustomStyle,
          }}
        >
          <AjInputLabel
            required={true}
            styleData={commonStyles.inputLabel}
            displayText="Do you have a tax id?"
          />
          <AjRadioOptions
            items={taxOptions}
            defaultValue={tax}
            onSelect={taxSelectHandler}
          />
          {tax === "yes" ? (
            <Box sx={commonStyles.marginTop20}>
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="Tax id"
              />
              <InputBase
                required
                id="taxId"
                name="taxId"
                placeholder="Enter tax id"
                {...register("taxId")}
                sx={commonStyles.inputStyle}
                type="number"
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.taxId?.message}
              />
            </Box>
          ) : (
            <AjTypography
              styleData={commonStyles.inputLabel}
              displayText="Once sign up is completed, Ajeoba will try to get your Tax ID"
            />
          )}
        </Box>
        <Box
          sx={{ ...commonStyles.signupFormFieldContainer, width: "43.75rem" }}
        >
          <AjInputLabel
            displayText="Type of Products"
            required
            id="typeOfProducts"
            name="typeOfProducts"
            styleData={commonStyles.inputLabel}
          />
          <AjChipDropdown
            id="typeOfProducts"
            name="typeOfProducts"
            value={chipValue}
            onChange={onChangeDropdownChipHandler}
            fullWidth
            onDelete={handleDelete}
            options={products}
            styleData={styles.chipDropDown}
          />
          <AjTypography
            styleData={commonStyles.errorText}
            displayText={errors.typeOfProducts?.message}
          />
        </Box>

        <AjAdress
          submit={isSubmit}
          data={getAddressData}
          defaultAddressLine1={userAccountData?.address_1}
          defaultAddressLine2={userAccountData?.address_2}
          defaultCity={userAccountData?.city}
          defaultZipCode={userAccountData?.zip_code}
          defaultCountry={userAccountData?.country || userData?.country_id}
          defaultState={userAccountData?.state}
        />

        <Box sx={styles.buttonContainer}>
          <AjButton
            variant="contained"
            styleData={styles.nextBtnStyle}
            displayText=" Next"
            onClick={addSeller}
            isDisable={!isChecked}
          />
          <AjTnCLink setIsChecked={setIsChecked} />
        </Box>
      </Box>
    </>
  );
};

export default AjSignupSingleSellerDetails;
