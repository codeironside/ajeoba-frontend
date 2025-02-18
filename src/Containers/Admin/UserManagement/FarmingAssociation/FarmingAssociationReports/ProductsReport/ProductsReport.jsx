import { Grid } from "@mui/material";
import React from "react";
import AjTab from "../../../../../../Components/AjTab/AjTab";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../../../Style/CommonStyle";
import financeActiveIcon from "../../../../../../Assets/Images/incomeActiveIcon.svg";
import ProductsSoldContainer from "../../../../../../Components/ProductsReport/ProductsSoldContainer/ProductsSoldContainer";

const ProductsReport = () => {
  return (
    <Grid
      container
      sx={{
        ...customCommonStyles.mainContainer,
        ...commonStyles.relativePosition,
        ...customCommonStyles.reportsMainContainer,
      }}
    >
      <AjTab
        components={[
          {
            component: <ProductsSoldContainer />,
            index: 0,
            label: `Total quantity of products sold (count)`,
            icon: <img src={financeActiveIcon} />,
          },
        ]}
        backgroundTabs={false}
        displayMyProfile={false}
        isTabPanelDisplay={true}
      />
    </Grid>
  );
};

export default ProductsReport;
