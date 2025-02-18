import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";

import AjCustomTable from "../../../Components/AjCustomTable/AjCustomTable";
import AjTypography from "../../../Components/AjTypography";
import {
  numberWithCommas,
  textCapitalize,
} from "../../../Services/commonService/commonService";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";

const AssociationSaleListing = (props) => {
  const { query, setQuery } = props;
  const [data, setData] = useState();
  const associationSaleList = useSelector(
    (state) => state.financeCompanyRequests.associationSaleList
  );

  useEffect(() => {
    if (associationSaleList) {
      const dataSet = associationSaleList?.result?.map((item) => {
        return {
          "Product Name": item.product_name,
          "Quantity Sold": `${item.quantity} ${textCapitalize(
            item.unit_of_measurement
          )}`,
          "Revenue earned": numberWithCommas(
            item.revenue,
            item.seller_currency
          ),
          id: item.id,
        };
      });
      setData(dataSet);
    }
  }, [associationSaleList]);

  let tableHead = [
    { field: "Product Name" },
    { field: "Quantity Sold" },
    { field: "Revenue earned" },
  ];

  return (
    <>
      {associationSaleList?.totalCount === 0 ? (
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
          totalCount={associationSaleList?.totalCount}
          statusOptionsRequired={false}
          ellipsisMaxWidth={commonStyles.ellipsisMaxWidth}
          tableWrapperStyles={customCommonStyles.financeFarmerListing}
        />
      )}
    </>
  );
};

export default AssociationSaleListing;
