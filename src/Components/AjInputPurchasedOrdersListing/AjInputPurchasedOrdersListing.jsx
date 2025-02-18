import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

import AjCustomTable from "../AjCustomTable/AjCustomTable";
import AjTypography from "../AjTypography";
import { AjRating } from "../AjRating";
import { getInputOrderListAction } from "../../Redux/FarmingAssociation/Input/inputActions";
import { productOrderStatusOptions } from "../../Constant/AppConstant";
import {
  formatDate,
  numberWithCommas,
  textCapitalize,
} from "../../Services/commonService/commonService";
import { getUserData } from "../../Services/localStorageService";
import { styles as inventoryStyles } from "../../Containers/FarmingAssociation/Inventory/AvailableInventory/AvailableInventoryStyles";
import { styles as customTableStyles } from "../AjCustomTable/AjCustomTableStyles";
import { styles as tableActionStyle } from "../TableActions/TableActionsStyles";
import { commonStyles } from "../../Style/CommonStyle";

  const AjInputPurchasedOrdersListing = (props) => {
  const { query, setQuery, inputOrderStatus } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputOrderList = useSelector((state) => state.input.inputOrderList);
  const userData = getUserData();
  const [role_id, setRoleId] = useState();

  useEffect(() => {
    setRoleId(getUserData().role_id);
  }, []);

  const [data, setData] = useState();
  let tableHead = [
    { field: "Order id", ellipsisClass: true },
    { field: "Input Type" },
    // { field: "Seller's name" },
    { field: "Input Subtype" },
    { field: "Quantity Purchased" },
    // {
    //   field: "Rating",
    // },
    { field: "Price" },
    { field: "Expiry date" },
    { field: "Date of purchase" },
    { field: "Logistics Decision", ellipsisClass: true },
    {
      field: "Status",
      renderColumn: (row) => {
        let currentStatus = productOrderStatusOptions.find(
          (item) => item.value === row.orderStatus
        );
        return (
          <Button
            sx={{
              ...tableActionStyle.inActiveStyle,
              ...(row?.orderStatus === "COMPLETED" &&
                customTableStyles.btnStyle),
              ...(row?.orderStatus === "IN-TRANSIT" &&
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
            sx={commonStyles.anchorButtonStyle}
            onClick={() => navigate(`order/${row.id}`)}
          >
            <Typography sx={inventoryStyles.viewMoreWidth}>
              View More
            </Typography>
          </Button>
        );
      },
    },
    // { field: "Manage Logistics" },
    { field: "", cellRenderer: true },
  ];

  useEffect(() => {
    if (inputOrderList) {
      const dataSet = inputOrderList?.result?.map((item) => {
        return {
          "Order id": item?.order_id,
          "Input Type": item?.input_name,
          "Input Subtype": item?.input_subtype,
          "Seller's name": item?.seller_name,
          "Quantity Purchased": `${item?.quantity} ${textCapitalize(
            item?.unit_of_measurement
          )}`,
          Rating: item.avg_rating ? (
            <AjRating defaultValue={item.avg_rating} readOnly={true} />
          ) : (
            "-"
          ),
          Price: item.price
            ? `${numberWithCommas(item?.price, userData?.currency)}`
            : "-",
          "Expiry date": `${formatDate(item?.expiry_date)}`,
          "Date of purchase": `${formatDate(item?.date_purchase)}`,
          id: item.id,
          orderStatus: item.status,
          "Logistics Decision":
            item.logistics_manage === "ALLOW_MERCHANT"
              ? "Allow Seller"
              : item.logistics_manage === "POST_ADS"
              ? "Allow Buyer"
              : item.logistics_manage === "SELF_MANAGE"
              ? "Self Manage"
              : null,
          "Manage Logistics":
            item.logistics_manage_request_status === "APPROVED"
              ? "Approved"
              : item.logistics_manage_request_status === "REJECTED"
              ? "Rejected"
              : "Pending",
              logisticsAdPlaced: item.logistics_ad_placed,
          sp: "sp",
          userId: role_id,
          input: "input_listing_farming"
        };
      });
      setData(dataSet);
    }
  }, [inputOrderList]);

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
    };
    if (inputOrderStatus?.value) {
      searchObject = {
        ...searchObject,
        status: inputOrderStatus?.value,
      };
    }
    dispatch(getInputOrderListAction(searchObject));
  }, [inputOrderStatus, query]);

  return (
    <>
      {inputOrderList?.totalCount === 0 ? (
        <Box
          sx={{
            ...commonStyles.noContentBox,
          }}
        >
          <AjTypography
            styleData={commonStyles.noDataText}
            displayText="No data found"
          />
        </Box>
      ) : (
        <AjCustomTable
          columnDefs={tableHead}
          rowData={data}
          pagination={true}
          query={query}
          setQuery={setQuery}
          totalCount={inputOrderList?.totalCount}
          statusOptionsRequired={false}
          ellipsisMaxWidth={commonStyles.ellipsisMaxWidth}
        />
      )}
    </>
  );
};

export default AjInputPurchasedOrdersListing;
