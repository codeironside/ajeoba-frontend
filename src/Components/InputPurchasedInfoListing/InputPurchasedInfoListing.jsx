import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

import { useParams } from "react-router-dom";
import { LIMIT, SKIP } from "../../Constant/AppConstant";
import { commonStyles, customCommonStyles } from "../../Style/CommonStyle";
import AjTypography from "../AjTypography";
import AjCustomTable from "../AjCustomTable/AjCustomTable";
import { getInputPurchasedAssociationReportListAction } from "../../Redux/FarmingAssociation/Reports/reportsAction";
import { numberWithCommas } from "../../Services/commonService/commonService";

//used in input purchased supplier info for farming association
const InputPurchasedInfoListing = ({ dataInfo, searchClick, searchText }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  const supplierInfoList = useSelector((state) => state.reports.inputList);
  const tableHead = [
    { field: "Input Name", ellipsisClass: true },
    { field: "Supplier Name" },
    { field: "Quantity" },
    { field: "Cost Price" },
  ];

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
      isSupplierLevel: true,
      inputId: id,
    };
    if (searchText.length) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        filterText: searchText,
      };
    }
    if (dataInfo?.inputSupplierName) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        inputSuppliers: JSON.stringify(dataInfo.inputSupplierName),
      };
    }
    dispatch(getInputPurchasedAssociationReportListAction(searchObject));
  }, [query, searchClick, dataInfo]);

  useEffect(() => {
    const dataSet = supplierInfoList?.data?.result?.map((item) => {
      return {
        "Supplier Name": item.input_supplier_name,
        "Input Name": item.input_name,
        Quantity: `${item.quantity} ${item.unit_of_measurement}`,
        "Cost Price": numberWithCommas(item?.cost_price, item?.seller_currency),
        id: item.id,
      };
    });
    setData(dataSet);
  }, [supplierInfoList]);

  return (
    <>
      {supplierInfoList?.data?.result?.length === 0 ? (
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
          totalCount={supplierInfoList?.data?.totalCount}
          tableWrapperStyles={{
            ...customCommonStyles.reportsTableHeight,
            overflow: "auto",
            ...commonStyles.customSrollBar,
          }}
        />
      )}
    </>
  );
};

export default InputPurchasedInfoListing;
