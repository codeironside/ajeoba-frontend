import * as types from "./types";
import { updateObject } from "../../utility";

const initialState = {
  inventoryList: {},
  batchList: {},
  inventoryWarehouseList: {},
  batchDetail: null,
};

const getInventoryList = (state, action) => {
  return updateObject(state, {
    inventoryList: action.payload,
  });
};

const getBatchList = (state, action) => {
  return updateObject(state, {
    batchList: action.payload,
  });
};

const deleteBatch = (state, action) => {
  return updateObject(state, {
    batchList: action.payload,
  });
};

const getInventoryWarehouseList = (state, action) => {
  return updateObject(state, {
    inventoryWarehouseList: action.payload,
  });
};

const getBatchDetail = (state, action) => {
  return updateObject(state, {
    batchDetail: action.payload,
  });
};

const inventoryReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_INVENTORY_LIST:
      return getInventoryList(state, action);
    case types.GET_BATCH_DETAIL:
      return getBatchDetail(state, action);
    case types.GET_BATCH_LIST:
      return getBatchList(state, action);
    case types.DELETE_BATCH:
      return deleteBatch(state, action);
    case types.GET_INVENTORY_WAREHOUSES_LIST:
      return getInventoryWarehouseList(state, action);
    default:
      return state;
  }
};

export default inventoryReducer;
