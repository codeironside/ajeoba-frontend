import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import AjTypography from "../../../../Components/AjTypography";
import { LIMIT, SKIP } from "../../../../Constant/AppConstant";
import {
  getFinanceRequestsListAction,
  toggleAdditionalDetailsRequestStatusAction,
} from "../../../../Redux/SuperAdmin/FinanceRequests/adminFinanceRequestsActions";
import AjCustomTable from "../../../../Components/AjCustomTable/AjCustomTable";
import {
  getFinanceRequestAdditionalDetailStatus,
  textCapitalize,
} from "../../../../Services/commonService/commonService";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";

const FinanceRequestsListing = (props) => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  const financeRequestsList = useSelector(
    (state) => state.adminFinanceRequestsReducer.financeRequestsList
  );

  const tableHead = [
    { field: "Association Name", ellipsisClass: true },
    { field: "Finance Company Name", ellipsisClass: true },
    { field: "Product/Input Name", ellipsisClass: true },
    { field: "Storage Type", ellipsisClass: true },
    { field: "status", cellRenderer: true },
  ];

  const options = [
    {
      name: "Accept",
      actionClickHandler: (id) =>
        dispatch(
          toggleAdditionalDetailsRequestStatusAction(id, { status: "GRANTED" })
        ),
    },
    {
      name: "Reject",
      actionClickHandler: (id) =>
        dispatch(
          toggleAdditionalDetailsRequestStatusAction(id, {
            status: "DENIED",
          })
        ),
    },
    {
      name: "Revoke",
      actionClickHandler: (id) =>
        dispatch(
          toggleAdditionalDetailsRequestStatusAction(id, {
            status: "REVOKED",
          })
        ),
    },
  ];

  useEffect(() => {
    let searchObject = { limit: query.limit, skip: query.skip };
    dispatch(getFinanceRequestsListAction(searchObject));
  }, [query]);

  useEffect(() => {
    const dataSet = financeRequestsList?.results?.map((item) => {
      return {
        "Association Name": item.association_name,
        "Finance Company Name": item.finance_company_name,
        "Product/Input Name":
          item.product_type !== null ? item.product_name : item.input_name,
        "Storage Type":
          item.product_type !== null ? textCapitalize(item.product_type) : "-",
        id: item.id,
        status: getFinanceRequestAdditionalDetailStatus(
          item.requested_additional_details
        ),
      };
    });

    setData(dataSet);
  }, [financeRequestsList]);

  return (
    <>
      {financeRequestsList?.results?.length === 0 ? (
        <Box
          sx={{
            ...commonStyles.noContentBox,
            ...customCommonStyles.tableHeightNoDataFoundNoFilter,
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
          totalCount={financeRequestsList.totalCount}
          options={options}
          tableWrapperStyles={customCommonStyles.tableHeightNoSearchFilter}
        />
      )}
    </>
  );
};

export default FinanceRequestsListing;
