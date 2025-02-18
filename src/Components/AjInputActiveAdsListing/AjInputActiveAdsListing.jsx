import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Typography } from "@mui/material";

import AjCustomTable from "../AjCustomTable/AjCustomTable";
import AjDialog from "../AjDialog/AjDialog";
import AjBuyProductModal from "../AjBuyProductModal/AjBuyProductModal";
import AjTypography from "../AjTypography";

import {
  formatDate,
  numberWithCommas,
  textCapitalize,
} from "../../Services/commonService/commonService";
import * as _ from "lodash";
import { getInputActiveAdsAction } from "../../Redux/FarmingAssociation/Input/inputActions";
import { LIMIT, SKIP } from "../../Constant/AppConstant";

import { commonStyles } from "../../Style/CommonStyle";
import { styles as customTableStyles } from "../../Components/AjCustomTable/AjCustomTableStyles";
import { styles as inventoryStyles } from "../../Containers/FarmingAssociation/Inventory/AvailableInventory/AvailableInventoryStyles";
import { getUserData } from "../../Services/localStorageService";
import { AjRating } from "../AjRating";

const AjInputActiveAdsListing = (props) => {
  const { query, setQuery, searchClick, searchText, dataInfo } = props;
  const userData = getUserData();
  const [data, setData] = useState();
  const [inputData, setInputData] = useState();
  const [openBuyModal, setOpenBuyModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputActiveAdsList = useSelector(
    (state) => state.input.inputActiveAdsList
  );

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
    };
    if (searchText?.length > 0) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        filterText: searchText,
      };
    }
    if (dataInfo?.rating) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        rating: dataInfo.rating,
      };
    }
    if (dataInfo?.states?.length > 0) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        state: JSON.stringify(dataInfo.states),
      };
    }
    if (dataInfo?.country) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        country: [dataInfo.country],
      };
    }
    dispatch(getInputActiveAdsAction(searchObject));
  }, [query, searchClick, dataInfo]);

  useEffect(() => {
    if (inputActiveAdsList) {
      const dataSet = inputActiveAdsList?.result?.map((item) => {
        return {
          "Input type": item.input_name,
          "Seller's name": item.input_supplier_name,
          "Input Subtype": item.input_subtype,
          "Quantity available": `${item.available_quantity} ${textCapitalize(item.unit_of_measurement)}`,
          "Rating of seller": item.rating ? (
            <AjRating defaultValue={item.rating} readOnly={true} />
          ) : (
            "-"
          ),
          "Selling Price": item.selling_price
            ? `${numberWithCommas(item?.selling_price, item?.currency)}`
            : "-",
          "Expiry Date": `${formatDate(item.expiry_date)}`,
          id: item.id,
        };
      });
      setData(dataSet);
    }
  }, [inputActiveAdsList]);

  let tableHead = [
    { field: "Input type", ellipsisClass: true },
    { field: "Seller's name" },
    { field: "Input Subtype" },
    { field: "Quantity available" },
    { field: "Rating of seller" },
    { field: "Selling Price" },
    { field: "Expiry Date" },

    {
      width: "10%",
      renderColumn: (row) => {
        return (
          <Button
            sx={commonStyles.anchorButtonStyle}
            onClick={() => navigate(`active-ads/${row.id}`)}
          >
            <Typography sx={inventoryStyles.viewMoreWidth}>
              View More
            </Typography>
          </Button>
        );
      },
    },
    {
      field: "",
      width: "10%",
      renderColumn: (row) => {
        return (
          <Button
            sx={{
              ...customTableStyles.btnStyle,
              ...(userData?.status === "ONHOLD" &&
                customTableStyles.disabledButton),
            }}
            onClick={() => {
              setOpenBuyModal(true);
              setInputData(_.find(inputActiveAdsList?.result, { id: row.id }));
            }}
            disabled={userData?.status === "ONHOLD" ? true : false}
          >
            <Typography sx={{ ...customTableStyles.colorText }}>Buy</Typography>
          </Button>
        );
      },
    },
  ];

  return (
    <>
      {inputActiveAdsList?.totalCount === 0 ? (
        <Box
          sx={{
            ...commonStyles.noContentBox,
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
          totalCount={inputActiveAdsList?.totalCount}
          statusOptionsRequired={false}
          ellipsisMaxWidth={commonStyles.ellipsisMaxWidth}
        />
      )}
      <AjDialog
        open={openBuyModal}
        closeModal={setOpenBuyModal}
        title="Buy"
        styleData={commonStyles.buyDialogModalContainer}
      >
        <AjBuyProductModal
          closeModal={setOpenBuyModal}
          data={inputData}
          type="Input"
        />
      </AjDialog>
    </>
  );
};

export default AjInputActiveAdsListing;
