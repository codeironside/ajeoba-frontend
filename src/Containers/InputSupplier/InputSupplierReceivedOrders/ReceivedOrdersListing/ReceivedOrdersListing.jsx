import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../../../Services/localStorageService";

import AjCustomTable from "../../../../Components/AjCustomTable/AjCustomTable";
import { styles as customTableStyles } from "../../../../Components/AjCustomTable/AjCustomTableStyles";
import AjTypography from "../../../../Components/AjTypography";

import {
  LIMIT,
  productOrderStatusOptions,
  SKIP,
} from "../../../../Constant/AppConstant";
import {
  formatDate,
  numberWithCommas,
  textCapitalize,
} from "../../../../Services/commonService/commonService";

import { styles as tableActionStyle } from "../../../../Components/TableActions/TableActionsStyles";
import {
  getInputOrderListAction,
  toggleManageLogisticsAction,
} from "../../../../Redux/FarmingAssociation/Input/inputActions";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";
import { styles } from "../InputSupplierReceivedOrdersStyles";

const ReceivedOrdersListing = (props) => {
  const { inputStatus } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [role_id, setRoleId] = useState();
  useEffect(() => {
    setRoleId(getUserData().role_id);
  }, []);


  const inputReceivedOrdersList = useSelector(
    (state) => state.input.inputOrderList
  );

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  const tableHead = [
    { field: "Order Id", ellipsisClass: true, width: "17%" },
    { field: "Input Name", ellipsisClass: true },
    { field: "Input Subtype", ellipsisClass: true },
    { field: "Quantity Sold" },
    { field: "Price" },
    { field: "Date of Purchase" },
    { field: "Logistics Decision" },
    {
      field: "Status",
      renderColumn: (row) => {
        let currentStatus = productOrderStatusOptions.find(
          (item) => item.value === row.inputStatus
        );
        return (
          <Button
            sx={{
              ...tableActionStyle.inActiveStyle,
              ...(row?.inputStatus === "COMPLETED" &&
                customTableStyles.btnStyle),
              ...(row?.inputStatus === "IN-TRANSIT" &&
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
            onClick={() => navigate(`/received-orders/detail/${row.id}`)}
          >
            <Typography>View More</Typography>
          </Button>
        );
      },
    },
    { field: "Manage Logistics", cellRenderer: true },
  ];

  const options = [
    {
      name: "Approved",
      actionClickHandler: (id) =>
        dispatch(toggleManageLogisticsAction("APPROVED", "INPUT_ORDER", id)),
      isDisabled: "yes",
    },
    {
      name: "Rejected",
      actionClickHandler: (id) =>
        dispatch(toggleManageLogisticsAction("REJECTED", "INPUT_ORDER", id)),
      isDisabled: "yes",
    },
  ];

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
    };
    if (inputStatus) {
      searchObject = {
        ...searchObject,
        status: inputStatus,
      };
    }
    dispatch(getInputOrderListAction(searchObject));
  }, [query, inputStatus]);

  useEffect(() => {
    const dataSet = inputReceivedOrdersList?.result?.map((item) => {
      return {
        "Order Id": item?.order_id,
        "Input Name": item?.input_name,
        "Input Subtype": item?.input_subtype,
        "Quantity Sold": `${item?.quantity} ${textCapitalize(
          item?.unit_of_measurement
        )}`,
        Price: `${numberWithCommas(item?.price, item?.seller_currency)}`,
        "Date of Purchase": `${formatDate(item?.transaction_created_at)}`,
        "Logistics Decision":
          item.logistics_manage === "ALLOW_MERCHANT"
            ? "Allow Seller"
            : item.logistics_manage === "POST_ADS"
            ? "Allow Buyer"
            : item.logistics_manage === "SELF_MANAGE"
            ? "Self Manage"
            : null,
        id: item.id,
        inputStatus: item.status,
        logisticsAdPlaced: item.logistics_ad_placed,
        logistics_manage_request_status: item.logistics_manage_request_status,
        sp: "sp",
        userId: role_id,
      };
    });
    setData(dataSet);
  }, [inputReceivedOrdersList]);

  return (
    <>
      {inputReceivedOrdersList?.result?.length === 0 ? (
        <Box sx={{ ...commonStyles.noContentBox, ...styles.masterNocontent }}>
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
          options={options}
          setQuery={setQuery}
          totalCount={inputReceivedOrdersList?.totalCount}
          tableWrapperStyles={customCommonStyles.tableHeightNoBackgroundTabs}
        />
      )}
    </>
  );
};

export default ReceivedOrdersListing;
