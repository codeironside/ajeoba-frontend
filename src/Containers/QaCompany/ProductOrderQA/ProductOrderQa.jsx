import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getProdOrderQaActions } from "../../../Redux/common/Products/productsActions";
import AjInputBase from "../../../Components/AjInputBase";
import { customCommonStyles, commonStyles } from "../../../Style/CommonStyle";
import { styles } from "../../Admin/MasterManagement/MasterManagementStyles";

import ProductOrderQaListing from "./ProductOrderQAListing/ProductOrderQaListing";

function ProductOrderQa() {
  const dispatch = useDispatch();

  const productOrderQa = useSelector((state) => state.products.productOrders);

  useEffect(() => {
    dispatch(getProdOrderQaActions());
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

  const [isPreview, setIsPreview] = useState(false)

  return (
    <>
      <Grid container 
        sx={customCommonStyles.mainContainer}
      >
        {!isPreview && 
        <Grid item sx={customCommonStyles.subContainer}>
          <Box sx={customCommonStyles.headerBox}>
            <Typography sx={commonStyles.tableText}>
              Product Orders ({productOrderQa?.totalCount})
            </Typography>
          </Box>
        </Grid>
        }
        <Box sx={ !isPreview && customCommonStyles.subContentBox}>
        {!isPreview && <Grid
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
            }
          <ProductOrderQaListing
            setIsPreview={setIsPreview}
            searchText={searchName}
            searchClick={searchClick}
          />
        </Box>
      </Grid>
    </>
  );
}

export default ProductOrderQa;
