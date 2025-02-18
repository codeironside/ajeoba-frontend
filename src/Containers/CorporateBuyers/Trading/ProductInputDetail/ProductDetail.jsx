import React, { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AjTab from "../../../../Components/AjTab/AjTabCustom";
import { commonStyles, customCommonStyles } from "../../../../Style/CommonStyle";
import { TRADING } from "../../../../Routes/Routes";
import ProductInputDetails from "./ProductInputDetails";
import { useSearchParams } from 'react-router-dom';

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  let product_type = searchParams.get('product_type'); 


  const backArrowHandler = () => {
    navigate(`${TRADING}`);
  };
  
  return (
    <>
      <Grid
          container
          sx={{
            // ...customCommonStyles.mainCorporateContainer,
            ...commonStyles.signupFormMainGridContainerCorp,
            ...commonStyles.relativePosition,
            // ...customCommonStyles.tableWrap,
            // ...customCommonStyles.containerpadding,
          }}
        >
          <IconButton
            sx={commonStyles.whiteBackButtonPosition}
            onClick={backArrowHandler}
          >
            <ArrowBackRoundedIcon sx={commonStyles.backButtonBlackFont} />
          </IconButton>
        <AjTab
            components={[
                {
                    component: <ProductInputDetails product_type={product_type} id={id} />,
                    label: "Active Ad Details",
                },
            ]}
            isTabPanelDisplay={true}
            positionLeft={true}
        />
      </Grid>
    </>
  );
};

export default ProductDetail;