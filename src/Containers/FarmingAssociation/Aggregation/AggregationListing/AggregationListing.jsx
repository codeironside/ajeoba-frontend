import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import AjCustomTable from "../../../../Components/AjCustomTable/AjCustomTable";
import * as moment from "moment";
import AjTypography from "../../../../Components/AjTypography";
import {
  getAggregationListAction,
  getAggregationInputListAction,
} from "../../../../Redux/FarmingAssociation/Aggregation/aggregationActions";

import { LIMIT, SKIP, qualityOptions } from "../../../../Constant/AppConstant";
import { commonStyles } from "../../../../Style/CommonStyle";
import { getUserData } from "../../../../Services/localStorageService";
import { numberWithCommas, textCapitalize } from "../../../../Services/commonService/commonService";
import { ROLES } from "../../../../Constant/RoleConstant";

const AggregationListing = (props) => {
  const { dataInfo, onClick, searchByName } = props;
  const dispatch = useDispatch();
  const userData = getUserData();

  const [datas, setDatas] = useState(null);
  const [queries, setQueries] = useState({ limit: LIMIT, skip: SKIP });
  const aggregationList = useSelector(
    (state) => state.aggregation.aggregationList
  );
  const aggregationInputList = useSelector(
    (state) => state.aggregation.aggregationInputList
  );
  let tableHeader = [
    { field: "Product Name", ellipsisClass: true, width: "11%" },
    { field: "Product type", ellipsisClass: true, width: "11%" },
    { field: "Farmer", ellipsisClass: true, width: "10%" },
    { field: "Quantity" },
    { field: "Unit of measurement", width: "4%" },
    { field: "Cost price" },
    { field: "Transport Reimbursements", width: "5%" },
    { field: "Warehouse", ellipsisClass: true, width: "11%" },
    { field: "State", ellipsisClass: true, width: "8%" },
    { field: "Quality", width: "1%" },
    { field: "Date & Time" },
  ];
  let tableHeaderAggregationAggregator = [
    { field: "Product Name", ellipsisClass: true, width: "11%" },
    { field: "Product type", ellipsisClass: true, width: "11%" },
    { field: "Quantity" },
    { field: "Unit of measurement", width: "15%" },
    { field: "Cost price" },
    { field: "Warehouse", ellipsisClass: true, width: "11%" },
    { field: "State", ellipsisClass: true, width: "8%" },
    { field: "Quality", width: "1%" },
    { field: "Date & Time" },
  ];
  let tableHeaderAggregationInputSupplier = [
    { field: "Input Name", ellipsisClass: true, width: "11%" },
    { field: "Input Subtype", ellipsisClass: true, width: "11%" },
    { field: "Quantity" },
    { field: "Unit of measurement", width: "12%" },
    { field: "Cost price" },
    { field: "Selling price" },
    { field: "Warehouse", ellipsisClass: true, width: "11%" },
    { field: "State", ellipsisClass: true, width: "8%" },
    { field: "Date & Time" },
    { field: "Expiry date" },
  ];
  useEffect(() => {
    let searchObject = { limit: queries.limit, skip: queries.skip };
    if (searchByName?.length) {
      searchObject = {
        limit: LIMIT,
        skip: SKIP,
        filterText: searchByName,
      };
    }
    if (dataInfo?.startDate) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        from: moment(dataInfo?.startDate).format("L"),
        to: moment(dataInfo?.endDate).format("L"),
      };
    }
    if (dataInfo?.products?.length > 0) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        product: JSON.stringify(dataInfo?.products),
      };
    }
    if (dataInfo?.inputs?.length > 0) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        input: JSON.stringify(dataInfo?.inputs),
      };
    }
    if (dataInfo?.quality?.length > 0) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        quality: JSON.stringify(dataInfo?.quality),
      };
    }
    if (dataInfo?.country) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        country: [dataInfo?.country],
      };
    }
    if (dataInfo?.states?.length > 0) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        state: JSON.stringify(dataInfo?.states),
      };
    }
    if (userData.role_id !== ROLES.INPUT_SUPPLIER)
      dispatch(getAggregationListAction(searchObject));
    else dispatch(getAggregationInputListAction(searchObject));
  }, [queries, dataInfo, onClick]);

  useEffect(() => {
    const dataSet = aggregationList?.result?.result?.map((item) => {
      let qualyt = qualityOptions[item.quality - 1].label;

      return {
        "Product Name": item.product_name,
        "Product type": textCapitalize(item.product_type),
        ...(userData.role_id === 1 && {
          Farmer: item.first_name,
        }),
        Quantity: item.quantity,
        "Unit of measurement": textCapitalize(item.unit_of_measurement),
        "Cost price": numberWithCommas(item.cost_price, userData?.currency),
        ...(userData.role_id === 1 && {
          "Transport Reimbursements": item.transport_reimbursement
            ? `${numberWithCommas(
                item.transport_reimbursement,
                userData?.currency
              )} `
            : "N/A",
        }),

        Warehouse: item.warehouse_name,
        State: item.state_name,
        Quality: qualyt,
        "Date & Time": `${moment(item.date_time).format("DD/MM/YYYY")}
         ${moment(item.date_time).format("LT")}`,
      };
    });
    setDatas(dataSet);
  }, [aggregationList]);

  useEffect(() => {
    const dataSet = aggregationInputList?.result?.result?.map((item) => {
      return {
        "Input Name": item.input_name,
        "Input Subtype": item.input_subtype,
        Quantity: item.quantity,
        "Unit of measurement": textCapitalize(item.unit_of_measurement),
        "Cost price": numberWithCommas(item.cost_price, userData?.currency),
        "Selling price": numberWithCommas(
          item.selling_price,
          userData?.currency
        ),
        Warehouse: item.warehouse_name,
        State: item.state_name,
        "Date & Time": `${moment(item.date_time).format("DD/MM/YYYY")}
         ${moment(item.date_time).format("LT")}`,
        "Expiry date": `${moment(item.expiry_date).format("DD/MM/YYYY")}`,
      };
    });
    setDatas(dataSet);
  }, [aggregationInputList]);

  return (
    <>
      {aggregationList?.result?.result?.length === 0 ||
      aggregationInputList?.result?.result?.length === 0 ? (
        <Box sx={commonStyles.noContentBox}>
          <AjTypography
            styleData={commonStyles.noDataText}
            displayText="No data found"
          />
        </Box>
      ) : (
        <AjCustomTable
          columnDefs={
            userData.role_id === ROLES.FARMING_ASSOCIATION
              ? tableHeader
              : userData.role_id === ROLES.PRODUCT_AGGREGATOR
              ? tableHeaderAggregationAggregator
              : tableHeaderAggregationInputSupplier
          }
          rowData={datas}
          pagination={true}
          query={queries}
          setQuery={setQueries}
          totalCount={
            userData.role_id !== ROLES.INPUT_SUPPLIER
              ? aggregationList?.result?.totalcount
              : aggregationInputList?.result?.totalcount
          }
        />
      )}
    </>
  );
};

export default AggregationListing;
