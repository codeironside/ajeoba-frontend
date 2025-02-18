import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AjAddFarmerContainer from "../../../../../Components/AjAddFarmerContainer/AjAddFarmerContainer";
import {
  ADD_FARMERS_LAND_DETAILS,
  ADD_FARMER_OTP_VERIFICATION,
} from "../../../../../Routes/Routes";
import AjAddFarmerProduct from "../../../../../Components/AjAddFarmerProduct/AjAddFarmerProduct";

const AddFarmerProduct = () => {
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
        changeNavigate={ADD_FARMERS_LAND_DETAILS}
        activeStepNumber={4}
      >
        <AjAddFarmerProduct />
      </AjAddFarmerContainer>
    </>
  );
};

export default AddFarmerProduct;
