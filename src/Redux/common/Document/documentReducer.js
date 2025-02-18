import * as types from "./types";
import { updateObject } from "../../../Redux/utility";

const initialState = {
  bulkCsvUploadApiResponse: null,
};

const setBulkCsvUploadApiResponse = (state, action) => {
  return updateObject(state, {
    bulkCsvUploadApiResponse: action.payload,
  });
};

const documentReducer = (state = initialState, action = {}) => {
  if (action.type === types.SET_BULK_UPLOAD_CSV_RESPONSE) {
    return setBulkCsvUploadApiResponse(state, action);
  } else {
    return state;
  }
};

export default documentReducer;
