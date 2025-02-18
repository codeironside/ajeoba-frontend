import React, { useEffect, useRef, useState } from "react";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import AjAdress from "../AjAdress/AjAdress";
import AjButton from "../AjButton";
import AjEmploymentDetails from "../AjEmploymentDetails/AjEmploymentDetails";

import { signupSingleBuyerDetails } from "../../Redux/SignUpSingleBuyerDetails/signUpSingleBuyerDetailsActions";
import {
  getUserAccountData,
  getUserData,
} from "../../Services/localStorageService";
import { customCommonStyles } from "../../Style/CommonStyle";
import AjTnCLink from "../AjTnCLink/AjTnCLink";
import { replaceWithUnderScore } from "../../Services/commonService/commonService";

const AjSignupSingleBuyerDetails = () => {
  const [isSubmit, setIsSubmit] = useState();
  const [isChecked, setIsChecked] = useState(false);

  const [buyerData, setBuyerData] = useState({});

  const userAccountData = getUserAccountData();
  const userData = getUserData();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { handleSubmit } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    const { buyerAddressDetails, buyerEmploymentDetails } = buyerData;
    if (buyerAddressDetails && buyerEmploymentDetails) {
      handleSubmit(onSubmit)();
    }
  }, [buyerData]);

  const buyerDataRef = useRef(buyerData);
  const addBuyerDetails = () => {
    setIsSubmit(true);
  };

  const updateState = (newState) => {
    buyerDataRef.current = newState;
    setBuyerData(newState);
    setIsSubmit(false);
  };

  const getBuyerAddressDetails = (data) => {
    updateState({ ...buyerDataRef.current, buyerAddressDetails: data });
  };

  const getBuyerEmploymentDetails = (data) => {
    updateState({ ...buyerDataRef.current, buyerEmploymentDetails: data });
  };

  const onSubmit = () => {
    const { buyerAddressDetails, buyerEmploymentDetails } = buyerData;

    const signupBuyerData = {
      employmentType: buyerEmploymentDetails.employmentTypeToSend,
      experience: buyerEmploymentDetails.experience,
      countryOfBirth: parseInt(buyerEmploymentDetails.countryOfBirth),
      citizenship: parseInt(buyerEmploymentDetails.citizenship),
      taxCountry: parseInt(buyerEmploymentDetails.countryOfTax),
      uinTypeValue: replaceWithUnderScore(
        buyerEmploymentDetails.UinPinTypeToSend
      ),
      uniqueIdentificationNumber:
        buyerEmploymentDetails.uniqueIdentificationNumber,
      taxId:
        buyerEmploymentDetails.taxOption === "yes"
          ? parseInt(buyerEmploymentDetails?.taxId)
          : null,
      addressLine1: buyerAddressDetails.addressLine1,
      country: parseInt(buyerAddressDetails.country),
      state: parseInt(buyerAddressDetails.state),
      city: buyerAddressDetails.city,
      addressLine2: buyerAddressDetails.addressLine2,
    };
    if (buyerAddressDetails.uniqueIdentificationState) {
      signupBuyerData.uniqueIdentificationState = buyerAddressDetails.uniqueIdentificationState
    }
    if (buyerAddressDetails.zipCode) {
      signupBuyerData["zipCode"] = parseInt(buyerAddressDetails.zipCode);
    }
    dispatch(signupSingleBuyerDetails(signupBuyerData, navigate));
    setIsSubmit(false);
  };

  return (
    <>
      <AjEmploymentDetails
        submit={isSubmit}
        data={getBuyerEmploymentDetails}
        defaultEmploymentType={userAccountData?.employment_type}
        defaultExperience={userAccountData?.experience}
        defaultCountryOfBirth={userAccountData?.country_of_birth}
        defaultCitizenship={userAccountData?.citizenship}
        defaultCountryOfTax={userAccountData?.tax_country}
        defaultUINPinType={userAccountData?.uin_type}
        defaultUniqueIdentificationNumber={userAccountData?.uin}
        defaultTaxId={userAccountData?.tax_id}
        defaultTaxOption={userAccountData?.tax_id === null ? "no" : "yes"}
      />

      <AjAdress
        submit={isSubmit}
        data={getBuyerAddressDetails}
        defaultAddressLine1={userAccountData?.address_1}
        defaultAddressLine2={userAccountData?.address_2}
        defaultCity={userAccountData?.city}
        defaultZipCode={userAccountData?.zip_code}
        defaultCountry={userAccountData?.country || userData?.country_id}
        defaultState={userAccountData?.state}
      />
      <Grid
        style={customCommonStyles.proceedToKycButton}
        container
        columnSpacing={"1.25rem"}
      >
        <AjButton
          onClick={addBuyerDetails}
          variant="contained"
          displayText="Proceed to KYC"
          isDisable={!isChecked}
        />
        <AjTnCLink setIsChecked={setIsChecked} />
      </Grid>
    </>
  );
};

export default AjSignupSingleBuyerDetails;
