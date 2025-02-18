import React, { useEffect, useState } from "react";
import * as moment from "moment";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AjCustomTable from "../../../../../../Components/AjCustomTable/AjCustomTable";
import AjTypography from "../../../../../../Components/AjTypography";
import { LIMIT, SKIP } from "../../../../../../Constant/AppConstant";
import {
  numberWithCommas,
  textCapitalize,
} from "../../../../../../Services/commonService/commonService";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../../../Style/CommonStyle";
import { styles } from "../../../RevenuePaymentsStyles";
import { getAdminPaymentHistoryListAction } from "../../../../../../Redux/SuperAdmin/RevenuePayments/revenuePaymentsAction";
import {
  ACTIVE_GREEN,
  RED,
  YELLOW,
} from "../../../../../../Constant/ColorConstant";

const TransactionHistoryListing = (props) => {
  const { searchClick, searchText } = props;

  const dispatch = useDispatch();

  const transactionHistoryList = useSelector(
    (state) => state.adminRevenuePayments.adminPaymentHistoryList
  );

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  let tableHead = [
    { field: "Name", width: "15%", ellipsisClass: true },
    { field: "User Role", width: "20%", ellipsisClass: true },
    { field: "Transaction Id", width: "15%", ellipsisClass: true },
    { field: "Settlement Type", width: "15%", ellipsisClass: true },
    { field: "Amount Transfer" },
    { field: "Date & Time", width: "10%" },
    { field: "Status", specificColor: true },
    { field: "Message", width: "25%", ellipsisClass: true },
  ];

  useEffect(() => {
    let searchObject = { limit: LIMIT, skip: query.skip };
    if (searchText?.length) {
      searchObject = {
        limit: LIMIT,
        skip: SKIP,
        filterText: searchText,
      };
    }
    dispatch(getAdminPaymentHistoryListAction(searchObject));
  }, [query, searchClick]);

  useEffect(() => {
    const dataSet = transactionHistoryList?.data?.result?.map((item) => {
      return {
        "User Role": item?.role,
        Name: item.firstName + " " + item.lastName,
        "Transaction Id": item.transactionid || "-",
        Status: textCapitalize(item?.status),
        Message: item?.message || "-",
        "Settlement Type": textCapitalize(item?.settlementType),
        "Amount Transfer": numberWithCommas(
          item?.settlementAmount,
          item?.currency
        ),
        "Date & Time": `${moment(item?.createdAt).format("DD/MM/YYYY")}
         ${moment(item?.createdAt).format("LT")}`,
        id: item.id,
      };
    });
    setData(dataSet);
  }, [transactionHistoryList]);

  const getStatusColor = (tsStatus) => {
    if (tsStatus === "Failed") return RED;
    else if (tsStatus === "Success") return ACTIVE_GREEN;
    else return YELLOW;
  };

  return (
    <>
      {transactionHistoryList?.data?.totalCount === 0 ? (
        <Box
          sx={{
            ...commonStyles.noContentBox,
            ...styles.tableHeightNoDataFoundRevenue,
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
          totalCount={transactionHistoryList?.data?.totalCount}
          tableWrapperStyles={{
            ...customCommonStyles.customHistoryTableHeight,
          }}
          getColor={(status) => getStatusColor(status)}
        />
      )}
    </>
  );
};

export default TransactionHistoryListing;
