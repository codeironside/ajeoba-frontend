import React, { useState, useEffect } from "react";
import AjOpenAdsCertificateRequests from "../../../Components/AjOpenAdsCertificateRequests/AjOpenAdsCertificateRequests";
import certificateRequestActive from "../../../Assets/Images/certificateRequestActive.svg";
import CertificateRequestsListing from "./CertificateRequestsListing/CertificateRequestsListing";
import { useDispatch, useSelector } from "react-redux";
import { getQaAdsListAction } from "../../../Redux/common/GetQaAds/getQaAdsActions";
import { LIMIT, SKIP } from "../../../Constant/AppConstant";
import { customCommonStyles } from "../../../Style/CommonStyle";

const CertificateRequests = () => {
  const [certificateReqSearchText, setCertificateReqSearchText] = useState("");
  const [certificateReqSearchClick, setCertificateReqSearchClick] =
    useState(true);

  const [certificateReqOpenFilter, setCertificateReqOpenFilter] =
    useState(false);
  const [dataInfo, setDataInfo] = useState({});
  const [dataToList, setDataToList] = useState();

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const dispatch = useDispatch();
  const qaAdsData = useSelector((state) => state.qaAdsData.qaAdsData);
  const qaAdsDataLength = useSelector(
    (state) => state.qaAdsData.qaAdsDataLength
  );

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
      requestType: 2,
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
    if (certificateReqSearchText.length) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        filterText: certificateReqSearchText,
      };
    }

    dispatch(getQaAdsListAction(searchObject));
  }, [query, dataInfo, certificateReqSearchClick]);

  useEffect(() => {
    if (qaAdsData) {
      setDataToList(qaAdsData);
    }
  }, [qaAdsData]);

  return (
    <>
      <AjOpenAdsCertificateRequests
        pageHeading="Certificate requests"
        logo={certificateRequestActive}
        setDataInfo={setDataInfo}
        setSearchClick={setCertificateReqSearchClick}
        setSearchText={setCertificateReqSearchText}
        setOpenFilter={setCertificateReqOpenFilter}
        searchText={certificateReqSearchText}
        searchClick={certificateReqSearchClick}
        dataInfo={dataInfo}
        openFilter={certificateReqOpenFilter}
        containerHeight={customCommonStyles.containerHeight}
        query={query}
        setQuery={setQuery}
        pagination={true}
        totalCount={qaAdsDataLength}
      >
        <CertificateRequestsListing dataToList={dataToList} />
      </AjOpenAdsCertificateRequests>
    </>
  );
};

export default CertificateRequests;
