import call from "../../../API";
import * as types from "./types";

export const getAllCountriesSignUpBuyer = (payload) => {
  return {
    type: types.GET_ALL_COUNTRIES,
    payload
  };
};

export const isLoadingCountryData = (payload) => {
  return {
    type: types.IS_LOADING_COUNTRY_DATA,
    payload,
  };
};

export const isErrorGettingCountryData = (payload) => {
  return {
    type: types.IS_ERROR_GETTING_COUNTRY_DATA,
    payload,
  };
};

export const setCountryCode = (value) => {
  return {
    type: types.SET_COUNTRY_CODE,
    payload: value,
  };
};
export const setCodeOfCountry = (value) => {
  return {
    type: types.SET_CODE_OF_COUNTRY,
    payload: value,
  };
};

export const setCountryId = (value) => {
  return {
    type: types.SET_COUNTRY_ID,
    payload: value,
  };
};

export const getCountries = () => {
  return (dispatch) => {
    dispatch(isLoadingCountryData(true));
    call({
      method: "get",
      endpoint: "api/public/countries",
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(isLoadingCountryData(false));
          dispatch(isErrorGettingCountryData(false));
          const country = res.body.result.map((item) => {
            return {
              countryId: item.id,
              countryName: item.name,
              countryCode: item.phone_code,
              codeOfCountry: item.country_code,
              label:
                item.phone_code +
                "             " +
                item.name +
                " (" +
                item.country_code +
                ")",
            };
          });
          dispatch({
            type: types.GET_COUNTRIES,
            payload: country,
          });
        }
      })
      .catch((err) => {
        dispatch(isLoadingCountryData(false));
        dispatch(isErrorGettingCountryData(true));
      });
  };
};

export const getAllCountriesSignUpBuyerActions = () => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/public/countries?allCountries=true",
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAllCountriesSignUpBuyer(res.body.result));
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};
