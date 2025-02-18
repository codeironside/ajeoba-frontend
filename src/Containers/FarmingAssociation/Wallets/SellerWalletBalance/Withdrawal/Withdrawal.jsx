import React, { useState } from 'react';
import { Box, Grid, Typography, TextField } from "@mui/material";
import { commonStyles, customCommonStyles } from "../../../../../Style/CommonStyle";
import { withdrawalCommonStyles, styleModal } from "../WalletStyles";
import AjButton from "../../../../../Components/AjButton";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makeWithdrawal } from '../../../../../Redux/FarmingAssociation/Wallets/associateWalletActions';

function Withdrawal({id, onClose, currencySymbol, balance, associationDetails, bankDetails}) {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [payload, setPayload] = useState({
    password: null,
  })

  const handleChange = (e) => {
    setPayload({
      ...payload,
      password: e.target.value,
    })
  }

  const handleWithdraw = () => {
    dispatch(makeWithdrawal(payload, id, navigate));
  }

  return (
      <Grid
        style={withdrawalCommonStyles.withdrawBox}
      >

      <div
        onClick={onClose}
        style={styleModal.style_close}
      >X</div>

        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <Box style={withdrawalCommonStyles.container}>
            <Typography sx={commonStyles.tableText}>

            </Typography>

            <TextField
              style={{flex: "1"}}
              id="outlined-basic"
              label="Name"
              disabled={true}
              value={associationDetails?.association_name && 
                associationDetails.association_name}
              type="text"
              variant="outlined"
            />

            <TextField
              style={{flex: "1"}}
              id="outlined-basic"
              label="Bank Holder Name"
              disabled={true}
              value={bankDetails?.account_name && 
                bankDetails.account_name}
              type="text"
              variant="outlined"
            />

            <TextField
              style={{flex: "1"}}
              id="outlined-basic"
              label="Account Number"
              disabled={true}
              value={bankDetails?.account_number && 
                bankDetails.account_number}
              type="text"
              variant="outlined"
            />

            <TextField
              style={{flex: "1"}}
              id="outlined-basic"
              label="Amount"
              disabled={true}
              value={currencySymbol + balance && balance}
              type="text"
              variant="outlined"
            />

            <TextField
              style={{flex: "1"}}
              id="outlined-basic"
              label="Password"
              name="password"
              onChange={handleChange}
              value={payload.password === null ? '' : payload.password}
              type="password"
              variant="outlined"
            />

            <AjButton
              variant="text"
              styleData={withdrawalCommonStyles.withdrawButtonStyle}
              displayText={`Withdraw`}
              onClick={handleWithdraw}
            />
          </Box>

        </Box>
      </Grid>
  );
}

export default Withdrawal;
