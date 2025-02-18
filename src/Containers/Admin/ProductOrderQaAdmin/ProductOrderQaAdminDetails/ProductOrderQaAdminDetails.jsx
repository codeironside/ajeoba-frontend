import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AjTab from "../../../../Components/AjTab/AjTab";
import { commonStyles } from "../../../../Style/CommonStyle";
import { ADMIN_PRODUCT_ORDER_QA } from "../../../../Routes/Routes";
import ProductOrderQaAdminDetailsTab from "./ProductOrderQaAdminDetailsTab";


function ProductOrderQaAdminDetails() {
  const navigate = useNavigate();

  const backArrowHandler = () => {
    navigate(ADMIN_PRODUCT_ORDER_QA);
  };

  return (
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
        <ArrowBackRoundedIcon sx={commonStyles.backButtonBlackFont} />
      </IconButton>
      <AjTab
        components={[
          {
            component: <ProductOrderQaAdminDetailsTab />,
            label: "Product Order Details",
          },
        ]}
        displayMyProfile={false}
        isTabPanelDisplay={true}
      />
    </Grid>
  );
}

export default ProductOrderQaAdminDetails;
