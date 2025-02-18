import superagent from "superagent";
import { getToken } from "../Auth/getToken";
import { showLoader } from "../Redux/Loader/LoaderActions";
import {
  logout,
  updateUserStatus,
} from "../Services/commonService/commonService";

/*
 * @function "call" common method that makes api requests
 * @param {object} "request" stores the request 'method','endpoint', 'payload', 'query',
 * 'token' as keys...'
 */

export default function call({
  method = "get",
  url,
  endpoint,
  payload,
  query,
  token,
  type = "application/json",
  dispatch,
}) {
  const _url = url || `${process.env.REACT_APP_BASE_URL}/${endpoint}`;
  const _apiRequest = superagent(method, _url);
  return new Promise((resolve, reject) => {
    if (type && type.length) {
      _apiRequest.set("Content-Type", type);
    }
    dispatch(showLoader(true));
    _apiRequest
      .set("Authorization", `${token || getToken()}`)
      .send(payload)
      .query(query)
      .then((res) => {
        resolve(res);
        if (res?.body?.userStatus) {
          updateUserStatus(res?.body?.userStatus, dispatch);
        }
      })
      .then(() => {
        dispatch(showLoader(false));
      })
      .catch((error) => {
        dispatch(showLoader(false));
        if (
          error?.response?.statusCode === 401 &&
          error?.response?.body?.code === "UNAUTHORIZED"
        ) {
          logout();
        }
        let errorBody;
        if (
          error?.response?.statusCode === 500 ||
          error?.response?.body?.code === "INTERNAL" ||
          error?.response?.body?.code === "INTERNAL_ERROR"
        ) {
          errorBody = { message: "Something went wrong" };
        } else errorBody = (error?.response && error?.response?.body) || {};
        reject(errorBody);
      });
  });
}
