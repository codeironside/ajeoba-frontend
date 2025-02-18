import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import NumberFormat from "react-number-format";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputBase,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AjAdress from "../../../../Components/AjAdress/AjAdress";
import AjButton from "../../../../Components/AjButton";
import AjDropDown from "../../../../Components/AjDropdown/AjDropDown";
import { useParams } from "react-router-dom";
import AjInputLabel from "../../../../Components/AjInputLabel";
import AjPhoneNumber from "../../../../Components/AjPhoneNumber/AjPhoneNumber";
import AjTypography from "../../../../Components/AjTypography";

import {
  orderTypeOptions,
  sendAdOption,
} from "../../../../Constant/AppConstant";
import { getLogisticCompanyListAction } from "../../../../Redux/common/LogisticCompany/logisticCompanyActions";
import {
  getDistance,
  getDistanceAction,
} from "../../../../Redux/common/GetMasterData/getMasterDataActions";
import { getRecievedOrderDetailsByIdAction } from "../../../../Redux/FarmingAssociation/MarketPlace/marketplaceActions";
import { createLogisticAdAction } from "../../../../Redux/FarmingAssociation/LogisticAds/logisticAdsActions";
import { getInputOrderDetailsById } from "../../../../Redux/FarmingAssociation/Input/inputActions";
import { getCurrencySymbol } from "../../../../Services/commonService/commonService";
import { getUserData } from "../../../../Services/localStorageService";
import { logisticCreateAdSchema } from "../../../../validationSchema/logisticCreateAdSchema";
import { ROLES } from "../../../../Constant/RoleConstant";

import { commonStyles } from "../../../../Style/CommonStyle";
import { styles } from "./CreateLogisticAdsStyles";

const CreateLogisticAds = () => {
  const userData = getUserData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(logisticCreateAdSchema),
    mode: "onChange",
  });

  const [postAd, setPostAd] = useState();
  const [postAdLogisticCompany, setPostAdLogisticCompany] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [getaddressData, setGetAddressData] = useState(false);
  const [logisticAdData, setlogisticAdData] = useState({});

  const [countryId, setCountryId] = useState(null);
  const [isOrderData, setIsOrderData] = useState(false);
  const isDistanceAvailable = useRef(false);
  const logisticAdRef = useRef(logisticAdData);
  const [isInputBuyer, setIsInputBuyer] = useState(false);

  const logisticCompanyList = useSelector(
    (state) => state.logisticCommonData.logisticCompanies
  );

  const orderData = useSelector((state) => {
    if (localStorage.getItem("input_buyer")) {
      return state.tradingActiveAds.orderDetailsById;
    } else {
      if (userData.role_id === ROLES.INPUT_SUPPLIER) {
        return state.tradingActiveAds.orderDetailsById;
      } else {
        return state.marketplace.recievedOrderDetail;
      }
    }
  });

  const isBuyerhandlingLogistics =
    orderData?.orderDetail?.logistics_manage === "POST_ADS";

  const distance = useSelector((state) => state.masterData.distance);

  useEffect(() => {
    if (localStorage.getItem("input_buyer")) {
      setIsInputBuyer(true);
      localStorage.setItem("isInputBuyer", isInputBuyer);
      dispatch(getInputOrderDetailsById(id));
    } else {
      if (userData.role_id === ROLES.INPUT_SUPPLIER) {
        dispatch(getInputOrderDetailsById(id));
      } else {
        dispatch(getRecievedOrderDetailsByIdAction(id));
      }
    }
    dispatch(getLogisticCompanyListAction());
  }, [id]);

  useEffect(() => {
    const { logisticSellerAddressDetails, sellerMobileNumberDetails } =
      logisticAdData;
    if (
      logisticSellerAddressDetails &&
      sellerMobileNumberDetails &&
      isDistanceAvailable.current
    ) {
      handleSubmit(onSubmit)();
    }
  }, [logisticAdData, isDistanceAvailable.current]);

  useEffect(() => {
    const { logisticSellerAddressDetails } = logisticAdData;
    if (orderData && logisticSellerAddressDetails) {
      dispatch(
        getDistanceAction({
          origin: `${orderData?.orderDetail?.delivery_address_1}${
            orderData?.orderDetail?.delivery_address_2
              ? `,${orderData?.orderDetail?.delivery_address_2}`
              : ""
          },${orderData?.orderDetail?.city},${
            orderData?.orderDetail?.state_name
          },${orderData?.orderDetail?.country_name}`,
          destination: `${logisticSellerAddressDetails?.addressLine1}${
            logisticSellerAddressDetails?.addressLine2
              ? `,${logisticSellerAddressDetails?.addressLine2}`
              : ""
          },${logisticSellerAddressDetails?.city},${
            logisticSellerAddressDetails?.stateName
          },${logisticSellerAddressDetails?.countryName}`,
        })
      );
    } else if (orderData && isBuyerhandlingLogistics) {
      dispatch(
        getDistanceAction({
          origin: `${orderData?.warehouseDetail[0]?.address_1}${
            orderData?.warehouseDetail[0]?.address_2
              ? `,${orderData?.warehouseDetail[0]?.address_2}`
              : ""
          },${orderData?.warehouseDetail[0]?.city},${
            orderData?.warehouseDetail[0]?.state
          },${orderData?.warehouseDetail[0]?.country}`,

          destination: `${orderData?.orderDetail?.delivery_address_1}${
            orderData?.orderDetail?.delivery_address_2
              ? `,${orderData?.orderDetail?.delivery_address_2}`
              : ""
          },${orderData?.orderDetail?.city},${orderData?.orderDetail?.state},${
            orderData?.orderDetail?.country
          }`,
        })
      );
    }
    return () => {
      dispatch(getDistance(null));
    };
  }, [logisticAdData, orderData]);

  useEffect(() => {
    if (orderData?.orderDetail?.country) {
      setTimeout(() => {
        setIsOrderData(true);
      }, 500);
    }
  }, [orderData]);

  useEffect(() => {
    if (distance) {
      setValue("logisticAdDistance", distance?.distance?.text, {
        shouldValidate: true,
      });
      isDistanceAvailable.current = true;
    }
  }, [distance]);

  const postAdChangeHandler = (_e, selectedAdType) => {
    let selectedValue = sendAdOption.find((item) => {
      if (item.label === selectedAdType.props.value) {
        return item.value;
      }
    });
    setValue("logisticPostAd", selectedValue.value, {
      shouldValidate: true,
    });
    setPostAd(selectedValue.label);
  };

  const requestedLogisticCompanyChangeHandler = (_e, selectedCompany) => {
    let selectedValue = logisticCompanyList?.result?.find(
      (item) => item.id === selectedCompany.props.value.id
    );
    setPostAdLogisticCompany(selectedValue);
    setValue("logisticPostAdCompany", selectedValue.id, {
      shouldValidate: true,
    });
  };

  const createLogisticAd = () => {
    const submitData = getValues([
      "logisticAdDistance",
      "logisticPostAd",
      "logisticPrice",
      "logisticPostAdCompany",
    ]);
    if (!getValues("logisticAdDistance")) {
      calculateDistance();
    }
    submitData.forEach((item) => {
      if (item === "") {
        handleSubmit(onSubmit)();
      }
    });
    if (submitData) {
      handleSubmit(onSubmit)();
    }
    setIsSubmit(true);
  };

  const updateState = (newState) => {
    logisticAdRef.current = newState;
    setlogisticAdData(newState);
    setIsSubmit(false);
  };

  const getLogisticCompanySellerAddress = (data) => {
    updateState({
      ...logisticAdRef.current,
      logisticSellerAddressDetails: data,
    });
    setGetAddressData(false);
  };

  const getSellerMobileNumberDetails = (data) =>
    updateState({
      ...logisticAdRef.current,
      sellerMobileNumberDetails: data,
    });

  const onSubmit = (data) => {
    if (isBuyerhandlingLogistics) {
      const logisticCreateAdData = {
        requestType: parseInt(data.logisticPostAd),
        orderId: orderData.orderDetail.order_id,
        requestFor:
          userData.role_id === ROLES.INPUT_SUPPLIER
            ? orderTypeOptions[0].inputOrders
            : isInputBuyer
            ? orderTypeOptions[0].inputOrders
            : orderTypeOptions[0].productOrders,

        sellerAddress1: orderData?.warehouseDetail[0]?.address_1,
        sellerAddress2: orderData?.warehouseDetail[0]?.address_2 || " ",
        sellerCountry: orderData?.warehouseDetail[0]?.country,
        sellerState: parseInt(orderData?.warehouseDetail[0]?.state),
        sellerZipCode: orderData?.warehouseDetail[0]?.zip_code,
        sellerCity: orderData?.warehouseDetail[0]?.city,
        sellerContactNumber: orderData?.orderDetail?.seller_contact_number,
        countryId: parseInt(orderData?.warehouseDetail[0]?.country),
        price: parseFloat(getValues("logisticPrice")),
        distance: parseInt(data?.logisticAdDistance),
      };
      if (orderData?.warehouseDetail[0]?.address_2) {
        logisticCreateAdData["sellerAddress2"] =
          orderData?.warehouseDetail[0]?.address_2;
      }
      if (data.logisticPostAdCompany) {
        logisticCreateAdData["logisticsCompanyId"] = parseInt(
          data.logisticPostAdCompany
        );
      }
      dispatch(createLogisticAdAction(logisticCreateAdData, navigate));
    } else {
      if (!isDistanceAvailable.current) {
        return;
      }
      const { logisticSellerAddressDetails, sellerMobileNumberDetails } =
        logisticAdData;
      if (!logisticSellerAddressDetails || !sellerMobileNumberDetails) return;
      const logisticCreateAdData = {
        requestType: parseInt(data.logisticPostAd),
        orderId: orderData.orderDetail.order_id,
        requestFor:
          userData.role_id === ROLES.INPUT_SUPPLIER
            ? orderTypeOptions[0].inputOrders
            : isInputBuyer
            ? orderTypeOptions[0].inputOrders
            : orderTypeOptions[0].productOrders,

        sellerAddress1: logisticSellerAddressDetails.addressLine1,
        sellerAddress2: logisticSellerAddressDetails.addressLine2,
        sellerCountry: parseInt(logisticSellerAddressDetails.country),
        sellerState: parseInt(logisticSellerAddressDetails.state),
        sellerZipCode: logisticSellerAddressDetails.zipCode,
        sellerCity: logisticSellerAddressDetails.city,
        sellerContactNumber: sellerMobileNumberDetails.mobileNumber,
        countryId: parseInt(sellerMobileNumberDetails.countryId),
        price: parseFloat(getValues("logisticPrice")),
        distance: parseInt(data?.logisticAdDistance),
      };
      if (logisticSellerAddressDetails.addressLine2) {
        logisticCreateAdData["sellerAddress2"] =
          logisticSellerAddressDetails.addressLine2;
      }
      if (data.logisticPostAdCompany) {
        logisticCreateAdData["logisticsCompanyId"] = parseInt(
          data.logisticPostAdCompany
        );
      }
      dispatch(createLogisticAdAction(logisticCreateAdData, navigate));
    }
  };

  const onCountryCodeSelect = (selectedCountry) => {
    setCountryId(selectedCountry.countryId);
  };

  const backArrowHandler = () => {
    navigate(
      userData?.role_id === ROLES.INPUT_SUPPLIER
        ? "/received-orders"
        : "/marketplace?activeTab=1"
    );
  };

  const calculateDistance = () => {
    setGetAddressData(true);
  };

  return (
    <Grid container sx={commonStyles.signupFormMainGridContainer}>
      <Box sx={commonStyles.relativePosition}>
        <IconButton
          disableRipple
          sx={commonStyles.backButtonPosition}
          onClick={backArrowHandler}
        >
          {" "}
          <ArrowBackRoundedIcon sx={commonStyles.backButtonBlackFont} />
        </IconButton>
      </Box>
      <Grid
        container
        item
        sx={{
          ...commonStyles.signupFormMainContentContainer,
          ...commonStyles.customSrollBar,
        }}
      >
        <Box sx={commonStyles.signupContentContainer}>
          <AjTypography
            displayText="Create Ad"
            styleData={commonStyles.mainHeading}
          />
          <Box
            component="form"
            sx={{
              ...commonStyles.signupFormContainer,
              ...commonStyles.mobileScreenFormContainer,
            }}
          >
            {orderData && (
              <>
                <Box sx={commonStyles.signupFormFieldContainer}>
                  <AjInputLabel
                    displayText="Order Id"
                    required
                    styleData={commonStyles.inputLabel}
                  />
                  <InputBase
                    readOnly={true}
                    required
                    fullWidth
                    defaultValue={orderData?.orderDetail?.order_id}
                    placeholder="Enter order Id"
                    sx={{
                      ...commonStyles.inputStyle,
                      ...commonStyles.disableInput,
                    }}
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={errors.logisticAdOrderId?.message}
                  />
                </Box>
                <Box sx={commonStyles.signupFormFieldContainer}>
                  <AjInputLabel
                    displayText={`Quantity (${orderData?.orderDetail?.unit_of_measurement})`}
                    styleData={commonStyles.inputLabel}
                    required
                  />
                  <InputBase
                    readOnly={true}
                    fullWidth
                    defaultValue={orderData?.orderDetail?.quantity}
                    placeholder="Enter quantity"
                    sx={{
                      ...commonStyles.inputStyle,
                      ...commonStyles.disableInput,
                    }}
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={errors.logisticAdQuantity?.message}
                  />
                </Box>
              </>
            )}
            <Divider sx={commonStyles.dividerStyle} />
            <AjTypography
              displayText="Buyer Information"
              styleData={{ ...commonStyles.mainHeading, ...styles.subHeading }}
            />
            {orderData?.orderDetail && (
              <>
                <AjAdress
                  isDisable={true}
                  defaultAddressLine1={
                    orderData?.orderDetail?.delivery_address_1
                  }
                  defaultAddressLine2={
                    orderData?.orderDetail?.delivery_address_2
                  }
                  defaultCity={orderData?.orderDetail?.city}
                  defaultZipCode={orderData?.orderDetail?.zip_code}
                  defaultCountry={orderData?.orderDetail?.country}
                  defaultState={orderData?.orderDetail?.state}
                  customStyle={styles.resposiveFields}
                  zipCodeRequired
                />
                <AjPhoneNumber
                  label="Contact No."
                  isDisable={true}
                  defaultValue={orderData?.orderDetail?.buyer_contact_number}
                  defaultCountryId={parseInt(orderData?.orderDetail?.country)}
                />
              </>
            )}
            <Divider sx={commonStyles.dividerStyle} />

            <AjTypography
              displayText="Seller Information"
              styleData={{ ...commonStyles.mainHeading, ...styles.subHeading }}
            />
            {orderData?.orderDetail && isOrderData && (
              <>
                {isBuyerhandlingLogistics ? (
                  <>
                    <AjAdress
                      isDisable={true}
                      defaultAddressLine1={
                        orderData?.warehouseDetail[0]?.address_1
                      }
                      defaultAddressLine2={
                        orderData?.warehouseDetail[0]?.address_2
                      }
                      defaultCity={orderData?.warehouseDetail[0]?.city}
                      defaultZipCode={orderData?.warehouseDetail[0]?.zip_code}
                      defaultCountry={orderData?.warehouseDetail[0]?.country}
                      defaultState={orderData?.warehouseDetail[0]?.state}
                      customStyle={styles.resposiveFields}
                      zipCodeRequired
                    />
                    <AjPhoneNumber
                      label="Contact No."
                      isDisable={true}
                      defaultValue={
                        orderData?.orderDetail?.seller_contact_number
                      }
                      defaultCountryId={parseInt(
                        orderData?.orderDetail?.country
                      )}
                    />
                  </>
                ) : (
                  <>
                    {" "}
                    <AjAdress
                      submit={getaddressData || isSubmit}
                      data={getLogisticCompanySellerAddress}
                      defaultCountry={countryId || userData?.country_id}
                      isStateReset={true}
                      customStyle={styles.resposiveFields}
                      zipCodeRequired
                    />
                    <AjPhoneNumber
                      label="Contact No."
                      submit={isSubmit}
                      data={getSellerMobileNumberDetails}
                      defaultCountryId={userData?.country_id}
                      onCountryCodeSelect={onCountryCodeSelect}
                    />
                  </>
                )}
              </>
            )}
            <Divider sx={commonStyles.dividerStyle} />
            <AjTypography
              displayText="Other Information"
              styleData={{
                ...commonStyles.mainHeading,
                ...styles.subHeading,
                ...commonStyles.fullWidth,
              }}
            />
            <Box
              sx={{
                ...commonStyles.signupFormFieldContainer,
              }}
            >
              <Box sx={styles.distanceBox}>
                <AjInputLabel
                  displayText="Distance"
                  required
                  styleData={commonStyles.inputLabel}
                />
                <Button
                  sx={{
                    ...commonStyles.anchorButtonStyle,
                    ...styles.distanceButton,
                  }}
                  onClick={calculateDistance}
                >
                  Get distance
                </Button>
              </Box>
              <InputBase
                required
                fullWidth
                readOnly={true}
                placeholder="Enter distance"
                sx={{
                  ...commonStyles.inputStyle,
                  ...commonStyles.disableInput,
                }}
                {...register("logisticAdDistance")}
                error={errors.logisticAdDistance ? true : false}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.logisticAdDistance?.message}
              />
            </Box>
            <Box sx={commonStyles.signupFormFieldContainer}>
              <AjInputLabel
                displayText={`Cost Price ${getCurrencySymbol(
                  userData?.currency
                )}(${userData?.currency})`}
                styleData={commonStyles.inputLabel}
                required
              />
              <NumberFormat
                customInput={InputBase}
                thousandSeparator={true}
                prefix={`${getCurrencySymbol(userData?.currency)} `}
                style={{
                  ...commonStyles.inputStyle,
                }}
                placeholder="Enter Price"
                decimalScale={2}
                onValueChange={(value) =>
                  setValue("logisticPrice", value.value, {
                    shouldValidate: true,
                  })
                }
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.logisticPrice?.message}
              />
            </Box>
            <Box sx={commonStyles.signupFormFieldContainer}>
              <AjInputLabel
                displayText="Post Ad"
                required
                styleData={commonStyles.inputLabel}
              />
              <AjDropDown
                options={sendAdOption}
                value={postAd}
                source="label"
                onChange={postAdChangeHandler}
                placeHolder="Select Ad"
                isPlaceholderCapiltalize={false}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.logisticPostAd?.message}
              />
            </Box>
            {postAd === "Specific company" ? (
              <Box sx={commonStyles.signupFormFieldContainer}>
                <AjInputLabel
                  displayText="Requested from"
                  required
                  styleData={commonStyles.inputLabel}
                />
                <AjDropDown
                  options={logisticCompanyList.result}
                  value={postAdLogisticCompany}
                  source="company_name"
                  onChange={requestedLogisticCompanyChangeHandler}
                  placeHolder="Select logistic company"
                  disableSourceForValue
                  isPlaceholderCapiltalize={false}
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.logisticPostAdCompany?.message}
                />
              </Box>
            ) : (
              ""
            )}
          </Box>
          <Grid>
            <AjButton
              onClick={createLogisticAd}
              variant="contained"
              displayText="Create Logistics Ad"
            />
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CreateLogisticAds;
