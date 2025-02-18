import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import { getUserData } from "../../Services/localStorageService";
import TradingCard from "./TradingCard.jsx";

const AjTradingActiveAdsCard = (props) => {
  const { data, key, loading } = props;
  
  return (
    <>
        <TradingCard product={data} index={key} loading={loading} />
    </>
  );
};

export default AjTradingActiveAdsCard;
