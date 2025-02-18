import call from "../../../API";
import * as types from "./types";
import { showToast } from "../../../Services/toast";
import { getToken } from "../../../Auth/getToken";
import { PRODUCT_ORDER_QA } from "../../../Routes/Routes";

export const getProducts = (reqBody) => {
  console.log("reqBodyProduct: ", reqBody);
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/products",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: types.PRODUCTS_LENGTH,
            payload: res.body.result.totalCount,
          });
          const products = res.body.result.result.map((item) => {
            return {
              productId: item.id,
              productName: item.name,
              commission: item.commission,
              created_at: item.created_at,
              created_by: item.created_by,
              description: item.description,
              id: item.id,
              is_active: item.is_active,
              min_quantity_for_commission: item.min_quantity_for_commission,
              name: item.name,
              product_id: item.product_id,
              unit_of_measurement: item.unit_of_measurement,
              updated_at: item.updated_at,
              updated_by: item.updated_by,
              is_enabled: item.is_commission_active,
            };
          });
          dispatch({
            type: types.GET_PRODUCTS,
            payload: products,
          });
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getAdminProductOrderQa = (prodOrders) => {
  return {
    type: types.GET_PRODUCT_ORDERS_QA_ADMIN,
    payload: prodOrders,
  };
};

export const getAdminProductOrderQaLength = (prodOrdersLength) => {
  return {
    type: types.GET_PRODUCT_ORDERS_QA_ADMIN_LENGTH,
    payload: prodOrdersLength,
  };
};

export const getAdminProductOrderQaDetailsById = (res) => {
  return {
    type: types.GET_PRODUCT_ORDERS_QA_ADMIN_DETAILS,
    payload: res,
  };
};

export const getProdOrderQa = (productOrders) => {
  return {
    type: types.GET_PRODUCT_ORDER_QA,
    payload: productOrders,
  };
};

export const getAdminProductOrderQaActions = (reqBody) => {
  const token = getToken();
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/order",
      token: token,
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAdminProductOrderQa(res.body.result));
          dispatch(getAdminProductOrderQaLength(res.body.result.totalCount));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getAdminProductOrderQaDetailsByIdActions = (id) => {
  const token = getToken();
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/product/order/${id}`,
      token: token,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAdminProductOrderQaDetailsById(res.body.result));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getProdOrderQaActions = (reqBody) => {
  return (dispatch) => {
    const token = getToken();
    call({
      method: "get",
      endpoint: "api/product-order-qa",
      query: reqBody,
      token,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getProdOrderQa(res.body.result));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const submitOrderedProductQA = (reqBody, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/product/order-qa/report",
      payload: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast(res.message, "success");
          setTimeout(() => {
            navigate(PRODUCT_ORDER_QA);
          }, 4000);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
