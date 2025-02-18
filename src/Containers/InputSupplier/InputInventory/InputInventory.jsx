import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import AjInputBase from "../../../Components/AjInputBase";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";

import AjDropDown from "../../../Components/AjDropdown/AjDropDown";
import { styles as customSeachFilterStyles } from "../../Admin/MasterManagement/MasterManagementStyles";
import { getWareHousesListAction } from "../../../Redux/WareHouses/wareHouseActions";
import InputInventoryListing from "./InputInventoryListing/InputInventoryListing";

export default function InputInventory() {
  const dispatch = useDispatch();

  const [searchByName, setSearchByName] = useState("");
  const [onSearch, setOnSearch] = useState(true);
  const [wareHouseItemType, setWareHouseItemType] = useState();
  const [warehouseDataOptions, setWarehouseDataOptions] = useState(null);

  const warehouseData = useSelector((state) => state.wareHouse.wareHousesList);
  const inputInventoryList = useSelector(
    (state) => state.inputInventory.inputInventoryList
  );

  useEffect(() => {
    dispatch(getWareHousesListAction());
  }, []);

  useEffect(() => {
    if (!warehouseData) return;
    if (warehouseData?.result) {
      const warehouseDataOptionsFields = warehouseData?.result
        ?.filter((item) => item.is_active)
        .map((item) => {
          return {
            wareHouseName: item.warehouse_name,
            id: item.id,
          };
        });
      warehouseDataOptionsFields.unshift({ wareHouseName: "All", id: null });
      setWarehouseDataOptions(warehouseDataOptionsFields);
    }
  }, [warehouseData]);

  const onEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setOnSearch((prev) => !prev);
    }
  };
  const handleSearch = () => {
    setOnSearch((prev) => !prev);
  };
  const handleTextChange = (e) => {
    setSearchByName(e.target.value);
    if (e.target.value.length === 0) {
      setOnSearch((prev) => !prev);
    }
  };

  const wareHouseItemTypeChangeHandler = (_e, seletectedItemType) => {
    if (seletectedItemType.props.value !== "All") {
      let selectedValue = warehouseDataOptions.find(
        (item) => item.id === seletectedItemType.props.value.id
      );
      setWareHouseItemType(selectedValue);
    } else {
      setWareHouseItemType(null);
    }
  };

  return (
    <>
      <Grid container sx={customCommonStyles.mainContainer}>
        <Grid item sx={customCommonStyles.subContainer}>
          <Box sx={customCommonStyles.headerBox}>
            <Typography sx={commonStyles.tableText}>
              Inventory({inputInventoryList?.totalcount})
            </Typography>
          </Box>
          {/* to maintain design height consistency  */}
          <Box sx={{ height: "3.5rem" }}></Box>
        </Grid>
        <Box sx={{ ...customCommonStyles.subContentBox }}>
          <Grid
            item
            sx={{
              ...customCommonStyles.subHeaderStyle,
              ...customCommonStyles.inputInventorySubHeaderStyle,
            }}
          >
            <AjInputBase
              value={searchByName}
              onKeyPress={onEnterKeyPress}
              onChange={handleTextChange}
              styleData={{
                ...customCommonStyles.filterInputBaseStyle,
                ...customSeachFilterStyles.customHeight,
                ...customSeachFilterStyles.customWidth,
              }}
              placeholder="Search by name"
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
            <AjDropDown
              options={warehouseDataOptions}
              value={wareHouseItemType?.warehouse_name}
              onChange={wareHouseItemTypeChangeHandler}
              source="wareHouseName"
              placeHolder="Select item type"
              defaultValue="All"
              disableSourceForValue
              styleData={{ ...customSeachFilterStyles.customDropDown }}
            />
          </Grid>
          <InputInventoryListing
            searchText={searchByName}
            searchClick={onSearch}
            warehouseData={warehouseData?.result}
            wareHouseItem={wareHouseItemType?.id}
          />
        </Box>
      </Grid>
    </>
  );
}
