import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import { customCommonStyles } from "../../../Style/CommonStyle";
import AjHeaderTextButton from "../../../Components/AjHeaderTextButton/AjHeaderTextButton";
import { CREATE_SUBSCRIPTION_PLAN } from "../../../Routes/Routes";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubscriptions } from "../../../Redux/SuperAdmin/Subscription/subscriptionActions";
import SubscriptionListing from "./SubscriptionListing/SubscriptionListing";
import { LIMIT, SKIP } from "../../../Constant/AppConstant";

const styles = {
  displayTextButtonStyle: {
    minWidth: "10.5rem",
  },
};

export default function SubscriptionManagement() {
  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const dispatch = useDispatch();
  const {allSubscriptionsLength, subscriptionCurrency} = useSelector(
    (state) => state.subscription
  );

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
    };
    dispatch(getAllSubscriptions(searchObject));
  }, [query]);

  return (
    <>
      <Grid container sx={customCommonStyles.mainContainer}>
        <AjHeaderTextButton
          changeNavigate={CREATE_SUBSCRIPTION_PLAN}
          displayText="Subscriptions"
          displayTextButton="Add Subscription"
          displayTextButtonStyle={styles.displayTextButtonStyle}
          length={allSubscriptionsLength}
          currency={subscriptionCurrency}
        />
        <Box sx={customCommonStyles.subContentBox}>
          <SubscriptionListing
            length={allSubscriptionsLength}
            query={query}
            setQuery={setQuery}
          />
        </Box>
      </Grid>
    </>
  );
}
