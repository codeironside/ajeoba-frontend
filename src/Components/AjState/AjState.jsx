import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AjInputLabel from "../AjInputLabel";
import AjSearchInput from "../AjSearchInput";

import { commonStyles } from "../../Style/CommonStyle";

import { getStates } from "../../Redux/common/States/getStateActions";
import * as _ from "lodash";

function AjState(props) {
  const dispatch = useDispatch();
  const [myState, setMyState] = useState(null);

  const stateMenuOptions = useSelector(
    (state) => state.states.stateMenuOptions || null
  );
  
  useEffect(() => {
    if (props.codeOfCountry) {
      dispatch(getStates(props.codeOfCountry));
    }
  }, [props.codeOfCountry]);

  useEffect(() => {
    if (props.reset) {
      setStateData(null);
    }
  }, [props.reset]);

  useEffect(() => {
    if (props.defaultValue && stateMenuOptions) {
      setData();
    }
  }, [stateMenuOptions, props.defaultValue, props.cancel]);

  useEffect(() => {
    if (props.cancel && stateMenuOptions) {
      setData();
    }
  }, [stateMenuOptions, props.cancel]);

  const setData = () => {
    const state = _.find(stateMenuOptions, {
      stateId: props.defaultValue,
    });
    if (state) {
      setStateData(state);
    }
  }

  const stateCodeChangeHandler = (_event, selectedState) => {
    setStateData(selectedState);
  };

  const setStateData = (data) => {
    setMyState(data);
    if (data) {
      props.onStateSelect(data);
    }
  };

  return (
    <>
      <AjInputLabel
        displayText={props.displayText}
        // required
        styleData={commonStyles.inputLabel}
      />
      <AjSearchInput
        displayText="Type to search"
        id="state"
        name="state"
        value={myState}
        onChange={stateCodeChangeHandler}
        styleData={{ ...commonStyles.searchDropdownInput, ...props.styleData }}
        source="stateName"
        readOnly={props.readOnly}
        options={stateMenuOptions || []}
      />
      
    </>
  );
}

export default AjState;
