import { updateObject } from "../../utility";
import * as types from "./types";

const initialState = {
  landData: { landDetail: null, landListing: [] },
  productData: { singleProduct: null, productListing: [] },
  farmerList: {},
  farmersOtpData: null,
  farmersOtpId: null,
  farmersDetailsData: null,
  selectedRefereesData: null,
  addFarmerFinalData: null,
};

const addLand = (state, action) => {
  return updateObject(state, {
    landData: action.payload,
  });
};

const updateLand = (state, action) => {
  return updateObject(state, {
    landData: action.payload,
  });
};

const addDetails = (state, action) => {
  return updateObject(state, {
    farmersDetailsData: action.payload,
  });
};

const updateDetails = (state, action) => {
  return updateObject(state, {
    farmersDetailsData: action.payload,
  });
};

const getFarmerOtpData = (state, action) => {
  return updateObject(state, {
    farmersOtpData: action.payload,
  });
};

const getFarmerOtpId = (state, action) => {
  return updateObject(state, {
    farmersOtpId: action.payload,
  });
};

const addSelectedRefereesData = (state, action) => {
  return updateObject(state, {
    selectedRefereesData: action.payload,
  });
};

const addCompleteRefereeOtpDetails = (state, action) => {
  return updateObject(state, {
    completeRefereeOtpDetails: action.payload,
  });
};

const productData = (state, action) => {
  return updateObject(state, {
    productData: action.payload,
  });
};

const updateProduct = (state, action) => {
  return updateObject(state, {
    productData: action.payload,
  });
};

const getFarmerList = (state, action) => {
  return updateObject(state, {
    farmerList: action.payload,
  });
};

const setLandDataById = (state, action) => {
  return updateObject(state, {
    landData: { ...state.landData, ...action.payload },
  });
};

const setProductDataByFarmerId = (state, action) => {
  return updateObject(state, {
    productData: action.payload,
  });
};

const addFarmerkycVerification = (state, action) => {
  return updateObject(state, {
    addFarmerFinalData: action.payload,
  });
};

const farmersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.ADD_LAND:
      return addLand(state, action);
    case types.UPDATE_LAND:
      return updateLand(state, action);
    case types.ADD_FARMER_PERSONAL_DETAIL_ACTION:
      return addDetails(state, action);
    case types.RESET_ADD_FARMER_PERSONAL_DETAILS:
      return initialState;
    case types.UPDATE_ADD_FARMER_PERSONAL_DETAILS:
      return updateDetails(state, action);
    case types.SELECTED_REFEREES_DATA:
      return addSelectedRefereesData(state, action);
    case types.COMPLETE_REFEREE_OTP_DETAILS:
        return addCompleteRefereeOtpDetails(state, action);
    case types.FARMER_OTP_DATA:
      return getFarmerOtpData(state, action);
    case types.FARMER_OTP_ID:
      return getFarmerOtpId(state, action);
    case types.ADD_PRODUCT:
      return productData(state, action);
    case types.UPDATE_PRODUCT:
      return updateProduct(state, action);
    case types.GET_FARMER_LIST:
      return getFarmerList(state, action);
    case types.ADD_FARMER:
      return addFarmerkycVerification(state, action);
    case types.SET_LAND_DATA_BY_ID:
      return setLandDataById(state, action);
    case types.SET_PRODUCT_DATA_BY_FARMER_ID:
      return setProductDataByFarmerId(state, action);
    default:
      return state;
  }
};

export default farmersReducer;
