import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AjChartComponent from "../../../Components/AjChartComponent/AjChartComponent.jsx";
import AjChartFilter from "../../../Components/AjChartFilter/AjChartFilter.jsx";
import AjDashboardHeaderList from "../../../Components/AjDashboardHeaderList/AjDashboardHeaderList";
import AjTypography from "../../../Components/AjTypography.jsx";
import { ROLES } from "../../../Constant/RoleConstant.js";
import { getProducts } from "../../../Redux/common/Products/productsActions.js";
import AjFarmerSubscriptionModal from "../../../Components/AjSubscriptionPlanForm/AjFarmerSubscriptionModal.jsx";
import {
  getInputListAction,
  getInputPurchasedDataAction,
  getProductAggregatedDataAction,
  getProductAggregatedOptionsAction,
  getProductSoldAction,
  getSalesAndRevenueDataAction,
  getBalanceAction,
} from "../../../Redux/FarmingAssociation/Dashboard/dashboardActions.js";
import {
  getUserData,
  getUserAccountData,
} from "../../../Services/localStorageService.js";
import { commonStyles, dashboardStyles } from "../../../Style/CommonStyle";
import SelectedInputDetailById from "./SelectedInput/SelectedInputDetails/SelectedInputDetailById.jsx";
import {
  getCurrencySymbol,
  numberWithCommas,
  numberWithCommassNoCurrency,
  textCapitalize,
} from "../../../Services/commonService/commonService.js";
import { SELLER_WALLET } from "../../../Routes/Routes.js";
import { useNavigate } from "react-router-dom";

export default function DashboardFarmingAssociation() {
  const dispatch = useDispatch();
  const userData = getUserData();
  const navigate = useNavigate();
  const accountData = getUserAccountData();
  const [open, setOpen] = useState(true);
  const [id, setId] = useState();
  const [openModal, setOpenModal] = useState(false);
  let isOpenModal = false;
  const isRoleInputSupplier =
    userData?.role_id === ROLES.INPUT_SUPPLIER ? true : false;
  const currentYear = new Date().getFullYear();
  let showSubscriptionModal = localStorage.getItem("showSubscriptionModal");

  const [showSubModal, setShowSubModal] = useState(null);
  const [isYearlySalesAndRevenue, setIsYearlySalesAndRevenue] = useState(false);
  const [yearSalesAndRevenue, setYearSalesAndRevenue] = useState(currentYear);
  const [isYearlyItemAggregate, setIsYearlyItemAggregate] = useState(false);
  const [yearItemAggregate, setYearItemAggregate] = useState(currentYear);
  const [isYearlyInputPurchased, setIsYearlyInputPurchased] = useState(false);
  const [yearOfInputPurchased, setYearOfInputPurchased] = useState(currentYear);
  const [chartItemAggregatedData, setChartItemAggregatedData] = useState({});
  const [chartInputPurchasedData, setChartInputPurchasedData] = useState({});
  const [isBalAvailable, setIsBalAvailable] = useState(false);

  const [chartSalesRevenueItemId, setChartSalesRevenueItemId] = useState(null);
  const [chartSalesRevenueItemIdUnit, setChartSalesRevenueItemIdUnit] =
    useState(null);

  const [chartItemAggregatedItemId, setChartItemAggregatedItemId] =
    useState(null);
  const [chartItemAggregatedItemIdUnit, setChartItemAggregatedItemIdUnit] =
    useState(null);

  const [chartInputId, setChartInputId] = useState(null);
  const [chartInputIdUnit, setChartInputIdUnit] = useState(null);

  const chartSalesRevenueDataFromStore = useSelector(
    (state) => state.dashboard.salesAndRevenueEarned
  );
  const itemSoldOptions = useSelector(
    (state) => state.dashboard.productSoldOptions
  );
  const itemAggregatedOptions = useSelector(
    (state) => state.dashboard.productAggOptions
  );

  const chartinputPurchasedDataFromStore = useSelector(
    (state) => state.dashboard.inputPurchased
  );

  const inputListOptions = useSelector((state) => state.dashboard.inputList);
  const balance = useSelector((state) => state.dashboard.balance);

  const productAggregatedDataFromStore = useSelector(
    (state) => state.dashboard.productAggregated
  );

  useEffect(() => {
    if (Object.keys(balance)?.length > 0) {
      setIsBalAvailable(true);
    } else {
      setIsBalAvailable(false);
    }
  }, [balance]);

  useEffect(() => {
    dispatch(getBalanceAction());
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("isInputSelected") !== null) {
      setId(parseInt(sessionStorage.getItem("inputSelected")));
      sessionStorage.removeItem("isInputSelected");
      isOpenModal = true;
      setOpenModal(true);
    } else if (sessionStorage.getItem("isInputSelected")) {
      setOpenModal(false);
      isOpenModal = false;
    }
  }, [openModal]);

  useEffect(() => {
    if (itemSoldOptions) {
      setChartSalesRevenueItemId(itemSoldOptions[0]?.id);
      setChartSalesRevenueItemIdUnit(itemSoldOptions[0]?.unit_of_measurement);
    }
  }, [itemSoldOptions]);

  useEffect(() => {
    if (itemAggregatedOptions) {
      setChartItemAggregatedItemId(itemAggregatedOptions[0]?.id);
      setChartItemAggregatedItemIdUnit(
        itemAggregatedOptions[0]?.unit_of_measurement
      );
    }
  }, [itemAggregatedOptions]);
  useEffect(() => {
    if (!isRoleInputSupplier) dispatch(getProducts());
    dispatch(getProductSoldAction({}, isRoleInputSupplier));
    dispatch(getProductAggregatedOptionsAction({}, isRoleInputSupplier));
    if (userData?.role_id === ROLES.FARMING_ASSOCIATION) {
      dispatch(getInputListAction());
    }
  }, []);
  useEffect(() => {
    if (chartSalesRevenueItemId) {
      const salesAndRevenuePayload = {
        ...(isRoleInputSupplier
          ? { inputId: chartSalesRevenueItemId }
          : { productId: chartSalesRevenueItemId }),
        isYearly: isYearlySalesAndRevenue,
        year: yearSalesAndRevenue,
      };
      dispatch(
        getSalesAndRevenueDataAction(
          salesAndRevenuePayload,
          isRoleInputSupplier
        )
      );
    }
  }, [chartSalesRevenueItemId]);
  useEffect(() => {
    if (chartItemAggregatedItemId) {
      const productAggregationPayload = {
        ...(isRoleInputSupplier
          ? { inputId: chartItemAggregatedItemId }
          : { productId: chartItemAggregatedItemId }),
        isYearly: isYearlyItemAggregate,
        year: yearItemAggregate,
      };
      dispatch(
        getProductAggregatedDataAction(
          productAggregationPayload,
          isRoleInputSupplier
        )
      );
    }
  }, [chartItemAggregatedItemId]);
  useEffect(() => {
    if (chartInputId && userData?.role_id === ROLES.FARMING_ASSOCIATION) {
      const inputPurchasedPayload = {
        inputId: chartInputId,
        isYearly: isYearlyInputPurchased,
        year: yearOfInputPurchased,
      };
      dispatch(getInputPurchasedDataAction(inputPurchasedPayload));
    }
  }, [chartInputId]);
  useEffect(() => {
    if (showSubscriptionModal === "true") {
      setShowSubModal(true);
    } else if (showSubscriptionModal === "false") {
      setShowSubModal(false);
    }
  }, [showSubscriptionModal]);
  // console.log(showSubModal, "usestate");
  // console.log(showSubscriptionModal, "showSubscriptionModal");
  useEffect(() => {
    setChartItemAggregatedData(productAggregatedDataFromStore);
  }, [productAggregatedDataFromStore]);

  useEffect(() => {
    if (chartinputPurchasedDataFromStore) {
      setChartInputPurchasedData(chartinputPurchasedDataFromStore);
    }
  }, [chartinputPurchasedDataFromStore]);

  useEffect(() => {
    if (inputListOptions?.result)
      setChartInputId(inputListOptions?.result[0]?.id);
    setChartInputIdUnit(inputListOptions?.result[0]?.unit_of_measurement);
  }, [inputListOptions?.result]);

  function onMonthlyYearlyTabChange({ chartId, tabValue }) {
    // hit APi to get the data related to month/year
    if (chartId === "salesAndRevenue" && tabValue === "yearly") {
      const payload = {
        ...(isRoleInputSupplier
          ? { inputId: chartSalesRevenueItemId }
          : { productId: chartSalesRevenueItemId }),
        isYearly: true,
      };
      dispatch(getSalesAndRevenueDataAction(payload, isRoleInputSupplier));
      setIsYearlySalesAndRevenue(true);
    } else if (chartId === "salesAndRevenue" && tabValue === "monthly") {
      const payload = {
        ...(isRoleInputSupplier
          ? { inputId: chartSalesRevenueItemId }
          : { productId: chartSalesRevenueItemId }),
        isYearly: false,
        year: yearSalesAndRevenue,
      };
      dispatch(getSalesAndRevenueDataAction(payload, isRoleInputSupplier));
      setIsYearlySalesAndRevenue(false);
    } else if (chartId === "productAggregate" && tabValue === "yearly") {
      const payload = {
        ...(isRoleInputSupplier
          ? { inputId: chartItemAggregatedItemId }
          : { productId: chartItemAggregatedItemId }),
        isYearly: true,
      };
      dispatch(getProductAggregatedDataAction(payload, isRoleInputSupplier));
      setIsYearlyItemAggregate(true);
    } else if (chartId === "productAggregate" && tabValue === "monthly") {
      const payload = {
        ...(isRoleInputSupplier
          ? { inputId: chartItemAggregatedItemId }
          : { productId: chartItemAggregatedItemId }),
        isYearly: false,
        year: yearItemAggregate,
      };
      dispatch(getProductAggregatedDataAction(payload, isRoleInputSupplier));
      setIsYearlyItemAggregate(false);
    } else if (chartId === "inputPurchased" && tabValue === "yearly") {
      const payload = {
        inputId: chartInputId,
        isYearly: true,
      };
      dispatch(getInputPurchasedDataAction(payload));
      setIsYearlyInputPurchased(true);
    } else if (chartId === "inputPurchased" && tabValue === "monthly") {
      const payload = {
        inputId: chartInputId,
        isYearly: false,
        year: yearOfInputPurchased,
      };
      dispatch(getInputPurchasedDataAction(payload));
      setIsYearlyInputPurchased(false);
    }
  }

  const getItemId = (options, source, item) => {
    return options
      .filter((itemType) => {
        return itemType[source] === item;
      })
      .map((input) => {
        return input.id;
      });
  };

  const getItemIdUnit = (options, source, item) => {
    return options
      .filter((itemType) => {
        return itemType[source] === item;
      })
      .map((itemObj) => {
        return itemObj?.unit_of_measurement;
      });
  };

  function onProductSelectChange({ chartId, product }) {
    if (chartId !== "inputPurchased") {
      if (chartId === "salesAndRevenue") {
        const itemId = getItemId(
          itemSoldOptions,
          isRoleInputSupplier ? "input_name" : "name",
          product
        );
        const itemIdUnit = getItemIdUnit(
          itemSoldOptions,
          isRoleInputSupplier ? "input_name" : "name",
          product
        );

        const payload = {
          ...(isRoleInputSupplier
            ? { inputId: itemId }
            : { productId: itemId }),
          isYearly: isYearlySalesAndRevenue,
          year: yearSalesAndRevenue,
        };
        dispatch(getSalesAndRevenueDataAction(payload, isRoleInputSupplier));
        setChartSalesRevenueItemId(itemId);
        setChartSalesRevenueItemIdUnit(itemIdUnit[0]);
      } else if (chartId === "productAggregate") {
        const itemAggregatedId = getItemId(
          itemAggregatedOptions,
          isRoleInputSupplier ? "input_name" : "product_name",
          product
        );
        const itemAggregatedIdUnit = getItemIdUnit(
          itemAggregatedOptions,
          isRoleInputSupplier ? "input_name" : "product_name",
          product
        );
        const payload = {
          ...(isRoleInputSupplier
            ? { inputId: itemAggregatedId }
            : { productId: itemAggregatedId }),
          isYearly: isYearlyItemAggregate,
          year: yearItemAggregate,
        };
        dispatch(getProductAggregatedDataAction(payload, isRoleInputSupplier));
        setChartItemAggregatedItemId(itemAggregatedId);
        setChartItemAggregatedItemIdUnit(itemAggregatedIdUnit[0]);
      }
    } else {
      const inputId = getItemId(inputListOptions?.result, "name", product);
      const inputIdUnit = getItemIdUnit(
        inputListOptions?.result,
        "name",
        product
      );

      const payload = {
        inputId: inputId[0],
        isYearly: isYearlySalesAndRevenue,
        year: yearOfInputPurchased,
      };
      dispatch(getInputPurchasedDataAction(payload));
      setChartInputId(inputId);
      setChartInputIdUnit(inputIdUnit[0]);
    }
  }
  function onIncreaseOrDecreaseYear({ chartId, year }) {
    // hit chart APi to get the data related to year
    if (chartId === "salesAndRevenue") {
      const payload = {
        ...(isRoleInputSupplier
          ? { inputId: chartSalesRevenueItemId }
          : { productId: chartSalesRevenueItemId }),
        isYearly: false,
        year: year,
      };
      dispatch(getSalesAndRevenueDataAction(payload, isRoleInputSupplier));
      setYearSalesAndRevenue(year);
    } else if (chartId === "productAggregate") {
      const payload = {
        ...(isRoleInputSupplier
          ? { inputId: chartItemAggregatedItemId }
          : { productId: chartItemAggregatedItemId }),
        isYearly: false,
        year: year,
      };
      dispatch(getProductAggregatedDataAction(payload, isRoleInputSupplier));
      setYearItemAggregate(year);
    } else if (chartId === "inputPurchased") {
      const payload = {
        inputId: chartInputId,
        isYearly: false,
        year: year,
      };
      dispatch(getInputPurchasedDataAction(payload));
      setYearOfInputPurchased(year);
    }
  }
  const orgName = (role_id) => {
    let orgname;
    switch (role_id) {
      case ROLES?.FARMING_ASSOCIATION:
        orgname = accountData?.association_name;
        break;
      case ROLES?.CORPORATE_BUYER:
        orgname = accountData?.corporate_name;
        break;
      case ROLES?.LOGISTICS_COMPANY:
        orgname = accountData?.company_name;
        break;
      default:
        orgname = `${userData?.first_name} ${userData?.last_name}`;
    }
    return orgname;
  };

  return (
    <Grid
      container
      sx={{
        ...commonStyles.signupFormMainContentContainer,
        ...commonStyles.customSrollBar,
        ...dashboardStyles.dashboardContainer,
      }}
    >
      <AjDashboardHeaderList />
      <Grid sx={{ width: "100%" }}>
        <Box
          sx={{ ...dashboardStyles.dashboardWalletContainer }}
          onClick={() => {
            navigate(SELLER_WALLET);
          }}
        >
          <Box sx={{ ...dashboardStyles.dashboardWalletCardBal }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <Typography
                sx={{ ...dashboardStyles.dashboardWalletCardAmtAvailBal }}
              >
                <span style={{ fontSize: "12px", fontWeight: "200" }}>
                  {getCurrencySymbol(userData?.currency)}
                </span>
                <span>
                  {isBalAvailable === true
                    ? numberWithCommassNoCurrency(
                        balance?.wallet?.available_balance,
                        userData?.currency
                      )
                    : 0}
                </span>
              </Typography>
              <Typography
                sx={{
                  ...dashboardStyles.dashboardWalletCardHeadingTextAvailBal,
                  textAlign: "left",
                }}
              >
                Available balance
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <Typography
                sx={{ ...dashboardStyles.dashboardWalletCardAmtAvailBal }}
              >
                <span style={{ fontSize: "12px", fontWeight: "200" }}>
                  {getCurrencySymbol(userData?.currency)}
                </span>
                <span>
                  {isBalAvailable === true
                    ? numberWithCommassNoCurrency(
                        balance?.wallet?.current_balance,
                        userData?.currency
                      )
                    : 0}
                </span>
              </Typography>
              <Typography
                sx={{
                  ...dashboardStyles.dashboardWalletCardHeadingTextAvailBal,
                  textAlign: "right",
                }}
              >
                Current balance
              </Typography>
            </Box>
          </Box>
          <Box sx={{ ...dashboardStyles.dashboardWalletName }}>
            <Typography sx={{ ...dashboardStyles.dashboardWalletNamestatus }}>
              {orgName(userData.role_id)}
            </Typography>
            <Typography sx={{ ...dashboardStyles.dashboardWalletStatus }}>
              <span
                sx={{
                  ...dashboardStyles.dashboardWalletCardHeadingTextAvailBal,
                }}
              >
                Status:{" "}
              </span>
              <span sx={{ ...dashboardStyles.dashboardWalletNamestatus }}>
                {balance.userStatus}
              </span>
            </Typography>
          </Box>
        </Box>
      </Grid>

      <Grid sx={{ width: "100%" }}>
        <Grid container columnSpacing={{ xs: 1, sm: 2 }}>
          <Grid item xs={12} md={6} sm={6}>
            <Box sx={dashboardStyles.dashboardSubInfo}>
              <Typography sx={dashboardStyles.dashboardSubInfoText}>
                {`Total quantity ${
                  chartSalesRevenueItemIdUnit
                    ? `(${textCapitalize(chartSalesRevenueItemIdUnit)})`
                    : ""
                }
                of a ${isRoleInputSupplier ? "input" : "product"}
                sold overtime
                `}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} sm={6} sx={dashboardStyles.hideInMobile}>
            <Box sx={dashboardStyles.dashboardSubInfo}>
              <Typography sx={dashboardStyles.dashboardSubInfoText}>
                {`Total revenue (${getCurrencySymbol(
                  userData?.currency
                )}) generated overtime `}
              </Typography>
            </Box>
          </Grid>
          {itemSoldOptions?.length ? (
            <>
              <Grid item xs={12} md={12}>
                <AjChartFilter
                  data={chartSalesRevenueDataFromStore}
                  id="salesAndRevenue"
                  productId={chartSalesRevenueItemId}
                  productsData={itemSoldOptions}
                  onMonthlyYearlyTabChange={onMonthlyYearlyTabChange}
                  onProductSelectChange={onProductSelectChange}
                  onIncreaseOrDecreaseYear={onIncreaseOrDecreaseYear}
                  source={isRoleInputSupplier ? "input_name" : "name"}
                  metaSource="id"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <AjChartComponent
                  sx={dashboardStyles.chartBox}
                  chartId="sales"
                  chartData={
                    isRoleInputSupplier
                      ? chartSalesRevenueDataFromStore?.inputSold
                      : chartSalesRevenueDataFromStore?.productSold
                  }
                />
              </Grid>
              <Grid item xs={12} md={6} sx={dashboardStyles.showOnlyInMobile}>
                <Box sx={dashboardStyles.dashboardSubInfo}>
                  <Typography sx={dashboardStyles.dashboardSubInfoText}>
                    {`Total revenue (${getCurrencySymbol(
                      userData?.currency
                    )}) generated overtime `}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <AjChartComponent
                  sx={dashboardStyles.chartBox}
                  chartId="revenue"
                  chartData={chartSalesRevenueDataFromStore?.revenueEarned}
                />
              </Grid>
            </>
          ) : (
            <Box
              sx={{
                ...commonStyles.noContentBox,
                height: "10rem",
                width: "100%",
              }}
            >
              <AjTypography
                displayText="No data found"
                styleData={commonStyles.noDataText}
              />
            </Box>
          )}
          <Grid item xs={12} md={6}>
            <Box sx={dashboardStyles.dashboardSubInfo}>
              <Typography sx={dashboardStyles.dashboardSubInfoText}>
                {`Total quantity ${
                  chartItemAggregatedItemIdUnit
                    ? `( ${textCapitalize(chartItemAggregatedItemIdUnit)} ) `
                    : ""
                }of a ${isRoleInputSupplier ? "input" : "product"}
                aggregated overtime `}
              </Typography>
            </Box>
            {itemAggregatedOptions?.length ? (
              <>
                <AjChartFilter
                  data={chartItemAggregatedData}
                  id="productAggregate"
                  productId={chartItemAggregatedItemId}
                  productsData={itemAggregatedOptions}
                  onMonthlyYearlyTabChange={onMonthlyYearlyTabChange}
                  onProductSelectChange={onProductSelectChange}
                  onIncreaseOrDecreaseYear={onIncreaseOrDecreaseYear}
                  source={isRoleInputSupplier ? "input_name" : "product_name"}
                  metaSource="id"
                />
                <AjChartComponent
                  sx={dashboardStyles.chartBox}
                  chartId="productAggregate"
                  chartData={
                    isRoleInputSupplier
                      ? chartItemAggregatedData?.inputAggregated
                      : chartItemAggregatedData?.productAggregate
                  }
                />
              </>
            ) : (
              <Box
                sx={{
                  ...commonStyles.noContentBox,
                  height: "10rem",
                }}
              >
                <AjTypography
                  displayText="No data found"
                  styleData={commonStyles.noDataText}
                />
              </Box>
            )}
          </Grid>
          {userData?.role_id === ROLES?.FARMING_ASSOCIATION && (
            <Grid item xs={12} md={6}>
              <Box sx={dashboardStyles.dashboardSubInfo}>
                <Typography sx={dashboardStyles.dashboardSubInfoText}>
                  {`Total quantity ${
                    chartInputIdUnit
                      ? ` ( ${textCapitalize(chartInputIdUnit)} ) `
                      : ""
                  }of a input purchased overtime `}
                </Typography>
              </Box>
              {showSubModal && (
                <AjFarmerSubscriptionModal
                  open={open}
                  setOpen={setOpen}
                  setShowSubModal={setShowSubModal}
                />
              )}
              {isOpenModal && (
                <SelectedInputDetailById
                  setOpenModal={setOpenModal}
                  openModal={openModal}
                  id={id}
                  type={"input"}
                />
              )}
              {!!inputListOptions?.totalCount ? (
                <>
                  {chartInputId && (
                    <AjChartFilter
                      data={chartInputPurchasedData}
                      id="inputPurchased"
                      productId={chartInputId}
                      productsData={inputListOptions?.result}
                      onMonthlyYearlyTabChange={onMonthlyYearlyTabChange}
                      onProductSelectChange={onProductSelectChange}
                      onIncreaseOrDecreaseYear={onIncreaseOrDecreaseYear}
                      source="name"
                      metaSource="id"
                    />
                  )}
                  <AjChartComponent
                    sx={dashboardStyles.chartBox}
                    chartId="inputPurchased"
                    chartData={chartinputPurchasedDataFromStore?.inputPurchased}
                  />
                </>
              ) : (
                <Box
                  sx={{
                    ...commonStyles.noContentBox,
                    height: "10rem",
                  }}
                >
                  <AjTypography
                    displayText="No data found"
                    styleData={commonStyles.noDataText}
                  />
                </Box>
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
