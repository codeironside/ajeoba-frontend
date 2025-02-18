import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Grid, Typography } from "@mui/material";

import { productOrderStatusOptions } from "../../../Constant/AppConstant";
import AjDropDown from "../../../Components/AjDropdown/AjDropDown";
import ReceivedOrdersListing from "./ReceivedOrdersListing/ReceivedOrdersListing";

import receivedOrderIcon from "../../../Assets/Images/receivedOrder.svg";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";
import { styles } from "./InputSupplierReceivedOrdersStyles";

const InputSupplierReceivedOrders = () => {
  const [inputStatus, setInputStatus] = useState();

  const inputReceivedOrdersList = useSelector(
    (state) => state.input.inputOrderList
  );
  const inputOrderStatusChangeHandler = (_e, selectedStatus) => {
    if (selectedStatus.props.value !== "All") {
      let selectedValue = productOrderStatusOptions.find(
        (item) => item.value === selectedStatus.props.value.value
      );
      setInputStatus(selectedValue);
    } else {
      setInputStatus(null);
    }
  };

  return (
    <Grid container sx={customCommonStyles.mainContainer}>
      <Grid item sx={customCommonStyles.subContainer}>
        <Box sx={customCommonStyles.headerBox}>
          <img
            src={receivedOrderIcon}
            style={commonStyles.farmingAssociationLogo}
          />
          <Typography sx={commonStyles.tableText}>
            Received Orders({inputReceivedOrdersList?.totalCount})
          </Typography>
        </Box>
        <Box sx={styles.consistentHeight}></Box>
      </Grid>
      <Box sx={customCommonStyles.subContentBox}>
        <Grid
          item
          sx={{
            ...customCommonStyles.subHeaderStyle,
            ...customCommonStyles.inputInventorySubHeaderStyle,
          }}
        >
          <AjDropDown
            options={productOrderStatusOptions}
            value={inputStatus?.label}
            onChange={inputOrderStatusChangeHandler}
            source="label"
            placeHolder="Select item type"
            defaultValue="All"
            disableSourceForValue
          />
        </Grid>
        <ReceivedOrdersListing inputStatus={inputStatus?.value} />
      </Box>
    </Grid>
  );
};

export default InputSupplierReceivedOrders;
