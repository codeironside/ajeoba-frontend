import React, { useState, useEffect } from "react";
import axios from "axios";
import { showToast } from "../Services/toast";

const useLgaDetails = (stateName) => {
  const [lgData, setLgData] = useState([]);
  const nameOfState = stateName.replace(/\s+State$/, "");
  const dataToSend = {
    state: nameOfState,
  };

  useEffect(() => {
    async function getlgadata() {
      let response;
      try {
        response = await axios({
          method: "post",
          url: `${process.env.REACT_APP_BASE_URL}/api/public/lga`,
          data: dataToSend,
        });
      } catch (err) {
        showToast(err.message, "error");
      }
      if (response) {
        setLgData(response.data.result);
      }
    }
    getlgadata();
  }, [dataToSend.state]);

  return [lgData];
};

export default useLgaDetails;
