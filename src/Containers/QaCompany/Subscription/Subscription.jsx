import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Typography } from "@mui/material";
import subscriptionActiveIcon from "./../../../Assets/Images/subscriptionGreen.svg";
import AjTypography from "../../../Components/AjTypography";
import SubscriptionCard from "../../../Components/SubscriptionCard/SubscriptionCard";
import { commonStyles, customCommonStyles } from "./../../../Style/CommonStyle";
import { getAllSubscriptions } from "../../../Redux/SuperAdmin/Subscription/subscriptionActions";
import { styles } from "./Subscriptionstyles";
import { getUserData } from "../../../Services/localStorageService";
import * as moment from "moment";
import { purchaseSubscriptionAction } from "../../../Redux/PurchaseSubscription/purchaseSubscriptionActions";

const Subscription = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = getUserData();
  const [subscriptionType, setSubscriptionType] = useState(null);
  const { allSubscriptions, subscriptionCurrency } = useSelector(
    (state) => state.subscription
  );
  const onPurchaseSubscription = (id) => {
    const reqBody = { subscription_type: subscriptionType };
    dispatch(purchaseSubscriptionAction(id, reqBody));
  };

  useEffect(() => {
    if (userData?.role_name === "Logistics Company") {
      setSubscriptionType("LOGISTICS");
    } else if (userData?.role_name === "QA Company") {
      setSubscriptionType("QUALITY_ASSURANCE");
    }
    dispatch(getAllSubscriptions());
    localStorage.removeItem("userSubTypeData");
  }, []);

  return (
    <Grid
      sx={{
        ...commonStyles.signupFormMainGridContainer,
        ...styles.mainContainer,
        ...customCommonStyles.noBackgroundTab,
      }}
    >
      <Box sx={{ display: "flex", marginBottom: "1rem" }}>
        <Typography component="img" src={subscriptionActiveIcon} />
        <Typography
          sx={{
            ...commonStyles.inputLabel,
            ...commonStyles.heading,
          }}
        >
          Subscriptions
        </Typography>
      </Box>
      <Box sx={styles.contentContainer}>
        <AjTypography
          displayText={
            !userData?.subscription_expiry_date ||
            moment(userData?.subscription_expiry_date).diff(moment.utc()) < 0
              ? "Your subscription is not active"
              : `Your subscription is active with a validity upto ${moment(
                  userData?.subscription_expiry_date
                ).format("DD/MM/YYYY")}`
          }
          styleData={{
            ...commonStyles.subHeading,
            ...((!userData?.subscription_expiry_date ||
              moment(userData?.subscription_expiry_date).diff(moment.utc()) <
                0) &&
              styles.notActiveStyle),
          }}
        />
        <Box sx={{ ...styles.cardContainer, ...commonStyles.fieldTopMargin }}>
          {allSubscriptions?.map((item, index) => (
            <SubscriptionCard
              key={index}
              textOne={item?.name}
              textTwo={item?.cost}
              textThree={item?.duration}
              textFour={item?.description}
              buttonAction={() => onPurchaseSubscription(item.id)}
              currency={subscriptionCurrency}
            />
          ))}
        </Box>
      </Box>
    </Grid>
  );
};

export default Subscription;
