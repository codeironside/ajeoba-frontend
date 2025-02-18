import * as types from "./types";
import { updateObject } from "../../../utility";

const initialState = {
  associationDetails: null,
  farmerRefereeList: {},
  farmerRefereeDetails: null,
  farmerDetails: null,
};

const getAssociationDetails = (state, action) => {
  return updateObject(state, {
    associationDetails: action.payload,
  });
};

const getFarmerRefereeList = (state, action) => {
  return updateObject(state, {
    farmerRefereeList: action.payload,
  });
};

const getFarmerRefereeDetails = (state, action) => {
  return updateObject(state, {
    farmerRefereeDetails: action.payload,
  });
};

const getFarmerDetails = (state, action) => {
  return updateObject(state, {
    farmerDetails: action.payload,
  });
};

const farmingAssociationDetailReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_FARMING_ASSOCIATION) {
    return getAssociationDetails(state, action);
  } else if (action.type === types.GET_FARMER_REFEREE_LIST) {
    return getFarmerRefereeList(state, action);
  } else if (action.type === types.GET_REFEREE_FARMER_DETAILS) {
    return getFarmerRefereeDetails(state, action);
  } else if (action.type === types.GET_FARMER_DETAILS) {
    return getFarmerDetails(state, action);
  }
  return state;
};

export default farmingAssociationDetailReducer;
