import React, { useEffect, useState } from "react";
import AjDashboardListCard from "../../../Components/AjDashboardHeaderList/AjDashboardListCard";
import { adminDashboardHeaders } from "../../../Constant/AppConstant";
import { useDispatch, useSelector } from "react-redux";
import { getAdminDashboardCountAction } from "../../../Redux/SuperAdmin/Dashboard/adminDashboardActions";
import { commonStyles, dashboardStyles } from "../../../Style/CommonStyle";
import { Grid } from "@mui/material";
import { styles } from "./AdminDashboardStyles";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [adminHeaderInfo, setAdminHeaderInfo] = useState([{}]);
  const [loading, setLoading] = useState(true);

  const adminDashboardInfo = useSelector(
    (state) => state.adminDashboard.adminDashboardCount
  );


  useEffect(() => {
    dispatch(getAdminDashboardCountAction());
  }, []);

  useEffect(() => {
    if (adminDashboardInfo) {
      setLoading(false);
      let headerList = adminDashboardHeaders.map((item) => {
        return {
          heading: item.label,
          key: item.key,
          count: adminDashboardInfo[item.key] || 0,
        };
      });
      setAdminHeaderInfo(headerList);
    }
  }, [adminDashboardInfo]);

  return (
    <Grid
      container
      sx={{
        ...commonStyles.signupFormMainContentContainer,
        ...commonStyles.customSrollBar,
        ...dashboardStyles.dashboardContainer,
      }}
    >
      <AjDashboardListCard
        dashboardInfoBox={adminHeaderInfo}
        loading={loading}
        boxStyle={styles.boxStyle}
        headingTextStyle={styles.headingTextStyle}
        countStyle={styles.countTextStyle}
        mainGridCountBox={commonStyles.marginTop0}
      />
    </Grid>
  );
};

export default AdminDashboard;
