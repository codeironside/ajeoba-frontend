import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AjnewFilter from "../../../AjFilters/AjnewFilter.jsx";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { styles } from "./ProductList.js";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AjInputBase from "../../../AjInputBase.jsx";
import ProductList from "../ProductList.jsx";
import {
  MARKETPLACELIST_LIMIT,
  SKIP,
} from "../../../../Constant/AppConstant.js";
import { getAllOpenMarketPlaceProductsActions } from "../../../../Redux/CorporateBuyer/Trading/tradingActions.js";
import CustomPagination from "../../../CustomPagination/CustomPagination.jsx";
import { isTextValid } from "../../../../Services/commonService/commonService.js";
import AjDialog from "../../../AjDialog/AjDialog.jsx";
import AjButton from "../../../AjButton.jsx";
import { commonStyles } from "../../../../Style/CommonStyle.js";

function ProductListContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categoryfilter, producttype: listType } = useParams();

  const [query, setQuery] = useState({
    limit: MARKETPLACELIST_LIMIT,
    skip: SKIP,
  });
  const [searchClick, setSearchClick] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [categorysm, setCategorysm] = useState("");
  const [country, setCountry] = useState("");
  const [countrysm, setCountrysm] = useState("");
  const [selectedstate, setSelectedstate] = useState("");
  const [selectedstatesm, setSelectedstatesm] = useState("");
  const [selectedrate, setSelectedrate] = useState("");
  const [selectedratesm, setSelectedratesm] = useState("");
  const [dataInfo, setDataInfo] = useState({});
  const [openFilter, setOpenFilter] = useState(false);

  const { allOpenMarketPlaceProducts, dispatchLoading } = useSelector(
    (state) => {
      return {
        allOpenMarketPlaceProducts:
          state.tradingActiveAds.allOpenMarketPlaceProduct,
        dispatchLoading: state.tradingActiveAds.loading,
      };
    }
  );

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
    };
    if (dataInfo?.certificate?.length) {
      searchObject = {
        ...searchObject,
        limit: MARKETPLACELIST_LIMIT,
        skip: SKIP,
        certifications: JSON.stringify(dataInfo.certificate),
      };
    }
    if (dataInfo?.products?.length) {
      searchObject = {
        ...searchObject,
        limit: MARKETPLACELIST_LIMIT,
        skip: SKIP,
        products: JSON.stringify(dataInfo.products),
      };
    }
    if (selectedstate) {
      searchObject = {
        ...searchObject,
        limit: MARKETPLACELIST_LIMIT,
        skip: SKIP,
        state: selectedstate,
      };
    }
    if (country) {
      searchObject = {
        ...searchObject,
        limit: MARKETPLACELIST_LIMIT,
        skip: SKIP,
        country: country,
      };
    }
    if (dataInfo?.productType) {
      searchObject = {
        ...searchObject,
        limit: MARKETPLACELIST_LIMIT,
        skip: SKIP,
        productType: dataInfo.productType,
      };
    }
    if (category) {
      searchObject = {
        ...searchObject,
        limit: MARKETPLACELIST_LIMIT,
        skip: SKIP,
        ...(category === "INPUT" ? null : { productType: category }),
        listType: category === "INPUT" ? "INPUT_LIST" : "PRODUCT_LIST",
      };
    }
    if (categoryfilter && listType) {
      searchObject = {
        ...searchObject,
        limit: MARKETPLACELIST_LIMIT,
        skip: SKIP,
        listType: listType === "farmproduce" ? "PRODUCT_LIST" : "INPUT_LIST",
        ...(listType === "farminput"
          ? { inputType: categoryfilter.toUpperCase() }
          : { productType: categoryfilter.toUpperCase() }),
      };
    }
    if (listType && !categoryfilter) {
      searchObject = {
        ...searchObject,
        limit: MARKETPLACELIST_LIMIT,
        skip: SKIP,
        listType: listType === "farmproduce" ? "PRODUCT_LIST" : "INPUT_LIST",
      };
    }
    if (selectedrate) {
      searchObject = {
        ...searchObject,
        limit: MARKETPLACELIST_LIMIT,
        skip: SKIP,
        rating: selectedrate,
      };
    }
    if (searchText.length) {
      searchObject = {
        ...searchObject,
        limit: MARKETPLACELIST_LIMIT,
        skip: SKIP,
        filterText: searchText,
      };
    }

    dispatch(getAllOpenMarketPlaceProductsActions(searchObject));
  }, [query, dataInfo, searchClick]);

  const handleCategorySelect = (category) => {
    setCategory(category);
    navigate("/view-marketplace");
  };

  const handleCategorySelectsm = (categorysm) => {
    setCategorysm(categorysm);
    navigate("/view-marketplace");
  };

  const handleCountrySelect = (country) => {
    setCountry(country);
  };
  const handleCountrySelectsm = (countrysm) => {
    setCountrysm(countrysm);
  };
  const handleStateSelect = (state) => {
    setSelectedstate(state);
  };
  const handleStateSelectsm = (statesm) => {
    setSelectedstatesm(statesm);
  };

  const handleRatingSelect = (rating) => {
    setSelectedrate(rating);
  };
  const handleRatingSelectsm = (ratingsm) => {
    setSelectedratesm(ratingsm);
  };

  const onEnterPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchClick((prev) => !prev);
    }
  };

  const handleSearchFilter = () => {
    setSearchClick((prev) => !prev);
  };

  const handleSearchTextChange = (e) => {
    if (isTextValid(e.target.value)) {
      setSearchText(e.target.value);
      if (e.target.value.length === 0) {
        setSearchClick((prev) => !prev);
      }
    }
  };
  const handleResetFilter = () => {
    // setSearchText("");
    // setCategory("");
    // setDataInfo({});
    setOpenFilter(false);
  };
  const filterChanged = (data) => {
    setDataInfo(data);
  };

  const applyFilter = () => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
    };
    // if (categorysm) {
    //   searchObject = {
    //     ...searchObject,
    //     limit: MARKETPLACELIST_LIMIT,
    //     skip: SKIP,
    //     productType: categorysm,
    //   };
    // }

    if (categorysm) {
      console.log(categorysm);
      searchObject = {
        ...searchObject,
        limit: MARKETPLACELIST_LIMIT,
        skip: SKIP,
        ...(categorysm === "INPUT" ? null : { productType: categorysm }),
        listType: categorysm === "INPUT" ? "INPUT_LIST" : "PRODUCT_LIST",
      };
    }
    if (categoryfilter && listType) {
      searchObject = {
        ...searchObject,
        limit: MARKETPLACELIST_LIMIT,
        skip: SKIP,
        listType: listType === "farmproduce" ? "PRODUCT_LIST" : "INPUT_LIST",
        ...(listType === "farminput"
          ? { inputType: categoryfilter.toUpperCase() }
          : { productType: categoryfilter.toUpperCase() }),
      };
    }
    if (listType && !categoryfilter) {
      searchObject = {
        ...searchObject,
        limit: MARKETPLACELIST_LIMIT,
        skip: SKIP,
        listType: listType === "farmproduce" ? "PRODUCT_LIST" : "INPUT_LIST",
      };
    }
    if (countrysm) {
      searchObject = {
        ...searchObject,
        limit: MARKETPLACELIST_LIMIT,
        skip: SKIP,
        country: countrysm,
      };
    }
    if (selectedstatesm) {
      searchObject = {
        ...searchObject,
        limit: MARKETPLACELIST_LIMIT,
        skip: SKIP,
        state: selectedstatesm,
      };
    }
    if (selectedratesm) {
      searchObject = {
        ...searchObject,
        limit: MARKETPLACELIST_LIMIT,
        skip: SKIP,
        rating: selectedratesm,
      };
    }
    if (selectedratesm) {
      searchObject = {
        ...searchObject,
        limit: MARKETPLACELIST_LIMIT,
        skip: SKIP,
        rating: selectedratesm,
      };
    }
    dispatch(getAllOpenMarketPlaceProductsActions(searchObject));
    setOpenFilter(false);
  };

  return (
    <Box
      sx={{
        ...styles.container,
      }}
    >
      <Box sx={{ ...styles.filterlg }}>
        <div>
          <Typography sx={{ ...styles.filter }}>
            <img
              src="https://res.cloudinary.com/dpnyywwjb/image/upload/v1699997060/sort_tewxwz.svg"
              alt="filter-icon"
            />
            Filter
          </Typography>
          <Box>
            <Box
              sx={{
                marginTop: "2rem",
                "@media(max-width: 1500px)": {
                  marginTop: "1.5rem",
                },
              }}
            >
              <Divider />
              <Accordion sx={{ boxShadow: "none" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ boxShadow: "0" }}
                >
                  <Typography
                    sx={{
                      ...styles.filterHeader,
                    }}
                  >
                     Product type
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: "0", boxShadow: "0" }}>
                  <AjnewFilter
                    allproductTypeFilter={true}
                    onCategorySelect={handleCategorySelect}
                    filterSelected={filterChanged}
                    filterData={dataInfo}
                  />
                </AccordionDetails>
              </Accordion>
              <Divider />
            </Box>

            <Box>
              <Accordion sx={{ ...styles.filtertab }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ boxShadow: "0" }}
                >
                  <Typography
                    sx={{
                      ...styles.filterHeader,
                    }}
                  >
                     Country
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: "0", boxShadow: "0" }}>
                  <AjnewFilter
                    onCountrySelect={handleCountrySelect}
                    countryFilter={true}
                    filterSelected={filterChanged}
                    filterData={dataInfo}
                  />
                </AccordionDetails>
              </Accordion>
              <Divider />
            </Box>

            <Box>
              <Accordion sx={{ ...styles.filtertab }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ boxShadow: "0" }}
                >
                  <Typography
                    sx={{
                      ...styles.filterHeader,
                    }}
                  >
                     State
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: "0", boxShadow: "0" }}>
                  <AjnewFilter
                    onStateSelect={handleStateSelect}
                    stateFilter={true}
                    filterSelected={filterChanged}
                    filterData={dataInfo}
                  />
                </AccordionDetails>
              </Accordion>
              <Divider />
            </Box>

            <Box>
              <Accordion sx={{ ...styles.filtertab }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ boxShadow: "0" }}
                >
                  <Typography
                    sx={{
                      ...styles.filterHeader,
                    }}
                  >
                     Ratings
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: "0", boxShadow: "0" }}>
                  <AjnewFilter
                    ratingFilter={true}
                    filterSelected={filterChanged}
                    filterData={dataInfo}
                    handleRatingSelect={handleRatingSelect}
                  />
                </AccordionDetails>
              </Accordion>
              <Divider />
            </Box>
          </Box>
        </div>
      </Box>

      <Box sx={{ ...styles.productContainer }}>
        <Box sx={{ ...styles.searchContainersm }}>
          <AjInputBase
            name="Search for products and inputs..."
            value={searchText}
            onKeyPress={onEnterPress}
            onChange={handleSearchTextChange}
            styleData={{
              ...styles.searchbox,
              ...styles.input,
              ...styles.searchIcon,
              backgroundColor: "transparent",
              border: "1px solid rgba(234, 234, 234, 1)",
              borderRadius: "8px",
            }}
            placeholder="Search by name or city"
            endIcon={
              <img
                src="https://res.cloudinary.com/dpnyywwjb/image/upload/v1700037960/search-normal_e1dfyg.svg"
                alt="searchicon"
                onClick={handleSearchFilter}
              />
            }
          />
        </Box>

        <Box sx={{ ...styles.filterContainersm }}>
          <Typography
            onClick={() => setOpenFilter(true)}
            sx={{ ...styles.filtericonsm }}
          >
            <img
              src="https://res.cloudinary.com/dpnyywwjb/image/upload/v1700087311/filter-search_pxi4fi.svg"
              alt="filter-icon"
            />{" "}
            Filter
          </Typography>
          {allOpenMarketPlaceProducts ? (
            <Typography sx={{ ...styles.searchCountsm }}>
              {`Showing ${allOpenMarketPlaceProducts?.result?.length} ${
                allOpenMarketPlaceProducts?.totalCount > 1 ? "items" : "item"
              }`}
            </Typography>
          ) : (
            <Typography sx={{ ...styles.searchCountsm }}>
              Showing 0 item
            </Typography>
          )}
        </Box>

        <Box sx={{ ...styles.searchContainer }}>
          {allOpenMarketPlaceProducts ? (
            <Typography sx={{ ...styles.searchCount }}>
              {`Showing ${allOpenMarketPlaceProducts?.result?.length} ${
                allOpenMarketPlaceProducts?.totalCount > 1 ? "items" : "item"
              }`}
            </Typography>
          ) : (
            <Typography sx={{ ...styles.searchCount }}>
              Showing 0 item
            </Typography>
          )}

          <Box sx={{ width: "40%" }}>
            <AjInputBase
              name="Search for products and inputs..."
              value={searchText}
              onKeyPress={onEnterPress}
              onChange={handleSearchTextChange}
              styleData={{
                ...styles.searchbox,
                ...styles.input,
                ...styles.searchIcon,
              }}
              placeholder="Search by name or city"
              endIcon={
                <img
                  src="https://res.cloudinary.com/dpnyywwjb/image/upload/v1700037960/search-normal_e1dfyg.svg"
                  alt="searchicon"
                  onClick={handleSearchFilter}
                />
              }
            />
          </Box>
        </Box>
        <Box
          sx={allOpenMarketPlaceProducts?.totalCount && styles.cardcontainer}
        >
          <ProductList
            products={allOpenMarketPlaceProducts}
            loading={dispatchLoading}
          />
        </Box>
        {!!allOpenMarketPlaceProducts?.totalCount && (
          <CustomPagination
            totalCount={allOpenMarketPlaceProducts?.totalCount}
            query={query}
            setQuery={setQuery}
            customLimit={MARKETPLACELIST_LIMIT}
          />
        )}
      </Box>
      <AjDialog
        open={openFilter}
        closeModal={setOpenFilter}
        title={`Showing ${allOpenMarketPlaceProducts?.result?.length} ${
          allOpenMarketPlaceProducts?.totalCount > 1 ? "items" : "item"
        }`}
      >
        <Box>
          <Box>
            <Accordion sx={{ ...styles.filtertab }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ boxShadow: "0" }}
              >
                <Typography
                  sx={{
                    ...styles.filterHeader,
                  }}
                >
                  Product type
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: "0", boxShadow: "0" }}>
                <AjnewFilter
                  onCategorySelectsm={handleCategorySelectsm}
                  allproductTypeFiltersm={true}
                />
              </AccordionDetails>
            </Accordion>
            <Divider />
          </Box>
          <Box>
            <Accordion sx={{ ...styles.filtertab }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ boxShadow: "0" }}
              >
                <Typography
                  sx={{
                    ...styles.filterHeader,
                  }}
                >
                  Country
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: "0", boxShadow: "0" }}>
                <AjnewFilter
                  onCountrySelectsm={handleCountrySelectsm}
                  countryFiltersm={true}
                  // filterData={dataInfo}
                />
              </AccordionDetails>
            </Accordion>
            <Divider />
          </Box>
          <Box>
            <Accordion sx={{ ...styles.filtertab }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ boxShadow: "0" }}
              >
                <Typography
                  sx={{
                    ...styles.filterHeader,
                  }}
                >
                  State
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: "0", boxShadow: "0" }}>
                <AjnewFilter
                  onStateSelectsm={handleStateSelectsm}
                  stateFiltersm={true}
                  // filterSelected={filterChanged}
                  // filterData={dataInfo}
                />
              </AccordionDetails>
            </Accordion>
            <Divider />
          </Box>
          <Box>
            <Accordion sx={{ ...styles.filtertab }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ boxShadow: "0" }}
              >
                <Typography
                  sx={{
                    ...styles.filterHeader,
                  }}
                >
                  Ratings
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: "0", boxShadow: "0" }}>
                <AjnewFilter
                  ratingFiltersm={true}
                  handleRatingSelectsm={handleRatingSelectsm}
                />
              </AccordionDetails>
            </Accordion>
            <Divider />
          </Box>
          <Box sx={commonStyles.buttonBoxsm}>
            <AjButton
              variant="text"
              displayText="Cancel"
              styleData={{
                ...commonStyles.buttonStylesmclear,
                ...commonStyles.cancelButton,
              }}
              onClick={handleResetFilter}
            />

            <AjButton
              variant="text"
              styleData={{
                ...commonStyles.buttonStylesmapp,
                ...commonStyles.applyFilterButton,
              }}
              displayText="Apply Filter"
              onClick={applyFilter}
            />
          </Box>{" "}
        </Box>
      </AjDialog>
    </Box>
  );
}

export default ProductListContainer;
