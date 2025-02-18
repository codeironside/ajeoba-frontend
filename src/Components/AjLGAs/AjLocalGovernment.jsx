import React, { useEffect, useState } from "react";

import AjInputLabel from "../AjInputLabel";
import AjSearchInput from "../AjSearchInput";

import { commonStyles } from "../../Style/CommonStyle";
import useLgaDetails from  '../../Hooks/useLocalGovernment'
import * as _ from "lodash";


function AjLocalGovernment(props) {
  const [lgData] = useLgaDetails(props.stateName);

  const [myLgas, setMyLgas] = useState(null);
  
  const options = lgData.map((lg) => ({ value: lg }));

  useEffect(() => {
    if (props.reset) {
      setLgaData(null);
    }
  }, [props.reset]);

  useEffect(() => {
    if (props.defaultValue && options) {
      setData();
    }
  }, [options, props.defaultValue, props.cancel]);

  useEffect(() => {
    if (props.cancel && options) {
      setData();
    }
  }, [options, props.cancel]);
  
  const setLgaData = (selectedLGA) => {
   setMyLgas(selectedLGA);
    if (selectedLGA) {
      props.onLgaSelect(selectedLGA);
    }
  }

  const lgaChangeHandler = (_event, selectedLGA) => {
    setLgaData(selectedLGA)  
  };

  const setData = () => {
    const lga = _.find(options, {id: props.defaultValue});
    if (lga) {
      setLgaData(lga);
    }
  }
  
  return (
    <>
      <AjInputLabel
        displayText={props.displayText}
        required
        styleData={commonStyles.inputLabel}
      />
      <AjSearchInput
        displayText="Type to search"
        id="lga"
        name="lga"
        value={myLgas}
        onChange={lgaChangeHandler}
        styleData={{ ...commonStyles.searchDropdownInput, ...props.styleData }}
        source="value"
        readOnly={props.readOnly}
        options={options || []}
    />
    </>
  );
}

export default AjLocalGovernment;

