import React, { useState, useEffect } from "react";
import { walletStyles } from "../../../../Style/CommonStyle";
import { Grid, Box, Typography, Modal } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getCurrencySymbol } from "../../../../Services/commonService/commonService";
import { getUserData } from "../../../../Services/localStorageService";
import { getBalanceAction, getAssociationDetailsAction } from "../../../../Redux/FarmingAssociation/Dashboard/dashboardActions";
import Withdrawal from "./Withdrawal/Withdrawal";
import { styleModal } from "./WalletStyles";

function BuyerWalletBalance() {
  const dispatch = useDispatch();
  const userData = getUserData();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
   dispatch(getBalanceAction());
   dispatch(getAssociationDetailsAction());
  }, []);

  const balance = useSelector((state) => state.dashboard.balance);
  const associationDetails = useSelector((state) => state.dashboard.associationDetails);

  return (
    <div style={{position: "relative"}}>
    <Grid sx={{ ...walletStyles.walletCardContainer }}>
      <Box sx={{ ...walletStyles.walletCardAvailBal }}>
        <Box sx={{ ...walletStyles.walletCardBal }}>
          <Typography sx={{ ...walletStyles.walletCardHeadingTextBal }}>
            <span style={{ fontSize: "12px", fontWeight: "200" }}>
              {getCurrencySymbol(userData?.currency)}
            </span>
            <span>{balance?.wallet?.available_balance}</span>
          </Typography>
          <Typography sx={{ ...walletStyles.walletCardHeadingText }}>
            Available balance
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ ...walletStyles.walletCardWithdrawText }}
            onClick={handleOpen}
          >
            Withdraw
          </Typography>
        </Box>
      </Box>
      <Box sx={{ ...walletStyles.walletCardCurrBal }}>
        <Box sx={{ ...walletStyles.walletCardBal }}>
          <Typography sx={{ ...walletStyles.walletCardHeadingTextBal }}>
            <span style={{ fontSize: "12px", fontWeight: "200" }}>
              {getCurrencySymbol(userData?.currency)}
            </span>
            <span>{balance?.wallet?.current_balance}</span>
          </Typography>
          <Typography sx={{ ...walletStyles.walletCardHeadingText }}>
            Current balance
          </Typography>
        </Box>
      </Box>
    </Grid>
    <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box
          sx={
            styleModal.style
          }
        >
          <Withdrawal
            id={userData.id}
            onClose={handleClose}
            currencySymbol={getCurrencySymbol(userData?.currency)}
            balance={balance?.wallet?.available_balance}
            associationDetails={associationDetails?.personalDetails}
            bankDetails={associationDetails?.bankDetails}
          />
        </Box>
      </Modal>
      </div>
  );
}

export default BuyerWalletBalance;
