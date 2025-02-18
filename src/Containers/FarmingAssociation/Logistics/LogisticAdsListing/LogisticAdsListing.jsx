import { Box, Button, Typography } from "@mui/material";
import * as moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AjTypography from "../../../../Components/AjTypography";
import { LIMIT, SKIP } from "../../../../Constant/AppConstant";
import { ROLES } from "../../../../Constant/RoleConstant";

import AjConfirmModal from "../../../../Components/AjConfirmModal/AjConfirmModal";
import AjCustomTable from "../../../../Components/AjCustomTable/AjCustomTable";
import AjDialog from "../../../../Components/AjDialog/AjDialog";
import { getUserData } from "../../../../Services/localStorageService";
import {
  editLogisticAdStatusAction,
  getLogisticAdsListAction,
} from "../../../../Redux/FarmingAssociation/LogisticAds/logisticAdsActions";
import {
  numberWithCommas,
  textCapitalize,
} from "../../../../Services/commonService/commonService";
import { commonStyles } from "../../../../Style/CommonStyle";
import { styles } from "../LogisticsStyles";

const LogisticAdsListing = (props) => {
  const { dataInfo, searchClick, searchText } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = getUserData();

  const logisticAdsList = useSelector(
    (state) => state.logisticAds.logisticAdsList
  );

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [adStatusData, setAdStatusData] = useState({});

  const tableHead = [
    { field: "Order Id", ellipsisClass: true, width: "10%" },
    userData.role_id === ROLES.INPUT_SUPPLIER
      ? { field: "Input Name", ellipsisClass: true, width: "11%" }
      : userData.role_id === ROLES.FARMING_ASSOCIATION ? 
      { field: "Name", ellipsisClass: true, width: "11%" } :
      { field: "Product Name", ellipsisClass: true, width: "11%" },
    { field: "Ad sent to", ellipsisClass: true, width: "13%" },
    { field: "Price" },
    { field: "Quantity" },
    {
      field: "Status",
      renderColumn: (row) => {
        let statusVal = logisticAdsList?.result?.find(
          (item) => item.id === row.id
        )?.ad_status;
        if (statusVal === "ACTIVE") {
          return (
            <AjTypography
              styleData={commonStyles.subHeading}
              displayText="Ad Placed"
            />
          );
        } else if (statusVal === "INACTIVE") {
          return (
            <AjTypography
              styleData={commonStyles.subHeading}
              displayText="Ad not Placed"
            />
          );
        } else {
          return (
            <AjTypography
              styleData={commonStyles.subHeading}
              displayText="Archived"
            />
          );
        }
      },
    },
    { field: "Added On" },
    {
      renderColumn: (row) => {
        return (
          <Button
            onClick={() => {
              viewMore(row.id);
            }}
            sx={commonStyles.anchorButtonStyle}
          >
            <Typography>View More</Typography>
          </Button>
        );
      },
    },
    {
      renderColumn: (row) => {
        let logisticAdDetails = logisticAdsList?.result?.find(
          (item) => item.id === row.id
        );
        if (logisticAdDetails?.logistics_company_id === null) {
          if (logisticAdDetails?.ad_status === "ACTIVE") {
            return (
              <>
                <Button
                  onClick={() => {
                    setOpenDialog(true);
                    setAdStatusData({
                      id: row.id,
                      status: "INACTIVE",
                    });
                  }}
                  sx={{
                    ...commonStyles.anchorButtonStyle,
                    ...styles.adNotPlacedStyle,
                  }}
                >
                  <Typography>Remove Ad</Typography>
                </Button>
              </>
            );
          } else if (logisticAdDetails?.ad_status === "INACTIVE") {
            return (
              <Button
                onClick={() => {
                  setOpenDialog(true);
                  setAdStatusData({
                    id: row.id,
                    status: "ACTIVE",
                  });
                }}
                sx={commonStyles.anchorButtonStyle}
              >
                <Typography>Place Ad</Typography>
              </Button>
            );
          }
        }
      },
    },
  ];

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
    };
    if (dataInfo.startDate) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        from: moment(dataInfo.startDate).format("L"),
        to: moment(dataInfo.endDate).format("L"),
      };
    }
    if (dataInfo?.products?.length > 0) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        products: JSON.stringify(dataInfo?.products),
      };
    }
    if (dataInfo?.inputs?.length > 0) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        inputs: JSON.stringify(dataInfo?.inputs),
      };
    }
    if (searchText?.length) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        orderId: searchText,
      };
    }
    if (dataInfo?.status) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        status: dataInfo.status,
      };
    }
    dispatch(getLogisticAdsListAction(searchObject));
  }, [query, dataInfo, searchClick]);

  useEffect(() => {
    const dataSet = logisticAdsList?.result?.map((item) => {
      return {
        "Order Id": item?.order_id,
        ...(userData.role_id === ROLES.INPUT_SUPPLIER
          ? { "Input Name": item?.input_name }
          : userData.role_id === ROLES.FARMING_ASSOCIATION ? 
            
          { 
            "Name": item?.product_name? 
              item?.product_name 
              : item?.input_name 
          } : 
            { "Product Name": item?.product_name }),
        "Ad sent to":
          item.logistics_company_id === null
            ? "Open Market"
            : item?.logistics_company_name,
        Price: `${numberWithCommas(item?.price, item?.currency)}`,
        Quantity: `${item?.quantity} ${textCapitalize(
          item?.unit_of_measurement
        )}`,
        "Added On": moment(item?.added_on).format("DD/MM/YYYY"),
        id: item?.id,
      };
    });
    setData(dataSet);
  }, [logisticAdsList]);

  const viewMore = (adId) => {
    navigate(`detail/logistic-ad/${adId}`);
  };

  const handleConfirm = () => {
    let initData = {
      limit: query.limit,
      skip: query.skip,
    };
    dispatch(
      editLogisticAdStatusAction(adStatusData.id, adStatusData.status, initData)
    );
  };

  return (
    <>
      {logisticAdsList?.result?.length === 0 ? (
        <Box
          sx={{
            ...commonStyles.noContentBox,
            ...styles.tableHeightNoDataFoundSearchFilterLogisticAds,
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
          totalCount={logisticAdsList?.totalCount}
          isConfirmModalRequired={true}
          tableWrapperStyles={styles.logisticAdTableHeightPagination}
        />
      )}
      <AjDialog
        open={openDialog}
        closeModal={setOpenDialog}
        styleData={styles.dialogStyling}
      >
        <AjConfirmModal
          displayText="Are you sure, you want to change the status?"
          closeModal={setOpenDialog}
          onConfirm={handleConfirm}
        />
      </AjDialog>
    </>
  );
};

export default LogisticAdsListing;
