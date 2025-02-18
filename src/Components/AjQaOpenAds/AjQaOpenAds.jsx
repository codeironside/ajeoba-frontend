import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LIMIT, SKIP } from "../../Constant/AppConstant";
import { getQaAdsListAction } from "../../Redux/common/GetQaAds/getQaAdsActions";
import { customCommonStyles } from "../../Style/CommonStyle";
import openAdsActive from "../../Assets/Images/openAdsActive.svg";
import OpenAdsListing from "../../Containers/OpenAds/OpenAdsListing/OpenAdsListing";
import AjOpenAdsCertificateRequests from "../AjOpenAdsCertificateRequests/AjOpenAdsCertificateRequests";

const AjQaOpenAds = () => {
  const [openAdsSearchText, setOpenAdsSearchText] = useState("");
  const [openAdsSearchClick, setOpenAdsSearchClick] = useState(true);

  const [openAdsOpenFilter, setOpenAdsOpenFilter] = useState(false);
  const [dataInfo, setDataInfo] = useState({});
  const [dataToList, setDataToList] = useState();
  const dispatch = useDispatch();
  const qaAdsData = useSelector((state) => state.qaAdsData.qaAdsData);
  const qaAdsDataLength = useSelector(
    (state) => state.qaAdsData.qaAdsDataLength
  );
  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
      requestType: 1,
    };
    if (dataInfo?.certificate?.length) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        certifications: JSON.stringify(dataInfo.certificate),
      };
    }
    if (dataInfo?.products?.length) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        products: JSON.stringify(dataInfo.products),
      };
    }
    if (openAdsSearchText.length) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        filterText: openAdsSearchText,
      };
    }

    dispatch(getQaAdsListAction(searchObject));
  }, [query, dataInfo, openAdsSearchClick]);

  useEffect(() => {
    if (qaAdsData) {
      setDataToList(qaAdsData);
    }
  }, [qaAdsData]);

  return (
    <>
      <AjOpenAdsCertificateRequests
        pageHeading="Open Ads"
        logo={openAdsActive}
        setDataInfo={setDataInfo}
        setSearchClick={setOpenAdsSearchClick}
        setSearchText={setOpenAdsSearchText}
        setOpenFilter={setOpenAdsOpenFilter}
        searchText={openAdsSearchText}
        searchClick={openAdsSearchClick}
        dataInfo={dataInfo}
        openFilter={openAdsOpenFilter}
        containerHeight={customCommonStyles.containerHeight}
        query={query}
        setQuery={setQuery}
        pagination={true}
        totalCount={qaAdsDataLength}
      >
        <OpenAdsListing dataToList={dataToList} />
      </AjOpenAdsCertificateRequests>
    </>
  );
};

export default AjQaOpenAds;
