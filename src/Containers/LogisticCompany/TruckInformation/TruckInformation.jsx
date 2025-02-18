import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid, Box, Typography } from "@mui/material";

import AjButton from "../../../Components/AjButton";
import AjInputBase from "../../../Components/AjInputBase";
import SearchIcon from "@mui/icons-material/Search";
import cargo_truck from "../../../Assets/Images/cargo_truck.svg";

import { customCommonStyles, commonStyles } from "../../../Style/CommonStyle";
import { styles } from "../../../Components/TruckListing/TruckListingStyles";
import TruckListing from "../../../Components/TruckListing/TruckListing";
import { ADD_TRUCKS } from "../../../Routes/Routes";

export default function TruckInformation() {
  const navigate = useNavigate();
  const [searchByTruckInfo, setSearchByTruckInfo] = useState("");
  const [searchByClick, setSearchByClick] = useState(true);

  const truckList = useSelector((state) => state.logistics.truckList);

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchByClick((prev) => !prev);
    }
  };

  const handleSearched = () => {
    setSearchByClick((prev) => !prev);
  };

  const handleNameChanged = (e) => {
    setSearchByTruckInfo(e.target.value);
    if (e.target.value.length === 0) {
      setSearchByClick((prev) => !prev);
    }
  };

  return (
    <>
      <Grid container sx={customCommonStyles.mainContainer}>
        <Grid item sx={customCommonStyles.subContainer}>
          <Box sx={customCommonStyles.headerBox}>
            <img src={cargo_truck} style={styles.imgPosition} />
            <Typography sx={commonStyles.tableText}>
              Trucks({truckList?.totalCount})
            </Typography>
          </Box>
          <AjButton
            variant="text"
            styleData={{
              ...customCommonStyles.addButtonStyle,
              ...styles.customBtnWidth,
            }}
            displayText="Add truck"
            onClick={() => navigate(ADD_TRUCKS)}
          />
        </Grid>
        <Box sx={customCommonStyles.subContentBox}>
          <Grid item sx={customCommonStyles.subHeaderStyle}>
            <AjInputBase
              placeholder="Search by truck model or registration number"
              value={searchByTruckInfo}
              onKeyPress={handleKeyPressed}
              onChange={handleNameChanged}
              styleData={customCommonStyles.filterInputBaseStyle}
              name="search by truck info"
              endIcon={
                <Box sx={customCommonStyles.iconBox} onClick={handleSearched}>
                  <SearchIcon sx={customCommonStyles.searchIcon} />
                </Box>
              }
            />
          </Grid>
          <TruckListing
            searchByTruckInfo={searchByTruckInfo}
            onClick={searchByClick}
          />
        </Box>
      </Grid>
    </>
  );
}
