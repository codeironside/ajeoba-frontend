import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AjAddFarmerContainer from "../../../../../Components/AjAddFarmerContainer/AjAddFarmerContainer";
import {
  // ADD_FARMERS_LAND_DETAILS,
  ADD_FARMER_OTP_VERIFICATION,
  ADD_FARMER_VNIN_VERIFICATION,
} from "../../../../../Routes/Routes";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import * as moment from "moment";
import { farmersCommonStyles } from "../../FarmersStyles";
import { commonStyles } from "../../../../../Style/CommonStyle";
import AjButton from "../../../../../Components/AjButton";
import { getCountries } from "../../../../../Redux/common/Countries/getCountriesActions";
import {
  addingFarmerDetails,
  resetAddFarmerDetails,
} from "../../../../../Redux/FarmingAssociation/Farmers/farmersActions";
import { useNavigate } from "react-router-dom";
import AjAdress from "../../../../../Components/AjAdress/AjAdress";
import AjPersonalDetails from "../../../../../Components/AjPersonalDetails/AjPersonalDetails";
// import AjBankDetails from "../../../../../Components/AjBankDetails/AjBankDetails";
import AjEmploymentDetails from "../../../../../Components/AjEmploymentDetails/AjEmploymentDetails";
import AjUploadMultipleCertificate from "../../../../../Components/AjUploadMultipleCertificate/AjUploadMultipleCertificate";
import { showToast } from "../../../../../Services/toast";
// import { replaceWithUnderScore } from "../../../../../Services/commonService/commonService";

const AddFarmerPersonalDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const farmersDetailsData = useSelector(
    (state) => state.farmers.farmersDetailsData
  );
  const farmersOtpId = useSelector((state) => state.farmers.farmersOtpId);

  const countryIdOfFarmer = useSelector((state) => state.countries.countryId);
  const [isSubmit, setIsSubmit] = useState(false);


  useEffect(() => {
    if (!farmersOtpId) {
      navigate(ADD_FARMER_OTP_VERIFICATION);
    }
  }, []);

  let addressData = null;
  let personalData = null;
  // let bankData = null;
  let employmentData = null;
  let certificateData = null;

  const addFarmerDetails = () => {
    setIsSubmit(true);
  };

  const getAddressData = (data) => {
    addressData = data;
    setIsSubmit(false);
    handleSubmit(onSubmit)();
  };

  const getPersonalDetails = (data) => {
    personalData = data;
    setIsSubmit(false);
    handleSubmit(onSubmit)();
  };

  // const getBankDetails = (data) => {
  //   bankData = data;
  //   setIsSubmit(false);
  //   handleSubmit(onSubmit)();
  // };

  const getEmploymentDetails = (data) => {
    employmentData = data;
    setIsSubmit(false);
    handleSubmit(onSubmit)();
  };

  const getCertificatesDetails = (data) => {
    certificateData = data;
    setIsSubmit(false);
    if (!certificateData) {
      handleSubmit(onSubmit)();
    } else {
      showToast("Certificate is required", "error");
    }
  };

  const onSubmit = () => {
    if (!addressData) {
      return;
    }
    if (!personalData) {
      return;
    }
    // if (!bankData) {
      //   return;
      // }
    if (!employmentData) {
        return;
      }
    if (!certificateData) {
      return;
    }
    const requiredData = {
      firstName: personalData.firstName,
      lastName: personalData.lastName,
      gender: personalData.gender,
      dateOfBirth: moment(personalData.dateOfBirth).toISOString(true),
      employmentType: employmentData.employmentTypeToSend,
      experience: employmentData.experience,
      countryOfBirth: parseInt(employmentData.countryOfBirth),
      citizenship: parseInt(employmentData.citizenship),
      countryOfTax: parseInt(employmentData.countryOfTax),
      taxId:
        employmentData.taxOption === "yes"
          ? parseInt(employmentData?.taxId)
          : "",
      taxOption: employmentData.taxOption,
      // accountHolderName: bankData.accountHolderName,
      // bankName: bankData.bankName,
      // accountNumber: bankData.accountNumber,
      addressLine1: addressData.addressLine1,
      addressLine2: addressData.addressLine2 || "",
      countryId: parseInt(addressData.country),
      stateId: parseInt(addressData.state),
      city: addressData.city,
      certificate: certificateData,
    };

    if (addressData.zipCode) {
      requiredData["zipCode"] = parseInt(addressData.zipCode);
    }

    if (employmentData.uniqueIdentificationState) {
      requiredData["uniqueIdentificationState"] =
        employmentData.uniqueIdentificationState;
    }

    // if (employmentData.UinPinTypeToSend) {
    //   requiredData["UinPinType"] = replaceWithUnderScore(employmentData.UinPinTypeToSend)
    // }

    // if (employmentData.uniqueIdentificationNumber) {
    //   requiredData['uniqueIdentificationNumber'] =
    //     employmentData.uniqueIdentificationNumber
    // }

    //  if (employmentData.lga) {
    //  requiredData['lga'] = employmentData.lga.value;
    // };
    dispatch(addingFarmerDetails(requiredData));
    // navigate(ADD_FARMERS_LAND_DETAILS);
    navigate(ADD_FARMER_VNIN_VERIFICATION);
  };

  return (
    <AjAddFarmerContainer
      changeNavigate={ADD_FARMER_OTP_VERIFICATION}
      activeStepNumber={1}
      resetAddFarmerDetails={resetAddFarmerDetails}
    >
      <Box
        component="form"
        sx={[
          commonStyles.signupFormContainer,
          farmersCommonStyles.addfarmerForm,
        ]}
      >
        <AjPersonalDetails
          submit={isSubmit}
          data={getPersonalDetails}
          defaultFirstName={farmersDetailsData?.firstName}
          defaultLastName={farmersDetailsData?.lastName}
          defaultGender={farmersDetailsData?.gender}
          defaultDateOfBirth={farmersDetailsData?.dateOfBirth}
        />
        <AjEmploymentDetails
          submit={isSubmit}
          data={getEmploymentDetails}
          defaultEmploymentType={farmersDetailsData?.employmentType}
          defaultExperience={farmersDetailsData?.experience}
          defaultCountryOfBirth={farmersDetailsData?.countryOfBirth}
          defaultCitizenship={farmersDetailsData?.citizenship}
          defaultCountryOfTax={farmersDetailsData?.countryOfTax}
          defaultUINPinType={farmersDetailsData?.UinPinType}
          defaultUniqueIdentificationNumber={""}
          defaultTaxId={farmersDetailsData?.taxId}
          defaultTaxOption={farmersDetailsData?.taxOption}
          countryId={countryIdOfFarmer}
          isCountryIdRequired={true}
        />
        {/* <AjBankDetails
          submit={isSubmit}
          data={getBankDetails}
          defaultAccountHolderName={farmersDetailsData?.accountHolderName}
          defaultBankName={farmersDetailsData?.bankName}
          defaultAccountNumber={farmersDetailsData?.accountNumber}
        /> */}
        <AjUploadMultipleCertificate
          submit={isSubmit}
          data={getCertificatesDetails}
          defaultValue={farmersDetailsData?.certificate}
          isRequired={true}
          type="farmer_certificate"
        />
        <AjAdress
          submit={isSubmit}
          data={getAddressData}
          defaultAddressLine1={farmersDetailsData?.addressLine1}
          defaultAddressLine2={farmersDetailsData?.addressLine2}
          defaultCity={farmersDetailsData?.city}
          defaultZipCode={farmersDetailsData?.zipCode}
          defaultCountry={farmersDetailsData?.countryId || countryIdOfFarmer}
          defaultState={farmersDetailsData?.stateId}
        />
      </Box>
      <AjButton
        variant="contained"
        styleData={farmersCommonStyles.nextBtnStyle}
        displayText="Next"
        onClick={addFarmerDetails}
      />
    </AjAddFarmerContainer>
  );
};

export default AddFarmerPersonalDetails;
