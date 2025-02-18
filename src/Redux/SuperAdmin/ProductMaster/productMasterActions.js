import { showToast } from "../../../Services/toast";
import call from "../../../API";
import { PRODUCT_MASTER } from "../../../Routes/Routes";
import * as types from "./types";

export const getProductDetailsById = (data) => {
  return {
    type: types.GET_PRODUCT_DETAILS_BY_ID,
    payload: data,
  };
};

export const toggleProductStatusAction = (productId, status) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/product/${productId}/status`,
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

export const addProducts = (data, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/product",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Product Added Successfully", "success");
          navigate(PRODUCT_MASTER);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getProductByIdAction = (productId) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/admin/product/${productId}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getProductDetailsById(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const editProduct = (id, data, navigate) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/admin/product/${id}`,
      payload: data,
      dispatch,
      navigate,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Product Updated Successfully", "success");
          setTimeout(() => {
            dispatch(getProductByIdAction(id));
          });
          navigate(PRODUCT_MASTER);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
