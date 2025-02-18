import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import * as moment from "moment";
import AjTypography from "../../../../Components/AjTypography";
import { LIMIT, SKIP } from "../../../../Constant/AppConstant";
import {
  getFarmerListAction,
  toggleFarmerStatusAction,
} from "../../../../Redux/FarmingAssociation/Farmers/farmersActions";
import { FARMERS } from "../../../../Routes/Routes";
import { commonStyles } from "../../../../Style/CommonStyle";
import AjCustomTable from "../../../../Components/AjCustomTable/AjCustomTable";

const FarmerListing = (props) => {
  const { dataInfo, searchClick, searchText } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const farmerList = useSelector((state) => state.farmers.farmerList);
  const isKycVerified = location.state?.isKycVerified;

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  const tableHead = [
    { field: "First name" },
    { field: "Last name" },
    { field: "Gender" },
    { field: "Age" },
    { field: "Phone Number" },
    { field: "Added On" },
    { field: "KYC" },
    { field: "Status", cellRenderer: true },
    { field: "", cellRenderer: true },
  ];

  let actionsArray = [
    {
      name: "View More",
      type: "anchor",
      actionClickHandler: (id) => {
        navigate(`${FARMERS}/detail/${id}`);
      },
    },
  ];

  const options = [
    {
      name: "Active",
      actionClickHandler: (id) => dispatch(toggleFarmerStatusAction(id, true)),
    },
    {
      name: "Inactive",
      actionClickHandler: (id) => dispatch(toggleFarmerStatusAction(id, false)),
    },
  ];

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
      type: "FARMER",
      isKycVerified: isKycVerified,
    };
    if (searchText.length) {
      searchObject = {
        limit: LIMIT,
        skip: SKIP,
        filterText: searchText,
        type: "FARMER",
      };
    }

    if (dataInfo?.startDate) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        from: moment(dataInfo?.startDate).format("L"),
        to: moment(dataInfo?.endDate).format("L"),
      };
    }

    if (dataInfo?.products?.length > 0) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        product: JSON.stringify(dataInfo?.products),
      };
    }

    if (dataInfo?.country) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        country: [dataInfo?.country],
      };
    }

    if (dataInfo?.states?.length > 0) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        state: JSON.stringify(dataInfo?.states),
      };
    }

    if (typeof dataInfo?.isKycVerified === "boolean") {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        isKycVerified: JSON.stringify(dataInfo?.isKycVerified),
      };
    }
    dispatch(getFarmerListAction(searchObject));
  }, [query, dataInfo, searchClick]);

  useEffect(() => {
    const dataSet = farmerList?.result?.map((item) => {
      const farmerData = {
        "First name": item.first_name,
        "Last name": item.last_name,
        Gender: item.gender.toLowerCase(),
        Age:
          moment().format("YYYY") - moment(item.date_of_birth).format("YYYY"),
        "Phone Number": item.mobile_no,
        "Added On": moment(item.created_at).format("DD/MM/YYYY"),
        KYC: item.is_kyc_verified ? "Verified" : "Unverified",
        id: item.id,
        status: item.is_active ? "Active" : "Inactive",
      };
      return farmerData;
    });
    setData(dataSet);
  }, [farmerList]);

  return (
    <>
      {farmerList?.result?.length === 0 ? (
        <Box sx={commonStyles.noContentBox}>
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
          totalCount={farmerList.totalCount}
          options={options}
        />
      )}
    </>
  );
};

export default FarmerListing;
