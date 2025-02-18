import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import AjCustomTable from "../../../../Components/AjCustomTable/AjCustomTable";
import AjTypography from "../../../../Components/AjTypography";
import { commonStyles, customCommonStyles } from "../../../../Style/CommonStyle";
import { styles } from "./MasterManangementItemListingStyles";
import {
  LIMIT,
  SKIP,
  itemTypeListingOptions,
} from "../../../../Constant/AppConstant";
import {
  getItemListAction,
  toggleItemStatusAction,
} from "../../../../Redux/SuperAdmin/MasterManagement/masterManagementActions";
import { ROLES } from "../../../../Constant/RoleConstant";
import { getUserData } from "../../../../Services/localStorageService";
import { MASTER_MANAGEMENT } from "../../../../Routes/Routes";

const MasterManagementItemListing = (props) => {
  const { searchClick, searchText, itemType } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const itemList = useSelector((state) => state.masterManagement.itemList);
  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  const roleId = getUserData().role_id;
  let tableHead = [
    { field: "Item ID" },
    { field: "Item Name" },
    { field: "Item Type" },
    { field: "Status", cellRenderer: true },
  ];
  if (ROLES.ADMIN === roleId || ROLES.SUPER_ADMIN === roleId) {
    tableHead = [...tableHead, { field: "", cellRenderer: true }];
  }
  const options = [
    {
      name: "Active",
      actionClickHandler: (id) => dispatch(toggleItemStatusAction(id, true)),
    },
    {
      name: "Inactive",
      actionClickHandler: (id) => dispatch(toggleItemStatusAction(id, false)),
    },
  ];
  const edit = (id) => {
    navigate(`${MASTER_MANAGEMENT}/edit/item/${id}`);
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
    if (itemType) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        itemType: itemType,
      };
    }
    dispatch(getItemListAction(searchObject));
  }, [query, searchClick]);

  useEffect(() => {
    const dataSet = itemList?.result?.map((item) => {
      const itemData = {
        "Item ID": item.item_id,
        "Item Name": item.name,
        "Item Type": itemTypeListingOptions.map((option) => {
          if (option.value === item.item_type) return option.label;
        }),
        id: item.id,
        status: item.is_active ? "Active" : "Inactive",
      };
      return itemData;
    });
    setData(dataSet);
  }, [itemList]);

  return (
    <>
      {itemList?.result?.length === 0 ? (
        <Box sx={{...commonStyles.noContentBox, ...styles.masterNocontent}}>
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
          totalCount={itemList?.totalCount}
          options={options}
          tableWrapperStyles={customCommonStyles.tableHeightNoBackgroundTabs}
        />
      )}
    </>
  );
};

export default MasterManagementItemListing;
