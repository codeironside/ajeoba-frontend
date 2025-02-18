import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import * as moment from "moment";
import AjCustomTable from "../AjCustomTable/AjCustomTable";
import { LIMIT, SKIP } from "../../Constant/AppConstant";
import { getUserData } from "../../Services/localStorageService";
import { ROLES } from "../../Constant/RoleConstant";
import { getBooleanStatus } from "../../Services/commonService/commonService";
import {
  getTruckListAction,
  toggleTruckStatusAction,
} from "../../Redux/Logistics/logisticsActions";
import { commonStyles } from "../../Style/CommonStyle";
import AjTypography from "../AjTypography";
import { styles } from "./TruckListingStyles";
import { ADMIN_LOGISTICS, ADMIN_USER_MANAGEMENT } from "../../Routes/Routes";

function TruckListing(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  const { onClick, searchByTruckInfo } = props;
  const [datas, setDatas] = useState(null);
  const [queries, setQueries] = useState({ limit: LIMIT, skip: SKIP });

  const truckList = useSelector((state) => state.logistics.truckList);

  const roleId = getUserData().role_id;

  let tableHeader = [
    { field: "Truck model", width: "14%", ellipsisClass: true },
    { field: "Type of truck", width: "14%", ellipsisClass: true },
    { field: "Colour of truck", width: "13%" },
    { field: "Registration number", width: "15%", ellipsisClass: true },
    { field: "Added on", width: "13%" },
    { field: "Status", width: "9%", cellRenderer: true },
    { field: "", width: "12%", cellRenderer: true },
  ];

  if (ROLES.SUPER_ADMIN === roleId) {
    tableHeader = [...tableHeader, { field: "", cellRenderer: true }];
  }

  let actionsArray = [
    {
      name: "View More",
      type: "anchor",
      actionClickHandler: (truckId) => {
        navigate(
          roleId === ROLES.SUPER_ADMIN || roleId === ROLES.ADMIN
            ? `${ADMIN_USER_MANAGEMENT}/${ADMIN_LOGISTICS}/${id}/truck/detail/${truckId}`
            : `details/${truckId}`
        );
      },
    },
  ];

  if (ROLES.SUPER_ADMIN === roleId) {
    actionsArray = [
      {
        name: "Edit",
        type: "anchor",
        actionClickHandler: (truckId) =>
          navigate(
            `${ADMIN_USER_MANAGEMENT}/${ADMIN_LOGISTICS}/${id}/truck/edit/${truckId}`
          ),
      },
      ...actionsArray,
    ];
  }

  const options = [
    {
      name: "Active",
      actionClickHandler: (truckId) =>
        dispatch(toggleTruckStatusAction(truckId, true)),
    },
    {
      name: "Inactive",
      actionClickHandler: (truckId) =>
        dispatch(toggleTruckStatusAction(truckId, false)),
    },
  ];

  useEffect(() => {
    let searchObject = { limit: queries.limit, skip: queries.skip };
    if (searchByTruckInfo?.length) {
      searchObject = {
        limit: LIMIT,
        skip: SKIP,
        filterText: searchByTruckInfo,
      };
    }
    dispatch(getTruckListAction(searchObject));
  }, [queries, onClick]);

  useEffect(() => {
    const dataSet = truckList?.result?.map((item) => {
      return {
        "Truck model": item.model,
        "Type of truck": item.type_of_truck,
        "Colour of truck": item.color,
        id: item.id,
        "Registration number": item.registered_plate_number,
        "Added on": moment(item.added_on).format("DD/MM/YYYY"),
        status: getBooleanStatus(item.truck_status),
      };
    });
    setDatas(dataSet);
  }, [truckList]);
  return (
    <>
      {truckList?.result?.length === 0 ? (
        <Box sx={commonStyles.noContentBox}>
          <AjTypography
            styleData={commonStyles.noDataText}
            displayText="No data found"
          />
        </Box>
      ) : (
        <AjCustomTable
          actions={actionsArray}
          columnDefs={tableHeader}
          rowData={datas}
          pagination={true}
          query={queries}
          setQuery={setQueries}
          totalCount={truckList?.totalCount}
          options={options}
          isConfirmModalRequired={true}
          modalConfirmationMessage="Are you sure you want to change the status of the truck?"
          tableWrapperStyles={
            roleId === ROLES.SUPER_ADMIN || roleId === ROLES.ADMIN
              ? styles.customTableWrapperStyle
              : styles.tableWrapper
          }
        />
      )}
    </>
  );
}

export default TruckListing;
