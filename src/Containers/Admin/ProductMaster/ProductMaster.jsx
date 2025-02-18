import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import AjButton from "../../../Components/AjButton";
import AjInputBase from "../../../Components/AjInputBase";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";

import ProductMasterListing from "./ProductMasterListing/ProductMasterListing";
import { ADD_PRODUCT } from "../../../Routes/Routes";

export default function ProductMaster() {
  const products = useSelector((state) => state.products.products);
  const productsLength = useSelector((state) => state.products.productsLength);

  const navigate = useNavigate();

  const [searchName, setsearchName] = useState("");
  const [searchClick, setSearchClick] = useState(true);

  const onEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchClick((prev) => !prev);
    }
  };
  const handleSearchClick = () => {
    setSearchClick((prev) => !prev);
  };
  const handleChange = (e) => {
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
              Products({productsLength})
            </Typography>
          </Box>
          <AjButton
            variant="text"
            styleData={{
              ...customCommonStyles.addButtonStyle,
            }}
            displayText="Add Product"
            onClick={() => navigate(ADD_PRODUCT)}
          />
        </Grid>
        <Box sx={customCommonStyles.subContentBox}>
          <Grid item sx={customCommonStyles.subHeaderStyle}>
            <AjInputBase
              value={searchName}
              onKeyPress={onEnterKeyPress}
              onChange={handleChange}
              styleData={customCommonStyles.filterInputBaseStyle}
              placeholder="Search by product name"
              name="search by product name"
              endIcon={
                <Box
                  sx={customCommonStyles.iconBox}
                  onClick={handleSearchClick}
                >
                  <SearchIcon sx={customCommonStyles.searchIcon} />
                </Box>
              }
            />
          </Grid>
          <ProductMasterListing
            searchText={searchName}
            searchClick={searchClick}
            length={products?.length}
          />
        </Box>
      </Grid>
    </>
  );
}
