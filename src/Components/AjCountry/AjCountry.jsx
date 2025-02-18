import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AjInputLabel from "../AjInputLabel";
import AjSearchInput from "../AjSearchInput";

import { commonStyles } from "../../Style/CommonStyle";

import { getCountries } from "../../Redux/common/Countries/getCountriesActions";
import * as _ from "lodash";

function AjCountry(props) {
  const dispatch = useDispatch();

  const [myCountry, setMyCountry] = useState(null);

  const countryMenuOptions = useSelector(
    (state) => state.countries.countryMenuOptions || null
  );

  useEffect(() => {
    if (countryMenuOptions && countryMenuOptions.length) {
      return;
    }
    dispatch(getCountries());
  }, []);

  useEffect(() => {
    if (props.defaultValue && countryMenuOptions) {
      setData();
    }
  }, [countryMenuOptions, props.defaultValue]);

  useEffect(() => {
    if (props.cancel && countryMenuOptions) {
      setData();
    }
  }, [countryMenuOptions, props.cancel]);

  const setData = () => {
    const country = _.find(countryMenuOptions, {
      countryId: props.defaultValue,
    });
    if (country) {
      setCountryData(country, true);
    } else {
      setCountryData(null, false);
    }
  };

  const countryCodeChangeHandler = (_event, selectedCountry) => {
    setCountryData(selectedCountry, false);
  };

  const setCountryData = (data, fromDefault) => {
    setMyCountry(data);
    if (data) {
      props.onCountrySelect(data, fromDefault);
    }
  };

  return (
    <>
      <AjInputLabel
        displayText={props.displayText}
        required={props.required === false ? false : true}
        styleData={props.labelStyle || commonStyles.inputLabel}
      />
      <AjSearchInput
        clearIcon={<></>}
        id="country"
        name="country"
        value={myCountry}
        displayText="Type to search"
        styleData={{ ...commonStyles.searchDropdownInput, ...props.styleData }}
        uneditable={props.uneditable}
        onChange={countryCodeChangeHandler}
        source="countryName"
        options={countryMenuOptions || []}
      />
    </>
  );
}

export default AjCountry;
