import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import * as _ from "lodash";
import * as moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import AjCustomTable from "../../../../Components/AjCustomTable/AjCustomTable";
import AjTypography from "../../../../Components/AjTypography";
import { LIMIT, qualityOptions, SKIP } from "../../../../Constant/AppConstant";
import { getFinanceRequestHarvestListAction } from "../../../../Redux/FinanceCompany/FinanceRequests/financeRequestsActions";
import { textCapitalize } from "../../../../Services/commonService/commonService";

import { commonStyles } from "../../../../Style/CommonStyle";
import { styles } from "../HarvestInformationStyles";

const HarvestListing = (props) => {
  const { searchByName, dataInfo, id, farmerId, onClick } = props;
  const dispatch = useDispatch();

  const harvestList = useSelector(
    (state) => state.financeCompanyRequests.financeRequestHarvestList
  );

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  const tableHead = [
    { field: "Product Name" },
    { field: "Quantity Aggregated" },
    { field: "Product Type" },
    { field: "Quality" },
  ];

  useEffect(() => {
    const dataSet = harvestList?.result?.map((item) => {
      return {
        "Product Name": item?.product_name,
        "Quantity Aggregated": `${item?.quantity} ${textCapitalize(
          item?.unit_of_measurement
        )}`,
        "Product Type": textCapitalize(item.product_type),
        Quality: _.find(qualityOptions, { value: JSON.stringify(item.quality) })
          .label,
        id: item.id,
      };
    });
    setData(dataSet);
  }, [harvestList]);

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
    };
    if (searchByName?.length) {
      searchObject = {
        limit: LIMIT,
        skip: SKIP,
        productName: searchByName,
      };
    }
    if (dataInfo?.startDate) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        from: moment(dataInfo.startDate).format("L"),
        to: moment(dataInfo.endDate).format("L"),
      };
    }
    if (dataInfo?.products?.length) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        products: JSON.stringify(dataInfo?.products),
      };
    }
    dispatch(getFinanceRequestHarvestListAction(searchObject, id, farmerId));
  }, [query, dataInfo, onClick]);

  return (
    <>
      {harvestList?.result?.length === 0 ? (
        <Box
          sx={{ ...commonStyles.noContentBox, ...styles.tableHeightHarvest }}
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
          totalCount={harvestList?.totalCount}
        />
      )}
    </>
  );
};

export default HarvestListing;
