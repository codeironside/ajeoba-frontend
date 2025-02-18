import * as types from "./types";
import call from "../../../API";
import { showToast } from "../../../Services/toast";
import { ADD_FARMER_KYC_VERIFICATION, FARMERS } from "../../../Routes/Routes";

export const addLand = (newLand) => {
  return {
    type: types.ADD_LAND,
    payload: newLand,
  };
};

export const updateLandAction = (land) => {
  return {
    type: types.UPDATE_LAND,
    payload: land,
  };
};

export const setLandDataById = (landData) => {
  return {
    type: types.SET_LAND_DATA_BY_ID,
    payload: landData,
  };
};

export const setProductDataByFarmerId = (data) => {
  return {
    type: types.SET_PRODUCT_DATA_BY_FARMER_ID,
    payload: data,
  };
};

export const addingFarmerDetails = (farmerDetails) => {
  return {
    type: types.ADD_FARMER_PERSONAL_DETAIL_ACTION,
    payload: farmerDetails,
  };
};

export const updateFarmerDetails = (farmerDetails) => {
  return {
    type: types.UPDATE_ADD_FARMER_PERSONAL_DETAILS,
    payload: farmerDetails,
  };
};

export const resetAddFarmerDetails = () => {
  return {
    type: types.RESET_ADD_FARMER_PERSONAL_DETAILS,
    payload: {},
  };
};

export const selectedRefereesData = (selectedRefereesResponse) => {
  return {
    type: types.SELECTED_REFEREES_DATA,
    payload: selectedRefereesResponse,
  };
};

export const completeRefereeOtpDetails = (
  completeRefereeOtpDetailsResponse
) => {
  return {
    type: types.COMPLETE_REFEREE_OTP_DETAILS,
    payload: completeRefereeOtpDetailsResponse,
  };
};

export const getFarmerOtpId = (farmerOtpId) => {
  return {
    type: types.FARMER_OTP_ID,
    payload: farmerOtpId,
  };
};

export const getFarmerOtpData = (farmerOtpData) => {
  return {
    type: types.FARMER_OTP_DATA,
    payload: farmerOtpData,
  };
};

export const updateProductAction = (land) => {
  return {
    type: types.UPDATE_PRODUCT,
    payload: land,
  };
};

export const addProduct = (product) => {
  return {
    type: types.ADD_PRODUCT,
    payload: product,
  };
};

export const getFarmerList = (farmerListRes) => {
  return {
    type: types.GET_FARMER_LIST,
    payload: farmerListRes,
  };
};

export const addFarmerkycVerification = (farmer) => {
  return {
    type: types.ADD_FARMER,
    payload: farmer,
  };
};

export const getFarmerListAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/farmers",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getFarmerList(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const toggleFarmerStatusAction = (farmerId, status) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/farmers/${farmerId}/status`,
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

export const addFarmerWithoutKycVerification = (reqBody, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/farmer",
      payload: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Farmer added successfully", "success");
          setTimeout(() => {
            navigate(FARMERS);
          }, 4000);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const addFarmerkycVerificationAction = (reqBody, navigate) => {
  console.log(reqBody)
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/farmer",
      payload: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(resetAddFarmerDetails());
          dispatch(addFarmerkycVerification(res.body.data));
          showToast("Farmer added successfully", "success");
          if (
            res.body.data?.farmerDetails &&
            !res.body.data.farmerDetails?.is_kyc_verified
          ) {
            setTimeout(() => {
              navigate(FARMERS);
            }, 4000);
          } else {
            setTimeout(() => {
              navigate(ADD_FARMER_KYC_VERIFICATION);
            }, 4000);
          }
        }
      })
      .catch((err) => {
        console.log(err)
        showToast(err.message, "error");
      });
  };
};
