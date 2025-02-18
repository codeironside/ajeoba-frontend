import React, { useEffect, useState, useRef } from "react";
import AjCompanyDetails from "../AjCompanyDetails/AjCompanyDetails";
import AjAdress from "../AjAdress/AjAdress";
import {
  getUserAccountData,
  getUserData,
} from "../../Services/localStorageService";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import { customCommonStyles } from "../../Style/CommonStyle";
import AjButton from "../AjButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AjUploadCACDocument from "../AjUploadCACDocument/AjUploadCACDocument";
import AjMultipleTruck from "../AjMultipleTruck/AjMultipleTruck";
import { signUpLogisticsCompanyDetails } from "../../Redux/SignUpLogisticsCompanyDetails/signUpLogisticsCompanyDetailsActions";
import { showToast } from "../../Services/toast";
import * as _ from "lodash";
import AjTnCLink from "../AjTnCLink/AjTnCLink";

const AjSignUpLogisticsCompany = () => {
  const { handleSubmit } = useForm({
    mode: "onChange",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [logisticsCompanyData, setLogisticsCompanyData] = useState({});
  const [selectedTrucks, setSelectedTrucks] = useState([]);
  const userAccountData = getUserAccountData();
  const userData = getUserData();
  const logisticsCompanyDataRef = useRef(logisticsCompanyData);

  useEffect(() => {
    const { addressDetails, companyDetails, cacDocumentDetails } =
      logisticsCompanyData;
    if (addressDetails && companyDetails && cacDocumentDetails) {
      handleSubmit(onSubmit)();
    }
  }, [logisticsCompanyData]);

  useEffect(() => {
    if (userAccountData?.truckDetails) {
      const temporaryTruck = userAccountData?.truckDetails?.map((truck) => ({
        truckCount: truck.no_of_trucks,
        truckData: { id: truck.item_id, name: truck.name },
      }));
      setSelectedTrucks(temporaryTruck.reverse());
    } else {
      setSelectedTrucks([{}]);
    }
  }, []);

  const updateState = (newState) => {
    logisticsCompanyDataRef.current = newState;
    setLogisticsCompanyData(newState);
    setIsSubmit(false);
  };

  const addLogisticsCompanyDetails = () => {
    setIsSubmit(true);
  };

  const getCompanyDetails = (data) => {
    updateState({ ...logisticsCompanyDataRef.current, companyDetails: data });
  };

  const getAddressDetails = (data) => {
    updateState({ ...logisticsCompanyDataRef.current, addressDetails: data });
  };

  const getCACDocumentDetails = (data) => {
    updateState({
      ...logisticsCompanyDataRef.current,
      cacDocumentDetails: data,
    });
  };

  const getTruckDetails = (data, countValid) => {
    const lastItem = _.last(data);
    if (lastItem?.truckCount > 0) {
      updateState({
        ...logisticsCompanyDataRef.current,
        truckDetails: data?.map((truck) => ({
          no_of_trucks: parseInt(truck.truckCount),
          item_id: truck.truckData.id,
        })),
      });
    } else {
      showToast("Number of trucks is required", "error");
    }
  };
  const onSubmit = () => {
    const { addressDetails, companyDetails, cacDocumentDetails, truckDetails } =
      logisticsCompanyData;
    if (!companyDetails) {
      return;
    }
    if (!addressDetails) {
      return;
    }
    if (!cacDocumentDetails) {
      return;
    }
    if (!truckDetails) {
      return;
    }
    const requiredData = {
      companyName: companyDetails.companyName,
      registrationNumber: companyDetails.registrationNumber,
      orgVerificationNumber: companyDetails.orgVerificationNumber,
      orgVerificationType: companyDetails.verificationTextRef.current,
      addressLine1: addressDetails.addressLine1,
      addressLine2: addressDetails.addressLine2 || "",
      country: parseInt(addressDetails.country),
      state: parseInt(addressDetails.state),
      city: addressDetails.city,
      cacDocumentId: parseInt(cacDocumentDetails.CACDocument),
      typeOfTruck: truckDetails,
    };
    if (addressDetails.zipCode) {
      requiredData["zipCode"] = parseInt(addressDetails.zipCode);
    }
    dispatch(signUpLogisticsCompanyDetails(requiredData, navigate));
  };
  return (
    <>
      {" "}
      <AjCompanyDetails
        submit={isSubmit}
        data={getCompanyDetails}
        styleData={customCommonStyles.tinNumberContainer}
        companyNameLabel="Logistics Name"
        registrationNumberLabel="Logistics registration number"
        companyNamePlaceholder="Enter logistics name"
        type="Logistics"
        defaultCompanyName={userAccountData?.company_name}
        defaultRegistrationNumber={userAccountData?.registration_number}
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
      <AjMultipleTruck
        submit={isSubmit}
        data={getTruckDetails}
        defaultValue={selectedTrucks}
      />
      <Grid
        style={customCommonStyles.proceedToKycButton}
        container
        columnSpacing={"1.25rem"}
      >
        <AjButton
          onClick={addLogisticsCompanyDetails}
          variant="contained"
          displayText="Proceed to KYC"
          isDisable={!isChecked}
        />
        <AjTnCLink setIsChecked={setIsChecked} />
      </Grid>
    </>
  );
};
export default AjSignUpLogisticsCompany;
