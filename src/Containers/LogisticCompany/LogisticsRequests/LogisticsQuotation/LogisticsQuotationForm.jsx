import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { commonStyles } from "../../../../Style/CommonStyle";
import { Grid, Box, InputBase } from "@mui/material";
import AjInputLabel from "../../../../Components/AjInputLabel";
import AjDatePicker from "../../../../Components/AjDatePicker";
import AjTypography from "../../../../Components/AjTypography";
import AjButton from "../../../../Components/AjButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as moment from "moment";
import NumberFormat from "react-number-format";
import { requestAccessAction } from "../../../../Redux/Logistics/logisticsActions";
import { LIMIT, SKIP } from "../../../../Constant/AppConstant";
import {
  getNextYearDate,
  getTodaysDate,
  numberWithCommas,
  textCapitalize,
  getCurrencySymbol,
  removeFloat,
} from "../../../../Services/commonService/commonService";
import { getUserData } from "../../../../Services/localStorageService";
import { logisticAdQuotationSchema } from "../../../../validationSchema/logisticCreateAdSchema";
import { useNavigate } from "react-router";

const LogisticsQuotationForm = ({ listAds, typeofAdReq, requestFor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = getUserData();
  const [orderType, setOrderType] = useState("");
  const [delPrice, setDelPrice] = useState("");
  const [estDeliveryDate, setEstDeliveryDate] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(logisticAdQuotationSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (listAds) {
      if ("input_name" in listAds) {
        setOrderType(requestFor?.inputOrders);
      } else if ("product_name" in listAds) {
        setOrderType(requestFor?.productOrders);
      }
    }
  }, [listAds]);

  const onSubmit = () => {
    const advertisementId = listAds?.id;
    const reqBody = {
      deliveryEstimation: moment(estDeliveryDate).toISOString(true),
      desiredPrice: Number(delPrice),
    };
    const data = {
      limit: LIMIT,
      skip: SKIP,
      requestType: typeofAdReq,
      requestFor: orderType,
    };
    dispatch(requestAccessAction(advertisementId, reqBody, data, navigate));
  };

  const estDateSelectionHandler = (date) => {
    if (date === null) {
      setEstDeliveryDate("");
    } else {
      setEstDeliveryDate(date);
    }
    setValue("estimatedDeliveryDate", date, { shouldValidate: true });
  };

  const handleLogisticCompanyPrice = (value) => {
    setValue("logisticPrice", value.value, {
      shouldValidate: true,
    });
    setDelPrice(value.value);
  };

  return (
    <>
      <Grid
        container
        item
        sx={{
          ...commonStyles.whiteContainerBackgroundTabs,
          ...commonStyles.customSrollBar,
        }}
      >
        <Box sx={commonStyles.mainHeadingContainerLogisticsQuotationForm}>
          <Box
            component="form"
            xs={12}
            sm={6}
            sx={commonStyles.formDetailsLogisticsQuotation}
          >
            <Box sx={commonStyles.inputFiedLogQuotaion}>
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="Product Name"
              />
              <InputBase
                required
                value={textCapitalize(
                  listAds?.product_name
                    ? listAds?.product_name
                    : listAds?.input_name
                )}
                sx={{
                  ...commonStyles.inputStyle,
                  ...commonStyles.disableInput,
                }}
              />
            </Box>
            <Box sx={commonStyles.inputFiedLogQuotaion}>
              <Box sx={commonStyles.fieldMarginBuyer}>
                <AjInputLabel
                  required={true}
                  styleData={commonStyles.inputLabel}
                  displayText="Product Type"
                />
                <InputBase
                  required
                  value={textCapitalize(listAds?.type)}
                  sx={{
                    ...commonStyles.inputStyle,
                    ...commonStyles.disableInput,
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            component="form"
            xs={12}
            sm={6}
            sx={commonStyles.formDetailsLogisticsQuotation}
          >
            <Box sx={commonStyles.inputFiedLogQuotaion}>
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="Pick up Address"
              />
              <InputBase
                required
                readOnly={true}
                value={listAds?.seller_address_1}
                sx={{
                  ...commonStyles.inputStyle,
                  ...commonStyles.disableInput,
                }}
              />
            </Box>
            <Box sx={commonStyles.inputFiedLogQuotaion}>
              <Box sx={commonStyles.fieldMarginBuyer}>
                <AjInputLabel
                  required={true}
                  styleData={commonStyles.inputLabel}
                  displayText="Pick Up State"
                />
                <InputBase
                  required
                  id="pickupstate"
                  name="pickupstate"
                  value={`${listAds?.seller_city}, ${listAds?.seller_state_name}`}
                  sx={{
                    ...commonStyles.inputStyle,
                    ...commonStyles.disableInput,
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            component="form"
            xs={12}
            sm={6}
            sx={commonStyles.formDetailsLogisticsQuotation}
          >
            <Box sx={commonStyles.inputFiedLogQuotaion}>
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="Drop off Address"
              />
              <InputBase
                required
                id="address"
                name="address"
                value={listAds?.delivery_address_1}
                sx={{
                  ...commonStyles.inputStyle,
                  ...commonStyles.disableInput,
                }}
              />
            </Box>
            <Box sx={commonStyles.inputFiedLogQuotaion}>
              <Box sx={commonStyles.fieldMarginBuyer}>
                <AjInputLabel
                  required={true}
                  styleData={commonStyles.inputLabel}
                  displayText="Drop off State"
                />
                <InputBase
                  required
                  id="producttype"
                  name="producttype"
                  value={`${listAds?.buyer_city}, ${listAds?.buyer_state_name}`}
                  sx={{
                    ...commonStyles.inputStyle,
                    ...commonStyles.disableInput,
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            component="form"
            xs={12}
            sm={6}
            sx={commonStyles.formDetailsLogisticsQuotation}
          >
            <Box sx={commonStyles.inputFiedLogQuotaion}>
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="Weight"
              />
              <InputBase
                required
                id="Weight"
                name="Weight"
                value={`${listAds?.quantity} ${listAds?.unit_of_measurement}`}
                sx={{
                  ...commonStyles.inputStyle,
                  ...commonStyles.disableInput,
                }}
              />
            </Box>
            <Box sx={commonStyles.inputFiedLogQuotaion}>
              <Box sx={commonStyles.fieldMarginBuyer}>
                <AjInputLabel
                  required={true}
                  styleData={commonStyles.inputLabel}
                  displayText="Distance"
                />
                <InputBase
                  required
                  id="address"
                  name="address"
                  value={`${listAds?.distance}KM`}
                  sx={{
                    ...commonStyles.inputStyle,
                    ...commonStyles.disableInput,
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            component="form"
            xs={12}
            sm={6}
            sx={commonStyles.formDetailsLogisticsQuotation}
          >
            <Box sx={commonStyles.inputFiedLogQuotaion}>
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="Ad Type"
              />
              <InputBase
                required
                id="adtype"
                name="adtype"
                defaultValue="Open Ad"
                sx={{
                  ...commonStyles.inputStyle,
                  ...commonStyles.disableInput,
                }}
              />
            </Box>
            <Box sx={commonStyles.inputFiedLogQuotaion}>
              <Box sx={commonStyles.fieldMarginBuyer}>
                <AjInputLabel
                  required={true}
                  styleData={commonStyles.inputLabel}
                  displayText="Expected Delivery Cost (Ad Poster's Input)"
                />
                <InputBase
                  required
                  id="producttype"
                  name="producttype"
                  value={`${numberWithCommas(
                    listAds?.price,
                    userData?.currency
                  )} `}
                  sx={{
                    ...commonStyles.inputStyle,
                    ...commonStyles.disableInput,
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            component="form"
            xs={12}
            sm={6}
            sx={commonStyles.formDetailsLogisticsQuotation}
          >
            <Box sx={commonStyles.inputFiedLogQuotaion}>
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="Quotation Amt. (Logistics comp. Offer)"
              />
              <NumberFormat
                customInput={InputBase}
                thousandSeparator={true}
                prefix={`${getCurrencySymbol(userData?.currency)} `}
                placeholder="Enter Price"
                onValueChange={(value) => handleLogisticCompanyPrice(value)}
                {...register("logisticPrice")}
                error={errors.logisticPrice ? true : false}
                sx={commonStyles.inputStyleSignupLandingPage}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.logisticPrice?.message}
              />
            </Box>
            <Box sx={commonStyles.inputFiedLogQuotaion}>
              <Box sx={commonStyles.fieldMarginBuyer}>
                <AjInputLabel
                  displayText="Estimated Delivery Date"
                  required
                  styleData={commonStyles.inputLabel}
                />
                <AjDatePicker
                  value={estDeliveryDate ? estDeliveryDate : null}
                  dateSelectHandler={estDateSelectionHandler}
                  minDate={getTodaysDate()}
                  maxDate={getNextYearDate()}
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.estimatedDeliveryDate?.message}
                />
              </Box>
            </Box>
          </Box>

          <Box sx={{ margin: ".5rem 0" }}>
            <AjButton
              variant="contained"
              displayText="Send Quotation"
              onClick={handleSubmit(onSubmit)}
            />
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default LogisticsQuotationForm;
