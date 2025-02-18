import { updateObject } from "../../utility";
import * as types from "./types";

const initialState = {
  countryId: null,
  codeOfCountry: "",
  countryCode: "",
  countryMenuOptions: null,
  isLoadingCountryOptions: false,
  isErrorGettingCountryData: false,
  allCountries: null,
};

const isLoadingCountryOptions = (state, action) => {
  return updateObject(state, {
    isLoadingCountryOptions: action.payload,
  });
};

const isErrorGettingCountryOptions = (state, action) => {
  return updateObject(state, {
    isErrorGettingCountryData: action.payload,
  });
};

const getCountries = (state, action) => {
  return updateObject(state, {
    countryMenuOptions: action.payload,
  });
};

const getAllCountries = (state, action) => {
  return updateObject(state, {
    allCountries: action.payload,
  });
};

const setCountryCode = (state, action) => {
  return updateObject(state, {
    countryCode: action.payload,
  });
};
const setCodeOfCountry = (state, action) => {
  return updateObject(state, {
    codeOfCountry: action.payload,
  });
};

const setCountryId = (state, action) => {
  return updateObject(state, {
    countryId: action.payload,
  });
};

const getCountriesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_COUNTRIES:
      return getCountries(state, action);
    case types.IS_LOADING_COUNTRY_DATA:
      return isLoadingCountryOptions(state, action);
    case types.IS_ERROR_GETTING_COUNTRY_DATA:
      return isErrorGettingCountryOptions(state, action);
    case types.SET_COUNTRY_CODE:
      return setCountryCode(state, action);
    case types.SET_CODE_OF_COUNTRY:
      return setCodeOfCountry(state, action);
    case types.SET_COUNTRY_ID:
      return setCountryId(state, action);
    case types.GET_ALL_COUNTRIES:
      return getAllCountries(state, action);
    default:
      return state;
  }
};

export default getCountriesReducer;
