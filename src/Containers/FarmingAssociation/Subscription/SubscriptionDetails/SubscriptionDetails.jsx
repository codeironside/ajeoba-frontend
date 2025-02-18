import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, Divider } from "@mui/material";
import AjDetailsCard from "../../../../Components/AjDetailsCard/AjDetailsCard";
import { getUserData } from "../../../../Services/localStorageService";
import * as moment from "moment";
import { commonStyles } from "../../../../Style/CommonStyle";
import {
  getPhoneCodeSymbol,
  numberWithCommas,
} from "../../../../Services/commonService/commonService";
import { getOrderDetailsAction } from "../../../../Redux/PurchaseSubscription/purchaseSubscriptionActions";

const SubscriptionDetails = () => {
  const [orderTypeDetails, setOrderTypeDetails] = useState([]);
  const [purchaseDetails, setPurchaseDetails] = useState([]);

  const { orderDetails } = useSelector((state) => state.purchaseSubscription);

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
          orderDetails?.orderDetail?.order_status === "SUCCESS" && "Subscribed",
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
          userData.currency
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
    const details = [
      { "Subscription Name": orderDetails?.orderTypeDetail[0]?.name },
      {
        Price: `${numberWithCommas(
          orderDetails?.orderTypeDetail[0]?.cost,
          "NGN"
        )}`,
      },
      {
        Duration: `${orderDetails?.orderTypeDetail[0]?.duration} ${
          orderDetails?.orderTypeDetail[0]?.duration > 1 ? "months" : "month"
        }`,
      },
      {
        Validity: `${moment(
          orderDetails?.orderDetail?.subscription_expiry_date
        ).format("DD/MM/YYYY")}`,
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
              heading="Subscription details"
            />
            <Divider sx={commonStyles.dividerStyle} />
            <AjDetailsCard details={purchaseDetails} heading="Order details" />
          </>
        )}
      </Grid>
    </>
  );
};

export default SubscriptionDetails;
