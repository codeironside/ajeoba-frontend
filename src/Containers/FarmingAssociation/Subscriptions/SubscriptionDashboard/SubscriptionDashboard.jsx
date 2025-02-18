import React, { useState, useEffect } from "react";

import { Box, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { LIMIT, SKIP } from "../../../../Constant/AppConstant";

import AjButton from "../../../../Components/AjButton";
import AjInputBase from "../../../../Components/AjInputBase";
import AjDialog from "../../../../Components/AjDialog/AjDialog";
import AjFilters from "../../../../Components/AjFilters/AjFilters";

import refreeLogo from "../../../../Assets/Images/refreeLogo.svg";
import filterIcon from "../../../../Assets/Images/filterIcon.png";

import SubscriptionList from "./SubscriptionList/SubscriptionList";
import { farmingAssociationSubHeader } from "../../../../Constant/AppConstant";
import AjDashboardListCard from "../../../../Components/AjDashboardHeaderList/AjDashboardListCard";

import { farmersCommonStyles } from "../../Farmers/FarmersStyles";
import { FARMER_SUBSCRIPTION_CONTROL } from "../../../../Routes/Routes";
import { getSubscriptionInfoActions } from "../../../../Redux/SuperAdmin/Subscription/subscriptionActions";

import { getFarmerListAction } from "../../../../Redux/FarmingAssociation/Farmers/farmersActions";
import {
  commonStyles,
  customCommonStyles,
  dashboardStyles,
} from "../../../../Style/CommonStyle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SubscriptionDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const farmerList = useSelector((state) => state.farmers.farmerList);
  const { farmerSubscriptionInfo } = useSelector((state) => state.subscription);
  const [dashboardInfoBox, setDashboardInfoBox] = useState([]);

  const [searchVal, setSearchVal] = useState("");
  const [searchClicked, setSearchClicked] = useState(true);
  const [openFilt, setOpenFilt] = useState(false);
  const [dataInfo, setDataInfo] = useState({});

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });

  const handleResetFilter = () => {
    setSearchVal("");
    setDataInfo({});
    setQuery(query);
  };

  const changedFilter = (data) => {
    setDataInfo(data);
    setQuery(query);
  };

  const onEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchClicked((prev) => !prev);
    }
  };

  const handleSearchingFilter = () => {
    setSearchClicked((prev) => !prev);
  };

  const handleSearchInfoChange = (e) => {
    setSearchVal(e.target.value);
    if (e.target.value.length === 0) {
      setSearchClicked((prev) => !prev);
    }
  };

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
      type: "FARMER",
    };
    dispatch(getFarmerListAction(searchObject));
    dispatch(getSubscriptionInfoActions());
  }, []);

  useEffect(() => {
    if (farmerSubscriptionInfo) {
      setLoading(false);

      const headerList = farmingAssociationSubHeader.map((item) => {
        const key = item.key;
        const label = item.label;
        const count = parseInt(farmerSubscriptionInfo[key]) || 0;

        return {
          heading: label,
          key,
          count,
        };
      });
      setDashboardInfoBox(headerList);
    }
  }, [farmerSubscriptionInfo]);

  return (
    <>
      <Grid
        container
        sx={{
          ...commonStyles.signupFormMainContentContainer,
          ...commonStyles.customSrollBar,
          ...dashboardStyles.dashboardContainer,
        }}
      >
        <Grid container sx={customCommonStyles.mainContainer}>
          <Grid item sx={customCommonStyles.subContainer}>
            <Box sx={customCommonStyles.headerBox}>
              <img
                src={refreeLogo}
                style={farmersCommonStyles.marginBtm6}
                alt="farmers logo"
              />
              <Typography sx={commonStyles.tableText}>
                Farmers({farmerList?.totalCount})
              </Typography>
            </Box>
          </Grid>
          <Box sx={farmersCommonStyles.unclickableWrapper}>
            <AjDashboardListCard
              loading={loading}
              dashboardInfoBox={dashboardInfoBox}
            />
          </Box>
          <Box sx={customCommonStyles.subContentBox}>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginRight: "1.5rem",
              }}
            >
              <Grid item sx={customCommonStyles.subHeaderStyle}>
                <AjInputBase
                  name="search by name"
                  value={searchVal}
                  onKeyPress={onEnterKeyPress}
                  onChange={handleSearchInfoChange}
                  styleData={customCommonStyles.filterInputBaseStyleLandingPage}
                  placeholder="Search by name"
                  endIcon={
                    <Box
                      sx={customCommonStyles.iconBox}
                      onClick={handleSearchingFilter}
                    >
                      <SearchIcon sx={customCommonStyles.searchIcon} />
                    </Box>
                  }
                />
                <Grid>
                  <Typography
                    component="img"
                    src={filterIcon}
                    sx={customCommonStyles.filterIcon}
                    onClick={() => setOpenFilt(true)}
                  />
                </Grid>
                <Typography
                  sx={customCommonStyles.clearFilterStyleSubDashboard}
                  onClick={handleResetFilter}
                >
                  Clear all filter
                </Typography>
              </Grid>
              <AjButton
                variant="text"
                styleData={
                  customCommonStyles.addButtonStyleSubscriptionDashboard
                }
                displayText="Subscribe"
                onClick={() => navigate(FARMER_SUBSCRIPTION_CONTROL)}
              />
            </Grid>
            <SubscriptionList
              dataInfo={dataInfo}
              searchText={searchVal}
              searchClick={searchClicked}
            />
          </Box>
        </Grid>
      </Grid>
      <AjDialog
        open={openFilt}
        closeModal={setOpenFilt}
        title={"Filter"}
        styleData={{ height: "calc(100vh - 3.125rem)" }}
      >
        <AjFilters
          dateFilter={true}
          subscriptionStatusFilter={true}
          filterSelected={changedFilter}
          cancel={setOpenFilt}
          filterData={dataInfo}
        />
      </AjDialog>
    </>
  );
};

export default SubscriptionDashboard;
