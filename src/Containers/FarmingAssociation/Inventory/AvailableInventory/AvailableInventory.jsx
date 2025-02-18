import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import AjInputBase from "../../../../Components/AjInputBase";
import AjDropDown from "../../../../Components/AjDropdown/AjDropDown";
import AvailableInventoryListing from "./AvailableInventoryListing/AvailableInventoryListing";

import { getWareHousesListAction } from "../../../../Redux/WareHouses/wareHouseActions";

import { customCommonStyles } from "../../../../Style/CommonStyle";
import { styles } from "./AvailableInventoryStyles";
import { styles as customSeachFilterStyles } from "../../../Admin/MasterManagement/MasterManagementStyles";

const AvailableInventory = () => {
  const dispatch = useDispatch();

  const [searchedData, setSearchedData] = useState("");
  const [onSearchClick, setOnSearchClick] = useState(true);
  const [wareHouseItemType, setWareHouseItemType] = useState();
  const [wareHouseData, setWareHouseData] = useState(null);

  const wareHouseOptions = useSelector(
    (state) => state.wareHouse.wareHousesList
  );

  useEffect(() => {
    dispatch(getWareHousesListAction());
  }, []);

  useEffect(() => {
    if (!wareHouseOptions) return;
    if (wareHouseOptions?.result) {
      const wareHouseDataFields = wareHouseOptions?.result
        ?.filter((item) => item.is_active)
        .map((item) => {
          return {
            wareHouseName: item.warehouse_name,
            id: item.id,
          };
        });
      wareHouseDataFields.unshift({ wareHouseName: "All", id: null });
      setWareHouseData(wareHouseDataFields);
    }
  }, [wareHouseOptions]);

  const onEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setOnSearchClick((prev) => !prev);
    }
  };
  const handleSearch = () => {
    setOnSearchClick((prev) => !prev);
  };
  const handleTextChange = (e) => {
    setSearchedData(e.target.value);
    if (e.target.value.length === 0) {
      setOnSearchClick((prev) => !prev);
    }
  };

  const wareHouseItemTypeChangeHandler = (_e, seletectedItemType) => {
    if (seletectedItemType.props.value !== "All") {
      let selectedValue = wareHouseData.find(
        (item) => item.id === seletectedItemType.props.value.id
      );
      setWareHouseItemType(selectedValue);
    } else {
      setWareHouseItemType(null);
    }
  };

  return (
    <Box sx={{ ...customCommonStyles.subContentBox, ...styles.listingMargin }}>
      <Grid
        item
        sx={{
          ...customCommonStyles.subHeaderStyle,
          ...styles.listingMarginTop,
        }}
      >
        <AjInputBase
          value={searchedData}
          onKeyPress={onEnterKeyPress}
          onChange={handleTextChange}
          styleData={{
            ...customCommonStyles.filterInputBaseStyle,
            ...customSeachFilterStyles.customHeight,
            ...customSeachFilterStyles.customWidth,
          }}
          placeholder="Search by product name"
          name="search by name"
          endIcon={
            <Box
              sx={{
                ...customCommonStyles.iconBox,
                ...customSeachFilterStyles.customHeight,
              }}
              onClick={handleSearch}
            >
              <SearchIcon sx={customCommonStyles.searchIcon} />
            </Box>
          }
        />
        <Grid>
          <AjDropDown
            options={wareHouseData}
            value={wareHouseItemType?.warehouse_name}
            onChange={wareHouseItemTypeChangeHandler}
            source="wareHouseName"
            placeHolder="Select item type"
            defaultValue="All"
            disableSourceForValue
            styleData={{
              ...customSeachFilterStyles.customDropDown,
              ...styles.filterDropdown,
            }}
          />
        </Grid>
      </Grid>
      <AvailableInventoryListing
        searchText={searchedData}
        searchClick={onSearchClick}
        wareHouseOptions={wareHouseOptions?.result}
        wareHouseItem={wareHouseItemType?.id}
      />
    </Box>
  );
};

export default AvailableInventory;
