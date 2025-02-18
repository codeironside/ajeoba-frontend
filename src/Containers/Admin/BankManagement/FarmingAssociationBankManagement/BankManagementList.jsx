import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { LIMIT, SKIP } from "../../../../Constant/AppConstant";
import * as _ from "lodash";

import AjCustomTable from "../../../../Components/AjCustomTable/AjCustomTable";
import AjTypography from "../../../../Components/AjTypography";

import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";
import { getBankRequestListActions } from "../../../../Redux/SuperAdmin/UserManagement/FarmingAssociation/farmingAssociationActions";

function BankManagementList({ searchClick, searchText }) {
  const dispatch = useDispatch();

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);
  const bankReqList = useSelector((state) => state.farmingAssociation.bankReq);

  useEffect(() => {
    let searchObject = { limit: query.limit, skip: query.skip };
    if (searchText.length) {
      searchObject = {
        limit: LIMIT,
        skip: SKIP,
        filterText: searchText,
      };
    }
    dispatch(getBankRequestListActions(searchObject));
  }, [query, searchClick]);

  let tableHead = [
    { field: "Bank Name" },
    { field: "Account Name" },
    { field: "Persona" },
  ];

  useEffect(() => {
    const dataSet = bankReqList?.result?.map((item) => {
      return {
        "Bank Name": item[0]?.bank_code === "50211" ? "Kuda bank" : "",
        "Account Name": `${item[0]?.first_name} ${item[0]?.last_name}`,
        Persona: item[0]?.reference_referees_id ? "Farming Association" : "",
      };
    });
    setData(dataSet);
  }, [bankReqList]);

  return (
    <>
      {bankReqList?.totalCount > 0 ? (
        <AjCustomTable
          columnDefs={tableHead}
          rowData={data}
          pagination={true}
          query={query}
          setQuery={setQuery}
          totalCount={bankReqList?.totalCount}
          statusOptionsRequired={false}
          tableWrapperStyles={customCommonStyles.tableCreateButtonHeight}
          ellipsisMaxWidth={commonStyles.ellipsisMaxWidth}
        />
      ) : (
        <Box
          sx={{
            ...commonStyles.noContentBox,
            ...customCommonStyles.noDataPagination,
          }}
        >
          <AjTypography
            styleData={commonStyles.noDataText}
            displayText="No data found"
          />
        </Box>
      )}
    </>
  );
}

export default BankManagementList;
