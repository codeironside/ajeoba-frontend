import * as types from "./types";
import call from "../../../API";
import { showToast } from "../../../Services/toast";
import { getToken } from "../../../Auth/getToken";

export const getDashboardHeaderList = (headerList) => {
  return {
    type: types.GET_DASHBOARD_HEADER_LIST,
    payload: headerList,
  };
};

export const getInputList = (inputList) => {
  return {
    type: types.GET_INPUT_LIST_DATA,
    payload: inputList,
  };
};

export const getDashBoardlist = (allfarmers) => {
  return {
    type: types.GET_FARMER_DASHBOARD,
    payload: allfarmers,
  };
};

export const getSalesAndRevenueData = (salesAndRevenue) => {
  return {
    type: types.GET_SALES_AND_REVENUE_DATA,
    payload: salesAndRevenue,
  };
};

export const getProductAggregatedData = (productAggregated) => {
  return {
    type: types.GET_PRODUCT_AGGREGATED_DATA,
    payload: productAggregated,
  };
};

export const getInputPurchasedData = (inputPurchased) => {
  return {
    type: types.GET_INPUT_PURCHASED_DATA,
    payload: inputPurchased,
  };
};

export const getProductSoldData = (productSoldOptions) => {
  return {
    type: types.GET_PRODUCT_SOLD_OPTIONS,
    payload: productSoldOptions,
  };
};
export const getProductAggregatedOptionsData = (productAggOptions) => {
  return {
    type: types.GET_PRODUCT_AGGREGATED_OPTIONS,
    payload: productAggOptions,
  };
};

export const getBalance = (balance) => {
  return {
    type: types.GET_BALANCE,
    payload: balance,
  };
};

export const getAssociationDetails = (associationDetails) => {
  return {
    type: types.GET_ASSOCIATION_DETAILS,
    payload: associationDetails,
  };
};

export const getTransactionHistory = (history) => {
  return {
    type: types.GET_TRANSACTION_HISTORY,
    payload: history,
  };
};
export const getAccountDetails = (accountDetails) => {
  return {
    type: types.GET_ACCOUNT_DETAILS,
    payload: accountDetails,
  };
};
export const updateLoadingState = (data) => {
  return {
    type: types.GET_LOADING_STATE,
    payload: data,
  };
};


export const getInputPurchasedDataAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/dashboard/inputPurchased",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getInputPurchasedData(res.body.data.result));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
export const getProductSoldAction = (reqBody, isRoleInputSupplier) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: isRoleInputSupplier
        ? "api/inputs-sold/input-supplier"
        : "api/dashboard/sold/products",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getProductSoldData(res.body.result.result));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
export const getProductAggregatedOptionsAction = (
  reqBody,
  isRoleInputSupplier
) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: isRoleInputSupplier
        ? "api/inputs-aggregated/input-supplier"
        : "api/dashboard/aggregated/products",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getProductAggregatedOptionsData(res.body.result.result));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getProductAggregatedDataAction = (
  reqBody,
  isRoleInputSupplier
) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: isRoleInputSupplier
        ? "api/dashboard/input/quantity/aggregated"
        : "api/dashboard/quantityAggregate",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getProductAggregatedData(res.body.data.result));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getSalesAndRevenueDataAction = (reqBody, isInputSupplier) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: isInputSupplier
        ? "api/dashboard/input/QuantitySold"
        : "api/dashboard/QuantitySold",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getSalesAndRevenueData(res.body.data.result));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getDashboardHeaderListAction = (isInput) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: isInput
        ? "api/dashboard/input/totalCount"
        : "api/dashboard/totalCount",
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getDashboardHeaderList(res.body.data.result));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getInputListAction = () => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/inputs/farming-association",
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getInputList(res.body.result));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getDashBoardlistAction = (reqBody = { type: "FARMER" }) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/farmers",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getDashBoardlist(res.body.data.result.length));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getBalanceAction = () => {
  return (dispatch) => {
    const token = getToken();
    call({
      method: "get",
      endpoint: "api/payment/wallet",
      token: token,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getBalance(res.body));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getAssociationDetailsAction = () => {
  return (dispatch) => {
    const token = getToken();
    call({
      method: "get",
      endpoint: "api/users/profile/getUserProfile",
      token: token,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAssociationDetails(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getTransactionHistoryAction = (reqBody) => {
  return (dispatch) => {
    const token = getToken();
    call({
      method: "get",
      endpoint: "api/payment/wallet/transactions",
      token: token,
      dispatch,
      query: reqBody,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getTransactionHistory(res.body.transactions));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getAccountDetailsAction = (userRole, id) => {
  return (dispatch) => {
    const token = getToken();
     dispatch(updateLoadingState(true));
    call({
      method: "get",
      endpoint: `api/payment/bank?farmerId=${id}&userType=${userRole}`,
      token: token,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAccountDetails(res.body.bank));
        }
          dispatch(updateLoadingState(false));
      })
      .catch((err) => {
          dispatch(updateLoadingState(false));
        if (err.message === "Bank not found") {
          return null;
        } else {
          showToast(err.message, "error");
        }
      });
  };
};
