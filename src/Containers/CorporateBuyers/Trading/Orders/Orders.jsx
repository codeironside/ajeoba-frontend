import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import AjDropDown from "../../../../Components/AjDropdown/AjDropDown";

import OrderListing from "./OrderListing/OrderListing";
import { productOrderStatusOptions } from "../../../../Constant/AppConstant";
import { styles } from "../../../FarmingAssociation/Inventory/AvailableInventory/AvailableInventoryStyles";
import { customCommonStyles } from "../../../../Style/CommonStyle";

const Orders = () => {
  const [statusType, setStatusType] = useState();

  const statusTypeChangeHandler = (_e, seletectedItemType) => {
    if (seletectedItemType.props.value !== "All") {
      let selectedValue = productOrderStatusOptions.find(
        (item) => item.label === seletectedItemType.props.value
      );
      setStatusType(selectedValue.value);
    } else {
      setStatusType(null);
    }
  };

  return (
    <Box sx={{ ...customCommonStyles.subContentBox, ...styles.listingMargin }}>
      <Grid
        item
        sx={{
          ...customCommonStyles.subHeaderStyle2,
          ...styles.listingMarginTop,
        }}
      >
        <Grid>
          <AjDropDown
            options={productOrderStatusOptions}
            source="label"
            value={statusType}
            placeholder="Select status type"
            defaultValue="All"
            onChange={statusTypeChangeHandler}
          />
        </Grid>
      </Grid>
      <OrderListing statusItem={statusType} />
    </Box>
  );
};

export default Orders;