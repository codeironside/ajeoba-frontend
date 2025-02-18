import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons material/Search";
import filterIcon from "../../../../Assets/Images/filterIcon.png";
import ProductListing from "./ProductDetailListing/ProductListing";

import {
  customCommonStyles,
  commonStyles,
} from "../../../../Style/CommonStyle";
import AjInputBase from "../../../AjInputBase";
import AjFilters from "../../../AjFilters/AjFilters";
import AjDialog from "../../../AjDialog/AjDialog";

const ProductDetailListingView = (props) => {
  const [searchedData, setSearchedData] = useState("");
  const [onSearchClick, setOnSearchClick] = useState(true);
  const [openFilter, setOpenFilter] = useState(false);
  const [dataInfo, setDataInfo] = useState({});
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
  const handleClearFilter = () => {
    setSearchedData("");
    setDataInfo({});
  };

  const filterChanged = (data) => {
    setDataInfo(data);
  };

  return (
    <Grid
      container
      item
      sx={{
        ...commonStyles.whiteContainerBackgroundTabs,
        ...commonStyles.customSrollBar,
        ...commonStyles.flexStart,
      }}
    >
      <Box
        sx={{
          ...customCommonStyles.subContentBox,
          ...customCommonStyles.reportsSubContentBox,
        }}
      >
        <Typography
          sx={{
            ...commonStyles.tableText,
            marginTop: "1.2rem",
            marginLeft: "1.625rem",
          }}
        >
          {props.activeTab === 1
            ? "Aggregtors()"
            : props.activeTab === 2
            ? "Farmers()"
            : "Association()"}
        </Typography>
        <Box
          item
          sx={{
            ...customCommonStyles.subHeaderStyle,
            ...commonStyles.reportsMarginPadding,
          }}
        >
          <AjInputBase
            value={searchedData}
            onKeyPress={onEnterKeyPress}
            onChange={handleTextChange}
            styleData={{
              ...customCommonStyles.filterInputBaseStyle,
            }}
            placeholder="Search by name"
            name="search by name"
            endIcon={
              <Box
                sx={{
                  ...customCommonStyles.iconBox,
                }}
                onClick={handleSearch}
              >
                <SearchIcon sx={customCommonStyles.searchIcon} />
              </Box>
            }
          />
          <Typography
            component="img"
            src={filterIcon}
            sx={customCommonStyles.filterIcon}
            onClick={() => setOpenFilter(true)}
          />
          <Typography
            sx={customCommonStyles.clearFilterStyle}
            onClick={handleClearFilter}
          >
            Clear all filter
          </Typography>
        </Box>
        <ProductListing
          searchText={searchedData}
          searchClick={onSearchClick}
          type={props.type}
          name={
            props.activeTab === 1
              ? "Aggregator name"
              : props.activeTab === 2
              ? "Farmer name"
              : "Association name"
          }
          dataInfo={dataInfo}
        />
        <AjDialog open={openFilter} closeModal={setOpenFilter} title={"Filter"}>
          <AjFilters
            dateFilter={true}
            filterSelected={filterChanged}
            cancel={setOpenFilter}
            filterData={dataInfo}
            productFilter={true}
          />
        </AjDialog>
      </Box>
    </Grid>
  );
};

export default ProductDetailListingView;
