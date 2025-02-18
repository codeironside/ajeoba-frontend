import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import * as moment from "moment";

import AjTypography from "../../../../Components/AjTypography";
import { LIMIT, SKIP } from "../../../../Constant/AppConstant";
import { commonStyles } from "../../../../Style/CommonStyle";

import AjCustomTable from "../../../../Components/AjCustomTable/AjCustomTable";
import {
  getQaAdsListAction,
  toggleQaAdsStatusAction,
} from "../../../../Redux/FarmingAssociation/QaAds/qaAdsActions";
import { QAADS } from "../../../../Routes/Routes";
import { getPhoneCodeSymbol } from "../../../../Services/commonService/commonService";

const QaAdsListing = (props) => {
  const { dataInfo, searchClick, searchText } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const qaAdsList = useSelector((state) => state.qaAds.qaAdsList);

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  const tableHead = [
    { field: "Product name", ellipsisClass: true, width: "15%" },
    { field: "Ad sent to" },
    { field: "Address", ellipsisClass: true, width: "20%" },
    { field: "Contact no" },
    { field: "Added On" },
    { field: "Status", cellRenderer: true },
    { field: "", cellRenderer: true },
  ];

  const options = [
    {
      name: "Active",
      actionClickHandler: (id) =>
        dispatch(toggleQaAdsStatusAction(id, "ACTIVE")),
    },
    {
      name: "Inactive",
      actionClickHandler: (id) =>
        dispatch(toggleQaAdsStatusAction(id, "INACTIVE")),
    },
  ];

  const viewMore = (adId) => {
    navigate(`${QAADS}/detail/${adId}`);
  };
  let actionsArray = [
    {
      name: "View More",
      type: "anchor",
      actionClickHandler: viewMore,
    },
  ];

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
    };
    if (searchText.length) {
      searchObject = {
        limit: LIMIT,
        skip: SKIP,
        filterText: searchText,
      };
    }
    if (dataInfo.startDate) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        from: moment(dataInfo.startDate).format("L"),
        to: moment(dataInfo.endDate).format("L"),
      };
    }
    if (dataInfo?.certificate?.length) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        certifications: JSON.stringify(dataInfo.certificate),
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
    dispatch(getQaAdsListAction(searchObject));
  }, [query, dataInfo, searchClick]);

  useEffect(() => {
    const dataSet = qaAdsList?.result?.map((item) => {
      const qaAdsData = {
        "Product name": item.product_name,
        "Ad sent to":
          item.request_type === 1 ? "Open Market" : item.company_name,
        Address: `${item.country_name},${item.state_name}`,
        "Contact no": `${getPhoneCodeSymbol(item.phone_code)} ${
          item.contact_number
        }`,
        "Added On": moment(item.created_at).format("DD/MM/YYYY"),
        id: item.id,
        status:
          item.status === "ACTIVE"
            ? "Active"
            : item.status === "INACTIVE"
            ? "Inactive"
            : "Archived",
      };
      return qaAdsData;
    });
    setData(dataSet);
  }, [qaAdsList]);

  return (
    <>
      {qaAdsList?.result?.length === 0 ? (
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
          actions={actionsArray}
          pagination={true}
          query={query}
          setQuery={setQuery}
          totalCount={qaAdsList?.totalcount}
          options={options}
          isConfirmModalRequired={true}
        />
      )}
    </>
  );
};

export default QaAdsListing;
