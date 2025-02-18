import React, { useEffect, useState } from "react";
import * as _ from "lodash";
import * as moment from "moment";
import { Box, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styles as customTableStyles } from "../../../../../Components/AjCustomTable/AjCustomTableStyles";
import AjCustomTable from "../../../../../Components/AjCustomTable/AjCustomTable";
import AjTypography from "../../../../../Components/AjTypography";
import { LOGISTICS } from "../../../../../Routes/Routes";
import {
  LIMIT,
  productOrderStatusOptions,
  productTypeOptions,
  SKIP,
} from "../../../../../Constant/AppConstant";
import { getTradingInputOrderListAction } from "../../../../../Redux/CorporateBuyer/Trading/tradingActions";
import {
  numberWithCommas,
  textCapitalize,
} from "../../../../../Services/commonService/commonService";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../../Style/CommonStyle";
import { getUserData } from "../../../../../Services/localStorageService";

const InputOrderListing = ({ statusItem }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  const orderList = useSelector(
    (state) => state.tradingActiveAds.tradingInputOrderList
  );

  const [role_id, setRoleId] = useState();

  useEffect(() => {
    setRoleId(getUserData().role_id);
  }, []);

  const tableHead = [
    { field: "Input Name" },
    role_id !== 6 && { field: "Order Id", ellipsisClass: true, width: "17%" },
    { field: "Input Type" },
    { field: "Seller's Name", ellipsisClass: true, width: "10%" },
    { field: "Quantity" },
    { field: "Price" },
    { field: "Status" },
    { field: "Logistics Decision" },
    // { field: "Manage Logistics" },
    { field: "", cellRenderer: true },
    { field: "", cellRenderer: true },
  ];

  useEffect(() => {
    let searchObject = { limit: query.limit, skip: query.skip };
    if (statusItem) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        status: statusItem,
      };
    }
    dispatch(getTradingInputOrderListAction(searchObject));
  }, [query, statusItem]);

  useEffect(() => {
    const dataSet = orderList?.result?.map((item) => {
      return {
        "Order Id": item.order_id,
        "Input Name": item?.input_name,
        "Input Type": item.input_subtype,
        "Seller's Name": item.seller_name,
        Quantity: `${item.quantity} ${textCapitalize(
          item.unit_of_measurement
        )} `,
        Price: item.price
          ? `${numberWithCommas(item?.price, item?.buyer_currency)}`
          : "-",
        Date: moment(item.transaction_created_at).format("DD/MM/YYYY"),
        id: item.id,
        Status: item.status,
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
      };
    });
    setData(dataSet);
  }, [orderList]);

  const actionsArray = [
    {
      name: "View More",
      type: "anchor",
      actionClickHandler: (id) => {
        navigate(`order-input-detail/${id}`);
      },
    },
  ];

  return (
    <>
      {orderList?.result?.length === 0 ? (
        <Box sx={commonStyles.noContentBox}>
          <AjTypography
            styleData={commonStyles.noDataText}
            displayText="No data found"
          />
        </Box>
      ) : (
        <AjCustomTable
          columnDefs={tableHead}
          rowData={data}
          query={query}
          actions={actionsArray}
          setQuery={setQuery}
          pagination={true}
          totalCount={orderList?.totalCount}
          tableWrapperStyles={
            customCommonStyles.tableHeightNoBackgroundTabsSingleFilter
          }
        />
      )}
    </>
  );
};

export default InputOrderListing;