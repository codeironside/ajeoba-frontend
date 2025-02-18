import React from "react";
import { Box } from "@mui/material";
import { commonStyles } from "../../Style/CommonStyle";
import AjDetailData from "../AjDetailData/AjDetailData";
import { styles } from "../AjActiveAdsCard/AjActiveAdsCardStyles.js";
import { openProductDetailsStyles } from "./AjOpenProductDetailsStyles";
import AjButton from "../AjButton";
import defaultImage from "../../Assets/Images/defaultPhoto.png";
import {
  numberWithCommas,
  textCapitalize,
} from "../../Services/commonService/commonService";

const AjOpenProductDetails = (props) => {
  const { data, type } = props;

  return (
    <Box sx={openProductDetailsStyles.mainModalContainer}>
      <Box sx={openProductDetailsStyles.insideModalContainerImage}>
        <Box
          sx={{
            ...commonStyles.imageBox,
            ...{
              backgroundImage: data?.url
                ? `url('${process.env.REACT_APP_IMAGE_URL}/${data?.url}')`
                : `url('${defaultImage}')`,
            },
            ...openProductDetailsStyles.imageContainer,
          }}
        />

        <Box sx={openProductDetailsStyles.insideModalContainer}>
          <Box sx={openProductDetailsStyles.detailsContainer}>
            <Box sx={openProductDetailsStyles.firstColumn}>
              <AjDetailData
                metaData={`${type} Name`}
                data={
                  textCapitalize(data?.product_name) ||
                  textCapitalize(data?.input_name)
                }
                styleData2={{
                  ...styles.productNameWidth,
                  ...commonStyles.ellipsisStyle,
                }}
              />
              <AjDetailData
                metaData="Quantity"
                data={`${data?.available_quantity} ${textCapitalize(
                  data?.unit_of_measurement
                )}`}
                styleData2={{
                  ...styles.productNameWidth,
                  ...commonStyles.ellipsisStyle,
                }}
              />
              {data?.currency && (
                <AjDetailData
                  metaData="Price per unit"
                  data={numberWithCommas(data?.price_per_unit, data?.currency)}
                  styleData={{
                    ...commonStyles.marginBottom0,
                    ...styles.responsiveStyle,
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>

        <Box sx={openProductDetailsStyles.insideModalContainer}>
          <Box sx={openProductDetailsStyles.detailsContainer}>
            <Box sx={openProductDetailsStyles.firstColumn}>
              <AjDetailData
                metaData={`${type} Type`}
                data={
                  type === "Products" ? data?.product_type : data?.input_subtype
                }
                styleData2={{
                  ...styles.productNameWidth,
                  ...commonStyles.ellipsisStyle,
                }}
              />
              <AjDetailData
                metaData="Batch Type"
                data={`${data?.batch_type}`}
                styleData2={{
                  ...styles.productNameWidth,
                  ...commonStyles.ellipsisStyle,
                }}
              />
              {data?.currency && (
                <AjDetailData
                  metaData="Location"
                  data={data?.city}
                  styleData={{
                    ...commonStyles.marginBottom0,
                    ...styles.responsiveStyle,
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={openProductDetailsStyles.buttonContainer}>
        <AjButton
          variant="contained"
          displayText="Buy"
          onClick={props.redirection}
        />
      </Box>
    </Box>
  );
};

export default AjOpenProductDetails;
