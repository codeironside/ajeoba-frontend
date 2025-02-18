import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import wareHouseLogo from "../../../Assets/Images/warehouses_icon.svg";
import AjButton from "../../../Components/AjButton";
import { ADD_REFEREES } from "../../../Routes/Routes";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";
import WareHouseListing from './WareHouseListing/WareHouseListing';
import { styles } from "./WareHousesStyles";


export default function WareHouses() {

  const wareHouseList = useSelector((state) => state.wareHouse.wareHousesList);

  const navigate = useNavigate();

  return (
      <Grid container sx={customCommonStyles.mainContainer}>
        <Grid item sx={customCommonStyles.subContainer}>
          <Box sx={customCommonStyles.headerBox}>
              <img src={wareHouseLogo} style={{marginBottom:'0.375rem'}}/>
            <Typography sx={commonStyles.tableText}>
              Warehouses({wareHouseList.totalCount})
            </Typography>
          </Box>
          <AjButton
            variant="text"
            styleData={styles.addWareHouseBtn}
            displayText="Add Warehouse"
            onClick={() => navigate(ADD_REFEREES)}
          />
        </Grid>
        <Box sx={customCommonStyles.subContentBox}>
          <WareHouseListing
          />
        </Box>
      </Grid>
  );
}
