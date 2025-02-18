import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import filterIcon from "../../../../../Assets/Images/filterIcon.png";
import InputListing from "../../../../../Components/InputSoldReport/InputListing/InputListing";
import {
  customCommonStyles,
  commonStyles,
} from "../../../../../Style/CommonStyle";
import AjInputBase from "../../../../../Components/AjInputBase";
import AjFilters from "../../../../../Components/AjFilters/AjFilters";
import AjDialog from "../../../../../Components/AjDialog/AjDialog";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AjExportExcelCsv from "../../../../../Components/AjExportExcelCsv/AjExportExcelCsv";

const InputSoldDetailView = (props) => {
  const [searchedData, setSearchedData] = useState("");
  const [onSearchClick, setOnSearchClick] = useState(true);
  const [openFilter, setOpenFilter] = useState(false);
  const [dateData, setDateData] = useState({});
  const { id } = useParams();
  const inputList = useSelector(
    (state) => state.reportsAdmin.adminReportsInputList
  );

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
    setDateData({});
  };

  const filterChanged = (data) => {
    setDateData(data);
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
            ...commonStyles.reportsTableText,
          }}
        >
          {`Supplier level info (${inputList?.data?.totalCount || ""})`}
        </Typography>
        <Box sx={customCommonStyles.spaceBetweenFlex}>
          <Box
            item
            sx={{
              ...customCommonStyles.subHeaderStyle,
              ...commonStyles.reportsTableText,
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
          <Box>
            <AjExportExcelCsv
              totalCount={inputList?.data?.totalCount}
              url={"/api/export/admin/report/input-sold"}
              dataInfo={dateData}
              searchData={searchedData}
              reqBody={{ isSupplierLevel: true, inputId: id }}
            />
          </Box>
        </Box>
        <InputListing
          searchText={searchedData}
          searchClick={onSearchClick}
          type={props.type}
        />
        <AjDialog open={openFilter} closeModal={setOpenFilter} title={"Filter"}>
          <AjFilters
            dateFilter={true}
            filterSelected={filterChanged}
            cancel={setOpenFilter}
            filterData={dateData}
          />
        </AjDialog>
      </Box>
    </Grid>
  );
};

export default InputSoldDetailView;
