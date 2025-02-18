import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Grid, Divider } from "@mui/material";

import AjDetailsCard from "../AjDetailsCard/AjDetailsCard";
import * as moment from "moment";
import { getUserData } from "../../Services/localStorageService";
import {
  getPhoneCodeSymbol,
  numberWithCommas,
  textCapitalize,
} from "../../Services/commonService/commonService";
import { getOrderDetailsAction } from "../../Redux/CorporateBuyer/Trading/tradingActions";

import { commonStyles } from "../../Style/CommonStyle";

const AjPurchasedOrderDetail = () => {
  const [orderTypeDetails, setOrderTypeDetails] = useState([]);
  const [purchaseDetails, setPurchaseDetails] = useState([]);

  const { orderDetails } = useSelector((state) => state.tradingActiveAds);

  const userData = getUserData();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOrderDetailsAction(id));
  }, []);

  useEffect(() => {
    const orderDataDetails = [
      {
        "Order Status":
          orderDetails?.orderDetail?.order_status === "SUCCESS" && "Success",
      },
      { "Customer Name": orderDetails?.orderDetail?.customer?.name },
      {
        "Phone Number": getPhoneCodeSymbol(
          orderDetails?.orderDetail?.customer?.phone_number
        ),
      },
      { Email: orderDetails?.orderDetail?.customer?.email },
      { "Order Id": orderDetails?.orderDetail?.order_id },
      {
        "Amount Paid": `${numberWithCommas(
          orderDetails?.orderDetail?.amount,
          userData?.currency
        )}`,
      },
      {
        "Date of Purchase": `${moment(
          orderDetails?.orderDetail?.created_at
        ).format("DD/MM/YYYY")}`,
      },
      { " Payment mode": orderDetails?.orderDetail?.payment_type },
    ];
    setPurchaseDetails(orderDataDetails);
    let details = [];
    if (orderDetails?.orderDetail?.order_type === "PRODUCT_PURCHASE") {
      details = [
        { "Product Name": orderDetails?.orderTypeDetail[0]?.product_name },
        { "Product Type": textCapitalize(orderDetails?.orderTypeDetail[0]?.product_type) },
        {
          "Batch Type": orderDetails?.orderTypeDetail[0]?.batch_type,
        },
      ];
    } else {
      details = [
        { "Input Name": orderDetails?.orderTypeDetail[0]?.input_name },
        { "Input Subtype": orderDetails?.orderTypeDetail[0]?.input_subtype },
      ];
    }
    details = [
      ...details,

      {
        Quantity: `${orderDetails?.orderTypeDetail[0]?.quantity} ${textCapitalize(orderDetails?.orderTypeDetail[0]?.unit_of_measurement)}`,
      },
      {
        "Price Per Unit":
          orderDetails?.orderTypeDetail[0]?.seller_currency &&
          `${numberWithCommas(
            orderDetails?.orderTypeDetail[0]
              ?.seller_price_per_unit_with_commission,
            orderDetails?.orderTypeDetail[0]?.seller_currency
          )}`,
      },
      {
        "Total Price":
          orderDetails?.orderTypeDetail[0]?.seller_currency &&
          `${numberWithCommas(
            orderDetails?.orderTypeDetail[0]
              ?.seller_price_per_unit_with_commission *
              orderDetails?.orderTypeDetail[0]?.quantity,
            orderDetails?.orderTypeDetail[0]?.seller_currency
          )}`,
      },
    ];
    setOrderTypeDetails(details);
  }, [orderDetails]);

  return (
    <>
      <Grid
        sx={{
          ...commonStyles.whiteContainerBackgroundTabs,
          ...commonStyles.customSrollBar,
          ...{ padding: "2rem" },
        }}
      >
        {orderDetails && (
          <>
            <AjDetailsCard
              details={orderTypeDetails}
              heading={`${
                orderDetails?.orderDetail?.order_type === "PRODUCT_PURCHASE"
                  ? "Product"
                  : "Input"
              } details`}
            />
            <Divider sx={commonStyles.dividerStyle} />
            <AjDetailsCard details={purchaseDetails} heading="Order details" />
          </>
        )}
      </Grid>
    </>
  );
};

export default AjPurchasedOrderDetail;
