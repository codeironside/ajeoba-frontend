import { showToast } from "../../../Services/toast";
import * as types from "./types";
import call from "../../../API";
import { INPUT_MASTER } from "../../../Routes/Routes";
import { getToken } from "../../../Auth/getToken";

export const getInputList = (inputListRes) => {
  return {
    type: types.GET_INPUT_LIST,
    payload: inputListRes,
  };
};

export const getInputDetailsById = (data) => {
  return {
    type: types.GET_INPUT_DETAILS_BY_ID,
    payload: data,
  };
};

export const getInputListAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/inputs",
      query: reqBody,
      token: getToken(),
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getInputList(res?.body?.result));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const toggleInputStatusAction = (inputId, status) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/input/${inputId}/status`,
      payload: { status: status },
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Status updated successfully", "success");
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const addInput = (data, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/input",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Input Added Successfully", "success");
          navigate(INPUT_MASTER);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getInputByIdAction = (inputId) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/admin/input/${inputId}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getInputDetailsById(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const editInput = (id, data, navigate) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/admin/input/${id}`,
      payload: data,
      dispatch,
      navigate,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Input Updated Successfully", "success");
          setTimeout(() => {
            dispatch(getInputByIdAction(id));
          });
          navigate(INPUT_MASTER);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
