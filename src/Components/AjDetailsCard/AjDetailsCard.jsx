import React from "react";
import AjTypography from "../AjTypography";
import { viewProfileStyles } from "../../Containers/Profile/ViewProfile/ViewProfileStyle";
import AjDetailData from "../AjDetailData/AjDetailData";

const AjDetailsCard = (props) => {
  const { details, heading } = props;

  return (
    <>
      <AjTypography
        displayText={heading}
        styleData={viewProfileStyles.addressMainHeading}
      />
      {details.map((item) => {
        for (let i in item) {
          return <AjDetailData metaData={i} data={item[i]} />;
        }
      })}
    </>
  );
};

export default AjDetailsCard;
