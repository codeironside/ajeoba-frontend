import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { LIMIT, SKIP } from "../../../../Constant/AppConstant";
import * as _ from "lodash";

import AjCustomTable from "../../../../Components/AjCustomTable/AjCustomTable";
import AjTypography from "../../../../Components/AjTypography";

import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";
import { styles as customTableStyles } from "../../../../Components/AjCustomTable/AjCustomTableStyles";
import { styles as tableActionStyle } from "../../../../Components/TableActions/TableActionsStyles";
import { styles } from "../../MasterManagement/MasterManagementStyles";

const bankCardReqList = [
  {
    bank_code: "50211",
    last_name: "John",
    first_name: "Doe",
    Persona: "Farming Association",
    date_of_request: "2023-01-01",
    status: "Approved",
    reference_referees_id: "3",
  },
  {
    bank_code: "50211",
    last_name: "John",
    first_name: "Doe",
    Persona: "Farming Association",
    date_of_request: "2023-01-01",
    status: "Pending",
    reference_referees_id: "3",
  },
  {
    bank_code: "50211",
    last_name: "John",
    first_name: "Doe",
    Persona: "Farming Association",
    date_of_request: "2023-01-01",
    status: "Processing",
    reference_referees_id: "3",
  },
];

function BankCardRequestList({ searchClick, searchText }) {
  const dispatch = useDispatch();

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  useEffect(() => {
    let searchObject = { limit: query.limit, skip: query.skip };
    if (searchText.length) {
      searchObject = {
        limit: LIMIT,
        skip: SKIP,
        filterText: searchText,
      };
    }
    // dispatch(getBankRequestListActions(searchObject));
  }, [query, searchClick]);

  let tableHead = [
    { field: "Bank Name" },
    { field: "Account Name" },
    { field: "Persona" },
    { field: "Date of Request" },
    {
      field: "Status",
      renderColumn: (row) => {
        return (
          <Button
            sx={{
              ...customCommonStyles.addButtonStyle,
              // ...(row.Status === "Approved" &&
              //   customCommonStyles.addButtonStyle),
              // ...(row.Status === "Pending" &&
              //   customCommonStyles.addButtonStylepending),
            }}
            disabled={true}
          >
            <Typography sx={customTableStyles.colorText}>
              {row.Status}
            </Typography>
          </Button>
        );
      },
    },

    {
      width: "10%",
      renderColumn: (row) => {
        return (
          <Button
            sx={{
              ...commonStyles.anchorButtonStyle,
            }}
            // onClick={() => navigate(`detail/${row.id}`)}
          >
            <Typography sx={styles.viewMoreWidth}>View More</Typography>
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    const dataSet = bankCardReqList?.map((item) => {
      return {
        "Bank Name": item?.bank_code === "50211" ? "Kuda bank" : "",
        "Account Name": `${item?.first_name} ${item?.last_name}`,
        Persona: item?.reference_referees_id ? "Farming Association" : "",
        Status: item?.status,
        "Date of Request": item?.date_of_request,
      };
    });
    setData(dataSet);
  }, [bankCardReqList]);

  return (
    <>
      {bankCardReqList?.length > 0 ? (
        <AjCustomTable
          columnDefs={tableHead}
          rowData={data}
          pagination={true}
          query={query}
          setQuery={setQuery}
          totalCount={bankCardReqList?.length}
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

export default BankCardRequestList;
