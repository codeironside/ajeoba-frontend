import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Grid } from "@mui/material";
import AjButton from "../../../Components/AjButton";
import AjTab from "../../../Components/AjTab/AjTab";
import FinanceRequestsProductInput from "./FinanceRequestsProductInput/FinanceRequestsProductInput";
import { getFinanceReqProductOrInputListAction } from "../../../Redux/FarmingAssociation/Finance/FinanceActions";
import {
  LIMIT,
  SKIP,
  typeOfRequestOptions,
} from "../../../Constant/AppConstant";
import { getUserData } from "../../../Services/localStorageService";
import { CREATE_FINANCE_REQUEST, FINANCE } from "../../../Routes/Routes";
import financeActiveIcon from "../../../Assets/Images/incomeActiveIcon.svg";
import { styles as inventoryStyles } from "../Inventory/AvailableInventory/AvailableInventoryStyles";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";

const Finance = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = getUserData();

  // console.log(data);

  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("activeTab");

  const financeReqByProductList = useSelector(
    (state) => state.financeRequests.financeRequestsForProductList
  );
  const financeReqByInputList = useSelector(
    (state) => state.financeRequests.financeRequestsForInputList
  );

  useEffect(() => {
    const searchObject = {
      limit: LIMIT,
      skip: SKIP,
    };

    dispatch(
      getFinanceReqProductOrInputListAction({
        ...searchObject,
        itemType: typeOfRequestOptions[1]?.value,
      })
    );

    dispatch(
      getFinanceReqProductOrInputListAction({
        ...searchObject,
        itemType: typeOfRequestOptions[0]?.value,
      })
    );
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
      {data?.subscription_expiry_date === null ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 style={{ color: "red", fontSize: "16" }}>
            Kindly Subscribe to access the Finance Section
          </h2>
        </div>
      ) : (
        <>
          <Grid item sx={inventoryStyles.createBatchContainer}>
            <AjButton
              variant="text"
              textStyle={inventoryStyles.batchBtnTextResponsive}
              styleData={{
                ...customCommonStyles.addButtonStyle,
                ...inventoryStyles.createBatchButton,
              }}
              displayText="New request"
              onClick={() =>
                navigate(
                  `${CREATE_FINANCE_REQUEST}?activeTab=${activeTab || 0}`
                )
              }
            />
          </Grid>
          {financeReqByProductList && financeReqByInputList && (
            <AjTab
              components={[
                {
                  component: <FinanceRequestsProductInput activeTab={0} />,
                  index: 0,
                  label: `Product
                 (${financeReqByProductList?.totalCount})
                `,
                  icon: <img src={financeActiveIcon} />,
                },
                {
                  component: <FinanceRequestsProductInput activeTab={1} />,
                  index: 1,
                  label: `
                Input
                  (${financeReqByInputList?.totalCount})
                `,
                },
              ]}
              defaultIndex={Number.parseInt(activeTab || 0)}
              displayMyProfile={false}
              onChange={(currIndex) =>
                navigate(`${FINANCE}?activeTab=${currIndex}`)
              }
              isTabPanelDisplay={true}
              backgroundTabs={false}
            />
          )}
        </>
      )}
    </Grid>
  );
};

export default Finance;
