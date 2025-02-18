import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Grid, Box, Typography, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import AjInputBase from "../../../Components/AjInputBase";
import AjCustomTable from "../../../Components/AjCustomTable/AjCustomTable";
import CustomPagination from "../../../Components/CustomPagination/CustomPagination";
import AjTypography from "../../../Components/AjTypography";
import AjActiveAdsCard from "../../../Components/AjActiveAdsCard/AjActiveAdsCard";
import AjDropDown from "../../../Components/AjDropdown/AjDropDown";
import { getUserData } from "../../../Services/localStorageService";

import {
  getActiveAdsListAction,
  getRecievedOrdersListAction,
  toggleManageLogisticsAction,
} from "../../../Redux/FarmingAssociation/MarketPlace/marketplaceActions";
import {
  LIMIT,
  SKIP,
  productOrderStatusOptions,
} from "../../../Constant/AppConstant";
import {
  formatDate,
  numberWithCommas,
  textCapitalize,
} from "../../../Services/commonService/commonService";

import { customCommonStyles, commonStyles } from "../../../Style/CommonStyle";
import { styles } from "../../FarmingAssociation/Inventory/AvailableInventory/AvailableInventoryStyles";
import { styles as customSeachFilterStyles } from "../../Admin/MasterManagement/MasterManagementStyles";
import { styles as customTableStyles } from "../../../Components/AjCustomTable/AjCustomTableStyles";
import { styles as tableActionStyle } from "../../../Components/TableActions/TableActionsStyles";
import AjActiveAdsRetialMarket from "../../../Components/AjActiveAdsCard/AjActiveAdsRetialMarket";

function RetailMarketListing(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchedData, setSearchedData] = useState("");
  const [onSearchClick, setOnSearchClick] = useState(true);
  const [productOrderStatus, setProductOrderStatus] = useState();
  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  const [role_id, setRoleId] = useState();
  useEffect(() => {
    setRoleId(getUserData().role_id);
  }, []);

  const activeAdsList = useSelector((state) => state.marketplace.activeAdsList);
  const recievedOrdersList = useSelector(
    (state) => state.marketplace.recievedOrdersList
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

  const productOrderStatusChangeHandler = (e, selectedStatus) => {
    if (selectedStatus.target.value !== "ALL") {
      let selectedValue = productOrderStatusOptions.find(
        (item) => item.value === selectedStatus.target.value.value
      );
      setProductOrderStatus(selectedValue);
    } else {
      setProductOrderStatus(null);
    }
  };

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
    };
    if (searchedData.length) {
      searchObject = {
        limit: LIMIT,
        skip: SKIP,
        filterText: searchedData,
      };
    }
    if (productOrderStatus?.value) {
      searchObject = {
        limit: LIMIT,
        skip: SKIP,
        status: productOrderStatus?.value,
      };
    }
    if (props.activeTab === 0) {
      dispatch(getActiveAdsListAction(searchObject));
    } else {
      dispatch(getRecievedOrdersListAction(searchObject));
    }
  }, [onSearchClick, query, productOrderStatus]);

  useEffect(() => {
    const dataSet = recievedOrdersList?.result?.map((item) => {
      return {
        "Order id": item.order_id,
        "Product name": item.product_name,
        "Batch id": item.batch_id,
        "Batch type": item.batch_type,
        "Quantity sold": `${item.quantity} ${textCapitalize(
          item.unit_of_measurement
        )}`,
        Price: item.price
          ? `${numberWithCommas(item?.price, item?.seller_currency)}`
          : "-",
        "Logistics Decision":
          item.logistics_manage === "ALLOW_MERCHANT"
            ? "Allow Seller"
            : item.logistics_manage === "POST_ADS"
            ? "Allow Buyer"
            : item.logistics_manage === "SELF_MANAGE"
            ? "Self Manage"
            : null,
        "Date of purchase": `${formatDate(item.transaction_created_at)}`,
        id: item.id,
        productStatus: item.status,
        logisticsAdPlaced: item.logistics_ad_placed,
        logistics_manage_request_status: item.logistics_manage_request_status,
        sp: "sp",
        userId: role_id,
      };
    });
    setData(dataSet);
  }, [recievedOrdersList]);

  const options = [
    {
      name: "Approved",
      actionClickHandler: (id) =>
        dispatch(toggleManageLogisticsAction("APPROVED", "PRODUCT_ORDER", id)),
    },
    {
      name: "Rejected",
      actionClickHandler: (id) =>
        dispatch(toggleManageLogisticsAction("REJECTED", "PRODUCT_ORDER", id)),
    },
  ];

  let tableHead = [
    { field: "Order id", ellipsisClass: true },
    { field: "Product name" },
    { field: "Batch id", ellipsisClass: true },
    { field: "Batch type" },
    { field: "Quantity sold" },
    { field: "Price" },
    { field: "Logistics Decision" },
    { field: "Date of purchase" },
    {
      field: "Status",
      renderColumn: (row) => {
        let currentStatus = productOrderStatusOptions.find(
          (item) => item.value === row.productStatus
        );
        return (
          <Button
            sx={{
              ...tableActionStyle.inActiveStyle,
              ...(row?.productStatus === "COMPLETED" &&
                customTableStyles.btnStyle),
              ...(row?.productStatus === "IN-TRANSIT" &&
                customTableStyles.intransitStyle),
            }}
            disabled={true}
          >
            <Typography sx={customTableStyles.colorText}>
              {currentStatus?.label}
            </Typography>
          </Button>
        );
      },
    },
    {
      width: "10%",
      renderColumn: (row) => {
        return (
          <Button
            sx={{
              ...commonStyles.anchorButtonStyle,
            }}
            onClick={() => navigate(`recieved-order/detail/${row.id}`)}
          >
            <Typography sx={styles.viewMoreWidth}>View More</Typography>
          </Button>
        );
      },
    },
    { field: "", cellRenderer: true },
  ];
  return (
    <>
      <Box
        sx={{
          ...customCommonStyles.subContentBox,
          ...styles.listingMargin,
          ...styles.cardsBox,
          ...styles.marketPlaceHeight,
        }}
      >
        <Grid
          item
          sx={{
            ...customCommonStyles.subHeaderStyle,
            ...styles.listingMarginTop,
          }}
        >
          {props.activeTab === 0 ? (
            <AjInputBase
              value={searchedData}
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
          ) : (
            <Grid>
              <AjDropDown
                options={productOrderStatusOptions}
                value={productOrderStatus?.label}
                onChange={productOrderStatusChangeHandler}
                source="label"
                placeHolder="Select Status"
                defaultValue="All"
                disableSourceForValue
                styleData={{
                  ...customSeachFilterStyles.customDropDown,
                  ...styles.filterDropdown,
                }}
              />
            </Grid>
          )}
        </Grid>
        {props.activeTab === 0 && (
          <Box
            sx={{
              ...styles.marketPlaceStyles,
              ...commonStyles.customSrollBar,
            }}
          >
            {activeAdsList?.result?.length > 0 ? (
              activeAdsList?.result?.map((item, index) => (
                <AjActiveAdsRetialMarket
                  key={index}
                  image={item?.file_path}
                  batchId={item?.batch_id}
                  batchType={textCapitalize(item?.batch_type)}
                  pricePerItem={item?.price_per_unit}
                  price={item?.price}
                  productName={item?.product_name}
                  quantity={item?.available_quantity}
                  unit_of_measurement={textCapitalize(
                    item?.unit_of_measurement
                  )}
                  id={item?.id}
                />
              ))
            ) : (
              <Box
                sx={{
                  ...commonStyles.noContentBox,
                  ...commonStyles.noContentBoxCustom,
                }}
              >
                <AjTypography
                  styleData={commonStyles.noDataText}
                  displayText="No data found"
                />
              </Box>
            )}
          </Box>
        )}

        {props.activeTab === 1 &&
          (recievedOrdersList?.result?.length > 0 ? (
            <AjCustomTable
              columnDefs={tableHead}
              rowData={data}
              pagination={true}
              query={query}
              setQuery={setQuery}
              options={options}
              totalCount={recievedOrdersList?.totalCount}
              statusOptionsRequired={false}
              tableWrapperStyles={customCommonStyles.tableCreateButtonHeight}
              ellipsisMaxWidth={commonStyles.ellipsisMaxWidth}
            />
          ) : (
            <Box
              sx={{
                ...commonStyles.noContentBox,
                ...customCommonStyles.noDataPagination,
              }}
            >
              <AjTypography
                styleData={commonStyles.noDataText}
                displayText="No data found"
              />
            </Box>
          ))}

        {props.activeTab === 0 && !!activeAdsList?.result?.length && (
          <CustomPagination
            query={query}
            setQuery={setQuery}
            totalCount={
              props.activeTab === 0
                ? activeAdsList?.totalcount
                : recievedOrdersList?.totalCount
            }
          />
        )}
      </Box>
    </>
  );
}

export default RetailMarketListing;
