import React, { useState } from "react";
import { Grid, Box, IconButton, Typography } from "@mui/material";
import {
  commonAddProductStyles,
  commonStyles,
} from "../../../../Style/CommonStyle";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate, useRoutes } from "react-router-dom";
import { SUBSCRIPTION_MANAGEMENT } from "../../../../Routes/Routes";
import AjTypography from "../../../../Components/AjTypography";
import AjSubscriptionPlanForm from "../../../../Components/AjSubscriptionPlanForm/AjSubscriptionPlanForm";
import AjButton from "../../../../Components/AjButton";
import { subscriptionNote } from "../../../../Constant/AppConstant";
import { useForm } from "react-hook-form";
import { addSubscription } from "../../../../Redux/SuperAdmin/Subscription/subscriptionActions";
import { useDispatch, useSelector } from "react-redux";


const CreateSubscriptionPlan = () => {
  const { handleSubmit } = useForm({
    mode: "onChange",
  });
  const navigate = useNavigate();
  
  const dispatch = useDispatch();

  const {subscriptionCurrency} = useSelector(
    (state) => state.subscription
  );

  const [isSubmit, setIsSubmit] = useState(false);
  let subscriptionData = null;

  const backArrowHandler = () => {
    navigate(SUBSCRIPTION_MANAGEMENT);
  };

  const addSubscriptionPlan = () => {
    setIsSubmit(true);
  };

  const getSubscriptionData = (data) => {
    subscriptionData = data;
    setIsSubmit(false);
    handleSubmit(onSubmit)();
  };

  const onSubmit = () => {
    if (!subscriptionData) {
      return;
    }
    const requiredData = {
      planName: subscriptionData.planName,
      roleId: subscriptionData.userRole.id,
      cost: parseFloat(subscriptionData.cost),
      duration: parseInt(subscriptionData.duration),
      status: subscriptionData.status,
      description: subscriptionData.description,
    };
    dispatch(addSubscription(requiredData, navigate));
  };

  return (
    <>
      <Grid container sx={commonStyles.signupFormMainGridContainer}>
        <Box sx={commonStyles.relativePosition}>
          <IconButton
            disableRipple
            onClick={backArrowHandler}
            sx={commonStyles.backButtonPosition}
          >
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
              displayText="Create Subscription Plan"
              styleData={{
                ...commonStyles.mainHeading,
                ...commonStyles.marginBottom0,
              }}
            />
            <Box
              component="form"
              sx={{
                ...commonStyles.signupFormContainer,
                ...commonStyles.mobileScreenFormContainer,
              }}
            >
              <AjSubscriptionPlanForm
                currency={subscriptionCurrency}
                submit={isSubmit}
                data={getSubscriptionData}
              />
              <Typography
                sx={[
                  commonStyles.inputLabel,
                  commonAddProductStyles.marginTop12,
                ]}
              >
                Note *
              </Typography>
              <Typography
                sx={[
                  commonStyles.inputLabel,
                  commonAddProductStyles.notePoints,
                ]}
              >
                {subscriptionNote}
              </Typography>
            </Box>
            <AjButton
              variant="contained"
              displayText="Create Subscription"
              onClick={addSubscriptionPlan}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateSubscriptionPlan;
