import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useMediaQuery } from "@mui/material";
import ArrowRightAltSharpIcon from "@mui/icons-material/ArrowRightAltSharp";
import { browseCategry } from "./BrowseCategory";
import ProductlistCard from "./ProductlistCard";
import {
  getTradingActiveProductsAdsActionLandingPage,
  getProductListLandingPageAction,
  getInputListLandingPageAction,
} from "../../../../Redux/CorporateBuyer/Trading/tradingActions";
import { getInputActiveAdsAction } from "../../../../Redux/FarmingAssociation/Input/inputActions";
import { SKIP, LIMITOPENMARKETPLACE } from "../../../../Constant/AppConstant";
import viewmoreicon from "../Images/viewmoreicon.png";

function BrowseCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query] = useState({
    limit: LIMITOPENMARKETPLACE,
    skip: SKIP,
  });
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  // const productCategory = useSelector(
  //   (state) => state.tradingActiveAds.productListLandingPage
  // );
  const inputCategory = useSelector(
    (state) => state.tradingActiveAds.inputListLandingPage
  );

  const { productListLandingPage, loadingproductLandingPage: productLoading } =
    useSelector((state) => {
      return {
        productListLandingPage:
          state.tradingActiveAds.tradingActiveAdsDataLandingPage,
        loadingproductLandingPage:
          state.tradingActiveAds.loadingproductLandingPage,
      };
    });
  const { inputListLandingPage, loadingInputLandingPage: inputLoading } =
    useSelector((state) => {
      return {
        inputListLandingPage: state.input.inputActiveAdsList,
        loadingInputLandingPage: state.input.loadinginputLandingPage,
      };
    });

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
    };

    // dispatch(getProductListLandingPageAction());
    dispatch(getInputListLandingPageAction());

    dispatch(getTradingActiveProductsAdsActionLandingPage(searchObject));
    dispatch(getInputActiveAdsAction(searchObject));
  }, []);

  return (
    <Box sx={browseCategry.brosweParentContainer}>
      <Box sx={browseCategry.brosweCategoryContainer}>
        <Box sx={browseCategry.brosweContentheadersFlex}>
          <Box sx={browseCategry.topcontemttext}>
            <Typography sx={browseCategry.header}>Products category</Typography>
            <Typography sx={browseCategry.header2}>
              Featured Products Category
            </Typography>
          </Box>
          {!isSmallScreen && (
            <Box sx={browseCategry.viewMoreContainer}>
              <Typography
                onClick={() => navigate("/view-marketplace/farmproduce")}
                sx={browseCategry.viewMore}
              >
                View all Products
              </Typography>
              <ArrowRightAltSharpIcon size="large" />
            </Box>
          )}
        </Box>
        <ProductlistCard
          landingPageList={productListLandingPage}
          loading={productLoading}
          filterList={productcateggoty}
        />
        {isSmallScreen && productListLandingPage?.totalCount > 0 && (
          <Box sx={browseCategry.viewMoreContainersm}>
            <Typography
              onClick={() => navigate("/view-marketplace/farmproduce")}
              sx={browseCategry.viewMore}
            >
              View all Products
            </Typography>
            <ArrowRightAltSharpIcon size="large" color="#003C1C" />
          </Box>
        )}

        <Box sx={browseCategry.brosweContentheadersFlex}>
          <Box sx={browseCategry.topcontemttext}>
            <Typography sx={browseCategry.header}>Inputs category</Typography>
            <Typography sx={browseCategry.header2}>
              Featured Inputs Category
            </Typography>
          </Box>
          {!isSmallScreen && (
            <Box sx={browseCategry.viewMoreContainer}>
              <Typography
                onClick={() => navigate("/view-marketplace/farminput")}
                sx={browseCategry.viewMore}
              >
                View all Inputs
              </Typography>
              <ArrowRightAltSharpIcon size="large" />
            </Box>
          )}
        </Box>
        <ProductlistCard
          landingPageList={inputListLandingPage}
          loading={inputLoading}
          filterList={inputCategory}
        />
        {isSmallScreen && inputListLandingPage?.totalCount > 0 && (
          <Box sx={browseCategry.viewMoreContainersm}>
            <Typography
              onClick={() => navigate("/view-marketplace/farminput")}
              sx={browseCategry.viewMore}
            >
              View all Inputs
            </Typography>
            <ArrowRightAltSharpIcon size="large" color="#003C1C" />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default BrowseCategory;

const productcateggoty = {
  result: [
    // { name: "all products", id: "1" },
    { name: "refrigerated", id: "2" },
    { name: "livestock", id: "3" },
    { name: "dry", id: "4" },
  ],
};

const inputcateggoty = [
  "all inputs",
  "manure",
  "horticulture",
  "fertilizer",
  "manure",
];
