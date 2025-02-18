import * as types from "./types";

export const setStatus = (status) => {
  return {
    type: types.SET_STATUS,
    payload: status,
  };
};
