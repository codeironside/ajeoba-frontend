import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";
import AjTypography from "../../AjTypography";
import AjCustomTable from "../../AjCustomTable/AjCustomTable";
import { LIMIT, SKIP } from "../../../Constant/AppConstant";
import {
  numberWithCommas,
  textCapitalize,
} from "../../../Services/commonService/commonService";
import {
  getInputSupplierReportsList,
  getInputSupplierReportsListAction,
} from "../../../Redux/InputSupplier/InputSupplierReports/inputSupplierReportsAction";

const InputSoldListing = ({ searchClick, searchText, type, dataInfo }) => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  const inputReportsList = useSelector(
    (state) => state.inputSupplierReports.inputSupplierReportsList
  );

  let tableHead = [
    { field: "Input Name", ellipsisClass: true },
    { field: "Input Subtype" },
    {
      field: "Quantity",
    },
    {
      field: type === "inputSold" ? "Revenue" : "Cost Price",
    },
  ];

  useEffect(() => {
    let searchObject = { limit: query.limit, skip: query.skip };
    if (searchText.length) {
      searchObject = {
        limit: LIMIT,
        skip: SKIP,
        filterText: searchText,
      };
    }
    if (dataInfo?.inputs?.length) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        inputs: JSON.stringify(dataInfo?.inputs),
      };
    }
    dispatch(getInputSupplierReportsListAction(searchObject, type));
    return () => dispatch(getInputSupplierReportsList(null));
  }, [query, searchClick, dataInfo]);

  useEffect(() => {
    const dataSet = inputReportsList?.data?.result?.map((item) => {
      return {
        "Input Name": item?.input_name,
        "Input Subtype": item?.input_subtype,
        Quantity: `${item?.quantity} ${textCapitalize(
          item?.unit_of_measurement
        )}`,
        ...(type === "inputSold"
          ? {
              Revenue: `${numberWithCommas(
                item.revenue,
                item.seller_currency
              )}`,
            }
          : {
              "Cost Price": `${numberWithCommas(
                item.cost_price,
                item.currency
              )}`,
            }),
      };
    });
    setData(dataSet);
  }, [inputReportsList]);

  return (
    <>
      {inputReportsList?.data?.result?.length === 0 ? (
        <Box
          sx={{
            ...commonStyles.noContentBox,
            ...customCommonStyles.reportsHeight,
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
          totalCount={inputReportsList?.data?.totalCount}
          tableWrapperStyles={{
            ...customCommonStyles.reportsTableHeight,
          }}
        />
      )}
    </>
  );
};

export default InputSoldListing;
