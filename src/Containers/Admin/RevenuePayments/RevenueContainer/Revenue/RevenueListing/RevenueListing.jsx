import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AjCustomTable from "../../../../../../Components/AjCustomTable/AjCustomTable";
import AjTypography from "../../../../../../Components/AjTypography";
import { LIMIT, SKIP } from "../../../../../../Constant/AppConstant";
import {
  getAdminRevenueListAction,
  settleAmount,
} from "../../../../../../Redux/SuperAdmin/RevenuePayments/revenuePaymentsAction";
import { numberWithCommas } from "../../../../../../Services/commonService/commonService";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../../../Style/CommonStyle";
import { styles } from "../../../RevenuePaymentsStyles";
import { styles as customTableStyles } from "../../.../../../../../../Components/AjCustomTable/AjCustomTableStyles";

const RevenueListing = (props) => {
  const { searchClick, searchText, level } = props;

  const dispatch = useDispatch();

  const revenueList = useSelector(
    (state) => state.adminRevenuePayments.adminRevenueList
  );

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  let tableHead = [
    { field: "Name", width: "25%", ellipsisClass: true },
    { field: "Total Sale" },
    { field: "Ajeoba Commission" },
    { field: "Pending Amount" },
    {
      renderColumn: (row) => {
        return (
          <Button
            sx={{
              ...customTableStyles.btnStyle,
              ...(row.pendingAmount <= 0 && customTableStyles.disabledButton),
            }}
            onClick={() => dispatch(settleAmount(row.id))}
            disabled={row.pendingAmount <= 0}
          >
            <Typography sx={customTableStyles.colorText}>
              Settle Amount
            </Typography>
          </Button>
        );
      },
    },
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
    if (level.isAssociationLevel) {
      searchObject = {
        ...searchObject,
        isAssociationLevel: true,
        isAggregatorLevel: "",
        isInputSupplierLevel: "",
      };
    }
    if (level.isAggregatorLevel) {
      searchObject = {
        ...searchObject,
        isAggregatorLevel: true,
        isAssociationLevel: "",
        isInputSupplierLevel: "",
      };
    }
    if (level.isInputSupplierLevel) {
      searchObject = {
        ...searchObject,
        isInputSupplierLevel: true,
        isAssociationLevel: "",
        isAggregatorLevel: "",
      };
    }
    dispatch(getAdminRevenueListAction(searchObject));
  }, [query, searchClick, level]);

  useEffect(() => {
    const dataSet = revenueList?.result?.map((item) => {
      return {
        Name: level.isAssociationLevel
          ? item.association_name
          : level.isAggregatorLevel
          ? item.first_name + " " + item.last_name
          : item.input_supplier_name,
        "Total Sale": numberWithCommas(item.total_sales, item.seller_currency),
        "Ajeoba Commission": numberWithCommas(item.commission, item.seller_currency),
        "Pending Amount": numberWithCommas(
          item.pending_amount,
          item.seller_currency
        ),
        id: item.user_id,
        pendingAmount: item.pending_amount,
      };
    });
    setData(dataSet);
  }, [revenueList]);

  return (
    <>
      {revenueList?.result?.length === 0 ? (
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
          totalCount={revenueList?.totalCount}
          tableWrapperStyles={{
            ...customCommonStyles.reportsTableHeight,
          }}
        />
      )}
    </>
  );
};

export default RevenueListing;
