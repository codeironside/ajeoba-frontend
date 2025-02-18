import React, { useState } from "react";
import { Grid, Box, Typography, useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";

import { commonStyles } from "../../Style/CommonStyle";
import { useNavigate } from "react-router-dom";
import AjDetailData from "../AjDetailData/AjDetailData";
import AjButton from "../AjButton";
import AjConfirmModal from "../AjConfirmModal/AjConfirmModal";
import AjDialog from "../AjDialog/AjDialog";
import { styles } from "./AjActiveAdsCardStyles";
import defaultImage from "../../Assets/Images/defaultPhoto.png";
import {
  numberWithCommas,
  textCapitalize,
} from "../../Services/commonService/commonService";
import { getUserData } from "../../Services/localStorageService";
import { deleteActiveAdMarketplaceAction } from "../../Redux/FarmingAssociation/MarketPlace/marketplaceActions";

function AjActiveAdsRetialMarket(props) {
  const {
    image,
    unit_of_measurement,
    batchId,
    id,
    batchType,
    pricePerItem,
    price,
    productName,
    quantity,
  } = props;
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const userData = getUserData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = () => {
    setOpenDialog(true);
  };

  const handleConfirm = () => {
    dispatch(deleteActiveAdMarketplaceAction(id));
  };

  const getImgUrl = () => {
    if (image) {
      return `${process.env.REACT_APP_IMAGE_URL}/${image}`;
    } else {
      return defaultImage;
    }
  };

  return (
    <Box
      // container
      sx={{
        ...styles.mainContainerRetail,
      }}
    >
      <Box sx={styles.subContentContainerRetail}>
        <Box
          item
          sx={{
            ...commonStyles.marginRightCustomRetail,
          }}
        >
          <img style={commonStyles.imageBoxRetail} src={getImgUrl()} />
        </Box>
        <Box sx={commonStyles.retailMarketProdTypeContainerheader}>
          <Grid
            item
            sx={{
              ...commonStyles.retailProductDetails,
            }}
          >
            {" "}
            <Typography
              sx={{
                ...commonStyles.retailMarketProdName,
              }}
            >
              {productName}
            </Typography>
            <Typography
              sx={{
                ...commonStyles.retailMarketProdType,
              }}
            >
              {`Livestock product`}
            </Typography>
            <Box sx={commonStyles.retailMarketProdTypeContainer}>
              <Typography
                sx={{
                  ...commonStyles.retailMarketProdDeets,
                }}
              >
                <span style={commonStyles.retailMarketProdTypelabel}>
                  Quantity:
                </span>{" "}
                <span style={commonStyles.retailMarketProdTypekey}>
                  {`${quantity} ${textCapitalize(unit_of_measurement)}`}
                </span>
              </Typography>{" "}
              |
              <Typography
                sx={{
                  ...commonStyles.retailMarketProdDeets,
                }}
              >
                <span style={commonStyles.retailMarketProdTypelabel}>
                  Price per {unit_of_measurement}:
                </span>{" "}
                <span style={commonStyles.retailMarketProdTypekey}>
                  {`${quantity} ${textCapitalize(unit_of_measurement)}`}
                </span>
              </Typography>{" "}
              |
              <Typography
                sx={{
                  ...commonStyles.retailMarketProdDeets,
                }}
              >
                <span style={commonStyles.retailMarketProdTypelabel}>
                  Type:
                </span>{" "}
                <span style={commonStyles.retailMarketProdTypekey}>
                  {batchType}
                </span>
              </Typography>{" "}
            </Box>
          </Grid>
          <Box sx={commonStyles.retailMarketProdOtherButtnsContainer}>
            <Typography
              sx={commonStyles.retailMarketProdOtherButtns}
              onClick={() => navigate(`activead/edit/${id}`)}
            >
              Edit
            </Typography>
            <Typography
              sx={commonStyles.retailMarketProdOtherButtns}
              onClick={() => navigate(`activead/detail/${id}`)}
            >
              View more
            </Typography>
            <Typography
              sx={{ ...commonStyles.retailMarketProdOtherButtns, color: "red" }}
              onClick={handleDelete}
            >
              Delete
            </Typography>
          </Box>
        </Box>
      </Box>
      <AjDialog
        open={openDialog}
        closeModal={setOpenDialog}
        styleData={commonStyles.dialogContainer}
      >
        <AjConfirmModal
          displayText="Are you sure you want to delete this Ad?"
          closeModal={setOpenDialog}
          onConfirm={() => handleConfirm()}
        />
      </AjDialog>
    </Box>
  );
}

export default AjActiveAdsRetialMarket;
