import * as types from "./types";
import { updateObject } from "../../utility";

const initialState = {
  allSubscriptions: null,
  allSubscriptionsLength: null,
  subscriptionCurrency: null,
  farmersSubscriptions: null,
  farmerSubscriptionInfo: null,
  farmerSubscriptionDetail: null,
  farmerSubscriptionIndex: null,
};

const getAllSubscriptionDetails = (state, action) => {
  return updateObject(state, {
    allSubscriptions: action.payload,
  });
};

const allSubscriptionsLength = (state, action) => {
  return updateObject(state, {
    allSubscriptionsLength: action.payload,
  });
};

const subscriptionsCurrency = (state, action) => {
  return updateObject(state, {
    subscriptionCurrency: action.payload,
  });
};
const farmersSubscription = (state, action) => {
  return updateObject(state, {
    farmerSubscription: action.payload,
  });
};

const getFarmersSubscriptionInfo = (state, action) => {
  return updateObject(state, {
    farmerSubscriptionInfo: action.payload,
  });
};
const getFarmersSubscriptionDetail = (state, action) => {
  return updateObject(state, {
    farmerSubscriptionDetail: action.payload,
  });
};
const getFarmersSubscriptionIndex = (state, action) => {
  return updateObject(state, {
    farmerSubscriptionIndex: action.payload,
  });
};

const subscriptionReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_ALL_SUBSCRIPTIONS)
    return getAllSubscriptionDetails(state, action);
  if (action.type === types.ALL_SUBSCRIPTIONS_LENGTH)
    return allSubscriptionsLength(state, action);
  if (action.type === types.SUBSCRIPTION_CURRENCY)
    return subscriptionsCurrency(state, action);
  if (action.type === types.FARMERS_SUBSCRIPTION)
    return farmersSubscription(state, action);
  if (action.type === types.FARMERS_SUBSCRIPTION_INFO)
    return getFarmersSubscriptionInfo(state, action);
  if (action.type === types.FARMERS_SUBSCRIPTION_DETAIL)
    return getFarmersSubscriptionDetail(state, action);
  if (action.type === types.FARMERS_SUBSCRIPTION_INDEX)
    return getFarmersSubscriptionIndex(state, action);
  return state;
};

export default subscriptionReducer;
