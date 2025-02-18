import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AjInputLabel from "../AjInputLabel";
import AjSearchInput from "../AjSearchInput";
import { commonStyles } from "../../Style/CommonStyle";
import * as _ from "lodash";

function AjDecision(props) {
    
  const [decision, setDecision] = useState(null);

  const decisionChangeHandler = (e, selectedDecision) => {
    setDecisionSelect(selectedDecision);
  };

  const setDecisionSelect = (data) => {
    setDecision(data);
    if (data) {
      props.onDecisionSelect(data);
    }
  };

    return (
        <>
            <AjInputLabel
                displayText={"Your Decision"}
                required
                styleData={commonStyles.inputLabel}
            />
            <AjSearchInput
                required
                displayText="Type to search"
                id="decision"
                name="decision"
                source="label"
                value={decision}
                onChange={decisionChangeHandler}
                styleData={{ ...commonStyles.searchDropdownInput, ...props.styleData }}
                readOnly={props.readOnly}
                options={props.data ? props.data : []}
            />
        </>
    );
}

export default AjDecision;

