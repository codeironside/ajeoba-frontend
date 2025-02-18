import call from "../../../API";
import * as types from "./types";
import { showToast } from "../../../Services/toast";
import { encrypt } from "../../../Services/localStorageService";
import { PASSWORD_ENCRYPTION_SECRET } from "../../../Constant/AppConstant";
import { getToken } from "../../../Auth/getToken";

const getTradingActiveAds = (data) => {
  return {
    type: types.GET_TRADING_ACTIVE_ADS,
    payload: data,
  };
};

const getTradingOrderList = (data) => {
  return {
    type: types.GET_TRADING_ORDER_LIST,
    payload: data,
  };
};

const getTradingInputOrderList = (data) => {
  return {
    type: types.GET_TRADING_INPUT_ORDER_LIST,
    payload: data,
  };
};

const getTradingActiveAdDetailById = (data) => {
  return {
    type: types.GET_TRADING_ACTIVE_AD_DETAIL_BY_ID,
    payload: data,
  };
};

export const getOrderDetails = (res) => {
  return {
    type: types.GET_ORDER_DETAIL,
    payload: res,
  };
};

export const getOrderDetailsById = (res) => {
  return {
    type: types.GET_ORDER_DETAIL_BY_ID,
    payload: res,
  };
};
export const getTradingActiveAdsLandingPage = (data) => {
  return {
    type: types.GET_TRADING_ACTIVE_AD_LANDING_PAGE,
    payload: data,
  };
};
export const getProductListLandingPage = (data) => {
  return {
    type: types.GET_PRODUCT_LIST_LANDING_PAGE,
    payload: data,
  };
};

export const updateLoading = (data) => {
  return {
    type: types.LOADING,
    payload: data,
  };
};
export const updateLoadingproduct = (data) => {
  return {
    type: types.LOADING_PRODUCT,
    payload: data,
  };
};
export const updateLoadingProductsLandingPage = (data) => {
  return {
    type: types.LOADING_PRODUCT_LANDING_PAGE,
    payload: data,
  };
};

export const getInputListLandingPage = (data) => {
  return {
    type: types.GET_INPUT_LIST_LANDING_PAGE,
    payload: data,
  };
};

export const getAllOpenMarketPlaceProducts = (data) => {
  return {
    type: types.GET_ALL_PRODUCT_OPENMARKETPLACE,
    payload: data,
  };
};
export const getAllOpenMarketPlaceIdProducts = (data) => {
  return {
    type: types.GET_ALL_PRODUCT_OPENMARKETPLACE_DETAILS_BY_ID,
    payload: data,
  };
};

export const buyProductAction = (id, reqBody) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: `api/payment/product/${id}`,
      payload: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          const stringData = JSON.stringify(res.body.order_id);
          if (sessionStorage.getItem("logisticsDecision"))
            sessionStorage.removeItem("logisticsDecision");
          sessionStorage.setItem(
            "orderId",
            encrypt(stringData, PASSWORD_ENCRYPTION_SECRET)
          );
          window.location.href = res.body.data.link;
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const buyInputAction = (id, reqBody) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: `api/payment/input/${id}`,
      payload: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          const stringData = JSON.stringify(res.body.order_id);
          if (sessionStorage.getItem("logisticsDecision"))
            sessionStorage.removeItem("logisticsDecision");
          sessionStorage.setItem(
            "orderId",
            encrypt(stringData, PASSWORD_ENCRYPTION_SECRET)
          );
          window.location.href = res.body.data.link;
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getTradingActiveAdDetailByIdAction = (id) => {
  return (dispatch) => {
    dispatch(updateLoading(true))
    call({
      method: "get",
      endpoint: `api/trading/advertisement/${id}`,
      dispatch,
    })
      .then((res) => {
        dispatch(updateLoading(false))
        dispatch(getTradingActiveAdDetailById(res.body.data));
      })
      .catch((err) => {
        dispatch(updateLoading(false))
        showToast(err.message, "error");
      });
  };
};

export const getTradingActiveAdsAction = (reqBody) => {
  return (dispatch) => {
    dispatch(updateLoading(true))
    call({
      method: "get",
      endpoint: "api/public/trading/marketplace",
      // "api/trading/advertisement",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        dispatch(updateLoading(false))
        dispatch(getTradingActiveAds(res.body.data));
      })
      .catch((err) => {
        dispatch(updateLoading(false))
        showToast(err.message, "error");
      });
  };
};

export const getTradingOrderListAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/order",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        dispatch(getTradingOrderList(res.body.result));
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getTradingInputOrderListAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/input-order",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        dispatch(getTradingInputOrderList(res.body.result));
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getOrderDetailsAction = (id) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/order/${id}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getOrderDetails(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getOrderDetailsActionById = (id) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/product/order/${id}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getOrderDetailsById(res.body.result));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

// api/input-order/:orderId
export const getOrderInputDetailsActionById = (orderId) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/input-order/${orderId}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getOrderDetailsById(res.body.result));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getTradingActiveProductsAdsActionLandingPage = (reqBody) => {
  const token = getToken();
  return (dispatch) => {
    dispatch(updateLoadingProductsLandingPage(true));
    call({
      method: "get",
      endpoint: "api/public/trading/advertisement",
      query: reqBody,
      dispatch,
      token,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getTradingActiveAdsLandingPage(res.body.data));
        }
        dispatch(updateLoadingProductsLandingPage(false));
      })
      .catch((err) => {
        dispatch(updateLoadingProductsLandingPage(false));
        showToast(err.message, "error");
      });
  };
};
export const getProductListLandingPageAction = () => {
  const token = getToken();
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/public/products",
      dispatch,
      token,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getProductListLandingPage(res.body.result));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getInputListLandingPageAction = (reqBody) => {
  const token = getToken();
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/public/inputs",
      dispatch,
      token,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getInputListLandingPage(res?.body?.result));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getAllOpenMarketPlaceProductsActions = (reqBody) => {
  return (dispatch) => {
    dispatch(updateLoading(true));
    call({
      method: "get",
      endpoint: "api/public/trading/marketplace",
      headers: { Authorization: getToken() },
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAllOpenMarketPlaceProducts(res.body.data));
        }
        dispatch(updateLoading(false));
      })
      .catch((err) => {
        dispatch(updateLoading(false));
        showToast(err.message, "error");
      });
  };
};
export const getAllOpenMarketPlaceProductsIdActions = (id) => {
  return (dispatch) => {
    dispatch(updateLoadingproduct(true));
    call({
      method: "get",
      endpoint: `api/public/trading/advertisement/${id}`,
      // headers: { Authorization: getToken() },
      dispatch,
      // token,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            getAllOpenMarketPlaceIdProducts(res.body.data.AdvertisemetDetail)
          );
        }
        dispatch(updateLoadingproduct(false));
      })
      .catch((err) => {
        dispatch(updateLoadingproduct(false));
        showToast(err.message, "error");
      });
  };
};
