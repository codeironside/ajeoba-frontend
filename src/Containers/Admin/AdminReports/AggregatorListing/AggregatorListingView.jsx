import React from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { commonStyles } from "../../../../Style/CommonStyle";
import AjTab from "../../../../Components/AjTab/AjTab";
import { REPORTS } from "../../../../Routes/Routes";
import AggregatorListingDetailView from "./AggregatorListingDetailView/AggregatorListingDetailView";

const AggregatorListingView = ({ tabRequired, type }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = useParams();
  const { id } = params;
  const activeTab = searchParams.get("activeTab");


  let componentArray = [];
  if (tabRequired.includes(1)) {
    componentArray = [
      ...componentArray,
      {
        component: (
          <AggregatorListingDetailView
            activeTab={0}
            isProductSold={type === "productSold"}
          />
        ),
        index: 0,
        label: `Association level ${
          type === "productSold" ? "revenue" : "aggregation"
        } Info`,
      },
    ];
  }
  if (tabRequired.includes(2)) {
    componentArray = [
      ...componentArray,
      {
        component: (
          <AggregatorListingDetailView
            activeTab={1}
            isProductSold={type === "productSold"}
          />
        ),
        index: 1,
        label: `Aggregation level ${
          type === "productSold" ? "revenue" : "aggregation"
        }  Info`,
      },
    ];
  }
  if (tabRequired.includes(3)) {
    componentArray = [
      ...componentArray,
      {
        component: (
          <AggregatorListingDetailView
            activeTab={2}
            isProductSold={type === "productSold"}
          />
        ),
        index: 2,
        label: `Farmer level ${
          type === "productSold" ? "revenue" : "aggregation"
        }  Info`,
      },
    ];
  }

  const backArrowHandler = () => {
    navigate(
      `${REPORTS}?activeTab=${
        type === "productSold" ? "products" : "aggregations"
      }`
    );
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
          components={componentArray}
          onChange={(currIndex) =>
            navigate(
              `${REPORTS}/${
                type === "productSold" ? "product-sold" : "product-aggregation"
              }/info/${id}?activeTab=${currIndex}`
            )
          }
          displayMyProfile={false}
          defaultIndex={Number.parseInt(activeTab || 0)}
          isTabPanelDisplay={true}
          textEllipsis={true}
        />
      </Grid>
    </>
  );
};

export default AggregatorListingView;
