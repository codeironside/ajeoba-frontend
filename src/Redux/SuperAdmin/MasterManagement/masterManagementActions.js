import * as types from "./types";
import call from "../../../API";
import { showToast } from "../../../Services/toast";
import { MASTER_MANAGEMENT } from "../../../Routes/Routes";

export const getItemList = (ItemListRes) => {
  return {
    type: types.GET_ITEM_LIST,
    payload: ItemListRes,
  };
};

export const getItemsDetailsById = (data) => {
  return {
    type: types.GET_ITEMS_DETAILS_BY_ID,
    payload: data,
  };
};

export const getItemListAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/item",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getItemList(res?.body?.result));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const toggleItemStatusAction = (itemId, status) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/item/${itemId}/status`,
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

export const addItems = (data, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/item",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Item Added Successfully", "success");
          navigate(MASTER_MANAGEMENT);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getItemByIdAction = (itemId) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/admin/item/${itemId}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getItemsDetailsById(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const editItems = (id, data, navigate) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/admin/item/${id}`,
      payload: data,
      dispatch,
      navigate,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Item Updated Successfully", "success");
          setTimeout(() => {
            dispatch(getItemByIdAction(id));
          });
          navigate(MASTER_MANAGEMENT);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
