import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import AjInputBase from "../../../Components/AjInputBase";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";
import { styles } from "../MasterManagement/MasterManagementStyles";

import ProductOrderQaAdminListing from "./ProductOrderQaAdminListing/ProductOrderQaAdminListing";
import {
  getAdminProductOrderQaActions,
} from "../../../Redux/common/Products/productsActions";

function ProductOrderQaAmin() {
  const dispatch = useDispatch();

  const productOrderQaAdminListLength = useSelector(
    (state) => state.products.prodOrdersLength
  );

  useEffect(() => {
    dispatch(getAdminProductOrderQaActions());
  }, []);

  const [searchName, setsearchName] = useState("");
  const [searchClick, setSearchClick] = useState(true);

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
              Product Orders ({productOrderQaAdminListLength})
            </Typography>
          </Box>
        </Grid>
        <Box sx={customCommonStyles.subContentBox}>
          <Grid
            item
            sx={{ ...customCommonStyles.subHeaderStyle, ...styles.gridWrapper }}
          >
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
          <ProductOrderQaAdminListing
            searchText={searchName}
            searchClick={searchClick}
          />
        </Box>
      </Grid>
    </>
  );
}

export default ProductOrderQaAmin;
