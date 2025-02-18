import React, { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AjTab from "../../../../Components/AjTab/AjTabCustom";
import AJOrderTracker from "../../../../Components/AjOrderTracker/AjOrderTracker";
import { commonStyles } from "../../../../Style/CommonStyle";
import { TRADING } from "../../../../Routes/Routes";
import ProductInputDetails from "./ProductInputDetails";
import { useSearchParams } from 'react-router-dom';

const InputDetail = () => {
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState(null);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  let product_type = searchParams?.get('product_type'); // 'name'


  const backArrowHandler = () => {
    navigate(`${TRADING}`);
  };
  
  return (
    <>
      <Grid
        container
        sx={{
          ...commonStyles.signupFormMainGridContainer,
          ...commonStyles.relativePosition,
          ...commonStyles.containerpadding,
        }}
      >
        <IconButton
          sx={commonStyles.whiteBackButtonPosition}
          onClick={backArrowHandler}
        >
          <ArrowBackRoundedIcon
            sx={commonStyles.backButtonBlackFont}
            onClick={backArrowHandler}
          />
        </IconButton>
        <AjTab
          components={[
            {
              component: <ProductInputDetails product_type={product_type} id={id} />,
              index: 0,
              label: "Active Ad Details",
            },
            // {
            //   component: <AJOrderTracker status={orderStatus} />,
            //   index: 1,
            //   label: "Delivery Details",
            // },
          ]}
          isTabPanelDisplay={true}
          displayProfileText={true}
          backgroundTabs={true}
          positionLeft={true}
        />
      </Grid>
    </>
  );
};

export default InputDetail;