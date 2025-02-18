import call from "../../../API";
import * as types from "./types";
import { showToast } from "../../../Services/toast";

export const getStates = (countryCode) => {
  return (dispatch) => {
    const dataToSend = {
      countryCode: countryCode,
    };
    return call({
      method: "post",
      endpoint: "api/public/states",
      payload: dataToSend,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          const states = res.body.result.map((item) => {
            return {
              stateId: item.id,
              stateName: item.name,
              stateCode: item.state_code,
              label:
                item.state_code +
                "             " +
                item.name +
                " (" +
                item.state_code +
                ")",
            };    
          });  
          dispatch({
            type: types.SET_STATES,
            payload: states,
          }); 
          return states;
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
