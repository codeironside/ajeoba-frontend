import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import * as moment from "moment";

import { LIMIT, SKIP } from "../../../../Constant/AppConstant";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";

import AjTypography from "../../../../Components/AjTypography";
import AjCustomTable from "../../../../Components/AjCustomTable/AjCustomTable";
import {
  deleteInputInventoryAction,
  getInputInventoryListAction,
} from "../../../../Redux/InputSupplier/InputInventory/InputInventoryActions";
import AjDialog from "../../../../Components/AjDialog/AjDialog";
import AjConfirmModal from "../../../../Components/AjConfirmModal/AjConfirmModal";
import { styles } from "./InputInventoryListingStyles";
import { useNavigate } from "react-router-dom";
import {
  numberWithCommas,
  textCapitalize,
} from "../../../../Services/commonService/commonService";
import { getUserData } from "../../../../Services/localStorageService";

const InputInventoryListing = ({ searchClick, searchText, wareHouseItem }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = getUserData();

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [inputId, setInputId] = useState(null);

  const inputInventoryList = useSelector(
    (state) => state.inputInventory.inputInventoryList
  );

  const tableHead = [
    { field: "Input Name", ellipsisClass: true },
    { field: "Input Subtype" },
    { field: "Warehouse", ellipsisClass: true },
    { field: "Quantity left" },
    { field: "Unit of measurement", width: "6%" },
    { field: "Cost price", width: "12%" },
    { field: "Selling price", width: "12%" },
    { field: "Expiry date" },
    {
      width: "8%",
      renderColumn: (row) => {
        return (
          <Button onClick={() => navigate(`edit/${row.id}`)}>
            <Typography sx={commonStyles.anchorButtonStyle}>Edit</Typography>
          </Button>
        );
      },
    },
    {
      width: "10%",
      renderColumn: (row) => {
        return (
          <Button
            onClick={() => {
              setInputId(row.id);
              setOpenDialog(true);
            }}
          >
            <Typography
              sx={{
                ...commonStyles.anchorButtonStyle,
                ...commonStyles.colorRed,
              }}
            >
              Delete
            </Typography>
          </Button>
        );
      },
    },
  ];
  useEffect(() => {
    let searchObject = { limit: query.limit, skip: query.skip };
    if (searchText.length) {
      searchObject = {
        limit: LIMIT,
        skip: SKIP,
        filterText: searchText,
      };
    }
    if (wareHouseItem) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        warehouseId: wareHouseItem,
      };
    }
    dispatch(getInputInventoryListAction(searchObject));
  }, [query, searchClick, wareHouseItem]);

  useEffect(() => {
    const dataSet = inputInventoryList?.result?.map((item) => {
      return {
        "Input Name": item.input_name,
        "Input Subtype": item.input_subtype,
        Warehouse: item.warehouse_name,
        "Quantity left": item.available_quantity,
        "Unit of measurement": textCapitalize(item.unit_of_measurement),
        "Cost price": numberWithCommas(item.cost_price, userData?.currency),
        "Selling price": numberWithCommas(
          item?.selling_price,
          userData?.currency
        ),
        id: item.id,
        logisticsAdPlaced: item.logistics_ad_placed,
        "Expiry date": moment(item.expiry_date).format("DD/MM/YYYY"),
      };
    });
    setData(dataSet);
  }, [inputInventoryList]);

  const handleConfirm = () => {
    dispatch(deleteInputInventoryAction(inputId));
  };

  return (
    <>
      {inputInventoryList?.result?.length === 0 ? (
        <Box
          sx={{
            ...commonStyles.noContentBox,
            ...styles.noContentStyles,
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
          totalCount={inputInventoryList?.totalcount}
          tableWrapperStyles={customCommonStyles.tableHeightNoBackgroundTabs}
        />
      )}
      <AjDialog
        open={openDialog}
        closeModal={setOpenDialog}
        styleData={commonStyles.deleteDialogModal}
      >
        <AjConfirmModal
          displayText="Are you sure you want to delete this record from inventory?"
          closeModal={setOpenDialog}
          onConfirm={handleConfirm}
        />
      </AjDialog>
    </>
  );
};

export default InputInventoryListing;
