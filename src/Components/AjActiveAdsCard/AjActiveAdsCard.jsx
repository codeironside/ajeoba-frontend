import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
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

const AjActiveAdsCard = (props) => {
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
  return (
    <>
      <Grid
        container
        sx={{
          ...styles.mainContainer,
        }}
      >
        <Box sx={styles.subContentContainer}>
          <Grid
            item
            sx={{
              ...commonStyles.marginRightCustom,
            }}
          >
            <Box
              sx={{
                ...commonStyles.imageBox,
                ...{
                  backgroundImage: image
                    ? `url('${process.env.REACT_APP_IMAGE_URL}/${image}')`
                    : `url('${defaultImage}')`,
                },
              }}
            ></Box>
          </Grid>
          <Grid
            item
            sx={{
              ...styles.marginTopResponsive,
            }}
          >
            <AjDetailData
              metaData="Product Name"
              data={productName}
              styleData={{
                ...commonStyles.marginBottom0,
                ...styles.responsiveStyle,
                ...commonStyles.textCapitalize,
              }}
            />
            <AjDetailData
              metaData="Batch Type"
              data={batchType}
              styleData={{
                ...commonStyles.marginBottom0,
                ...styles.responsiveStyle,
              }}
            />
            <AjDetailData
              metaData="Batch Id"
              data={batchId}
              styleData={{
                ...commonStyles.marginBottom0,
                ...styles.responsiveStyle,
              }}
            />
            <AjDetailData
              metaData="Quantity"
              data={`${quantity} ${textCapitalize(unit_of_measurement)}`}
              styleData={{
                ...commonStyles.marginBottom0,
                ...styles.responsiveStyle,
              }}
            />
            <AjDetailData
              metaData="Price"
              data={`${numberWithCommas(
                price,
                userData?.currency
              )} (${numberWithCommas(
                pricePerItem,
                userData?.currency
              )}per ${unit_of_measurement})`}
              styleData={{
                ...commonStyles.marginBottom0,
                ...styles.responsiveStyle,
              }}
            />
          </Grid>
        </Box>

        <Grid sx={{ ...styles.responsiveStyle }} item>
          <AjButton
            variant="text"
            displayText="Edit"
            styleData={{
              ...commonStyles.underlineStyle,
              ...commonStyles.moreCertificateButton,
            }}
            onClick={() => navigate(`active-ads/edit/${id}`)}
          />
          <AjButton
            variant="text"
            displayText="View more"
            styleData={{
              ...commonStyles.underlineStyle,
              ...commonStyles.moreCertificateButton,
            }}
            onClick={() => navigate(`active-ads/detail/${id}`)}
          />
          <AjButton
            variant="text"
            displayText="Delete"
            styleData={{
              ...commonStyles.underlineStyle,
              ...commonStyles.moreCertificateButton,
              ...commonStyles.colorRed,
            }}
            onClick={handleDelete}
          />
        </Grid>
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
      </Grid>
    </>
  );
};

export default AjActiveAdsCard;
