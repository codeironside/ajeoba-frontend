import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AjAddFarmerContainer from "../../../../../Components/AjAddFarmerContainer/AjAddFarmerContainer";
import AjAddFarmerLandDetails from "../../../../../Components/AjAddFarmerLandDetails/AjAddFarmerLandDetails";
import {
  ADD_FARMER_VNIN_VERIFICATION,
  ADD_FARMER_OTP_VERIFICATION,
} from "../../../../../Routes/Routes";

const LandDetails = () => {
  const farmersOtpId = useSelector((state) => state.farmers.farmersOtpId);
  const navigate = useNavigate();

  useEffect(() => {
    if (!farmersOtpId) {
      navigate(ADD_FARMER_OTP_VERIFICATION);
    }
  }, []);

  return (
    <>
      <AjAddFarmerContainer
        changeNavigate={ADD_FARMER_VNIN_VERIFICATION}
        activeStepNumber={3}
      >
        <AjAddFarmerLandDetails />
      </AjAddFarmerContainer>
    </>
  );
};

export default LandDetails;
