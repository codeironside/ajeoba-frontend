import React from "react";
import { Grid } from "@mui/material";
import AjTypography from "../AjTypography";
import AjButton from "../AjButton";
import { commonStyles, customCommonStyles } from "../../Style/CommonStyle";
import { getUserData } from "../../Services/localStorageService";
import { numberWithCommas } from "../../Services/commonService/commonService";

const SubscriptionCard = (props) => {
  const { textOne, textTwo, textThree, textFour, currency } = props;

  const userData = getUserData();

  return (
    <>
      <Grid
        sx={{
          ...commonStyles.cardContainer,
        }}
      >
        <AjTypography
          displayText={textOne}
          styleData={{
            ...commonStyles.subHeading,
            ...commonStyles.marginHeading,
          }}
        />
        <AjTypography
          displayText={`${numberWithCommas(textTwo, currency)}`}
          styleData={{
            ...commonStyles.priceStyle,
            ...commonStyles.marginHeading,
          }}
        />
        <AjTypography
          displayText={`${textThree} months validity`}
          styleData={{
            ...commonStyles.subHeading,
            ...commonStyles.marginHeading,
          }}
        />
        <AjTypography
          displayText={textFour}
          styleData={{
            ...commonStyles.subHeading,
            ...commonStyles.marginHeading,
          }}
        />
        <AjButton
          variant="text"
          styleData={{
            ...customCommonStyles.addButtonStyle,
            ...customCommonStyles.subscriptionButtonStyle,
            ...(userData.status !== "ACTIVE" && commonStyles.opacityStyle),
          }}
          textStyle={{
            ...commonStyles.font600,
            ...(userData.status !== "ACTIVE" && commonStyles.colorWhite),
          }}
          displayText="Purchase subscription"
          onClick={props.buttonAction}
          isDisable={userData.status !== "ACTIVE"}
        />
      </Grid>
    </>
  );
};

export default SubscriptionCard;
