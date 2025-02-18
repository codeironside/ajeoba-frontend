import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Divider, InputBase, Typography } from "@mui/material";
import { commonStyles } from "../../Style/CommonStyle";
import AjDetailData from "../AjDetailData/AjDetailData";
import AjBuyerLogisticDecision from "../AjBuyerLogisticDecision/AjBuyerLogisticDecision";
import { styles } from "../AjActiveAdsCard/AjActiveAdsCardStyles.js";
import { AjRating } from "../AjRating";
import { buyProductModalStyles } from "./AjBuyProductModalStyles";
import AjInputLabel from "../AjInputLabel";
import AjTypography from "../AjTypography";
import { useForm } from "react-hook-form";
import { logisticDecision } from "../../Constant/AppConstant";
import AjSearchInput from "../AjSearchInput.jsx";
import {
  getUserAccountData,
  getUserData,
} from "../../Services/localStorageService";
import {
  numberWithCommas,
  textCapitalize,
} from "../../Services/commonService/commonService";
import AjAdress from "../AjAdress/AjAdress";
import AjButton from "../AjButton";
import AjPhoneNumber from "../AjPhoneNumber/AjPhoneNumber";
import { yupResolver } from "@hookform/resolvers/yup";
import { buyProductModalSchema } from "../../validationSchema/buyProductModalSchema";
import defaultImage from "../../Assets/Images/defaultPhoto.png";
import {
  buyProductAction,
  buyInputAction,
} from "../../Redux/CorporateBuyer/Trading/tradingActions";
import accounting from "accounting";

const AjBuyProductModal = (props) => {
  const { data, type } = props;

  const {
    setValue,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      buyProductModalSchema(data?.available_quantity, data?.unit_of_measurement)
    ),
    mode: "onChange",
  });
  const userData = getUserData();
  const userAccountData = getUserAccountData();
  const dispatch = useDispatch();

  const [isSubmit, setIsSubmit] = useState();
  const [countryId, setCountryId] = useState(
    userAccountData?.country || userData?.country_id
  );
  const [buyProductData, setBuyProductData] = useState({});
  const [commission, setCommission] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentTotalAmount, setCurrentTotalAmount] = useState(0);
  const buyProductDataRef = useRef(buyProductData);

  useEffect(() => {
    const { addressDetails, phoneDetails, decisionDetails } = buyProductData;
   
    if (addressDetails && phoneDetails && decisionDetails) {
      handleSubmit(onSubmit)();
    }
  }, [buyProductData]);

  useEffect(() => {
    if (data?.batch_type === "WHOLESALE") {
      setValue("quantity", data?.available_quantity, { shouldValidate: true });
      calculateAmount(data?.available_quantity);
    }
  }, [data]);

  const quantityChangeHandler = (buyerQuantity) => {
    setValue("quantity", buyerQuantity.target.value, { shouldValidate: true });
    calculateAmount(buyerQuantity.target.value);
  };

  const calculateAmount = (quantity) => {
    const currentAmount = Number(
      accounting.toFixed((quantity * data?.price_per_unit * 100) / 100, 2)
    );
    setCurrentTotalAmount(currentAmount);

    const tempCommission =
      data?.is_commission_active &&
      quantity >= data?.min_quantity_for_commission
        ? (currentAmount * data?.commission_percentage) / 100
        : 0;
    setCommission(tempCommission);
    setTotalAmount(+tempCommission + +currentAmount);
  };

  const updateState = (newState) => {
    buyProductDataRef.current = newState;
    setBuyProductData(newState);
    setIsSubmit(false);
  };
  const onCountryCodeSelect = (selectedCountry) => {
    setCountryId(selectedCountry.countryId);
  };

  const getPhoneNumberDetails = (details) => {
    updateState({ ...buyProductDataRef.current, phoneDetails: details });
  };

  const getAddressData = (details) => {
    updateState({ ...buyProductDataRef.current, addressDetails: details });
  };

const getDecisionData = (details) => {
  updateState({ ...buyProductDataRef.current, decisionDetails: details });
};

  const buyProduct = () => {
    setIsSubmit(true);
  };

  const onSubmit = (quantityData) => {
    
    const { phoneDetails, addressDetails, decisionDetails } = buyProductDataRef.current;
    
    if (!quantityData) {
      return;
    }
    if (!phoneDetails) {
      return;
    }
    if (!addressDetails) {
      return;
    }
    if (!decisionDetails) {
      return
    }
    const requiredData = {
      quantity: parseInt(quantityData.quantity),
      addressLine1: addressDetails.addressLine1,
      manageLogistics: decisionDetails.decision,
      country: parseInt(addressDetails.country),
      state: parseInt(addressDetails.state),
      city: addressDetails.city,
      contactNumber: phoneDetails.mobileNumber,
    };
    if (addressDetails.zipCode) {
      requiredData["zipCode"] = parseInt(addressDetails.zipCode);
    }
    if (addressDetails.adddressLine2) {
      requiredData["addressLine2"] = addressDetails.addressLine2;
    }
    props.closeModal(false);

    if (type === "Product") {
      dispatch(buyProductAction(data.id, requiredData));
    } else if(type === "Input") {
      dispatch(buyInputAction(data.id, requiredData));
    }
  };

  return (
    <Box sx={buyProductModalStyles.modalContentConatiner}>
      <Box sx={{ display: "flex", justifyContent: "center", paddingBottom: "16px" }}>

      <Box
          sx={{
            ...commonStyles.signupFormFieldContainerPayment,
            ...commonStyles.cover,
          }}
        >
          <Box sx={{ ...commonStyles.contain_text }}>
            <AjTypography
              displayText="Cost price"
              styleData={buyProductModalStyles.totalAmountText}
            />
            {data?.currency && (
              <AjTypography
                displayText={`${numberWithCommas(
                  currentTotalAmount,
                  data?.currency
                )}`}
                styleData={buyProductModalStyles.totalAmountValue}
              />
            )}
          </Box>
          <Divider
            sx={{
              ...commonStyles.verticalDivider
            }}
          />
          <Box sx={[ commonStyles.contain_text, commonStyles.bborder ]}>
            <AjTypography
              displayText="Ajeoba commission"
              styleData={buyProductModalStyles.totalAmountText}
            />
            {data?.currency && (
              <AjTypography
                displayText={`${numberWithCommas(
                  commission,
                  data?.currency
                )}`}
                styleData={buyProductModalStyles.totalAmountValue}
              />
            )}
          </Box>
          <Divider
            sx={{
              ...commonStyles.verticalDivider
            }}
          />
          <Box sx={{ ...commonStyles.contain_text }}>
            <AjTypography
              displayText="Total amount you have to pay"
              styleData={buyProductModalStyles.totalAmountText}
            />
            {data?.currency && (
              <AjTypography
                displayText={`${numberWithCommas(
                  totalAmount,
                  data?.currency
                )}`}
                styleData={buyProductModalStyles.weight}
              />
            )}
          </Box>
      </Box>
      {/* </Box> */}
      </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box
                component="form"
                sx={[
                  commonStyles.signupFormContainerPayment,
                  buyProductModalStyles.fieldsMainConatinerPayment,
                ]}
              >
                <Box
                  sx={{
                    ...commonStyles.signupFormFieldContainerPay,
                    ...commonStyles.customFieldWidth,
                  }}
                >
                  <AjInputLabel
                    required={true}
                    styleData={commonStyles.inputLabel}
                    displayText={`Quantity (${textCapitalize(
                      data?.unit_of_measurement
                    )})`}
                  />
                  <InputBase
                      required
                      id="quantity"
                      name="quantity"
                      placeholder="Enter quantity"
                      sx={{
                        ...commonStyles.inputStyle,
                        ...(props.isDisable && commonStyles.disableInput),
                      }}
                      readOnly={props.isDisable}
                      {...register("quantity",
                      {
                        onChange: quantityChangeHandler,
                      })}
                      error={errors.quantity ? true : false}
                  />
                  <AjTypography
                      styleData={commonStyles.errorText}
                      displayText={errors.quantity?.message}
                  />
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box
                component="form"
                sx={[
                  commonStyles.signupFormContainerPayment,
                  buyProductModalStyles.fieldsMainConatinerPayment,
                ]}
              >
                  <AjTypography
                      displayText="Delivery Details"
                      styleData={buyProductModalStyles.deliveryLabel}
                  />
              </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            component="form"
            sx={[
              commonStyles.signupFormContainerPayment,
              buyProductModalStyles.fieldsMainConatinerPayment,
            ]}
          >

            <AjAdress
              submit={isSubmit}
              data={getAddressData}
              defaultAddressLine1={userAccountData?.address_1}
              defaultAddressLine2={userAccountData?.address_2}
              defaultCity={userAccountData?.city}
              defaultZipCode={userAccountData?.zip_code}
              defaultCountry={countryId}
              defaultState={userAccountData?.state}
              customStyle={commonStyles.customFieldWidth}
              zipCodeRequired={true}
            />
            </Box>
            </Box>

          <Box
              component="form"
              sx={{
                  ...commonStyles.signupFormContainerPayment,
                  ...commonStyles.topblock,
              }
              }
          >
          
            <Typography sx={{
              ...commonStyles.info
            }}>Would you like to manage logistic yourself else post an ad for logistic's companies on Ajeoba's platform?</Typography>

            <Box
                component="form"
                sx={[
                    commonStyles.blockDec,
                  ]
                }
              >
                  <AjBuyerLogisticDecision
                    submit={isSubmit}
                    data={getDecisionData}
                    customStyle={commonStyles.customFieldWidth}
                  />
                
                  <AjPhoneNumber
                      label="Contact Number"
                      customStyle={commonStyles.marginTop20}
                      defaultValue={userData?.mobile_no}
                      submit={isSubmit}
                      data={getPhoneNumberDetails}
                      defaultCountryId={userData?.country_id}
                      onCountryCodeSelect={onCountryCodeSelect}
                  />
            </Box>
        </Box>
            
        
      {/*  */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          component="form"
          sx={[
            commonStyles.signupFormContainer,
            buyProductModalStyles.fieldsMainConatiner,
          ]}
        >
          <Box sx={buyProductModalStyles.buttonContainer}>
            <AjButton
              variant="contained"
              styleData={{"width": "fit-content"}}
              displayText="Save & Proceed to purchase"
              onClick={buyProduct}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AjBuyProductModal;


