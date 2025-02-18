import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, InputBase } from "@mui/material";

import AjInputLabel from "../../../../Components/AjInputLabel";
import AjButton from "../../../../Components/AjButton";
import AjConfirmModal from "../../../../Components/AjConfirmModal/AjConfirmModal";
import AjDialog from "../../../../Components/AjDialog/AjDialog";
import AjDropDown from "../../../../Components/AjDropdown/AjDropDown";

import { getAllSubscriptions } from "../../../../Redux/SuperAdmin/Subscription/subscriptionActions";

import { farmersSubscriptionAction } from "../../../../Redux/SuperAdmin/Subscription/subscriptionActions";
import AjTypography from "../../../../Components/AjTypography";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { subscriptionSchema } from "../subscription";

import { useDispatch } from "react-redux";

const RandomSubscription = () => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(subscriptionSchema),
    defaultValues: {
      numberOfFarmers: "",
      duration: "",
    },
  });

  const { subscriptionCurrency, allSubscriptions } = useSelector(
    (state) => state.subscription
  );

  useEffect(() => {
    dispatch(getAllSubscriptions());
  }, []);

  const subscriptionOptions = allSubscriptions?.map((subscription) => ({
    duration: `${subscription.duration} months`,
    cost: subscription.cost,
    subscriptionId: subscription.id,
  }));

  const [openDialog, setOpenDialog] = useState(false);
  const [numberOfFarmers, setNumberOfFarmers] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [subscriptionType, setSubscriptionType] = useState(null);

  const handleSubscriptionTypeSelection = (selectedValue) => {
    const selectedSubscriptionType = subscriptionOptions?.find(
      (subscription) => subscription.duration === selectedValue.target.value
    );
    setSubscriptionType(selectedSubscriptionType);

    setValue("subDuration", toString(selectedSubscriptionType));
  };
  const getNoOfFarmers = (e) => {
    setNumberOfFarmers(e.target.value);

    setValue("noOfFarmers", numberOfFarmers);
  };

  const handleSubscriptionButton = () => {
    const subscriptionId = subscriptionType?.subscriptionId;

    const reqBody = {
      farmer_subscription_type: "EXISTING_FARMER",
      farmerCount: parseInt(numberOfFarmers),
      subscription_type: "FARMER_ASSOCIATION",
    };
    dispatch(farmersSubscriptionAction(reqBody, subscriptionId));
  };

  useEffect(() => {
    dispatch(getAllSubscriptions());
  }, []);

  useEffect(() => {
    if (subscriptionType) {
      const totalAmount = numberOfFarmers * (subscriptionType?.cost || 0);
      setTotalAmount(totalAmount);
    }
  }, [numberOfFarmers, subscriptionType]);

  const handleSubscriptionModal = () => {
    setOpenDialog(true);
  };

  return (
    <>
      <Box component="form" style={commonStyles.randomSubscribeContainer}>
        <Box style={commonStyles.randomSubscribeFormContainer}>
          <Box sx={commonStyles.randomSubscribeFormFieldContainer}>
            <AjInputLabel
              required={true}
              styleData={commonStyles.inputLabel}
              displayText="Number of Farmers"
            />

            <InputBase
              required
              id="numberOfFarmer"
              name="numberOfFarmers"
              type="number"
              placeholder="Enter number of farmers"
              sx={commonStyles.inputStyleSubscribe}
              onChange={getNoOfFarmers}
            />
            <AjTypography
              styleData={commonStyles.errorText}
              displayText={errors.noOfFarmers?.message}
            />
          </Box>
          <Box sx={commonStyles.randomSubscribeFormFieldContainer}>
            <AjInputLabel
              required={true}
              styleData={commonStyles.inputLabel}
              displayText="Duration"
            />
            <AjDropDown
              options={subscriptionOptions}
              value={subscriptionType?.duration || ""}
              onChange={(selectedValue) =>
                handleSubscriptionTypeSelection(selectedValue)
              }
              source="duration"
              id="subscriptionId"
              placeHolder="Select duration"
              name="subDuration"
              styleData={commonStyles.ajDropDownEllipsis}
            />
            <AjTypography
              styleData={commonStyles.errorText}
              displayText={errors.subDuration?.message}
            />
          </Box>

          <Box sx={commonStyles.randomSubscribeFormFieldContainer}>
            <AjInputLabel
              required={true}
              styleData={commonStyles.inputLabel}
              displayText={`Total cost for ${
                numberOfFarmers === 0 ? 0 : numberOfFarmers
              }
           Farmer${numberOfFarmers > 1 ? "s" : ""}`}
            />
            <InputBase
              required
              disabled
              id="numberOfFarmer"
              name="numberOfFarmer"
              placeholder="Enter the number of farmers"
              value={`Cost Price (${subscriptionCurrency} ${totalAmount})`}
              sx={commonStyles.inputStyleSubscribe}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <AjButton
            variant="text"
            styleData={commonStyles.randomSubscribeContainerSubmitButton}
            displayText={`Subscribe`}
            onClick={handleSubmit(handleSubscriptionModal)}
          />
        </Box>
      </Box>
      <AjDialog
        open={openDialog}
        closeModal={setOpenDialog}
        styleData={commonStyles.dialogContainer}
      >
        <AjConfirmModal
          displayText={`Proceed to Subscribe ${numberOfFarmers} farmers?`}
          closeModal={setOpenDialog}
          onConfirm={() => handleSubscriptionButton()}
        />
      </AjDialog>
    </>
  );
};

export default RandomSubscription;
