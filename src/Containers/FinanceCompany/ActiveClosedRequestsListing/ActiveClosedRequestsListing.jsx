import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";
import AjCustomTable from "../../../Components/AjCustomTable/AjCustomTable";
import AjTypography from "../../../Components/AjTypography";

import { textCapitalize } from "../../../Services/commonService/commonService";
import { commonStyles } from "../../../Style/CommonStyle";
import { FINANCE_REQUESTS } from "../../../Routes/Routes";

const ActiveClosedRequestsListing = (props) => {
  const { query, setQuery, activeTab } = props;
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [financeRequestsList, setFinanceRequestsList] = useState([]);
  const [totalCount, setTotalCount] = useState();

  const activeRequestsList = useSelector(
    (state) => state.financeCompanyRequests.activeRequestsList
  );

  const closedRequestsList = useSelector(
    (state) => state.financeCompanyRequests.closedRequestsList
  );

  useEffect(() => {
    if (activeTab !== 1) {
      setFinanceRequestsList(activeRequestsList);
      setTotalCount(activeRequestsList?.totalCount);
    } else {
      setFinanceRequestsList(closedRequestsList);
      setTotalCount(closedRequestsList?.totalCount);
    }
  }, [activeTab, activeRequestsList, closedRequestsList]);

  useEffect(() => {
    if (financeRequestsList) {
      const dataSet = financeRequestsList?.result?.map((item) => {
        return {
          "Association Name": item.association_name,
          "Product/Input Name": item.input_name || item.product_name,
          Type: item.input_id ? "Input" : "Product",
          "Storage Type": item.product_type
            ? textCapitalize(item.product_type)
            : "-",
          Subject: item.subject,
          id: item.id,
        };
      });
      setData(dataSet);
    }
  }, [financeRequestsList]);

  let tableHead = [
    { field: "Association Name", ellipsisClass: true },
    { field: "Product/Input Name", width: "15%" },
    { field: "Type" },
    { field: "Storage Type" },
    { field: "Subject", ellipsisClass: true, width: "23%" },
    { field: "", cellRenderer: true },
  ];

  let actionsArray = [
    {
      name: "View More",
      type: "anchor",
      actionClickHandler: (id) => {
        navigate(`${FINANCE_REQUESTS}/detail/${id}`);
      },
    },
  ];

  return (
    <>
      {financeRequestsList?.totalCount === 0 ? (
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
          totalCount={totalCount}
          statusOptionsRequired={false}
          ellipsisMaxWidth={commonStyles.ellipsisMaxWidth}
          actions={actionsArray}
        />
      )}
    </>
  );
};

export default ActiveClosedRequestsListing;
