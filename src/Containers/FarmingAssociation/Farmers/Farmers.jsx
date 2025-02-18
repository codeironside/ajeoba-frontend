import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FarmerListing from "./FarmerListing/FarmerListing";
import AjButton from "../../../Components/AjButton";
import AjInputBase from "../../../Components/AjInputBase";
import AjDialog from "../../../Components/AjDialog/AjDialog";
import AjFilters from "../../../Components/AjFilters/AjFilters";
import refreeLogo from "../../../Assets/Images/refreeLogo.svg";
import filterIcon from "../../../Assets/Images/filterIcon.png";
import {
  ADD_FARMER_OTP_VERIFICATION,
  FARMERS_BULK_UPLOAD,
  ADD_FARMER_PERSONAL_DETAILS,
  ADD_FARMER_VNIN_VERIFICATION,
} from "../../../Routes/Routes";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";
import { farmersCommonStyles } from "./FarmersStyles";

export default function Farmers() {
  const navigate = useNavigate();

  const [searchVal, setSearchVal] = useState("");
  const [searchClicked, setSearchClicked] = useState(true);
  const [openFilt, setOpenFilt] = useState(false);
  const [dataInfo, setDataInfo] = useState({});
  const farmerList = useSelector((state) => state.farmers.farmerList);

  const handleResetFilter = () => {
    setSearchVal("");
    setDataInfo({});
  };

  const changedFilter = (data) => {
    setDataInfo(data);
  };

  const onEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchClicked((prev) => !prev);
    }
  };

  const handleSearchingFilter = () => {
    setSearchClicked((prev) => !prev);
  };

  const handleSearchInfoChange = (e) => {
    setSearchVal(e.target.value);
    if (e.target.value.length === 0) {
      setSearchClicked((prev) => !prev);
    }
  };

  return (
    <>
      <Grid container sx={customCommonStyles.mainContainer}>
        <Grid item sx={customCommonStyles.subContainer}>
          <Box sx={customCommonStyles.headerBox}>
            <img src={refreeLogo} style={farmersCommonStyles.marginBtm6} alt="refree logo"/>
            <Typography sx={commonStyles.tableText}>
              Farmers({farmerList.totalCount})
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <AjButton
              variant="text"
              styleData={customCommonStyles.addButtonStyle}
              displayText="Bulk Upload"
              onClick={() => navigate(FARMERS_BULK_UPLOAD)}
            />
            <AjButton
              variant="text"
              styleData={customCommonStyles.addButtonStyle}
              displayText="Add Farmer"
              onClick={() => navigate(ADD_FARMER_OTP_VERIFICATION)}
            />
          </Box>
        </Grid>
        <Box sx={customCommonStyles.subContentBox}>
          <Grid item sx={customCommonStyles.subHeaderStyle}>
            <AjInputBase
              name="search by name"
              value={searchVal}
              onKeyPress={onEnterKeyPress}
              onChange={handleSearchInfoChange}
              styleData={customCommonStyles.filterInputBaseStyle}
              placeholder="Search by name or city"
              endIcon={
                <Box
                  sx={customCommonStyles.iconBox}
                  onClick={handleSearchingFilter}
                >
                  <SearchIcon sx={customCommonStyles.searchIcon} />
                </Box>
              }
            />
            <Grid>
              {/* filter icon */}
                <Typography
                component="img"
                src={filterIcon}
                sx={customCommonStyles.filterIcon}
                onClick={() => setOpenFilt(true)}
              />
            </Grid>
            <Typography
              sx={customCommonStyles.clearFilterStyle}
              onClick={handleResetFilter}
            >
              Clear all filter
            </Typography>


          </Grid>
            <FarmerListing
            dataInfo={dataInfo}
            searchText={searchVal}
            searchClick={searchClicked}
          />
        </Box>
      </Grid>
      <AjDialog
        open={openFilt}
        closeModal={setOpenFilt}
        title={"Filter"}
        styleData={{ height: "calc(100vh - 3.125rem)" }}
      >
        <AjFilters
          dateFilter={true}
          productFilter={true}
          countryFilter={true}
          stateFilter={true}
          kycStatusFilter={true}
          filterSelected={changedFilter}
          cancel={setOpenFilt}
          filterData={dataInfo}
        />
      </AjDialog>
    </>
  );
}
