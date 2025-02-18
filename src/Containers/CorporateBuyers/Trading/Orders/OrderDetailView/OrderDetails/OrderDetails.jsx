import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, Skeleton, Divider } from "@mui/material";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import * as _ from "lodash";
import moment from "moment";
import { Typography } from "@mui/material";
import card from "../../../../../../Assets/bold/cards.png"
import user from "../../../../../../Assets/bold/frame.png"
import calendar from "../../../../../../Assets/bold/calendar-2.png"
import productType from "../../../../../../Assets/bold/convert-3d-cube.png"
import orderIcon from "../../../../../../Assets/bold/receipt-text.png"
import productQuantity from "../../../../../../Assets/bold/layer.png"
import copy from "../../../../../../Assets/bold/copy.png"

import AjDetailTypography from "../../../../../../Components/AjDetailTypography/AjDetailTypography";
import AjDetailData from "../../../../../../Components/AjDetailData/AjDetailData";
import AjTypography from "../../../../../../Components/AjTypography";

import styles from "./OrderDetailStyle";
import { getOrderDetailsActionById } from "../../../../../../Redux/CorporateBuyer/Trading/tradingActions";
import {
  productOrderStatusOptions,
  productTypeOptions,
} from "../../../../../../Constant/AppConstant";
import {
  numberWithCommas,
  textCapitalize,
} from "../../../../../../Services/commonService/commonService";
import { styles as cardStyle } from "../../../../../../Components/AjDetailsAndFeedback/AjDetailAndFeedbackStyles";
import { commonStyles } from "../../../../../../Style/CommonStyle";
import { viewProfileStyles } from "../../../../../Profile/ViewProfile/ViewProfileStyle";
import AjDetailsAndFeedback from "../../../../../../Components/AjDetailsAndFeedback/AjDetailsAndFeedback";
import { getUserData } from "../../../../../../Services/localStorageService";
import { styles as imageStyle } from "../../../ActiveAds/TradingActiveAdDetails/TradingActiveAdDetailById/TradingActiveAdDetailsByIdStyles";
import defaultImage from "../../../../../../Assets/Images/defaultPhoto.png";
import { styles as refereeStyles } from "../../../../../Admin/UserManagement/FarmingAssociation/Referee/RefereeDetails/RefereeDetailsStyles";
export default function OrderDetails(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userData = getUserData();
  const [status, setStatus] = useState();
  const [logisticFeedback, setLogisticFeedback] = useState(false);
  const [logisticModePreference, setLogisticModePreference] = useState();
  const [isLogisticAdPlaced, setIsLogisticAdPlaced] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const corporateDetails = useSelector(
    (state) => state.tradingActiveAds.orderDetailsById
  );

  const loading = useSelector(
    (state) => state.tradingActiveAds.loading
  );

  const unitOfMeasurement = textCapitalize(
    corporateDetails?.orderDetail?.unit_of_measurement
  );

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
    dispatch(getOrderDetailsActionById(id));
  }, [id]);

  useEffect(() => {
    if (corporateDetails) {
      setIsLoading(false);
      const stats = _.find(productOrderStatusOptions, {
        value: corporateDetails?.orderDetail?.status,
      });
      setStatus(stats?.label);
      props.setOrderStatus(stats?.label);
    }
    if (corporateDetails?.feedbackDetails) {
      const logisticsFeedbackExist =
        corporateDetails?.feedbackDetails[0]?.feedback_for === "LOGISTICS" ||
        corporateDetails?.feedbackDetails[1]?.feedback_for === "LOGISTICS";
      setLogisticFeedback(logisticsFeedbackExist);
    }
    handleLogisticPreference();
  }, [corporateDetails]);

  const handleLogisticPreference = () => {
    const isLogistisAdPlaced =
      corporateDetails?.orderDetail?.logistics_ad_placed;


    const logisticsPref = corporateDetails?.orderDetail?.logistics_manage;

    if (logisticsPref === "ALLOW_MERCHANT") {
      setLogisticModePreference("Logistics Ad Posted by Seller");
    } else if (logisticsPref === "POST_ADS") {
      setLogisticModePreference("Logistics Ad Posted by buyer");
    } else if (logisticsPref === "SELF_MANAGE") {
      setLogisticModePreference("Logistics is provided by buyer");
    }

    if (logisticsPref === "SELF_MANAGE") {
      setIsLogisticAdPlaced(null);
    } else if (isLogistisAdPlaced === true) {
      setIsLogisticAdPlaced("Logistics Ad has been placed");
    } else if (isLogistisAdPlaced === false) {
      setIsLogisticAdPlaced("No logistics ad has been placed");
    }
    return null;
  };

  return (
    <>
      <Grid
        container
        item
        sx={{
          ...commonStyles.whiteContainerBackgroundTabsCorp,
          ...commonStyles.customSrollBar,
          borderRadius: ".5rem!important",
        }}
      >
        <Box sx={{ ...commonStyles.detailsContainer }}>
          {isLoading ? 
           <Box sx={{...imageStyle.imageBoxDetail, ...commonStyles.insideDetailsContainer}}>
                <Box>
                  <Card sx={{ ...commonStyles.imageBoxDetail, ...cardStyle.imageContainer}}>
                      <Skeleton
                          sx={{height: "100%", width: "100%"}}
                      />
                  </Card>
                </Box>
                <Box sx={{ ...commonStyles.infoContainer }}> 
                    <Box sx={{...commonStyles.product}}>
                      <Skeleton
                        sx={{...commonStyles.productName, width: "5rem"}}
                      />
                    </Box>
                    {/* 1st */}
                    <Box sx={{...commonStyles.otherInfo}}>
                      <Box sx={{...commonStyles.boxInfo}}>
                        <Box sx={{...commonStyles.oInfo}}>
                            <Skeleton sx={{...commonStyles.titleInfo}} />
                        </Box>
                        <Box sx={{...commonStyles.oInfo}}>
                            <Skeleton sx={{...commonStyles.titleInfo}} />
                        </Box>
                      </Box>
                      <Divider
                        sx={{
                          ...commonStyles.verticalDivider2
                        }}
                      />
                      <Box sx={{...commonStyles.boxInfo}}>
                        <Box sx={{...commonStyles.oInfo}}>
                            <Skeleton sx={{...commonStyles.titleInfo}} />
                        </Box>
                        <Box sx={{...commonStyles.oInfo}}>
                            <Skeleton sx={{...commonStyles.titleInfo}} />
                        </Box>
                      </Box>
                      <Divider
                        sx={{
                          ...commonStyles.verticalDivider2
                        }}
                      />
                      {/* 2nd */}
                      <Box sx={{...commonStyles.boxInfo_2}}>
                        <Box sx={{...commonStyles.oInfo}}>
                            <Box sx={{display: "flex", gap: "8px"}}> 
                                <Skeleton sx={{...commonStyles.titleInfo}} />
                                <Skeleton
                                  sx={{width: "20px", height: "18px", cursor: "pointer"}}
                                />
                            </Box>
                        </Box>
                        <Box sx={{...commonStyles.oInfo}}>
                            <Skeleton
                              sx={{...commonStyles.titleInfo}}
                            />
                        </Box>  
                      </Box>
                    </Box>
                </Box>
          </Box>
          :
          <Box sx={{...imageStyle.imageBoxDetail, ...commonStyles.insideDetailsContainer}}>
                <Box>
                  <Card sx={{ ...commonStyles.imageBoxDetail, ...cardStyle.imageContainer}}>
                    <CardMedia
                          component="img"
                          height="100%"
                          width= "100%"
                          image={corporateDetails?.orderDetail?.url
                            ? generateImageUrl(corporateDetails?.orderDetail?.url)
                            : generateImageUrl(defaultImage)}
                          alt="Detail"
                      />
                  </Card>
                </Box>
                <Box sx={{ ...commonStyles.infoContainer }}> 
                    <Box sx={{...commonStyles.product}}>
                      <AjTypography
                        displayText={corporateDetails?.orderDetail?.product_name}
                        sx={{...commonStyles.productName}}
                      />
                      <AjTypography
                        displayText={status}
                        sx={{...commonStyles.orderStatus}}
                      />
                    </Box>
                    {/* 1st */}
                    <Box sx={{...commonStyles.otherInfo}}>
                      <Box sx={{...commonStyles.boxInfo}}>
                        <Box sx={{...commonStyles.oInfo}}>
                            <Box sx={{...commonStyles.label}}>
                              <img
                                alt="Seller Icon"
                                src={user}
                              />
                              <AjTypography sx={{...commonStyles.text}} displayText={"Seller's Name"} />
                            </Box>
                            <AjTypography sx={{...commonStyles.titleInfo}} displayText={corporateDetails?.orderDetail?.seller_name} />
                        </Box>
                        <Box sx={{...commonStyles.oInfo}}>
                            <Box sx={{...commonStyles.label}}>
                              <img
                                alt="Seller"
                                src={card}
                              />
                              <AjTypography sx={{...commonStyles.text}} displayText={"Product Price"} />
                            </Box>
                            <AjTypography sx={{...commonStyles.titleInfo}} displayText={numberWithCommas(corporateDetails?.orderDetail?.price, 
                              corporateDetails?.orderDetail?.seller_currency)} />
                        </Box>
                      </Box>
                      <Divider
                        sx={{
                          ...commonStyles.verticalDivider2
                        }}
                      />
                      <Box sx={{...commonStyles.boxInfo}}>
                        <Box sx={{...commonStyles.oInfo}}>
                            <Box sx={{...commonStyles.label}}>
                              <img
                                alt="Seller"
                                src={productType}
                              />
                              <AjTypography sx={{...commonStyles.text}} displayText={"Product Type"} />
                            </Box>
                            <AjTypography sx={{...commonStyles.titleInfo}} displayText={corporateDetails?.orderDetail?.product_type} />
                        </Box>
                        <Box sx={{...commonStyles.oInfo}}>
                            <Box sx={{...commonStyles.label}}>
                              <img
                                alt="Seller Icon"
                                src={productQuantity}
                              />
                              <AjTypography sx={{...commonStyles.text}} displayText={"Product Quantity"} />
                            </Box>
                            <AjTypography sx={{...commonStyles.titleInfo}} displayText={corporateDetails?.orderDetail?.quantity + " " + corporateDetails?.orderDetail?.unit_of_measurement} />
                        </Box>
                      </Box>
                      <Divider
                        sx={{
                          ...commonStyles.verticalDivider2
                        }}
                      />
                      {/* 2nd */}
                      <Box sx={{...commonStyles.boxInfo_2}}>
                        <Box sx={{...commonStyles.oInfo}}>
                            <Box sx={{...commonStyles.label}}>
                              <img
                                alt="Seller Icon"
                                src={orderIcon}
                              />
                              <AjTypography sx={{...commonStyles.text}} displayText={"Order ID"} />
                            </Box>
                            <Box sx={{display: "flex", gap: "8px"}}> 
                                <AjTypography sx={{...commonStyles.titleInfo}} displayText={corporateDetails?.orderDetail?.order_id} />
                                <img 
                                  alt="copy"
                                  src={copy}
                                  style={{width: "20px", height: "18px", cursor: "pointer"}}
                                />
                            </Box>
                        </Box>
                        <Box sx={{...commonStyles.oInfo}}>
                            <Box sx={{...commonStyles.label}}>
                              <img
                                alt="Seller Icon"
                                src={calendar}
                              />
                              <AjTypography sx={{...commonStyles.text}} displayText={"Order Date"} />
                            </Box>
                            <AjTypography 
                              sx={{...commonStyles.titleInfo}} 
                              displayText={`${moment(
                                corporateDetails?.orderDetail?.transaction_created_at
                              ).format("DD/MM/YYYY")}`} />
                        </Box>
                      </Box>
                    </Box>
                </Box>
          </Box>}
          {/* Warehouse info */}
            {isLoading ? 
            <Box
            sx={[
              commonStyles.orderWarehouse
            ]}
          >
            <Box sx={[commonStyles.product_info_block_warehouse]}>
            <Skeleton sx={{ ...commonStyles.warehouse, width: "10rem"}} />
                <Box
                  container
                  sx={{
                    ...commonStyles.wOrient
                  }}
                >
                    {corporateDetails?.warehouseDetail?.map((item, index) => (
                  <Box sx={{...commonStyles.logisticOrderInfo}}>
                    <Box 
                        key={index}
                        sx={
                          [commonStyles.warehouse_detail]
                        }
                      >
                        <Skeleton sx={[commonStyles.subText]} />
                        <Box sx={{display: "flex", fontSize: ".5rem", gap: "4px"}}>
                          <Skeleton sx={{color: "#898B87", fontSize: "1rem"}} />
                          <Skeleton sx={{color: "#000", fontSize: "1rem"}} />
                        </Box>
                    </Box>
                    <Box 
                        key={index}
                        sx={
                          [commonStyles.warehouse_detail_2]
                        }
                      >
                        <Skeleton sx={[commonStyles.subText]} />
                        <Box sx={{display: "flex", fontSize: ".5rem", gap: "4px"}}>
                          <Skeleton sx={{color: "#898B87", fontSize: "1rem"}} />
                          <Skeleton sx={{color: "#000", fontSize: "1rem"}} />
                        </Box>
                    </Box>
                 </Box>
                ))
              }
              </Box>
            </Box>
            <Grid
              container
              sx={{
                display: 'flex',
                flexDirection: "row",
                marginTop: "32px",
              }}
            >  
            
            </Grid>
          </Box>
            :
            <Box
              sx={[
                commonStyles.orderWarehouse
              ]}
            >
              <Box sx={[commonStyles.product_info_block_warehouse]}>
              { 
              <Typography sx={[commonStyles.warehouse]}>Warehouse Information</Typography>}
                  <Box
                    container
                    sx={{
                      ...commonStyles.wOrient
                    }}
                  >
                      {corporateDetails?.warehouseDetail?.map((item, index) => (
                    <Box sx={{...commonStyles.logisticOrderInfo}}>
                      <Box 
                          key={index}
                          sx={
                            [commonStyles.warehouse_detail]
                          }
                        >
                          <Typography sx={[commonStyles.subText]}>{"Warehouse distribution"}</Typography>
                          <Box sx={{display: "flex", fontSize: ".5rem", gap: "4px"}}>
                            <Typography sx={{color: "#898B87", fontSize: "1rem"}}>{item?.warehouse_name + " "}</Typography>
                            <Typography sx={{color: "#000", fontSize: "1rem"}}>{" - " + item?.quantity + " Ton"}</Typography>
                          </Box>
                      </Box>
                      <Box 
                          key={index}
                          sx={
                            [commonStyles.warehouse_detail_2]
                          }
                        >
                          <Typography sx={[commonStyles.subText]}>{"Warehouse address"}</Typography>
                          <Box sx={{display: "flex", fontSize: ".5rem", gap: "4px"}}>
                            <Typography sx={{color: "#898B87", fontSize: "1rem"}}>{"Address"}</Typography>
                            <Typography sx={{color: "#000", fontSize: "1rem"}}>{" - " + item?.address_1}</Typography>
                          </Box>
                      </Box>
                   </Box>
                  ))
                }
                </Box>
              </Box>
              <Grid
                container
                sx={{
                  display: 'flex',
                  flexDirection: "row",
                  marginTop: "32px",
                }}
              > 
                  
                  
              
              </Grid>
            </Box>}
          {/* </Box> */}
          {/* Logistic Info */}
          {isLoading ? 
            <Box
              sx={[
                commonStyles.orderWarehouse
              ]}
            >
              <Box sx={[commonStyles.product_info_block_warehouse]}>
              <Skeleton sx={{ ...commonStyles.warehouse, width: "10rem"}} />
                  <Box
                    container
                    sx={{
                      display: 'flex',
                      flexDirection: "row",
                      marginTop: "32px",
                    }}
                  >
                  
                    <Box sx={{...commonStyles.logisticOrderInfo}}>
                      <Box 
                          sx={
                            [commonStyles.warehouse_detail]
                          }
                        >
                          <Skeleton sx={[commonStyles.subText]} />
                          <Box sx={{display: "flex", fontSize: ".5rem", gap: "4px"}}>
                            <Skeleton sx={{color: "#000", fontSize: "1rem"}} />
                          </Box>
                      </Box>
                      <Box 
                          sx={
                            [commonStyles.warehouse_detail_2]
                          }
                        >
                          <Skeleton sx={[commonStyles.subText]} />
                          <Box sx={{display: "flex", fontSize: ".5rem", gap: "4px"}}>
                            <Skeleton sx={{color: "#000", fontSize: "1rem"}} />
                          </Box>
                      </Box>
                  </Box>
                  
                </Box>
              </Box>
              <Grid
                container
                sx={{
                  display: 'flex',
                  flexDirection: "row",
                  marginTop: "32px",
                }}
              >  
              </Grid>
            </Box>
          : 
          <Box
              sx={[
                commonStyles.orderWarehouse
              ]}
            >
              <Box sx={[commonStyles.product_info_block_warehouse]}>
              { 
              <Typography sx={[commonStyles.warehouse]}>Logistics Information</Typography>}
                  <Box
                    container
                    sx={{
                      display: 'flex',
                      flexDirection: "row",
                      marginTop: "32px",
                    }}
                  >
                  
                    <Box sx={{...commonStyles.logisticOrderInfo}}>
                      <Box 
                          sx={
                            [commonStyles.warehouse_detail]
                          }
                        >
                          <Typography sx={[commonStyles.subText]}>{"Logistics Preference"}</Typography>
                          <Box sx={{display: "flex", fontSize: ".5rem", gap: "4px"}}>
                            <Typography sx={{color: "#000", fontSize: "1rem"}}>{logisticModePreference}</Typography>
                          </Box>
                      </Box>
                      <Box 
                          sx={
                            [commonStyles.warehouse_detail_2]
                          }
                        >
                          <Typography sx={[commonStyles.subText]}>{"Logistics Ad status"}</Typography>
                          <Box sx={{display: "flex", fontSize: ".5rem", gap: "4px"}}>
                            <Typography sx={{color: "#000", fontSize: "1rem"}}>{isLogisticAdPlaced}</Typography>
                          </Box>
                      </Box>
                   </Box>
                  
                </Box>
              </Box>
              <Grid
                container
                sx={{
                  display: 'flex',
                  flexDirection: "row",
                  marginTop: "32px",
                }}
              >  
              </Grid>
            </Box>}
          </Box>
      </Grid>
    </>
  );
}