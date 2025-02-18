import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AjAddFarmerContainer from "../../../../../Components/AjAddFarmerContainer/AjAddFarmerContainer";
import KYCStatus from "../../../../../Components/KYCStatus/KYCStatus";
import AjButton from "../../../../../Components/AjButton";
import { Grid } from "@mui/material";
import * as _ from "lodash";
import { addFarmerWithoutKycVerification } from "../../../../../Redux/FarmingAssociation/Farmers/farmersActions";

import {
  ADD_FARMER_REFEREE_SELECTION,
  FARMERS,
} from "../../../../../Routes/Routes";
import { styles } from "../../../../../Components/AjAddFarmerSelectReferee/AjAddFarmerSelectRefereeStyles";

const AddFarmerKycVerification = () => {
  const addFarmerRes = useSelector((state) => state.farmers.addFarmerFinalData);
  const farmerOtpData = useSelector((state) => state.farmers.farmersOtpData);
  const farmerOtpId = useSelector((state) => state.farmers.farmersOtpId);
  const farmerDetailsData = useSelector(
    (state) => state.farmers.farmersDetailsData
  );
  const productDetails = useSelector((state) => state.farmers.productData);

  const [farmerOtp, setFarmerOtp] = useState(farmerOtpData);
  const products = useSelector((state) => state.products.products);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (addFarmerRes?.farmerDetails?.is_kyc_verified) {
      setTimeout(() => {
        navigate(FARMERS);
      }, 6000);
    }
  }, [addFarmerRes]);

  useEffect(() => {
    if (farmerOtp) {
      farmerOtp["otpId"] = farmerOtpId?.otpId;
      setFarmerOtp({
        ...farmerOtp,
      });
    }
  }, [farmerOtpData, farmerOtpId]);

  const certificatesData = farmerDetailsData?.certificate?.map((item) => {
    return {
      certificationTypeId: item.documentDataType.id,
      certificationDocumentId: item.documentData.id,
    };
  });

  const productList = productDetails?.productListing?.map((item) => {
    return {
      productId: _.find(products, { productName: item.productName }).productId,
      yield: parseInt(item.yield),
    };
  });

  const handleSkip = () => {
    const finalDataTosend = {
      farmer: {
        certificationDetails: certificatesData,
        farmerOtpData: farmerOtp,
        personalDetails: {
          address1: farmerDetailsData.addressLine1,
          birthCountry: farmerDetailsData.countryOfBirth,
          citizenship: farmerDetailsData.citizenship,
          city: farmerDetailsData.city,
          country: farmerDetailsData.countryId,
          dateOfBirth: farmerDetailsData.dateOfBirth,
          employmentType: farmerDetailsData.employmentType,
          experienceYears: farmerDetailsData.experience,
          firstName: farmerDetailsData.firstName,
          gender: farmerDetailsData.gender,
          lastName: farmerDetailsData.lastName,
          state: farmerDetailsData.stateId,
          taxCountry: farmerDetailsData.countryOfTax,
          taxId: farmerDetailsData.taxId ? farmerDetailsData.taxId : null,
        },
        productDetails: productList,
        refereesOtpData: [],
      },
    };

    if (farmerDetailsData.UinPinType) {
      finalDataTosend.farmer.personalDetails = {
        ...finalDataTosend.farmer.personalDetails,
        uinTypeValue: farmerDetailsData.UinPinType,
      };
    }

    if (farmerDetailsData.uniqueIdentificationNumber) {
      finalDataTosend.farmer.personalDetails = {
        ...finalDataTosend.farmer.personalDetails,
        uniqueIdentificationNumber:
          farmerDetailsData.uniqueIdentificationNumber,
      };
    }

    if (farmerDetailsData.uniqueIdentificationState) {
      finalDataTosend.farmer.personalDetails = {
        ...finalDataTosend.farmer.personalDetails,
        uniqueIdentificationState: farmerDetailsData.uniqueIdentificationState,
      };
    }

    if (farmerDetailsData.lga) {
      finalDataTosend.farmer.personalDetails = {
        ...finalDataTosend.farmer.personalDetails,
        lga: farmerDetailsData.lga,
      };
    }

    if (farmerDetailsData.addressLine2) {
      finalDataTosend.farmer.personalDetails = {
        ...finalDataTosend.farmer.personalDetails,
        address2: farmerDetailsData.addressLine2,
      };
    }

    if (farmerDetailsData.zipCode) {
      finalDataTosend.farmer.personalDetails = {
        ...finalDataTosend.farmer.personalDetails,
        zipCode: farmerDetailsData.zipCode,
      };
    }

    dispatch(addFarmerWithoutKycVerification(finalDataTosend, navigate));
  };

  return (
    <AjAddFarmerContainer
      activeStepNumber={6}
      changeNavigate={ADD_FARMER_REFEREE_SELECTION}
    >
      {addFarmerRes?.farmerDetails?.is_kyc_verified ? (
        <KYCStatus
          kycStatus={addFarmerRes?.farmerDetails?.is_kyc_verified}
          style={{ marginLeft: "-3.5em" }}
        />
      ) : (
        <Grid style={{ marginTop: "3em" }}>
          <AjButton
            variant="contained"
            displayText="Skip"
            styleData={styles.buttonStyle}
            onClick={handleSkip}
          />
        </Grid>
      )}
    </AjAddFarmerContainer>
  );
};

export default AddFarmerKycVerification;
