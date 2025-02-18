import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Grid, Typography, Skeleton } from "@mui/material";
// import { CardCover } from "@mui/joy";
import { commonStyles } from "../../../../Style/CommonStyle";
import CardMedia from '@mui/material/CardMedia';
import {
  getTradingActiveAdDetailByIdAction,
} from "../../../../Redux/CorporateBuyer/Trading/tradingActions.js";
import { getInputActiveAdDetailByIdAction } from "../../../../Redux/FarmingAssociation/Input/inputActions.js";
import { AjRating } from '../../../../Components/AjRating.jsx';
import {
  textCapitalize,
  numberWithCommas,
} from "../../../../Services/commonService/commonService";
import AjDialog from "../../../../Components/AjDialog/AjDialog";
import AjBuyProductModal from "../../../../Components/AjBuyProductModal/AjBuyProductModal.jsx"
import WarehouseElement from "./WarehouseElement.jsx";
import WarehouseCertificate from "./WarehouseCertificate.jsx";
import ListingImages from "./ListingImages.jsx";
import { useNavigate } from "react-router";
import AjDialogProductImages from "../../../../Components/AjDialog/AjDialogProductImages.jsx";
import AjViewProductImage from "./AjViewProductImage"

const ProductInputDetails = ({ product_type, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate
  const [isLoading, setIsLoading] = useState(true);

  const inputActiveAdDetail = useSelector(
    (state) => state?.input?.inputActiveAdDetail
  );
  const productActiveAdDetail = useSelector(
    (state) => state?.tradingActiveAds?.tradingActiveAdDetail
  );

  useEffect(() => {
    if (inputActiveAdDetail) {
      setIsLoading(false);
    }
  }, [inputActiveAdDetail]);

  useEffect(() => {
    if (productActiveAdDetail) {
      setIsLoading(false);
    }
  }, [productActiveAdDetail]);

  const uploading = useSelector(
    (state) => state?.tradingActiveAds?.loading
  )

  const delayLoading = useSelector(
    (state) => state?.input?.loadinginput
  )
  const [openModal, setOpenModal] = useState(false);
  const [openProductImagesModal, setOpenProductImagesModal] = useState(false);
  const [imagesMobile, setImagesMobile] = useState(null)

  const [changeImage, setChangeImage] = useState(null)
  const [change, setChange] = useState(false)

  const generateImageUrl = (item) => {
    if (item) {
      return `${process.env.REACT_APP_IMAGE_URL}/${item}`;
    }
    return <Skeleton
      sx={{
        bgcolor: "rgba(245, 245, 245, 1)",
        borderRadius: ".5rem",
        display: "block",
      }}
      width={351}
      height={223}
    />
  };

  useEffect(() => {
    if (product_type === "product-details") {
      dispatch(getTradingActiveAdDetailByIdAction(id, navigate))
    } else if (product_type === "input-details") {
      dispatch(getInputActiveAdDetailByIdAction(id));
    }
  }, [id]);

  useEffect(() => {
    if (product_type === "product-details") {
      setImagesMobile(productActiveAdDetail?.AdvertisemetDetail?.other_images)
    } else {
      setImagesMobile(inputActiveAdDetail?.advertisementDetail?.other_images)
    }
  }, [product_type,
    productActiveAdDetail?.AdvertisemetDetail?.other_images,
    inputActiveAdDetail?.advertisementDetail?.other_images])



  const imagesElement = imagesMobile?.map((image, index) => {
    return <CardMedia
      key={index}
      component="img"
      src={product_type === "product-details" ?
        generateImageUrl(image?.file_path) : generateImageUrl(image?.file_path)}
      alt={"product-name"}
      loading="lazy"
      sx={{ ...commonStyles.imageBorderRadiusMobile }}
    />
  })



  return (
    <>
      <Box
        sx={{ ...commonStyles.whiteContainerBackgroundTabsCorp, ...commonStyles.customSrollBar }}
      >
        <Box sx={{ ...commonStyles.mainProductDetailDisplay }}>
          <Box sx={{ ...commonStyles.mpddDisplay }}>
            {isLoading ?
              <Box
                sx={[
                  commonStyles.productInputOrderImage
                ]}
              >

                <Skeleton sx={{ position: "absolute", right: "1.15rem", top: "16px", borderRadius: "4px", fontFamily: "Poppins", fontWeight: "600", fontSize: "12px", lineHeight: "18px", padding: "4px 10px 4px 10px" }} />

                <Box sx={{ ...commonStyles.hide }}>
                  <Box sx={{ ...commonStyles.imagePadding }}>
                    <Skeleton
                      style={{ ...commonStyles.imageBorderRadius }}
                    />
                  </Box>
                </Box>

              </Box>
              : <Box
                sx={[
                  commonStyles.productInputOrderImage
                ]}
              >
                {uploading || delayLoading ?
                  <Skeleton
                    sx={{
                      bgcolor: "rgba(245, 245, 245, 1)",
                      borderRadius: ".5rem",
                      position: "absolute",
                      right: "2.25rem",
                      top: "1.25rem"
                    }}
                    width={50}
                  /> :
                  <Box sx={{ position: "absolute", right: "1.15rem", top: "16px", borderRadius: "4px", backgroundColor: "#DB371F", color: "#FFFFFF", fontFamily: "Poppins", fontWeight: "600", fontSize: "12px", lineHeight: "18px", padding: "4px 10px 4px 10px" }} vertical='top' horizontal='right'>
                    {product_type === "product-details" ? productActiveAdDetail?.AdvertisemetDetail?.product_type : inputActiveAdDetail?.advertisementDetail?.input_subtype}
                  </Box>
                }
                {uploading || delayLoading ?
                  <Skeleton
                    sx={{
                      ...commonStyles.ske
                    }}
                  /> :
                  <>
                    <Box sx={{ ...commonStyles.hide }}>
                      <Box sx={{ ...commonStyles.imagePadding }}>
                        {<img
                          src={
                            // product_type === "product-details" ?
                            generateImageUrl(change ? changeImage : product_type === "product-details" ?
                              (productActiveAdDetail?.AdvertisemetDetail?.other_images ? productActiveAdDetail?.AdvertisemetDetail?.other_images[0]?.file_path : productActiveAdDetail?.AdvertisemetDetail?.file_path) :
                              (inputActiveAdDetail?.advertisementDetail?.other_images ? inputActiveAdDetail?.advertisementDetail?.other_images[0]?.file_path : inputActiveAdDetail?.advertisementDetail?.url))
                          }
                          onClick={() => {
                            setOpenProductImagesModal(true)

                            if(productActiveAdDetail?.AdvertisemetDetail?.other_images || inputActiveAdDetail?.advertisementDetail?.other_images) {
                              setChange(true)
                            
                            
                            setChangeImage(product_type === "product-details" ?
                            (productActiveAdDetail?.AdvertisemetDetail?.other_images ? productActiveAdDetail?.AdvertisemetDetail?.other_images[0]?.file_path : productActiveAdDetail?.AdvertisemetDetail?.file_path) :
                            (inputActiveAdDetail?.advertisementDetail?.other_images ? inputActiveAdDetail?.advertisementDetail?.other_images[0]?.file_path : inputActiveAdDetail?.advertisementDetail?.url))
                            }
                            
                          }}
                          alt={"product-name"}
                          loading="lazy"
                          style={{ ...commonStyles.imageBorderRadius }}
                        />}
                      </Box>
                    </Box>
                    <Box sx={{ ...commonStyles.toggleHideImage }}>
                      {imagesElement}
                    </Box>
                  </>
                }
                {(productActiveAdDetail?.AdvertisemetDetail?.other_images || inputActiveAdDetail?.advertisementDetail?.other_images) && 
                <AjDialogProductImages
                  open={openProductImagesModal}
                  close={setOpenProductImagesModal}
                  title={"Product Images"}
                >
                  
                  {/* Product Images */}
                  <AjViewProductImage
                    images={product_type === "product-details" ?
                      productActiveAdDetail?.AdvertisemetDetail?.other_images :
                      inputActiveAdDetail?.advertisementDetail?.other_images}
                    image_length={product_type === "product-details" ?
                      productActiveAdDetail?.AdvertisemetDetail?.other_images?.length :
                      inputActiveAdDetail?.advertisementDetail?.other_images?.length}
                    changeImage={setChangeImage}
                    setChange={setChange}
                    setOpenProductImagesModal={setOpenProductImagesModal}
                  />
                </AjDialogProductImages>
}
                  
                {uploading || delayLoading ?
                  <Skeleton
                    sx={{
                      bgcolor: "rgba(245, 245, 245, 1)",
                      borderRadius: ".5rem",
                    }}
                    width={60}
                    height={54} /> :
                  <Box sx={[
                    commonStyles.productInputOrderName, commonStyles.hide
                  ]}>
                    <ListingImages
                      images={product_type === "product-details" ?
                        productActiveAdDetail?.AdvertisemetDetail?.other_images :
                        inputActiveAdDetail?.advertisementDetail?.other_images}
                      image_length={product_type === "product-details" ?
                        productActiveAdDetail?.AdvertisemetDetail?.other_images?.length :
                        inputActiveAdDetail?.advertisementDetail?.other_images?.length}
                      changeImage={setChangeImage}
                      setChange={setChange}
                      setOpenProductImagesModal={setOpenProductImagesModal}
                      modalImage={false}
                      loading={product_type === "product-details" ? uploading : delayLoading}
                    />
                  </Box>}
              </Box>}
          </Box>
          {isLoading ?
            <Box sx={{ ...commonStyles.mpddInfo }}>

              <Box sx={[commonStyles.product_info_block]}>
                {uploading || delayLoading ? <Skeleton
                  sx={{
                    bgcolor: "rgba(245, 245, 245, 1)",
                    borderRadius: ".5rem",
                  }}
                  width={100} /> :
                  <Typography component='div' sx={{ textTransform: "capitalize" }}><Box component="span" sx={{ fontWeight: "500", color: "#090909", fontSize: "1.5rem", lineHeight: "1.75rem" }} display='inline'>{product_type === "product-details" ? productActiveAdDetail?.AdvertisemetDetail?.product_name : inputActiveAdDetail?.advertisementDetail?.input_name}</Box></Typography>}
                {uploading || delayLoading ? <Skeleton
                  sx={{
                    bgcolor: "rgba(245, 245, 245, 1)",
                    borderRadius: ".5rem",
                  }}
                  width={100} /> :
                  <Button variant="outlined" sx={[commonStyles.btn]}>{product_type === "product-details" ? productActiveAdDetail?.AdvertisemetDetail?.batch_type : inputActiveAdDetail?.advertisementDetail?.input_subtype}</Button>}
              </Box>
              <Box sx={[commonStyles.product_info_block]}>
                {uploading || delayLoading ? <Skeleton
                  sx={{
                    bgcolor: "rgba(245, 245, 245, 1)",
                    borderRadius: ".5rem",
                  }}
                  width={150} /> :
                  <Typography sx={{ ...commonStyles.seller_name }} component='div'>Seller: <Box component="span" fontWeight='fontWeightMedium' display='inline'>{product_type === "product-details" ? productActiveAdDetail?.AdvertisemetDetail?.first_name + " " + productActiveAdDetail?.AdvertisemetDetail?.last_name : inputActiveAdDetail?.advertisementDetail?.input_supplier_name}</Box></Typography>}
                {uploading || delayLoading ? <Skeleton
                  sx={{
                    bgcolor: "rgba(245, 245, 245, 1)",
                    borderRadius: ".5rem",
                  }}
                  width={100} /> :
                  <Box sx={{ "display": "flex", "gap": "10px", "align-items": "center" }}>
                    <Typography
                      sx={{}}
                      gutterBottom
                      variant="p"
                    >
                      {product_type === "product-details" ? productActiveAdDetail?.AdvertisemetDetail?.rating : inputActiveAdDetail?.advertisementDetail?.rating}
                    </Typography>
                    <Typography
                      sx={{}}
                      gutterBottom
                      variant="p"
                    >
                      <AjRating
                        defaultValue={product_type === "product-details" ? productActiveAdDetail?.AdvertisemetDetail?.rating : inputActiveAdDetail?.advertisementDetail?.rating}
                        readOnly={true}
                        size="small"
                      />
                    </Typography>
                    <Typography
                      sx={{}}
                      gutterBottom
                      variant="p"
                    >
                      ({product_type === "product-details" ? productActiveAdDetail?.AdvertisemetDetail?.rating_count : inputActiveAdDetail?.advertisementDetail?.rating_count})
                    </Typography>
                  </Box>}
              </Box>
              <Box sx={[commonStyles.product_info_block]}>
                <Skeleton sx={{ ...commonStyles.desc }} />
              </Box>
              <Box sx={[commonStyles.product_info_block, commonStyles.product_info_block_two]}>
                <Box sx={{ "display": "flex", "gap": "4px", alignItems: "center" }}>
                  <Skeleton style={{ fontSize: "14px", fontStyle: "italic", color: "#686868" }} />
                </Box>
              </Box>

              <Box sx={[commonStyles.product_info_block, commonStyles.product_info_block_two]}>

              </Box>
            </Box>
            :
            <Box sx={{ ...commonStyles.mpddInfo }}>

              <Box sx={[commonStyles.product_info_block]}>

                <Typography component='div' sx={{ textTransform: "capitalize" }}><Box component="span" sx={{ fontWeight: "500", color: "#090909", fontSize: "1.5rem", lineHeight: "1.75rem" }} display='inline'>{product_type === "product-details" ? productActiveAdDetail?.AdvertisemetDetail?.product_name : inputActiveAdDetail?.advertisementDetail?.input_name}</Box></Typography>

                <Button variant="outlined" sx={[commonStyles.btn]}>{product_type === "product-details" ? productActiveAdDetail?.AdvertisemetDetail?.batch_type : inputActiveAdDetail?.advertisementDetail?.input_subtype}</Button>
              </Box>
              <Box sx={[commonStyles.product_info_block]}>

                <Typography sx={{ ...commonStyles.seller_name }} component='div'>Seller: <Box component="span" fontWeight='fontWeightMedium' display='inline'>{product_type === "product-details" ? productActiveAdDetail?.AdvertisemetDetail?.first_name + " " + productActiveAdDetail?.AdvertisemetDetail?.last_name : inputActiveAdDetail?.advertisementDetail?.input_supplier_name}</Box></Typography>

                <Box sx={{ "display": "flex", "gap": "10px", "align-items": "center" }}>
                  <Typography
                    sx={{}}
                    gutterBottom
                    variant="p"
                  >
                    {product_type === "product-details" ? productActiveAdDetail?.AdvertisemetDetail?.rating : inputActiveAdDetail?.advertisementDetail?.rating}
                  </Typography>
                  <Typography
                    sx={{}}
                    gutterBottom
                    variant="p"
                  >
                    <AjRating
                      defaultValue={product_type === "product-details" ? productActiveAdDetail?.AdvertisemetDetail?.rating : inputActiveAdDetail?.advertisementDetail?.rating}
                      readOnly={true}
                      size="small"
                    />
                  </Typography>
                  <Typography
                    sx={{}}
                    gutterBottom
                    variant="p"
                  >
                    ({product_type === "product-details" ? productActiveAdDetail?.AdvertisemetDetail?.rating_count : inputActiveAdDetail?.advertisementDetail?.rating_count})
                  </Typography>
                </Box>
              </Box>
              <Box sx={[commonStyles.product_info_block]}>

                <Typography sx={{ ...commonStyles.desc }}>{productActiveAdDetail?.AdvertisemetDetail?.desc || inputActiveAdDetail?.advertisementDetail?.desc ?
                  product_type === "product-details" ? productActiveAdDetail?.AdvertisemetDetail?.desc : inputActiveAdDetail?.advertisementDetail?.desc : ""}</Typography>
              </Box>
              <Box sx={[commonStyles.product_info_block, commonStyles.product_info_block_two]}>
                <Box sx={{ "display": "flex", "gap": "4px", alignItems: "center" }}>

                  <Box component="span" display='inline'>
                    {product_type === "product-details" ? `${numberWithCommas(
                      productActiveAdDetail?.AdvertisemetDetail?.price_per_unit,
                      productActiveAdDetail?.AdvertisemetDetail?.currency
                    )}` :
                      `${numberWithCommas(
                        inputActiveAdDetail?.advertisementDetail?.price_per_unit,
                        inputActiveAdDetail?.advertisementDetail?.currency
                      )}`}
                  </Box>

                  <Typography component='span' style={{ fontSize: "14px", fontStyle: "italic", color: "#686868" }}>(Per ton)</Typography>
                </Box>
              </Box>

              <Box sx={[commonStyles.product_info_block, commonStyles.product_info_block_two]}>
                <Button sx={[commonStyles.buyNow]} onClick={() => { setOpenModal(true) }}>Buy Now</Button>
              </Box>
            </Box>}
          <AjDialog
            open={openModal}
            closeModal={setOpenModal}
            title={product_type === "product-details" ? "Buy Product" : "Buy Input"}
            styleData={commonStyles.buyDialogModalContainer}
          >
            <AjBuyProductModal
              closeModal={setOpenModal}
              data={product_type === "product-details" ? productActiveAdDetail?.AdvertisemetDetail : inputActiveAdDetail?.advertisementDetail}
              isDisable={product_type === "product-details" ?
                productActiveAdDetail?.AdvertisemetDetail?.batch_type === "WHOLESALE" ? true : false
                :
                inputActiveAdDetail?.advertisementDetail?.batch_type === "WHOLESALE" ? true : false}
              type={product_type === "product-details" ? "Product" : "Input"}
            />
          </AjDialog>
        </Box>

        <Box sx={{ "paddingTop": "8px", "backgroundColor": "#F4F4F4", "height": "fit-content" }}>
          <Box
            sx={[
              commonStyles.productInputOrderInfoOne
            ]}
          >
            <Box sx={[commonStyles.product_info_block]}>
              {uploading || delayLoading ? <Skeleton
                sx={{
                  bgcolor: "rgba(245, 245, 245, 1)",
                  borderRadius: ".5rem",
                }}
                width={200} /> :
                <Typography sx={[commonStyles.warehouse]}>Warehouse Information</Typography>}
            </Box>
            <Grid
              container
              sx={{
                ...commonStyles.adjustOrientation
              }}
            >
              {uploading || delayLoading ? <Skeleton
                sx={{
                  bgcolor: "rgba(245, 245, 245, 1)",
                  borderRadius: ".5rem",
                  marginRight: "64px",
                }}
                width={200}
                height={45} /> :
                <WarehouseElement
                  warehouseDetail={
                    product_type === "product-details" ?
                      productActiveAdDetail?.warehouseDetail : inputActiveAdDetail?.warehouseDetail}
                  product_type={product_type
                  }
                />}
              {uploading || delayLoading ? <Skeleton
                sx={{
                  bgcolor: "rgba(245, 245, 245, 1)",
                  borderRadius: ".5rem",
                }}
                width={200}
                height={45} /> :
                // productActiveAdDetail?.certificateDetail || inputActiveAdDetail?.certificateDetail && 
                <WarehouseCertificate
                  certificateDetail={
                    product_type === "product-details" ?
                      productActiveAdDetail?.certificateDetail : inputActiveAdDetail?.certificateDetail}
                />}
            </Grid>
          </Box>
        </Box>
      </Box>

    </>
  );
};


export default ProductInputDetails;


{/* Warehouse Information */ }
