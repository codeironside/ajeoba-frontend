import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@mui/material";

import AjTab from "../../../Components/AjTab/AjTab";
import InputListing from "./InputListing/InputListing";
import { LIMIT, SKIP } from "../../../Constant/AppConstant";
import { INPUT } from "../../../Routes/Routes";
import {
  getInputActiveAdsAction,
  getInputOrderListAction,
} from "../../../Redux/FarmingAssociation/Input/inputActions";
import inputActiveIcon from "../../../Assets/Images/parcelActiveIcon.svg";

import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";
import { styles as inventoryStyles } from "../Inventory/AvailableInventory/AvailableInventoryStyles";

export default function Input() {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("activeTab");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputActiveAdsList = useSelector(
    (state) => state.input.inputActiveAdsList
  );

  const inputOrderList = useSelector((state) => state.input.inputOrderList);

  useEffect(() => {
    let searchObject = {
      limit: LIMIT,
      skip: SKIP,
    };
    dispatch(getInputActiveAdsAction(searchObject));
    dispatch(getInputOrderListAction(searchObject));
  }, []);

  return (
    <Grid
      container
      sx={{
        ...customCommonStyles.mainContainer,
        ...commonStyles.signupFormMainGridContainer,
        ...commonStyles.relativePosition,
        ...customCommonStyles.noBackgroundTab,
        ...inventoryStyles.inventoryMainContainer,
      }}
    >
      {inputActiveAdsList && inputOrderList && (
        <AjTab
          components={[
            {
              component: <InputListing activeTab={0} />,
              index: 0,
              label: `Active ads (${inputActiveAdsList?.totalCount} )`,
              icon: <img src={inputActiveIcon} />,
            },
            {
              component: <InputListing activeTab={1} />,
              index: 1,
              label: `Orders (${inputOrderList?.totalCount})`,
            },
          ]}
          onChange={(currIndex) => navigate(`${INPUT}?activeTab=${currIndex}`)}
          defaultIndex={Number.parseInt(activeTab || 0)}
          backgroundTabs={false}
          displayMyProfile={false}
          isTabPanelDisplay={true}
        />
      )}
    </Grid>
  );
}
