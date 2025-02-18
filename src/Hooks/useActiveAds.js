import React, { useState, useEffect } from "react";
import axios from "axios";
import { showToast } from "../Services/toast";

import { getToken } from "../Auth/getToken";

const useActiveAds = () => {
  const [ads, setAds] = useState([]);
  const token = getToken();

  // useEffect(() => {
  //   async function getAds() {
  //     let response;
  //     try {
  //       response = await axios({
  //         method: "get",
  //         url: `${process.env.REACT_APP_BASE_URL}/api/trading/advertisement`,
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //     } catch (err) {
  //       showToast(err.message, "error");
  //     }
  //     if (response) {
  //       setAds(response.data.result);
  //     }
  //   }
  //   getAds();
  // }, []);
  return { ads };
};

export default useActiveAds;
