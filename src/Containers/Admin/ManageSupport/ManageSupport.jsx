import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AjInputBase from "../../../Components/AjInputBase";
import AjDropDown from "../../../Components/AjDropdown/AjDropDown";
import ManageSupportListing from "./ManageSupportListing/ManageSupportListing";
import { userRoleTypeListingOptions } from "../../../Constant/AppConstant";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";
import { styles } from "../MasterManagement/MasterManagementStyles";
import { styles as manageSupportStyles } from "./ManageSupportStyles";

export default function ManageSupport() {
  const requestList = useSelector(
    (state) => state.helpAndSupport.supportRequestsList
  );

  const [searchClick, setSearchClick] = useState(true);
  const [searchName, setsearchName] = useState("");
  const [userRoleType, setUserRoleType] = useState(null);

  const enterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchClick((prev) => !prev);
    }
  };

  const handleClickOnSearch = () => {
    setSearchClick((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    setsearchName(e.target.value);
    if (e.target.value.length === 0) {
      setSearchClick((prev) => !prev);
    }
  };

  const userRoleTypeChangeHandler = (e, selectedUserRoleType) => {
    if (selectedUserRoleType.props.value !== "All") {
      let userRoleTypeValue = userRoleTypeListingOptions.map((item) => {
        if (item.label === selectedUserRoleType.props.value) {
          return item.value;
        }
      });
      setUserRoleType(userRoleTypeValue);
    } else {
      setUserRoleType(null);
    }
    setSearchClick((prev) => !prev);
  };

  useEffect(() => {}, [userRoleType]);

  return (
    <>
      <Grid container sx={customCommonStyles.mainContainer}>
        <Grid item sx={customCommonStyles.subContainer}>
          <Box sx={customCommonStyles.headerBox}>
            <Typography sx={commonStyles.tableText}>
              Support Requests(
              {requestList?.totalCount})
            </Typography>
          </Box>
          <Box sx={manageSupportStyles.addButtonAlternativeBox}></Box>
        </Grid>
        <Box sx={customCommonStyles.subContentBox}>
          <Grid
            item
            sx={{ ...customCommonStyles.subHeaderStyle, ...styles.gridWrapper }}
          >
            <Typography sx={styles.displayText}>User Role :</Typography>
            <AjDropDown
              options={userRoleTypeListingOptions}
              onChange={userRoleTypeChangeHandler}
              source="label"
              placeHolder="Select user role type"
              defaultValue="All"
              styleData={styles.customDropDown}
            />
            <AjInputBase
              value={searchName}
              onKeyPress={enterKeyPress}
              onChange={handleSearchChange}
              styleData={{
                ...customCommonStyles.filterInputBaseStyle,
                ...styles.customHeight,
                ...styles.customWidth,
              }}
              placeholder="Search by name"
              name="search by name"
              endIcon={
                <Box
                  sx={{ ...customCommonStyles.iconBox, ...styles.customHeight }}
                  onClick={handleClickOnSearch}
                >
                  <SearchIcon sx={customCommonStyles.searchIcon} />
                </Box>
              }
            />
          </Grid>
          <ManageSupportListing
            searchText={searchName}
            searchClick={searchClick}
            userRoleType={userRoleType}
          />
        </Box>
      </Grid>
    </>
  );
}
