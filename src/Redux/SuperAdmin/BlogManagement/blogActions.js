import { showToast } from "../../../Services/toast";
import * as types from "./types";
import call from "../../../API";
import { BLOG_MANAGEMENT } from "../../../Routes/Routes";
import {
  getDataFromSessionStorage,
  removeItemFromSessionStorage,
} from "../../../Services/localStorageService";
import { getToken } from "../../../Auth/getToken";


export const getBlogList = (data) => {
  return {
    type: types.GET_BLOG_LIST,
    payload: data,
  };
};

export const getSpottedBlog = (data) => {
  return {
    type: types.GET_SPOTTED_BLOG,
    payload: data,
  };
};

export const getBlogDetailById = (data) => {
  return {
    type: types.GET_BLOG_DETAIL_BYID,
    payload: data,
  };
};

export const addBlog = (data) => {
  return {
    type: types.ADD_BLOG,
    payload: data,
  };
};

export const getBlogPostsListAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/public/blogs",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getBlogList(res?.body?.data));
          dispatch(getSpottedBlog(res?.body?.data?.blogs[0]));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};


export const deleteBlogAction = (id) => {
  const post_id = id;
  return (dispatch) => {
    call({
      method: "post",
      endpoint: `api/blog/delete/${id}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast(`You have successfully deleted the post with id: ${post_id}`)
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getBlogDetailByIdAction = (blogId) => {
 
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/public/blog/${parseInt(blogId)}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getBlogDetailById(res?.body?.data?.blog));
        }
      })

      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const addBlogAction = (data, navigate) => {
  const token = getToken();
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/blog",
      payload: data,
      token: token,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Blog added successfully", "success");
          navigate(BLOG_MANAGEMENT);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const editDataByIdAction = (blogId, data, navigate) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/blog/${blogId}`,
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Blog updated successfully", "success");
        }
        removeItemFromSessionStorage("forEditBlogData");
        navigate(BLOG_MANAGEMENT);
      })

      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const updateToBeEditedValueFromSessionStorge = () => {
  const data = getDataFromSessionStorage("forEditBlogData");
  return {
    type: types.UPDATE_TO_BE_EDITED_VALUE_FROM_SESSION_STORAGE,
    payload: data,
  };
};
