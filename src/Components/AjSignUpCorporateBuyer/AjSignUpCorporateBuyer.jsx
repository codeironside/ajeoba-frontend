import React, { useState, useRef, useEffect } from "react";
import AjCompanyDetails from "../AjCompanyDetails/AjCompanyDetails";
import AjAdress from "../AjAdress/AjAdress";
import { Grid } from "@mui/material";
import { customCommonStyles } from "../../Style/CommonStyle";
import { useForm } from "react-hook-form";
import AjButton from "../AjButton";
import AjUploadCACDocument from "../AjUploadCACDocument/AjUploadCACDocument";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpCorporateBuyerDetails } from "../../Redux/SignUpCorporateBuyerDetails/signUpCorporateDetailsAction";
import {
  getUserAccountData,
  getUserData,
} from "../../Services/localStorageService";
import AjTnCLink from "../AjTnCLink/AjTnCLink";

const AjSignUpCorporateBuyer = () => {
  const { handleSubmit } = useForm({
    mode: "onChange",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [corporateBuyerData, setCorporateBuyerData] = useState({});
  const userAccountData = getUserAccountData();
  const userData = getUserData();
  const corporateBuyerDataRef = useRef(corporateBuyerData);

  useEffect(() => {
    const { addressDetails, corporateDetails, cacDocumentDetails } =
      corporateBuyerData;
    if (addressDetails && corporateDetails && cacDocumentDetails) {
      handleSubmit(onSubmit)();
    }
  }, [corporateBuyerData]);

  const updateState = (newState) => {
    corporateBuyerDataRef.current = newState;
    setCorporateBuyerData(newState);
    setIsSubmit(false);
  };

  const addCorporateBuyerDetails = () => {
    setIsSubmit(true);
  };

  const getCorporateDetails = (data) => {
    updateState({ ...corporateBuyerDataRef.current, corporateDetails: data });
  };

  const getAddressDetails = (data) => {
    updateState({ ...corporateBuyerDataRef.current, addressDetails: data });
  };

  const getCACDocumentDetails = (data) => {
    updateState({ ...corporateBuyerDataRef.current, cacDocumentDetails: data });
  };

  const onSubmit = () => {
    const { addressDetails, corporateDetails, cacDocumentDetails } =
      corporateBuyerData;
    if (!corporateDetails) {
      return;
    }
    if (!addressDetails) {
      return;
    }
    if (!cacDocumentDetails) {
      return;
    }
    const requiredData = {
      corporateName: corporateDetails.companyName,
      corporateRegistrationNumber: corporateDetails.registrationNumber,
      orgVerificationNumber: corporateDetails.orgVerificationNumber,
      orgVerificationType: corporateDetails.verificationTextRef.current,
      addressLine1: addressDetails.addressLine1,
      addressLine2: addressDetails.addressLine2 || "",
      country: parseInt(addressDetails.country),
      state: parseInt(addressDetails.state),
      city: addressDetails.city,
      cacDocumentId: parseInt(cacDocumentDetails.CACDocument),
    };
    if (addressDetails.zipCode) {
      requiredData["zipCode"] = parseInt(addressDetails.zipCode);
    }
    dispatch(signUpCorporateBuyerDetails(requiredData, navigate));
  };

  return (
    <>
      <AjCompanyDetails
        submit={isSubmit}
        data={getCorporateDetails}
        styleData={customCommonStyles.tinNumberContainer}
        companyNameLabel="Corporate Name"
        registrationNumberLabel="Corporate registration number"
        companyNamePlaceholder="Enter corporate name"
        type="Corporate"
        defaultCompanyName={userAccountData?.corporate_name}
        defaultRegistrationNumber={
          userAccountData?.corporate_registration_number
        }
        defaultOrgNumber={userAccountData?.org_verification_number}
        isUserVerification={true}
      />
      <AjAdress
        submit={isSubmit}
        data={getAddressDetails}
        defaultAddressLine1={userAccountData?.address_1}
        defaultAddressLine2={userAccountData?.address_2}
        defaultCity={userAccountData?.city}
        defaultZipCode={userAccountData?.zip_code}
        defaultCountry={userAccountData?.country || userData?.country_id}
        defaultState={userAccountData?.state}
      />
      <AjUploadCACDocument
        submit={isSubmit}
        docType="CAC_PHOTO"
        data={getCACDocumentDetails}
        styleData={customCommonStyles.certificateContainer}
        defaultCACDocument={{ id: userAccountData?.cac_document }}
        documentRequired={true}
      />
      <Grid
        style={customCommonStyles.proceedToKycButton}
        container
        columnSpacing={"1.25rem"}
      >
        <AjButton
          onClick={addCorporateBuyerDetails}
          variant="contained"
          displayText="Proceed to KYC"
          isDisable={!isChecked}
        />
        <AjTnCLink setIsChecked={setIsChecked} />
      </Grid>
    </>
  );
};

export default AjSignUpCorporateBuyer;
