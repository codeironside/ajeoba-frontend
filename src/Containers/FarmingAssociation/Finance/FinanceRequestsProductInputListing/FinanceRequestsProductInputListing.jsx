import React from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import AjTypography from "../../../../Components/AjTypography";
import AjCustomTable from "../../../../Components/AjCustomTable/AjCustomTable";
import { textCapitalize } from "../../../../Services/commonService/commonService";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";
import { styles } from "./FinanceRequestsProductInputListingStyles";

const FinanceRequestsProductInputListing = (props) => {
  const { dataToList, query, setQuery, totalCount, activeTab } = props;
  const navigate = useNavigate();

  let data = [];
  let tableHead = [];

  if (activeTab === 0) {
    tableHead = [
      { field: "Product name", width: "20%", ellipsisClass: true },
      { field: "Storage Type", width: "13%" },
      { field: "Subject", width: "26%", ellipsisClass: true },
      { field: "Request Sent to", width: "26%", ellipsisClass: true },
      { field: "", cellRenderer: true },
    ];

    data = dataToList?.map((item) => {
      return {
        "Product name": item.product_name,
        id: item.id,
        "Storage Type": textCapitalize(item.product_type),
        Subject: item.subject,
        "Request Sent to": item.finance_company_name,
      };
    });
  }

  if (activeTab === 1) {
    tableHead = [
      { field: "Input name", width: "25%", ellipsisClass: true },
      { field: "Subject", width: "30%", ellipsisClass: true },
      { field: "Request Sent to", width: "30%", ellipsisClass: true },
      { field: "", cellRenderer: true },
    ];

    data = dataToList?.map((item) => {
      return {
        "Input name": item.input_name,
        id: item.id,
        Subject: item.subject,
        "Request Sent to": item.finance_company_name,
      };
    });
  }

  let actionsArray = [
    {
      name: "View More",
      type: "anchor",
      actionClickHandler: (id) =>
        navigate(`detail/product/${id}?activeTab=${activeTab}`),
    },
  ];

  return (
    <>
      {totalCount === 0 ? (
        <Box
          sx={{
            ...commonStyles.noContentBox,
            ...styles.noDataBox,
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
          actions={actionsArray}
          pagination={true}
          setQuery={setQuery}
          query={query}
          totalCount={totalCount}
          ellipsisMaxWidth={commonStyles.ellipsisMaxWidth}
          tableWrapperStyles={{
            ...customCommonStyles.tableHeightNoSearchFilter,
            ...styles.listingTableWrapperHeight,
          }}
        />
      )}
    </>
  );
};

export default FinanceRequestsProductInputListing;
