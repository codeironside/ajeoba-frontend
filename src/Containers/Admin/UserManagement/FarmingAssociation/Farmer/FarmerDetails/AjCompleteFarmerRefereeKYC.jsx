import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AjAddFarmerSelectReferee from "../../../../../../Components/AjAddFarmerSelectReferee/AjAddFarmerSelectReferee";
import AjSelectRefereeOtpVerification from "../../../../../../Components/AjSelectRefereeOtpVerification/AjSelectRefereeOtpVerification";
import { Box } from "@mui/material";
import { completeRefereeOtpVerification } from "../../../../../../Redux/common/otp/otpActions";

const AddFarmerRefereeSelection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sendOtpState, setSendOtpState] = useState(false);
  const farmerId = useParams();

  const verifyRefereeOtpData = (data1, data2) => {
    const referees = [];
    referees.push(
      {
        id: data1.id,
        countryId: data1.countryId,
        mobileNumber: data1.mobileNumber,
        otp: data1.otp,
      },
      {
        countryId: data2.countryId,
        mobileNumber: data2.mobileNumber,
        otp: data2.otp,
        id: data2.id,
      },
    );


    const requiredDataToSend = {"referees": referees, "farmerId": Number(farmerId.id)};
    dispatch(completeRefereeOtpVerification(requiredDataToSend, navigate, Number(farmerId.id)));
  };


  return (
    <Box>
      {!sendOtpState ? (
        <AjAddFarmerSelectReferee
          isSkipButtonHidden={true}
          setSendOtpState={setSendOtpState}
          sendOtpState={sendOtpState}
        />
      ) : (
        <AjSelectRefereeOtpVerification
          isSkipButtonHidden={false}
          setSendOtpState={setSendOtpState}
          otpData={verifyRefereeOtpData}
          sendOtpState={sendOtpState}
          isMobile={true}
        />
      )}
    </Box>
  );
};

export default AddFarmerRefereeSelection;
