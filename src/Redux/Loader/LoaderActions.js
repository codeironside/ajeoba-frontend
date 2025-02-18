import * as types from "./types";

export const showLoader = (value) => {
  return {
    type: types.SHOW_LOADER,
    payload: value,
  };
};
