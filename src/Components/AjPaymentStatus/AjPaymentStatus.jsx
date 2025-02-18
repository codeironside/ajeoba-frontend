import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import {
  SUBSCRIPTION,
  TRADING,
  INPUT,
  FARMER_SUBSCRIPTION,
} from "../../Routes/Routes";
import { commonStyles } from "../../Style/CommonStyle";
import { styles } from "./AjPaymentStatusStyles";
import { getOrderId } from "../../Services/localStorageService";
import { logoRedirection } from "../../Services/commonService/commonService";

const AjPaymentStatus = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const payment_order_id = searchParams.get("order_id");
  const order_type = searchParams.get("order_type");
  let status = searchParams.get("status");
  const userSubTypeData = localStorage.getItem("userSubTypeData");
  const userType = userSubTypeData ? JSON.parse(userSubTypeData)?.userType : "";

  const orderId = getOrderId();

  useEffect(() => {
    if (orderId === payment_order_id) {
      setTimeout(() => {
        if (order_type === "SUBSCRIPTION_PURCHASE") {
          if (status === "SUCCESS") {
            if (userType === "FARMER_ASSOCIATION") {
              navigate(`${FARMER_SUBSCRIPTION}`);
              localStorage.setItem("showSubscriptionModal", false);
            } else {
              navigate(`${SUBSCRIPTION}`);
            }
            // navigate(`${SUBSCRIPTION}/details/${payment_order_id}`);
          } else {
            if (userType === "FARMER_ASSOCIATION") {
              localStorage.setItem("showSubscriptionModal", true);

              navigate(`${FARMER_SUBSCRIPTION}`);
            } else {
              navigate(`${SUBSCRIPTION}`);
            }
          }
        }
        if (order_type === "PRODUCT_PURCHASE") {
          if (status === "SUCCESS")
            navigate(`${TRADING}/product-details/${payment_order_id}`);
          else {
            navigate(`${TRADING}`);
          }
        }
        if (order_type === "INPUT_PURCHASE") {
          if (status === "SUCCESS")
            navigate(`${INPUT}/input-details/${payment_order_id}`);
          else {
            navigate(`${INPUT}`);
          }
        }
      }, 3000);
    }
  }, [status]);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("orderId");
    };
  }, []);

  const getMessage = () => {
    if (order_type === "SUBSCRIPTION_PURCHASE") {
      return `Hey! Thank you for
              subscribing!`;
    }
  };

  return (
    <>
      {status && (
        <>
          <Box
            sx={commonStyles.logoImageContainer}
            onClick={() => logoRedirection()}
          ></Box>
          <Box sx={styles.mainContainer}>
            <Typography
              sx={{
                ...commonStyles.mainHeading,
                ...(status === "SUCCESS"
                  ? commonStyles.colorGreen
                  : commonStyles.colorRed),
                ...commonStyles.alignCenter,
                ...styles.heading,
              }}
            >
              {status === "SUCCESS"
                ? getMessage()
                : `Hey! Unfortunately, Your payment has failed`}
            </Typography>
            <Typography
              sx={{
                ...commonStyles.mainHeading,
                ...commonStyles.colorGreen,
                ...commonStyles.alignCenter,
                ...styles.heading,
              }}
            >
              {status === "SUCCESS" && "Your payment has been confirmed."}
            </Typography>
            <Typography sx={styles.redirectTypography}>
              Redirecting...
            </Typography>
          </Box>
        </>
      )}
    </>
  );
};

export default AjPaymentStatus;
