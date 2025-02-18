import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";
import AjInputBase from "../../../../Components/AjInputBase";
import BankManagementList from "../FarmingAssociationBankManagement/BankManagementList";
import { styles } from "../../MasterManagement/MasterManagementStyles";
import { getBankRequestListActions } from "../../../../Redux/SuperAdmin/UserManagement/FarmingAssociation/farmingAssociationActions";

function BankManagement() {
  const dispatch = useDispatch();
  const [searchName, setsearchName] = useState("");
  const [searchClick, setSearchClick] = useState(true);
  const bankReqList = useSelector((state) => state.farmingAssociation.bankReq);

  useEffect(() => {
    dispatch(getBankRequestListActions());
  }, []);

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
  return (
    <>
      <Grid container sx={customCommonStyles.mainContainer}>
        <Grid item sx={customCommonStyles.subContainer}>
          <Box sx={customCommonStyles.headerBox}>
            <Typography sx={commonStyles.tableText}>
              Bank Acount List ({bankReqList?.totalCount})
            </Typography>
          </Box>
        </Grid>
        <Box sx={customCommonStyles.subContentBox}>
          <Grid
            item
            sx={{ ...customCommonStyles.subHeaderStyle, ...styles.gridWrapper }}
          >
            {" "}
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
          <BankManagementList
            searchText={searchName}
            searchClick={searchClick}
          />
        </Box>
      </Grid>
    </>
  );
}

export default BankManagement;
