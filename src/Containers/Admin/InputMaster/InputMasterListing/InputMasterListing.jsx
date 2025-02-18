import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import AjCustomTable from "../../../../Components/AjCustomTable/AjCustomTable";
import AjTypography from "../../../../Components/AjTypography";
import { commonStyles, customCommonStyles } from "../../../../Style/CommonStyle";
import {
  getInputListAction,
  toggleInputStatusAction,
} from "../../../../Redux/SuperAdmin/InputMaster/inputMasterActions";
import { isEnabledOption, LIMIT, SKIP } from "../../../../Constant/AppConstant";
import { ROLES } from "../../../../Constant/RoleConstant";
import { getUserData } from "../../../../Services/localStorageService";
import { INPUT_MASTER } from "../../../../Routes/Routes";
import * as _ from "lodash";
import { textCapitalize } from "../../../../Services/commonService/commonService";

const InputMasterListing = (props) => {
  const { searchClick, searchText } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roleId = getUserData().role_id;

  const inputs = useSelector((state) => state.inputMaster.inputList);

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  let tableHead = [
    { field: "Input ID", width: "13%" },
    { field: "Input Name", ellipsisClass: true, width: "18%" },
    { field: "Unit of Measurement", width: "13%" },
    { field: "Minimum quantity", width: "13%" },
    { field: "Commission %", width: "13%" },
    { field: "Is commission enabled", width: "12%" },
    { field: "Status", width: "12%", cellRenderer: true },
  ];
  if (ROLES.ADMIN === roleId || ROLES.SUPER_ADMIN === roleId) {
    tableHead = [...tableHead, { field: "", cellRenderer: true }];
  }
  const options = [
    {
      name: "Active",
      actionClickHandler: (id) => dispatch(toggleInputStatusAction(id, true)),
    },
    {
      name: "Inactive",
      actionClickHandler: (id) => dispatch(toggleInputStatusAction(id, false)),
    },
  ];
  const edit = (id) => {
    navigate(`${INPUT_MASTER}/edit/input/${id}`);
  };
  let actionsArray = [];
  if (ROLES.ADMIN === roleId || ROLES.SUPER_ADMIN === roleId) {
    actionsArray = [
      {
        name: "Edit",
        type: "anchor",
        actionClickHandler: (id) => edit(id),
      },
    ];
  }

  useEffect(() => {
    let searchObject = { limit: query.limit, skip: query.skip };
    if (searchText.length) {
      searchObject = {
        limit: LIMIT,
        skip: SKIP,
        filterText: searchText,
      };
    }
    dispatch(getInputListAction(searchObject));
  }, [query, searchClick]);

  useEffect(() => {
    const dataSet = inputs?.result?.map((item) => {
      let isEnabled = _.find(isEnabledOption, {
        value: item.is_commission_active,
      })?.label;
      return {
        "Input ID": item.input_id,
        "Input Name": item.name,
        "Unit of Measurement": textCapitalize(item.unit_of_measurement),
        "Commission %": item.commission,
        "Minimum quantity": item.min_quantity_for_commission,
        "Is commission enabled": isEnabled,
        id: item.id,
        status: item.is_active ? "Active" : "Inactive",
      };
    });
    setData(dataSet);
  }, [inputs]);

  return (
    <>
      {inputs?.result?.length === 0 ? (
        <Box sx={{...commonStyles.noContentBox, ...customCommonStyles.tableHeightNoDataFoundSearchFilter}}>
          <AjTypography
            styleData={commonStyles.noDataText}
            displayText="No data found"
          />
        </Box>
      ) : (
        <AjCustomTable
          actions={actionsArray}
          columnDefs={tableHead}
          rowData={data}
          pagination={true}
          query={query}
          setQuery={setQuery}
          totalCount={inputs?.totalCount}
          options={options}
        />
      )}
    </>
  );
};

export default InputMasterListing;
