import * as types from "./types";
import { updateObject } from "../utility";

const initialState = {
  wareHouseDetails: null,
  wareHousesList: {},
};

const getWareHousesList = (state, action) => {
    return updateObject(state, {
      wareHousesList: action.payload,
    });
  };

  const getWareHouseDetails = (state, action) => {
    return updateObject(state, {
      wareHouseDetails: action.payload,
    });
  };

const wareHouseReducer = (state = initialState, action = {}) => {
  switch(action.type){
    case types.GET_WAREHOUSES_LIST:
      return getWareHousesList(state, action);
    case types.GET_WAREHOUSE_DETAILS:
      return getWareHouseDetails(state, action);
    default:
      return state;
  }
};

export default wareHouseReducer;
