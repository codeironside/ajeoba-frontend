import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toolTipIcon from "../../../../../../Assets/Images/toolTipIcon.svg";
import VninModalContent from "../../../../../../Components/VninHow/VninModal";
import AjDialog from "../../../../../../Components/AjDialog/AjDialog";
import user_icon from "../../../../../../Assets/Images/frame_vnin_c.png";
import { styles } from "../../../../../../Components/AjEmploymentDetails/AjEmploymentDetailsStyles";
import { thisStyles } from "../styles";
import { HtmlTooltip } from "../../../../../../Components/AjSignupAggregatorDetails/AjSignupAggregatorDetailsStyles";
import { InputBase, Box, Typography } from "@mui/material";
import * as _ from "lodash";
import AjButton from "../../../../../../Components/AjButton";
import AjTypography from "../../../../../../Components/AjTypography";
import AjInputLabel from "../../../../../../Components/AjInputLabel";
import { commonStyles } from "../../../../../../Style/CommonStyle";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import {
  getCountries,
} from "../../../../../../Redux/common/Countries/getCountriesActions";
import {
  COMPLETE_KYC_VNIN,
} from "../../../../../../Routes/Routes";
import { farmersCommonStyles } from "../../../FarmersStyles";
import { AddFarmerKYCSchema } from "../../../../../../validationSchema/addFarmerSchema";
import { sendVNINOtp, verifyVNINOtp } from "../../../../../../Redux/common/otp/otpActions";
import AjAddFarmerContainer from "../../../../../../Components/AjAddFarmerContainer/AjAddFarmerContainer";
import AjOtpVerification from "../../../../../../Components/AjOtpVerification/AjOtpVerification";

const CompleteKYCVNIN = (props) => {
  const [sendOtpState, setSendOtpState] = useState(false);
  const [openvninModal, setOpenvninModal] = useState(false);
  const handleModal = () => setOpenvninModal((prev) => !prev);
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddFarmerKYCSchema),
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const otpId = useSelector((state) => state.otp.vninOTPId);
  const farmersOtpId = useSelector((state) => state.farmers.farmersOtpId);

  const onSubmit = (data) => {
    const dataToSend = {
      uniqueIdentificationNumber: data.uniqueIdentificationNumber
    };
    dispatch(sendVNINOtp(dataToSend, navigate, setSendOtpState));
  };

  const verifyOtpData = (data) => {
    const dataToSend = {
      otpId,
      mobileOTP: data.vNINOTP,
      farmerId: parseInt(id),
    }
    dispatch(verifyVNINOtp(dataToSend, navigate));
  };
  return (
    <>
      <AjAddFarmerContainer
        isCompleteKYCVNIN={true}
        activeStepNumber={0}
        setSendOtpState={setSendOtpState}
        sendOtpState={sendOtpState}
      >
        {!sendOtpState ? (
        <Box
            component="form"
            sx={[
              commonStyles.signupFormContainer,
              farmersCommonStyles.farmerSendOtp,
            ]}
        >
                <Box
                    sx={{
                    ...commonStyles.signupFormFieldContainer,
                    // ...(!props.adminNotRequiredFields && commonStyles.fixedWidth),
                    ...(commonStyles.fixedWidth),
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                        }}
                    >
                        <AjInputLabel
                            displayText="vNIN/NIN"
                            styleData={{ ...commonStyles.inputLabel, width: "fit-content" }}
                        />
                        <Box
                            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                            onClick={handleModal}
                        >
                        {/* , Voter's Identification Number */}
                        <HtmlTooltip
                            title={
                                <React.Fragment>
                                <Typography color="inherit" sx={styles.toolTipText}>
                                    vNIN/NIN
                                </Typography>
                                </React.Fragment>
                            }
                        >
                            <Typography
                                component="img"
                                src={toolTipIcon}
                                sx={{ mr: "4px" }}
                            />
                        </HtmlTooltip>
                        <AjTypography
                            sx={{
                                fontWeight: "600",
                                textAlign: "center",
                                fontSize: "0.875rem",
                                lineHeight: "1.313rem",
                                textDecoration: "underline",
                            }}
                            displayText="How to get vNIN"
                        />
                    </Box>
                </Box>
                  <AjDialog
                      open={openvninModal}
                      closeModal={setOpenvninModal}
                      title="VNIN"
                      styleData={commonStyles.buyDialogModalContainer}
                  >
                      <VninModalContent />
                  </AjDialog>
                  <InputBase
                      readOnly={false}
                      id="uniqueIdentificationNumber"
                      name="uniqueIdentificationNumber"
                      placeholder="Enter unique identification number"
                      {...register("uniqueIdentificationNumber")}
                      sx={{
                          ...commonStyles.inputStyle,
                          ...styles.inputBaseCustomStyle,
                      }}
                  />
                  <AjTypography
                      displayText={errors.uniqueIdentificationNumber?.message}
                      styleData={commonStyles.errorText}
                  />
                </Box>

                <Box sx={{ ...thisStyles.groupButtons }}>
                    <AjButton
                        variant="contained"
                        styleData={{ ...thisStyles.nextBtnStyle }}
                        displayText="Next"
                        onClick={handleSubmit(onSubmit)}
                    />
                </Box>
                
                <Box sx={{ ...thisStyles.groupBoxes }}>
                    <Box sx={{ ...thisStyles.box1 }}>
                      <img src={user_icon} width="auto" height="auto" alt="User Icon" />
                    </Box>
                    <Box sx={{ ...thisStyles.box2 }}>
                        <AjTypography
                            sx={{
                                fontWeight: "600",
                                fontSize: "0.875rem",
                                lineHeight: "1.313rem",
                            }}
                            displayText="Why do you need my vNIN/NIN?"
                        />
                        <AjTypography
                            sx={{
                                textAlign: "left",
                                lineHeight: "1.313rem",
                            }}
                            displayText="We need your nin to validate your personal information and give you access to exclusive features"
                        />

                    </Box>
                </Box>  
            </Box>
        ) : (
          <Box sx={commonStyles.verificationContainer}>
            <AjOtpVerification
              activeStepNumber={1}
              setSendOtpState={setSendOtpState}
              sendOtpState={sendOtpState}
              navigatePage={COMPLETE_KYC_VNIN}
              otpData={verifyOtpData}
              isVNIN={true}
            />
          </Box>
        )}
      </AjAddFarmerContainer>
    </>
  );
};

export default CompleteKYCVNIN;
