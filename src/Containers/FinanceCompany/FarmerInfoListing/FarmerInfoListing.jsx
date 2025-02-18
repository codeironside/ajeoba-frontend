import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import * as moment from "moment";

import AjCustomTable from "../../../Components/AjCustomTable/AjCustomTable";
import AjTypography from "../../../Components/AjTypography";

import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";
import { textCapitalize } from "../../../Services/commonService/commonService";

const FarmerInfoListing = (props) => {
  const { query, setQuery, activeTab } = props;
  const navigate = useNavigate();
  const { id } = useParams();
  

  const [data, setData] = useState();
  const farmerInfoList = useSelector(
    (state) => state.financeCompanyRequests.farmerInfoList
  );

  useEffect(() => {
    if (farmerInfoList) {
      const dataSet = farmerInfoList?.result?.map((item) => {
        return {
          "First Name": item.first_name,
          "Last Name": item.last_name,
          Gender: textCapitalize(item.gender),
          Age:
            moment().format("YYYY") - moment(item.date_of_birth).format("YYYY"),
          "Phone Number": item.mobile_no,
          "Added On": moment(item.created_at).format("DD/MM/YYYY"),
          id: item.id,
        };
      });
      setData(dataSet);
    }
  }, [farmerInfoList]);

  let tableHead = [
    { field: "First Name" },
    { field: "Last Name" },
    { field: "Gender" },
    { field: "Age" },
    { field: "Phone Number" },
    { field: "Added On" },
    { field: "", cellRenderer: true },
  ];

  let actionsArray = [
    {
      name: "View More",
      type: "anchor",
      actionClickHandler: (farmerId) => {
        navigate(
          `/finance-requests/additional-detail/${id}/farmer-detail/${farmerId}/?activeTab=${activeTab}`
        );
      },
    },
  ];
  return (
    <>
      {farmerInfoList?.totalCount === 0 ? (
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
          totalCount={farmerInfoList?.totalCount}
          statusOptionsRequired={false}
          ellipsisMaxWidth={commonStyles.ellipsisMaxWidth}
          actions={actionsArray}
          tableWrapperStyles={customCommonStyles.financeFarmerListing}
        />
      )}
    </>
  );
};

export default FarmerInfoListing;
