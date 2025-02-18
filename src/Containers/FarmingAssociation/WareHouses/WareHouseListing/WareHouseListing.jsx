import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import * as moment from "moment";
import { useNavigate } from "react-router-dom";

import AjTypography from "../../../../Components/AjTypography";
import { LIMIT, SKIP } from "../../../../Constant/AppConstant";
import { toggleWareHouseStatusAction } from "../../../../Redux/WareHouses/wareHouseActions";
import { getWareHousesListAction } from "../../../../Redux/WareHouses/wareHouseActions";

import AjCustomTable from "../../../../Components/AjCustomTable/AjCustomTable";
import { WAREHOUSES } from "../../../../Routes/Routes";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";

const WareHouseListing = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  const wareHouseList = useSelector((state) => state.wareHouse.wareHousesList);

  const tableHead = [
    { field: "Warehouse Name", ellipsisClass: true },
    { field: "Storage Capacity", width: "13%" },
    { field: "State", ellipsisClass: true, width: "13%" },
    { field: "City", ellipsisClass: true, width: "13%" },
    { field: "Added On" },
    { field: "Status", cellRenderer: true },
    { field: "", cellRenderer: true },
    { field: "", cellRenderer: true },
  ];

  const options = [
    {
      name: "Active",
      actionClickHandler: (id) =>
        dispatch(toggleWareHouseStatusAction(id, true)),
    },
    {
      name: "Inactive",
      actionClickHandler: (id) =>
        dispatch(toggleWareHouseStatusAction(id, false)),
    },
  ];

  useEffect(() => {
    let searchObject = { limit: query.limit, skip: query.skip };
    dispatch(getWareHousesListAction(searchObject));
  }, [query]);

  useEffect(() => {
    const dataSet = wareHouseList?.result?.map((item) => {
      const refereeData = {
        "Warehouse Name": item.warehouse_name,
        "Storage Capacity": `${item.storage_capacity} mt`,
        State: item.state_name,
        City: item.city,
        "Added On": moment(item.created_at).format("DD/MM/YYYY"),
        id: item.id,
        status: item.is_active ? "Active" : "Inactive",
      };
      return refereeData;
    });
    setData(dataSet);
  }, [wareHouseList]);

  const actionsArray = [
    {
      name: "Edit",
      type: "anchor",
      actionClickHandler: (id) => navigate(`${WAREHOUSES}/edit/${id}`),
    },
    {
      name: "View More",
      type: "anchor",
      actionClickHandler: (id) => {
        navigate(`${WAREHOUSES}/detail/${id}`);
      },
    },
  ];

  return (
    <>
      {wareHouseList?.result?.length === 0 ? (
        <Box sx={{...commonStyles.noContentBox, ...customCommonStyles.tableHeightNoDataFoundNoFilter}}>
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
          query={query}
          setQuery={setQuery}
          totalCount={wareHouseList.totalCount}
          options={options}
          tableWrapperStyles={customCommonStyles.tableHeightNoSearchFilter}
        />
      )}
    </>
  );
};

export default WareHouseListing;
