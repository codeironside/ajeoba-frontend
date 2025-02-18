import * as types from "./types";
import { updateObject } from "../../utility";
import { getDataFromSessionStorage } from "../../../Services/localStorageService";

const initialState = {
  blogList: [],
  spottedBlog: null,
  blogDetail: null,
  toBeEditedData: getDataFromSessionStorage("forEditBlogData"),
};

const getBlogList = (state, action) => {
  return updateObject(state, {
    blogList: action.payload,
  });
};

const getSpottedBlog = (state, action) => {
  return updateObject(state, {
    spottedBlog: action.payload,
  });
};

const getBlogDetailById = (state, action) => {
  return updateObject(state, {
    blogDetail: action.payload,
  });
};

const updateToBeEditedValueFromSessionStorge = (state, action) => {
  return updateObject(state, {
    toBeEditedData: action.payload,
  });
};

const blogReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_BLOG_LIST) return getBlogList(state, action);
  else if (action.type === types.GET_SPOTTED_BLOG) return getSpottedBlog(state, action);
  else if (action.type === types.GET_BLOG_DETAIL_BYID) return getBlogDetailById(state, action);
  else if (action.type === types.UPDATE_TO_BE_EDITED_VALUE_FROM_SESSION_STORAGE)
    return updateToBeEditedValueFromSessionStorge(state, action);
  else return state;
};

export default blogReducer;
