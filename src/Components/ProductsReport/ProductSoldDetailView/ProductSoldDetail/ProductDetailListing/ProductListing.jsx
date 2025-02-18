import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import * as _ from "lodash";

import { useParams } from "react-router-dom";
import * as moment from "moment";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../../Style/CommonStyle";
import AjTypography from "../../../../AjTypography";
import AjCustomTable from "../../../../AjCustomTable/AjCustomTable";
import {
  LIMIT,
  qualityOptions,
  SKIP,
} from "../../../../../Constant/AppConstant";
import {
  getProductList,
  getProductListAction,
} from "../../../../../Redux/FarmingAssociation/Reports/reportsAction";
import {
  numberWithCommas,
  textCapitalize,
} from "../../../../../Services/commonService/commonService";
import { getUserData } from "../../../../../Services/localStorageService";
import { ROLES } from "../../../../../Constant/RoleConstant";
import {
  getAdminReportsList,
  getAdminReportsListAction,
} from "../../../../../Redux/SuperAdmin/ReportsAdmin/reportsAdminAction";

//used for product aggregated view more (farmer level info)
const ProductListing = ({
  dataInfo,
  searchClick,
  searchText,
  type,
  activeTab,
}) => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const roleId = getUserData().role_id;
  const reportViewMoreList = useSelector((state) =>
    roleId === ROLES.FARMING_ASSOCIATION
      ? state.reports.productList
      : state.reportsAdmin.adminReportsList
  );

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  const tableHead = [
    { field: "Product Name", ellipsisClass: true },
    {
      field:
        activeTab === 1
          ? "Aggregator name"
          : activeTab === 2
          ? "Farmer name"
          : "Association name",
    },
    { field: "Quality" },
    { field: "Quantity" },
    { field: type === "productSold" ? "Revenue" : "Cost Price" },
  ];

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
      productId: id,
    };

    if (searchText.length) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        filterText: searchText,
      };
    }
    if (dataInfo?.startDate) {
      searchObject = {
        ...searchObject,
        from: moment(dataInfo?.startDate).format("L"),
        to: moment(dataInfo?.endDate).format("L"),
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

    if (dataInfo?.farmers?.length) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        farmers: JSON.stringify(dataInfo.farmers),
      };
    }

    if (roleId === ROLES.SUPER_ADMIN || roleId === ROLES.ADMIN) {
      if (activeTab === 0 || !activeTab) {
        searchObject = {
          ...searchObject,
          isAssociationLevel: true,
        };
      } else if (activeTab === 1) {
        searchObject = {
          ...searchObject,
          isAggregationLevel: true,
        };
      } else {
        searchObject = {
          ...searchObject,
          isFarmerLevel: true,
        };
      }
      dispatch(getAdminReportsListAction(searchObject, type));
      return () => dispatch(getAdminReportsList(null));
    }

    if (activeTab === 2 && roleId === ROLES.FARMING_ASSOCIATION) {
      searchObject = {
        ...searchObject,
        isFarmerLevel: true,
      };
      dispatch(getProductListAction(searchObject, "productAggregated"));
      return () => dispatch(getProductList(null));
    }
  }, [query, searchClick, dataInfo, type, roleId]);

  useEffect(() => {
    const dataSet = reportViewMoreList?.data?.result?.map((item) => {
      return {
        "Product Name": item.product_name,
        Quality:
          qualityOptions && item?.product_quality
            ? _.find(qualityOptions, { value: String(item.product_quality) })
                .label
            : "N/A",
        ...(activeTab === 2 && {
          "Farmer name": `${item.farmer_first_name} ${item.farmer_last_name}`,
        }),
        ...(activeTab === 1 && {
          "Aggregator name": `${item.first_name} ${item.last_name}`,
        }),
        ...(activeTab === 0 && {
          "Association name": `${item.association_name}`,
        }),
        Quantity: `${item.quantity} ${textCapitalize(
          item?.unit_of_measurement
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
      };
    });
    setData(dataSet);
  }, [reportViewMoreList, qualityOptions]);

  return (
    <>
      {!reportViewMoreList?.data?.result?.length ? (
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
          totalCount={reportViewMoreList?.data?.totalCount}
          tableWrapperStyles={{
            ...customCommonStyles.reportsTableHeight,
          }}
        />
      )}
    </>
  );
};

export default ProductListing;
