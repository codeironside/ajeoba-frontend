import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as _ from "lodash";
import * as moment from "moment";
import { Box } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { REPORTS } from "../../../Routes/Routes";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";
import AjTypography from "../../AjTypography";
import AjCustomTable from "../../AjCustomTable/AjCustomTable";
import { LIMIT, qualityOptions, SKIP } from "../../../Constant/AppConstant";
import {
  getProductList,
  getProductListAction,
} from "../../../Redux/FarmingAssociation/Reports/reportsAction";
import {
  numberWithCommas,
  textCapitalize,
} from "../../../Services/commonService/commonService";
import { getUserData } from "../../../Services/localStorageService";
import { ROLES } from "../../../Constant/RoleConstant";
import {
  getAdminReportsList,
  getAdminReportsListAction,
} from "../../../Redux/SuperAdmin/ReportsAdmin/reportsAdminAction";

// productsSold listing farmingAssociation and product Aggregation
const ProductsSoldListing = ({ searchClick, searchText, type, dataInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);
  const roleId = getUserData().role_id;

  const reportList = useSelector((state) =>
    roleId === ROLES.FARMING_ASSOCIATION || roleId === ROLES.PRODUCT_AGGREGATOR
      ? state.reports.productList
      : state.reportsAdmin.adminReportsList
  );
  let tableHead = [
    { field: "Product Name", ellipsisClass: true },
    { field: "Quality" },
    { field: "Quantity" },
    { field: type === "productSold" ? "Revenue" : "Cost Price" },
  ];
  if (
    (type !== "productSold" && roleId === ROLES.FARMING_ASSOCIATION) ||
    roleId === ROLES.ADMIN ||
    roleId === ROLES.SUPER_ADMIN
  ) {
    tableHead = [...tableHead, { field: "", cellRenderer: true }];
  }
  let actionsArray = [];
  if (
    (type !== "productSold" && roleId === ROLES.FARMING_ASSOCIATION) ||
    roleId === ROLES.ADMIN ||
    roleId === ROLES.SUPER_ADMIN
  ) {
    actionsArray = [
      ...actionsArray,
      {
        name: "View More",
        type: "anchor",
        actionClickHandler: (id) => {
          navigate(
            type === "productSold"
              ? `${REPORTS}/product-sold/info/${id}`
              : `${REPORTS}/product-aggregation/info/${id}`
          );
        },
      },
    ];
  }

  useEffect(() => {
    let searchObject = { limit: query.limit, skip: query.skip };
    if (searchText.length) {
      searchObject = {
        limit: LIMIT,
        skip: SKIP,
        filterText: searchText,
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
        products: JSON.stringify(dataInfo?.products),
      };
    }
    if (type !== "productSold") {
      searchObject = {
        ...searchObject,
        isFarmerLevel: false,
      };
    }
    if (
      roleId === ROLES.FARMING_ASSOCIATION ||
      roleId === ROLES.PRODUCT_AGGREGATOR
    ) {
      dispatch(getProductListAction(searchObject, type));
      return () => dispatch(getProductList(null));
    }
    if (roleId === ROLES.ADMIN || roleId === ROLES.SUPER_ADMIN) {
      dispatch(getAdminReportsListAction(searchObject, type));
      return () => dispatch(getAdminReportsList(null));
    }
  }, [query, searchClick, dataInfo]);

  useEffect(() => {
    const dataSet = reportList?.data?.result?.map((item) => {
      return {
        "Product Name": item.product_name,
        Quality:
          qualityOptions &&
          item[type === "productSold" ? "quality" : "product_quality"]
            ? _.find(qualityOptions, {
                value: String(
                  item[type === "productSold" ? "quality" : "product_quality"]
                ),
              })?.label
            : "N/A",
        Quantity: `${item.quantity} ${textCapitalize(
          item.unit_of_measurement
        )}`,
        ...(type === "productSold"
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
        id: item.product_id,
      };
    });
    setData(dataSet);
  }, [reportList, qualityOptions]);

  return (
    <>
      {reportList?.data?.result?.length === 0 ? (
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
          actions={actionsArray}
          query={query}
          setQuery={setQuery}
          totalCount={reportList?.data?.totalCount}
          tableWrapperStyles={{
            ...customCommonStyles.reportsTableHeight,
          }}
        />
      )}
    </>
  );
};

export default ProductsSoldListing;
