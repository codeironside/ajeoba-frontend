import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { LIMIT, SKIP } from "../../../../../Constant/AppConstant";
import { Box, Grid } from "@mui/material";

import moment from "moment";
import { commonStyles } from "../../../../../Style/CommonStyle";
import { styles as activeDetailStyle } from "../../../Marketplace/MarketplaceDetail/ActiveAdsDetail/ActiveDetailStyles";
import { styles } from "../../../Logistics/LogisticsStyles";

import AjTypography from "../../../../../Components/AjTypography";
import AjDetailTypography from "../../../../../Components/AjDetailTypography/AjDetailTypography";
import AjCustomTable from "../../../../../Components/AjCustomTable/AjCustomTable";

import {
  getSubscriptionDetailActions,
  getAllSubscriptions,
} from "../../../../../Redux/SuperAdmin/Subscription/subscriptionActions";

const SubscriptionDetail = () => {
  const { id: farmerId } = useParams();

  const dispatch = useDispatch();
  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });

  const {
    subscriptionCurrency,
    farmerSubscriptionDetail,
    farmerSubscriptionIndex,
  } = useSelector((state) => state.subscription);


  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
    };
    dispatch(getAllSubscriptions());
    dispatch(getSubscriptionDetailActions(farmerId, searchObject));
  }, [farmerId]);

  const tableHead = [
    { field: "Subscription Type" },
    { field: "Subscription Amount" },
    { field: "Subscription Duration" },
    { field: "Subscription start date" },
  ];

  const subDetails = useMemo(() => {
    if (!farmerSubscriptionDetail) {
      return [];
    }
    return farmerSubscriptionDetail?.map((item) => ({
      "Subscription Amount": `${subscriptionCurrency} ${item?.cost}`,
      "Subscription Duration": `${item?.duration} months`,
      "Subscription Type": item?.name,
      "Subscription start date": moment(item?.sub_date).format("DD/MM/YYYY"),
    }));
  }, [farmerSubscriptionDetail, subscriptionCurrency]);

  return (
    <>
      <Grid
        item
        sx={{
          ...commonStyles.whiteContainerBackgroundTabs,
          ...commonStyles.customSrollBar,
        }}
      >
        <>
          <Box sx={activeDetailStyle.detailContainerSub}>
            <Grid item sm={2} xs={12}>
              <AjDetailTypography
                displayText1="First Name"
                displayText2={farmerSubscriptionIndex?.first_name}
                styleData2={{
                  ...commonStyles.textEllipsis,
                  ...styles.textEllipsisWidth,
                }}
              />
            </Grid>
            <Grid item sm={2} xs={12}>
              <AjDetailTypography
                displayText1="Last Name"
                displayText2={farmerSubscriptionIndex?.last_name}
              />
            </Grid>
            <Grid item sm={2} xs={12}>
              <AjDetailTypography
                displayText1="Sub expiration date"
                displayText2={moment(
                  farmerSubscriptionIndex?.subscription_expiry_date
                ).format("DD/MM/YYYY")}
              />
            </Grid>
          </Box>
        </>
        <>
          {subDetails?.length === 0 ? (
            <Box sx={commonStyles.noContentBox}>
              <AjTypography
                styleData={commonStyles.noDataText}
                displayText="No data found"
              />
            </Box>
          ) : (
            <AjCustomTable
              columnDefs={tableHead}
              rowData={subDetails}
              pagination={true}
              query={query}
              setQuery={setQuery}
              totalCount={subDetails?.length}
            />
          )}
        </>
      </Grid>
    </>
  );
};

export default SubscriptionDetail;
