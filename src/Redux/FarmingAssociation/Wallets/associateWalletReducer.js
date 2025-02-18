import { updateObject } from "../../utility";
import * as types from "./types";

const initialState = {
  withdrawObject: {
    id: null,
    userId: null,
    amount: null,
    bankDetails: {
      accountNumber: null,
      accountName: null,
      bankName: null,
    },
    password: null,
  },
  status: "ACTIVE",
};

const withdraw = (state, action) => {
  return updateObject(state, {
    withdrawObject: action.payload,
  });
};

const associateWithdrawReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.WITHDRAW:
      return withdraw(state, action);
    default:
      return state;
  }
};

export default associateWithdrawReducer;
