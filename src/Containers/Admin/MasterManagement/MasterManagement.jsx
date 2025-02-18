import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import AjButton from "../../../Components/AjButton";
import AjInputBase from "../../../Components/AjInputBase";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";
import { styles } from "./MasterManagementStyles";

import MasterManagementItemListing from "./MasterManangementItemListing/MasterManagementItemListing";
import { itemTypeListingOptions } from "../../../Constant/AppConstant";
import { ADD_ITEMS } from "../../../Routes/Routes";
import AjDropDown from "../../../Components/AjDropdown/AjDropDown";

export default function MasterManagement() {
  const itemList = useSelector((state) => state.masterManagement.itemList);
  const navigate = useNavigate();

  const [searchName, setsearchName] = useState("");
  const [searchClick, setSearchClick] = useState(true);
  const [itemType, setItemType] = useState();

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

  const itemTypeChangeHandler = (e, seletectedItemType) => {
    if (seletectedItemType.props.value !== "All") {
      let itemTypeValue = itemTypeListingOptions.map((item) => {
        if (item.label === seletectedItemType.props.value) {
          return item.value;
        }
      });
      setItemType(itemTypeValue);
    } else {
      setItemType(null);
    }
    setSearchClick((prev) => !prev);
  };

  useEffect(() => {}, [itemType]);

  return (
    <>
      <Grid container sx={customCommonStyles.mainContainer}>
        <Grid item sx={customCommonStyles.subContainer}>
          <Box sx={customCommonStyles.headerBox}>
            <Typography sx={commonStyles.tableText}>
              Item({itemList?.totalCount})
            </Typography>
          </Box>
          <AjButton
            variant="text"
            styleData={{
              ...customCommonStyles.addButtonStyle,
            }}
            displayText="Add Items"
            onClick={() => navigate(ADD_ITEMS)}
          />
        </Grid>
        <Box sx={customCommonStyles.subContentBox}>
          <Grid
            item
            sx={{ ...customCommonStyles.subHeaderStyle, ...styles.gridWrapper }}
          >
            <Typography sx={styles.displayText}>Item Type :</Typography>
            <AjDropDown
              options={itemTypeListingOptions}
              value={itemType}
              onChange={itemTypeChangeHandler}
              source="label"
              placeHolder="Select item type"
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
          <MasterManagementItemListing
            searchText={searchName}
            searchClick={searchClick}
            itemType={itemType}
          />
        </Box>
      </Grid>
    </>
  );
}
