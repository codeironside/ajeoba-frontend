import React from "react";
import { Box, Typography } from "@mui/material";
import KycVerified from "../../Assets/Images/Group791.svg";
import Kycfail from "../../Assets/Images/error 1.svg";
import { styles } from "./KYCStatusStyles";

const KYCStatus = (props) => {
  const { kycStatus } = props;
  return (
    <>
      <Box sx={styles.mainContainer}>
        <Box
          sx={{
            ...styles.kycBox,
            ...(kycStatus ? styles.kycTrue : styles.kycFalse),
          }}
        >
          <Typography sx={styles.kycMessage}>
            {kycStatus
              ? "Kyc verification completed successfully "
              : "Kyc verification failed "}
          </Typography>
          <Typography
            component="img"
            alt="img"
            src={kycStatus ? KycVerified : Kycfail}
          />
        </Box>
        <Typography
          sx={{
            ...styles.kycMessage,
            ...(kycStatus ? styles.kycTrueMessage : styles.kycFalseMessage),
          }}
        >
          {kycStatus
            ? "Redirecting..."
            : // : "Go to the previous step to try again or contact support"}
              "You can always submit your TIN document later and get verified"}
        </Typography>
      </Box>
    </>
  );
};

export default KYCStatus;
