import React from "react";
import { Grid, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import inventoryLogo from "../../../Assets/Images/inventoryActiveIcon.svg";
import AjButton from "../../../Components/AjButton";
import AjTab from "../../../Components/AjTab/AjTab";
import AvailableInventory from "./AvailableInventory/AvailableInventory";
import BatchListing from "./Batches/BatchListing/BatchListing";
import {
  getBatchListAction,
  getInventoryListAction,
} from "../../../Redux/FarmingAssociation/Inventory/inventoryActions";
import { LIMIT, SKIP } from "../../../Constant/AppConstant";
import { CREATE_BATCHES, INVENTORY } from "../../../Routes/Routes";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";
import { styles } from "./AvailableInventory/AvailableInventoryStyles";
import { useEffect } from "react";

const Inventory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("activeTab");
  const inventoryList = useSelector((state) => state.inventory.inventoryList);
  const batchList = useSelector((state) => state.inventory.batchList);

  useEffect(() => {
    const searchObject = {
      limit: LIMIT,
      skip: SKIP,
    };
    dispatch(getBatchListAction(searchObject));
    dispatch(getInventoryListAction(searchObject));
  }, []);

  return (
    <Grid
      container
      sx={{
        ...customCommonStyles.mainContainer,
        ...styles.inventoryMainContainer,
        ...commonStyles.relativePosition,
      }}
    >
      <Grid item sx={styles.createBatchContainer}>
        {activeTab === "1" ? (
          <AjButton
            variant="text"
            textStyle={styles.batchBtnTextResponsive}
            styleData={{
              ...customCommonStyles.addButtonStyle,
              ...styles.createBatchButton,
            }}
            displayText="Create Batch"
            onClick={() => navigate(CREATE_BATCHES)}
          />
        ) : (
          <Box sx={styles.emptyBoxStyle}></Box>
        )}
      </Grid>
      {inventoryList?.data && batchList && (
        <AjTab
          components={[
            {
              component: <AvailableInventory />,
              index: 0,
              label: `Inventory (${inventoryList?.data?.totalcount})`,
              icon: <img src={inventoryLogo} />,
            },
            {
              component: <BatchListing />,
              index: 1,
              label: `Batching (${batchList?.totalcount})`,
            },
          ]}
          onChange={(currIndex) =>
            navigate(`${INVENTORY}?activeTab=${currIndex}`)
          }
          defaultIndex={Number.parseInt(activeTab || 0)}
          backgroundTabs={false}
          displayMyProfile={false}
          isTabPanelDisplay={true}
        />
      )}
    </Grid>
  );
};

export default Inventory;
