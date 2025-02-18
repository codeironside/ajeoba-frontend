import React, { useEffect, useReducer, useState, useMemo } from "react";
import {
  Box,
  InputBase,
  Typography,
  Grid,
  TextField,
  Modal,
} from "@mui/material";
import * as _ from "lodash";
import AjSearchInput from "../AjSearchInput";
import { commonStyles } from "../../Style/CommonStyle";
import { opportunities } from "../../Constant/AppConstant";
import AjInputLabel from "../AjInputLabel";
import { yupResolver } from "@hookform/resolvers/yup";
import ajeobaLogo from "../../Assets/Images/ajeoba-logo.png";
import { useNavigate, useRoutes } from "react-router-dom";
import { useForm } from "react-hook-form";
import AjTypography from "../AjTypography";
import AjButton from "../../Components/AjButton";
import { useDispatch, useSelector } from "react-redux";
import { CreateFarmerSubscriptionSchema } from "../../validationSchema/createSubscriptionSchema";
import {
  subscribeFarmerCommonStyles,
  styleModal,
} from "./AjFarmerSubscriptionModalStyles.js";
import { getCurrencySymbol } from "../../Services/commonService/commonService";
import { getAllSubscriptions } from "../../Redux/SuperAdmin/Subscription/subscriptionActions";
import { purchaseSFarmingAssociationSubscriptionAction } from "../../Redux/PurchaseSubscription/purchaseSubscriptionActions";

const AjFarmerSubscriptionModal = ({ open, setOpen, setShowSubModal }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateFarmerSubscriptionSchema),
    mode: "onChange",
  });

  const { allSubscriptions } = useSelector((state) => state.subscription);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [durationOption, setDurationOption] = useState([]);
  const [duration, setDuration] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [farmerNumber, setFarmerNumber] = useState(0);
  const [costPerFarmer, setCostPerFarmer] = useState(0);
  const [selectedD, setSelectedD] = useState(0);

  useEffect(() => {
    dispatch(getAllSubscriptions());
  }, []);

  const handleFarmerNumber = (e) => {
    setFarmerNumber(e.target.value);
    selectedD && setCostPerFarmer(selectedD?.cost);
    selectedD &&
      setTotalCost(parseFloat(selectedD?.cost) * parseFloat(e.target.value));
  };

  useEffect(() => {
    let options = allSubscriptions?.map((sub) => {
      return {
        label: sub.duration + " months",
        value: sub.duration,
        id: sub.id,
        cost: sub.cost,
      };
    });
    setDurationOption(options);
  }, [allSubscriptions]);

  const DurationChangeHandler = (e, selectedDuration) => {
    setDuration(selectedDuration);
    setSelectedD(selectedDuration);
    setCostPerFarmer(selectedDuration.cost);
    setTotalCost(parseFloat(selectedDuration.cost) * parseFloat(farmerNumber));
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleDonotShowThisAgain = () => {
    setShowSubModal(false);
    if (localStorage.getItem("showSubscriptionModal") === "true")
      localStorage.setItem("showSubscriptionModal", false);
  };
  // console.log(localStorage.getItem("showSubscriptionModal"), "from loal storage");

  const onSubmit = () => {
    if (!farmerNumber) {
      return;
    }
    const requiredData = {
      farmer_subscription_type: "USE_LATER",
      farmerCount: parseInt(farmerNumber),
      subscription_type: "FARMER_ASSOCIATION",
    };
    dispatch(
      purchaseSFarmingAssociationSubscriptionAction(
        selectedD.id,
        requiredData,
        navigate
      )
    );
  };

  const styles = {
    imageSize: {
      margin: "4rem 35% 1.75rem",
      width: "100px",
      height: "auto",
    },
    opportunityText: {
      flex: "1",
      marginLeft: "4px",
      fontFamily: "poppins",
      fontSize: "1rem",
      fontWeight: "500",
    },
    searchInput: {
      width: "100%",
      height: "3.5rem",
      marginTop: "0.5rem",
      background: "#FFFFFF",
      border: "0.063rem solid #F2F2F2",
      boxSizing: "border-box",
      boxShadow: "0px 0.25rem 0.5rem rgba(0, 0, 0, 0.04)",
      borderRadius: "0.5rem",
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    },
  };

  const listOpportunities = useMemo(
    () =>
      opportunities.map((opportunity) => (
        <div
          style={commonStyles.subscribeHeading}
          key={opportunity.substring(4, 9) + "-" + (Math.random() * 5 + 1)}
        >
          <span>&gt;</span>
          <span style={styles.opportunityText}>{opportunity}.</span>
        </div>
      )),
    [opportunities]
  );

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={styleModal.container}
    >
      <Box sx={styleModal.style}>
        <Grid style={subscribeFarmerCommonStyles.subscribeFarmerBox}>
          <img src={ajeobaLogo} style={styles.imageSize} />
          <Box sx={{ ...commonStyles.divider }}></Box>
          <Box>{listOpportunities}</Box>
        </Grid>
        <Grid style={subscribeFarmerCommonStyles.subscribeFarmerBox}>
          <Box onClick={handleCloseModal} style={styleModal.style_close}>
            X
          </Box>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Box style={subscribeFarmerCommonStyles.container}>
              <Box sx={commonStyles.signupFormFieldContainerSubscribe}>
                <AjInputLabel
                  required={true}
                  styleData={commonStyles.inputLabel}
                  displayText="Number of Farmers"
                />
                <InputBase
                  required
                  id="farmerNumber"
                  name="farmerNumber"
                  placeholder="Enter the number of farmers"
                  sx={commonStyles.inputStyleSubscribe}
                  {...register("farmerNumber")}
                  onChange={handleFarmerNumber}
                />
              </Box>

              <Box sx={commonStyles.signupFormFieldContainerSubscribe}>
                <AjInputLabel
                  required={true}
                  styleData={commonStyles.inputLabel}
                  displayText="Duration(months)"
                />
                <AjSearchInput
                  required
                  source="label"
                  options={durationOption ? durationOption : []}
                  value={duration}
                  id="duration"
                  displayText="Select duration"
                  styleData={{
                    ...styles.searchInput,
                  }}
                  onChange={DurationChangeHandler}
                  name="duration"
                />
              </Box>

              <Box sx={commonStyles.signupFormFieldContainerSubscribe}>
                <AjInputLabel
                  required={true}
                  styleData={commonStyles.inputLabel}
                  displayText={"Cost Per Farmer"}
                />
                <InputBase
                  required
                  disabled
                  id="costPerFarmer"
                  name="costPerFarmer"
                  placeholder="Get this from backend"
                  value={`Cost Per Farmer ${
                    getCurrencySymbol("") ? getCurrencySymbol("") : ""
                  }(${costPerFarmer})`}
                  sx={commonStyles.inputStyleSubscribe}
                />
              </Box>

              <Box sx={commonStyles.signupFormFieldContainerSubscribe}>
                <AjInputLabel
                  required={true}
                  styleData={commonStyles.inputLabel}
                  displayText={`Total cost of ${
                    farmerNumber === null ? 0 : farmerNumber
                  } 
                                Farmer${farmerNumber > 1 ? "s" : ""}`}
                />
                <InputBase
                  required
                  disabled
                  id="totalCost"
                  name="totalCost"
                  placeholder="Total Cost Price"
                  value={`Total Cost Price ${
                    getCurrencySymbol("") ? getCurrencySymbol("") : ""
                  }(${totalCost})`}
                  sx={commonStyles.inputStyleSubscribe}
                />
              </Box>

              <Box sx={commonStyles.signupFormFieldContainerSubscribeButton}>
                <AjButton
                  variant="text"
                  styleData={
                    subscribeFarmerCommonStyles.subscribeFarmerButtonStyle
                  }
                  displayText={`Don't show again`}
                  onClick={handleDonotShowThisAgain}
                />
                <AjButton
                  variant="text"
                  styleData={
                    subscribeFarmerCommonStyles.subscribeFarmerButtonStyle
                  }
                  displayText={`Proceed`}
                  onClick={onSubmit}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AjFarmerSubscriptionModal;
