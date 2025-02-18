import * as types from "./types";
import call from "../../../API";
import { showToast } from "../../../Services/toast";
import { getToken } from "../../../Auth/getToken";
import axios from "axios";

export const setBulkUploadCsvApiResponse = (value) => {
  return {
    type: types.SET_BULK_UPLOAD_CSV_RESPONSE,
    payload: value,
  };
};

export const uploadImage = (formData, docType, dispatch) => {
  return call({
    method: "post",
    endpoint: "api/file",
    payload: formData,
    query: { type: docType },
    type: "",
    dispatch,
  }).catch((err) => {
    showToast(err.message, "error");
  });
};
export const uploadImageInputsupply = (formData, docType, dispatch) => {
  return call({
    method: "post",
    endpoint: "api/public/file-upload",
    payload: formData,
    query: { type: docType },
    type: "",
    dispatch,
  }).catch((err) => {
    showToast(err.message, "error");
  });
};

export const downloadImage = (docKey, docName, isDownload) => {
  return (dispatch) => {
    dispatch({ type: 'DOWNLOAD_FILE_REQUEST' });

  axios({
    url: `${process.env.REACT_APP_BASE_URL}/api/file/${docKey}?download=${isDownload}`,
    method: "GET",
    responseType: "blob",
    headers: { Authorization: getToken() },
  }).then((response) => {
    if (!docName.includes(".")) {
      const extension = response.data.type.split("/")[1];
      docName = `${docName}.${extension}`;
    }
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", docName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};
};

export const uploadCsv = (data, apiCallFor) => {
  let endpoint;
  if (apiCallFor === "products") {
    endpoint = "api/product/bulk";
  } else if (apiCallFor === "items") {
    endpoint = "api/item/bulk";
  } else if (apiCallFor === "inputs") {
    endpoint = "api/input/bulk";
  } else if (apiCallFor === "farmers") {
    endpoint = "api/farmer/bulk";
  }

  return (dispatch) => {
    call({
      method: "post",
      endpoint: endpoint,
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(setBulkUploadCsvApiResponse(res.body));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const exportExcelCsvDoc = (url, filterText, isCsv) => {
  axios({
    url: `${process.env.REACT_APP_BASE_URL}${url}`,
    method: "GET",
    responseType: "blob",
    headers: { Authorization: getToken() },
    params: filterText,
  })
    .then((res) => {
      if (res.status === 200) {
        const extractFileName =
          res.headers["content-disposition"].split("filename=")[1];
        const filteredFileName = extractFileName.slice(0, -1);
        const docUrl = window.URL.createObjectURL(
          new Blob([res.data], {
            type:
              isCsv.isCsv === "true"
                ? "text/csv"
                : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          })
        );
        const link = document.createElement("a");
        link.href = docUrl;
        link.setAttribute("download", filteredFileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    })
    .catch((err) => {
      showToast(err.message, "error");
    });
};
