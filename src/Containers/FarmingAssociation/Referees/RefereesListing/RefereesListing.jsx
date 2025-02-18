import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import * as moment from "moment";

import AjTypography from "../../../../Components/AjTypography";
import { LIMIT, SKIP } from "../../../../Constant/AppConstant";
import {
  getRefereeListAction,
  toggleRefereeStatusAction,
} from "../../../../Redux/FarmingAssociation/Refrees/refereesActions";
import { commonStyles } from "../../../../Style/CommonStyle";

import AjCustomTable from "../../../../Components/AjCustomTable/AjCustomTable";

const RefereesListing = (props) => {
  const { dateData, searchClick, searchText } = props;
  const dispatch = useDispatch();

  const refereeList = useSelector((state) => state.referee.refereeList);
  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  const tableHead = [
    { field: "First name" },
    { field: "Last name" },
    { field: "Gender" },
    { field: "Age" },
    { field: "Phone Number" },
    { field: "Added On" },
    { field: "Status", cellRenderer: true },
  ];

  const options = [
    {
      name: "Active",
      actionClickHandler: (id) => dispatch(toggleRefereeStatusAction(id, true)),
    },
    {
      name: "Inactive",
      actionClickHandler: (id) =>
        dispatch(toggleRefereeStatusAction(id, false)),
    },
  ];

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
      type: "REFEREE",
    };
    if (searchText.length) {
      searchObject = {
        limit: LIMIT,
        skip: SKIP,
        filterText: searchText,
      };
    }
    if (dateData.startDate) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        from: moment(dateData.startDate).format("L"),
        to: moment(dateData.endDate).format("L"),
      };
    }
    dispatch(getRefereeListAction(searchObject));
  }, [query, dateData, searchClick]);

  useEffect(() => {
    const dataSet = refereeList?.result?.map((item) => {
      const refereeData = {
        "First name": item.first_name,
        "Last name": item.last_name,
        Gender: item.gender.toLowerCase(),
        Age:
          moment().format("YYYY") - moment(item.date_of_birth).format("YYYY"),
        "Phone Number": item.mobile_no,
        "Added On": moment(item.created_at).format("DD/MM/YYYY"),
        id: item.id,
        status: item.is_active ? "Active" : "Inactive",
      };
      return refereeData;
    });
    setData(dataSet);
  }, [refereeList]);

  return (
    <>
      {refereeList?.result?.length === 0 ? (
        <Box sx={commonStyles.noContentBox}>
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
          totalCount={refereeList.totalCount}
          options={options}
        />
      )}
    </>
  );
};

export default RefereesListing;
