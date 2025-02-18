import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as _ from "lodash";
import AjAddFarmerContainer from "../../../../../Components/AjAddFarmerContainer/AjAddFarmerContainer";
import AjAddFarmerSelectReferee from "../../../../../Components/AjAddFarmerSelectReferee/AjAddFarmerSelectReferee";
import AjSelectRefereeOtpVerification from "../../../../../Components/AjSelectRefereeOtpVerification/AjSelectRefereeOtpVerification";
import {
  employmentOption,
  UIN_TYPE_VALUE,
} from "../../../../../Constant/AppConstant";
import { refereeVerifyOtp } from "../../../../../Redux/common/otp/otpActions";
import {
  ADD_FARMER_PRODUCT,
  ADD_FARMER_REFEREE_SELECTION,
  ADD_FARMER_OTP_VERIFICATION,
} from "../../../../../Routes/Routes";
import { getProducts } from "../../../../../Redux/common/Products/productsActions";
import {
  getMasterData,
  getMasterDataAction,
} from "../../../../../Redux/common/GetMasterData/getMasterDataActions";

const AddFarmerRefereeSelection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sendOtpState, setSendOtpState] = useState(false);
  const {
    landData,
    productData,
    farmersDetailsData,
    farmersOtpData,
    farmersOtpId,
  } = useSelector((state) => state.farmers);
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    if (!farmersOtpId) {
      navigate(ADD_FARMER_OTP_VERIFICATION);
    }
  }, []);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getMasterDataAction({ itemType: "SOIL_TYPE" }));
    return () => dispatch(getMasterData(null));
  }, []);

  const typeOfSoilMasterData = useSelector(
    (state) => state.masterData.masterData
  );

  const verifyRefereeOtpData = (data1, data2) => {
    const referees = [];
    referees.push(
      {
        id: data1.id,
        countryId: data1.countryId,
        mobileNumber: data1.mobileNumber,
        otp: data1.otp,
      },
      {
        id: data2.id,
        countryId: data2.countryId,
        mobileNumber: data2.mobileNumber,
        otp: data2.otp,
      }
    );

    const certificatesData = farmersDetailsData?.certificate?.map((item) => {
      return {
        certificationTypeId: item.documentDataType.id,
        certificationDocumentId: item.documentData.id,
      };
    });

    const landListingData = landData?.landListing?.map((item) => {
      const soilTypeArray = [];
      soilTypeArray.push(
        _.find(typeOfSoilMasterData, {
          name: item.typeOfSoil,
        }).id
      );
      return {
        soilType: soilTypeArray,
        landSize: parseInt(item?.landSize),
        geoMapData: item?.geo_mapping_land,
      };
    });

    const productListingData = productData?.productListing?.map((item) => {
      return {
        productId: _.find(products, { productName: item?.productName })
          .productId,
        yield: parseInt(item?.yield),
      };
    });

    let personalDetailsToSend = {
      firstName: farmersDetailsData?.firstName,
      lastName: farmersDetailsData?.lastName,
      gender: farmersDetailsData?.gender,
      dateOfBirth: farmersDetailsData?.dateOfBirth,
      employmentType:
        farmersDetailsData?.employmentType || employmentOption[0]?.value,
      experienceYears: farmersDetailsData?.experience,
      birthCountry: farmersDetailsData?.countryOfBirth,
      citizenship: farmersDetailsData?.citizenship,
      taxCountry: farmersDetailsData?.countryOfTax,
      taxId: farmersDetailsData?.taxId ? farmersDetailsData?.taxId : null,
      address1: farmersDetailsData?.addressLine1,
      country: farmersDetailsData?.countryId,
      state: farmersDetailsData?.stateId,
      city: farmersDetailsData?.city,
    };

    if (farmersDetailsData?.UinPinType) {
      personalDetailsToSend = {
        ...personalDetailsToSend,
        uinTypeValue: farmersDetailsData?.UinPinType,
      };
    }

    if (farmersDetailsData?.uniqueIdentificationNumber) {
      personalDetailsToSend = {
        ...personalDetailsToSend,
        uniqueIdentificationNumber: farmersDetailsData?.uniqueIdentificationNumber,
      };
    }

    if (farmersDetailsData?.uniqueIdentificationState) {
      personalDetailsToSend = {
        ...personalDetailsToSend,
        uniqueIdentificationState: farmersDetailsData?.uniqueIdentificationState,
      };
    }

    if (farmersDetailsData?.lga) {
      personalDetailsToSend = {...personalDetailsToSend, lga: farmersDetailsData?.lga};
    }

    if (farmersDetailsData?.addressLine2) {
      personalDetailsToSend = {
        ...personalDetailsToSend,
        address2: farmersDetailsData?.addressLine2,
      };
    }

    if (farmersDetailsData?.zipCode) {
      personalDetailsToSend = {
        ...personalDetailsToSend,
        zipCode: farmersDetailsData?.zipCode,
      };
    }

    let finalDataToSend = {
      personalDetails: personalDetailsToSend,
      certificationDetails: certificatesData,
      productDetails: productListingData,
      farmerOtpData: {
        otpId: farmersOtpId?.otpId,
        countryId: farmersOtpData?.countryId,
        mobileNumber: farmersOtpData?.mobileNumber,
      },
    };

    if (landData?.landListing?.length > 0) {
      finalDataToSend = {
        ...finalDataToSend,
        landDetails: landListingData,
      };
    }

    // if (
    //   farmersDetailsData?.accountHolderName &&
    //   farmersDetailsData?.bankName &&
    //   farmersDetailsData?.accountNumber
    // ) {
    //   finalDataToSend = {
    //     ...finalDataToSend,
    //     bankDetails: {
    //       accountHolderName: farmersDetailsData?.accountHolderName,
    //       bankName: farmersDetailsData?.bankName,
    //       accountNumber: farmersDetailsData?.accountNumber,
    //     },
    //   };
    // }

    const requiredDataToSend = { referees: referees };
    dispatch(refereeVerifyOtp(requiredDataToSend, finalDataToSend, navigate));
  };

  return (
    <AjAddFarmerContainer
      changeNavigate={
        sendOtpState ? ADD_FARMER_REFEREE_SELECTION : ADD_FARMER_PRODUCT
      }
      activeStepNumber={5}
      setSendOtpState={setSendOtpState}
      sendOtpState={sendOtpState}
      stopResetPage={true}
    >
      {!sendOtpState ? (
        <AjAddFarmerSelectReferee
          isSkipButtonHidden={false}
          setSendOtpState={setSendOtpState}
          sendOtpState={sendOtpState}
        />
      ) : (
        <AjSelectRefereeOtpVerification
          isSkipButtonHidden={true}
          setSendOtpState={setSendOtpState}
          otpData={verifyRefereeOtpData}
          sendOtpState={sendOtpState}
          isMobile={true}
        />
      )}
    </AjAddFarmerContainer>
  );
};

export default AddFarmerRefereeSelection;
