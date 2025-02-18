import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";
import AjTypography from "../../AjTypography";
import AjCustomTable from "../../AjCustomTable/AjCustomTable";
import { LIMIT, SKIP } from "../../../Constant/AppConstant";
import { getAdminReportsInputListAction } from "../../../Redux/SuperAdmin/ReportsAdmin/reportsAdminAction";
import {
  numberWithCommas,
  textCapitalize,
} from "../../../Services/commonService/commonService";

const InputListing = ({ dataInfo, searchClick, searchText, type }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  const inputList = useSelector(
    (state) => state.reportsAdmin.adminReportsInputList
  );

  const tableHead = [
    { field: "Input Name", ellipsisClass: true },
    { field: type === "inputPurchased" ? "Association name" : "Supplier name" },
    { field: "Quantity" },
    { field: type === "inputPurchased" ? "Cost Price" : "Revenue" },
  ];

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
      inputId: id,
    };
    if (type === "inputPurchased") {
      searchObject = {
        ...searchObject,
        isAssociationLevel: true,
      };
    } else {
      searchObject = {
        ...searchObject,
        isSupplierLevel: true,
      };
    }

    if (searchText.length) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        filterText: searchText,
      };
    }
    if (dataInfo?.products?.length) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        products: JSON.stringify(dataInfo.products),
      };
    }
    if (dataInfo?.inputs?.length) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        inputs: JSON.stringify(dataInfo.inputs),
      };
    }
    dispatch(getAdminReportsInputListAction(searchObject, type));
  }, [query, searchClick, dataInfo, type]);

  useEffect(() => {
    const dataSet = inputList?.data?.result?.map((item) => {
      return {
        "Input Name": item.input_name,
        ...(type === "inputPurchased"
          ? {
              "Association name": item.association_name,
            }
          : {
              "Supplier name": item.input_supplier_name,
            }),
        Quantity: `${item.quantity} ${textCapitalize(
          item?.unit_of_measurement
        )}`,
        ...(type === "inputPurchased"
          ? {
              "Cost Price": `${numberWithCommas(
                item.cost_price,
                item?.buyer_currency
              )}`,
            }
          : {
              Revenue: `${numberWithCommas(
                item.revenue,
                item.seller_currency
              )}`,
            }),
      };
    });
    setData(dataSet);
  }, [inputList]);

  return (
    <>
      {inputList?.data?.result?.length === 0 ? (
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
          totalCount={inputList?.data?.totalCount}
          tableWrapperStyles={customCommonStyles.reportsTableHeight}
        />
      )}
    </>
  );
};

export default InputListing;
