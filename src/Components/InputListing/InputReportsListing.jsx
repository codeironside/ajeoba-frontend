import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import * as moment from "moment";
import AjCustomTable from "../AjCustomTable/AjCustomTable";
import AjTypography from "../AjTypography";
import { REPORTS } from "../../Routes/Routes";
import { LIMIT, SKIP } from "../../Constant/AppConstant";
import {
  getInputList,
  getInputPurchasedAssociationReportListAction,
} from "../../Redux/FarmingAssociation/Reports/reportsAction";
import {
  textCapitalize,
  numberWithCommas,
} from "../../Services/commonService/commonService";
import { commonStyles, customCommonStyles } from "../../Style/CommonStyle";
import { ROLES } from "../../Constant/RoleConstant";
import { getUserData } from "../../Services/localStorageService";
import {
  getAdminReportsInputList,
  getAdminReportsInputListAction,
} from "../../Redux/SuperAdmin/ReportsAdmin/reportsAdminAction";

//used in farming association input purchased listing and can be used for admin reports
const InputReportsListing = ({ searchClick, searchText, type, dataInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roleId = getUserData().role_id;

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  const inputList = useSelector((state) =>
    roleId === ROLES.FARMING_ASSOCIATION
      ? state.reports.inputList
      : state.reportsAdmin.adminReportsInputList
  );

  let tableHead = [
    { field: "Input Name", ellipsisClass: true },
    {
      field: "Quantity",
    },
    {
      field: type === "adminInputSold" ? "Revenue" : "Cost Price",
    },
    { field: "", cellRenderer: true },
  ];

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
    };
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
    if (dataInfo?.inputs?.length) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        inputs: JSON.stringify(dataInfo?.inputs),
      };
    }
    if (roleId === ROLES.FARMING_ASSOCIATION) {
      searchObject = {
        ...searchObject,
        isSupplierLevel: false,
      };
      dispatch(getInputPurchasedAssociationReportListAction(searchObject));
      return () => dispatch(getInputList(null));
    }

    if (roleId === ROLES.SUPER_ADMIN || roleId === ROLES.ADMIN) {
      dispatch(getAdminReportsInputListAction(searchObject, type));
      return () => dispatch(getAdminReportsInputList(null));
    }
  }, [query, searchClick, dataInfo, roleId]);

  useEffect(() => {
    const dataSet = inputList?.data?.result?.map((item) => {
      return {
        "Input Name": item?.input_name,
        Quantity: `${item.quantity} ${textCapitalize(
          item.unit_of_measurement
        )}`,
        ...(type === "adminInputSold"
          ? {
              Revenue: `${numberWithCommas(
                item.revenue,
                item.seller_currency
              )}`,
            }
          : {
              "Cost Price": `${numberWithCommas(
                item.cost_price,
                item.seller_currency || item?.buyer_currency
              )}`,
            }),
        id: item?.input_id,
      };
    });
    setData(dataSet);
  }, [inputList]);

  let actionsArray = [];
  if (type !== "isAdmin") {
    actionsArray = [
      ...actionsArray,
      {
        name: "View More",
        type: "anchor",
        actionClickHandler: (id) => {
          navigate(
            `${REPORTS}/${
              type === "inputPurchased" ? "purchased" : "sold"
            }/info/${id}`
          );
        },
      },
    ];
  }
  return (
    <>
      {inputList?.data?.result?.length === 0 ? (
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
          actions={actionsArray}
          rowData={data}
          pagination={true}
          query={query}
          setQuery={setQuery}
          totalCount={inputList?.data?.totalCount}
          tableWrapperStyles={{
            ...customCommonStyles.reportsTableHeight,
          }}
        />
      )}
    </>
  );
};

export default InputReportsListing;
