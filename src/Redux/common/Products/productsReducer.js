import * as types from "./types";
import { updateObject } from "../../utility";

const initialState = {
  products: null,
  productsLength: null,
  prodOrders: null,
  prodOrdersLength: null,
  prodOrderDetail: null,
  productOrderdQA: null,
};

const getProducts = (state, action) => {
  return updateObject(state, {
    products: action.payload,
  });
};

const productsLength = (state, action) => {
  return updateObject(state, {
    productsLength: action.payload,
  });
};

const getAdminProductOrderQa = (state, action) => {
  return updateObject(state, {
    prodOrders: action.payload,
  });
};

const getAdminProductOrderQaLength = (state, action) => {
  return updateObject(state, {
    prodOrdersLength: action.payload,
  });
};

const getAdminProductOrderQaDetailsById = (state, action) => {
  return updateObject(state, {
    prodOrderDetail: action.payload,
  });
};

const getProdOrderQa = (state, action) => {
  return updateObject(state, {
    productOrders: action.payload,
  });
};

const productsReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_PRODUCTS) {
    return getProducts(state, action);
  } else if (action.type === types.PRODUCTS_LENGTH) {
    return productsLength(state, action);
  } else if (action.type === types.GET_PRODUCT_ORDERS_QA_ADMIN) {
    return getAdminProductOrderQa(state, action);
  } else if (action.type === types.GET_PRODUCT_ORDERS_QA_ADMIN_LENGTH) {
    return getAdminProductOrderQaLength(state, action);
  } else if (action.type === types.GET_PRODUCT_ORDERS_QA_ADMIN_DETAILS) {
    return getAdminProductOrderQaDetailsById(state, action);
  } else if (action.type === types.GET_PRODUCT_ORDER_QA) {
    return getProdOrderQa(state, action);
  } else {
    return state;
  }
};

export default productsReducer;
