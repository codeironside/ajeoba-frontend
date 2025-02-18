import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  Divider,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import { styles } from "../ProductListingExpanded/ProductList.js";
import {
  DETAILSPAGE_LIMIT,
  SKIP,
  marketplacefloer,
} from "../../../../Constant/AppConstant.js";
import {
  getAllOpenMarketPlaceProductsIdActions,
  getAllOpenMarketPlaceProductsActions,
} from "../../../../Redux/CorporateBuyer/Trading/tradingActions.js";
import { getInputActiveAdDetailByIdAction } from "../../../../Redux/FarmingAssociation/Input/inputActions.js";
import ProdDetailsviewmore from "./ProdDetailsviewmore.jsx";
import { AjRating } from "../../../AjRating.jsx";
import {
  numberWithCommas,
  textCapitalize,
} from "../../../../Services/commonService/commonService.js";

function ProductDetails(fromCorporate) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: productId, productname: productType } = useParams();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const [query] = useState({
    limit: DETAILSPAGE_LIMIT,
    skip: SKIP,
  });

  const { allOpenMarketPlaceProducts, loading: alladsloading } = useSelector(
    (state) => {
      return {
        allOpenMarketPlaceProducts:
          state.tradingActiveAds.allOpenMarketPlaceProduct,
        loading: state.tradingActiveAds.loading,
      };
    }
  );

  const { productDetail, loadingproduct: productadloadingbyid } = useSelector(
    (state) => {
      return {
        productDetail:
          state.tradingActiveAds.allOpenMarketPlaceProductbyIddetails,
        loadingproduct: state.tradingActiveAds.loadingproduct,
      };
    }
  );

  const { inputActiveAdDetail, loadinginput: inputadloadingbyid } = useSelector(
    (state) => {
      return {
        inputActiveAdDetail: state.input.inputActiveAdDetail,
        loadinginput: state.input.loadinginput,
      };
    }
  );

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
    };
    dispatch(getAllOpenMarketPlaceProductsActions(searchObject));
  }, []);

  useEffect(() => {
    if (productType === "farmproduce") {
      dispatch(getAllOpenMarketPlaceProductsIdActions(productId));
    } else if (productType === "farminput") {
      dispatch(getInputActiveAdDetailByIdAction(productId));
    }
  }, [productId, productType]);

  const isDetailLoading = inputadloadingbyid || productadloadingbyid;

  const generateImageUrl = (item) => {
    if (item) {
      return `${process.env.REACT_APP_IMAGE_URL}/${item}`;
    }
    return (
      <Skeleton
        sx={{ bgcolor: "rgba(245, 245, 245, 1)" }}
        height={200}
        background="red"
        variant="rectangular"
      />
    );
  };

  const handleBuy = (productId) => {
    if (productType === "farmproduce") {
      sessionStorage.setItem("productSelected", productId);
      localStorage.setItem("unregistered", "corperate_buyer");
      navigate("/signup-buyer");
    } else if (productType === "farminput") {
      if (sessionStorage.getItem("productSelected"))
        sessionStorage.removeItem("productSelected");
      sessionStorage.setItem("inputSelected", productId);
      localStorage.setItem("unregistered", "input_buyer");
      navigate("/signup-buyer");
    }
  };

  return (
    <Box sx={{ backgroundColor: "#F8F8F8", position: "relative" }}>
      <img
        src={marketplacefloer}
        alt="marketplacefloer"
        style={styles.flowerimg}
      />

      <Box sx={{ ...styles.proddetailbg }}>
        <Box sx={{ ...styles.proddetailstop }}>
          <Box sx={{ ...styles.productimgContainer }}>
            {isSmallScreen ? (
              <>
                {isDetailLoading ? (
                  <Skeleton
                    sx={{ bgcolor: "rgba(245, 245, 245, 1)" }}
                    height={200}
                    variant="rectangular"
                  />
                ) : (
                  <img
                    src={
                      productType === "farmproduce"
                        ? generateImageUrl(productDetail?.file_path)
                        : generateImageUrl(
                            inputActiveAdDetail?.advertisementDetail?.url
                          )
                    }
                    alt={"product-name"}
                    style={{ ...styles.imgsm }}
                  />
                )}
              </>
            ) : (
              <>
                {isDetailLoading ? (
                  <Skeleton
                    sx={{
                      bgcolor: "rgba(245, 245, 245, 1)",
                      borderRadius: "8px",
                    }}
                    height="24.75rem"
                    variant="rectangular"
                  />
                ) : (
                  <img
                    src={
                      productType === "farmproduce"
                        ? generateImageUrl(productDetail?.file_path)
                        : generateImageUrl(
                            inputActiveAdDetail?.advertisementDetail?.url
                          )
                    }
                    alt={"product-name"}
                    style={{ ...styles.imglg }}
                  />
                )}
              </>
            )}
          </Box>
          {isDetailLoading ? (
            <Box sx={{ ...styles.proddetailtext }}>
              <Skeleton
                sx={{ bgcolor: "rgba(245, 245, 245, 1)" }}
                width="20%"
              />
              <Skeleton
                sx={{ bgcolor: "rgba(245, 245, 245, 1)" }}
                width="40%"
              />
              <Skeleton
                sx={{ bgcolor: "rgba(245, 245, 245, 1)" }}
                width="60%"
              />
              <Skeleton
                sx={{ bgcolor: "rgba(245, 245, 245, 1)" }}
                width="60%"
              />
            </Box>
          ) : (
            <Box sx={{ ...styles.proddetailtext }}>
              <Box sx={{ ...styles.proddetailnameandrating }}>
                <Typography sx={{ ...styles.proddetailname }}>
                  {productType === "farmproduce"
                    ? textCapitalize(productDetail?.product_name)
                    : textCapitalize(
                        inputActiveAdDetail?.advertisementDetail?.input_name
                      )}
                </Typography>
                <Box
                  sx={{
                    ...styles.ratingContainer,
                  }}
                >
                  <Typography sx={{ ...styles.ratingdetails }}>
                    {productType === "farmproduce"
                      ? productDetail?.rating === null
                        ? "0.00"
                        : productDetail?.rating
                      : inputActiveAdDetail?.advertisementDetail?.rating ===
                        null
                      ? "0.00"
                      : inputActiveAdDetail?.advertisementDetail?.rating}
                  </Typography>
                  <AjRating
                    defaultValue={
                      productType === "farmproduce"
                        ? productDetail?.rating
                        : inputActiveAdDetail?.advertisementDetail?.rating
                    }
                    readOnly={true}
                    size="small"
                  />
                  <Typography sx={{ ...styles.ratecount }}>
                    (
                    {productType === "farmproduce"
                      ? productDetail?.rating_count
                      : inputActiveAdDetail?.advertisementDetail?.rating_count}
                    )
                  </Typography>
                </Box>
              </Box>

              <Typography sx={{ ...styles.proddetailseller }}>
                <Typography sx={{ ...styles.proddetailsellernamecontainer }}>
                  <Typography sx={{ ...styles.proddetailsellername }}>
                    Quantity:{" "}
                  </Typography>
                  <Typography sx={{ ...styles.proddetailseller1 }}>
                    {productType === "farmproduce"
                      ? productDetail?.available_quantity
                      : inputActiveAdDetail?.advertisementDetail
                          ?.available_quantity}{" "}
                    {textCapitalize(
                      productDetail?.unit_of_measurement ||
                        inputActiveAdDetail?.advertisementDetail
                          ?.unit_of_measurement
                    )}
                  </Typography>
                </Typography>
                <Typography sx={{ ...styles.proddetailsellernamecontainer }}>
                  <Typography sx={{ ...styles.proddetailsellername }}>
                    Seller:{" "}
                  </Typography>
                  <Typography sx={{ ...styles.proddetailseller1 }}>
                    {productType === "farmproduce"
                      ? productDetail?.association_name ||
                        `${productDetail?.first_name}` +
                          ` ${productDetail?.last_name}`
                      : inputActiveAdDetail?.advertisementDetail
                          ?.input_supplier_name}
                  </Typography>
                </Typography>
              </Typography>
              {productType === "farmproduce" ? (
                <Typography sx={{ ...styles.proddetaildescription }}>
                  Discover the unparalleled freshness of our locally sourced
                  farm produce. Handpicked and delivered straight to you, our
                  products embody the essence of quality and flavor.{" "}
                </Typography>
              ) : (
                <Typography sx={{ ...styles.proddetaildescription }}>
                  Elevate your farming experience with our premium agricultural
                  inputs. Specially curated for optimal yield and
                  sustainability.{" "}
                </Typography>
              )}

              <Divider sx={{ ...styles.proddetaildivider }} />
              <Typography sx={{ ...styles.proddetailcostcontainer }}>
                <Typography sx={{ ...styles.proddetailcost }}>
                  {" "}
                  {productType === "farmproduce"
                    ? numberWithCommas(
                        productDetail?.price_per_unit,
                        productDetail?.currency
                      )
                    : numberWithCommas(
                        inputActiveAdDetail?.advertisementDetail
                          ?.price_per_unit,
                        inputActiveAdDetail?.advertisementDetail?.currency
                      )}
                </Typography>
                <Typography
                  sx={{ ...styles.proddetailsellerqty, marginLeft: 1 }}
                >
                  {productType === "farmproduce"
                    ? textCapitalize(
                        `(per ${productDetail?.unit_of_measurement})`
                      )
                    : textCapitalize(
                        `(per ${inputActiveAdDetail?.advertisementDetail?.unit_of_measurement})`
                      )}
                </Typography>
              </Typography>
              <Button
                onClick={() => handleBuy(productId)}
                sx={{ ...styles.proddetailbuy }}
              >
                Buy Now
              </Button>
            </Box>
          )}{" "}
        </Box>
        <ProdDetailsviewmore
          alladsloading={alladsloading}
          productadloading={productadloadingbyid}
          inputadloading={inputadloadingbyid}
          allOpenMarketPlaceProducts={allOpenMarketPlaceProducts}
        />
      </Box>
    </Box>
  );
}

export default ProductDetails;
