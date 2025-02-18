import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AjCustomTable from "../../../../../Components/AjCustomTable/AjCustomTable";
import AjTypography from "../../../../../Components/AjTypography";
import AjDialog from "../../../../../Components/AjDialog/AjDialog";
import AjConfirmModal from "../../../../../Components/AjConfirmModal/AjConfirmModal";
import BatchIdIcon from "../../../../../Assets/Images/BatchIdIcon.svg";
import { LIMIT, SKIP } from "../../../../../Constant/AppConstant";
import {
  getBatchListAction,
  deleteBatchAction,
} from "../../../../../Redux/FarmingAssociation/Inventory/inventoryActions";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../../Style/CommonStyle";
import { styles } from "../../AvailableInventory/AvailableInventoryStyles";
import { styles as customTableStyles } from "../../../../../Components/AjCustomTable/AjCustomTableStyles";
import { INVENTORY, MARKETPLACE } from "../../../../../Routes/Routes";
import { textCapitalize } from "../../../../../Services/commonService/commonService";

const BatchListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [batchDeletionId, setBatchDeletionId] = useState(null);

  const batchList = useSelector((state) => state.inventory.batchList);

  const tableConfig = [
    {
      field: "Batch Id",
      renderColumn: (row) => {
        let hasCertification =
          batchList?.result?.find((item) => item.id === row.id)
            ?.has_certification === true;
        return (
          <Box sx={styles.batchIdBox}>
            <span style={styles.batchColumnStyles}>{row["Batch Id"]}</span>
            {hasCertification && (
              <img src={BatchIdIcon} style={styles.batchIconStyle} />
            )}
          </Box>
        );
      },
    },
    { field: "Batch Type", width: "8%", ellipsisClass: true },
    { field: "Product name", width: "8%", ellipsisClass: true },
    { field: "Product type", ellipsisClass: true },
    { field: "Remaining Quantity", width: "5%" },
    { field: "Initial Quantity", width: "5%" },
    { field: "Unit of Measurement", width: "10%" },
    {
      field: "Status",
      width: "10%",
      renderColumn: (row) => {
        let statusVal = batchList?.result?.find(
          (item) => item.id === row.id
        )?.status;
        return statusVal == "ADDED_FOR_SALE" ? (
          <span style={styles.marginLeft10}>Ad Placed</span>
        ) : statusVal === "SOLD" ? (
          <span style={styles.marginLeft10}>Sold</span>
        ) : (
          <Button
            sx={{
              ...customTableStyles.btnStyle,
              zIndex: "1",
              ...styles.marginLeft10,
            }}
            onClick={() => placeAdHandler(row.id)}
          >
            <Typography sx={customTableStyles.colorText}>Place Ad</Typography>
          </Button>
        );
      },
    },
    {
      width: "11%",
      renderColumn: (row) => {
        return (
          <Button
            sx={{
              ...commonStyles.anchorButtonStyle,
              width: "100%",
              zIndex: "1",
            }}
            onClick={() => viewMoreHandler(row.id)}
          >
            <Typography sx={commonStyles.anchorButtonStyle}>
              View More
            </Typography>
          </Button>
        );
      },
    },
    {
      width: "10%",
      renderColumn: (row) => {
        let obj = batchList?.result?.find((item) => item.id === row.id);
        return obj?.status !== "ADDED_FOR_SALE" ||
          row["Remaining Quantity"] === 0 ? (
          <Button
            sx={{ ...customTableStyles.deleteBtnStyle, zIndex: "1" }}
            onClick={() => {
              setBatchDeletionId(row.id);
              setOpenDialog(true);
            }}
          >
            <Typography>Delete</Typography>
          </Button>
        ) : (
          <Button disabled={true} sx={{ ...customTableStyles.deleteBtnStyle }}>
            <Typography>Delete</Typography>
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    let searchObject = { limit: query.limit, skip: query.skip };
    dispatch(getBatchListAction(searchObject));
  }, [query]);

  useEffect(() => {
    const dataSet = batchList?.result?.map((item) => {
      return {
        "Batch Id": item.batch_id,
        "Batch Type": textCapitalize(item.batch_type),
        "Product name": item.product_name,
        "Product type": textCapitalize(item.product_type),
        "Remaining Quantity": item.available_quantity,
        "Initial Quantity": item.initial_quantity,
        "Unit of Measurement": textCapitalize(item.unit_of_measurement),
        id: item.id,
      };
    });
    setData(dataSet);
  }, [batchList]);

  const handleConfirm = () => {
    dispatch(deleteBatchAction(batchDeletionId));
  };

  const viewMoreHandler = (viewMoreBatchId) => {
    navigate(`${INVENTORY}/batch-detail/${viewMoreBatchId}`);
  };
  const placeAdHandler = (id) => {
    navigate(`${MARKETPLACE}/create-ad-marketplace/${id}`);
  };

  return (
    <Box sx={{ ...customCommonStyles.subContentBox, ...styles.listingMargin }}>
      {batchList?.result?.length === 0 ? (
        <Box
          sx={{
            ...commonStyles.noContentBox,
            ...styles.listingMargin,
            ...styles.batchListingNoDataFound,
          }}
        >
          <AjTypography
            styleData={commonStyles.noDataText}
            displayText="No data found"
          />
        </Box>
      ) : (
        <AjCustomTable
          columnDefs={tableConfig}
          rowData={data}
          pagination={true}
          query={query}
          setQuery={setQuery}
          totalCount={batchList?.totalcount}
          isConfirmModalRequired={true}
          tableWrapperStyles={customCommonStyles.tableHeightNoSearchFilter}
        />
      )}
      <AjDialog
        open={openDialog}
        closeModal={setOpenDialog}
        styleData={commonStyles.deleteDialogModal}
      >
        <AjConfirmModal
          displayText="Are you sure, you want to delete this batch?"
          closeModal={setOpenDialog}
          onConfirm={handleConfirm}
        />
      </AjDialog>
    </Box>
  );
};

export default BatchListing;
