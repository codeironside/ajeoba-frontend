import React from "react";
import AjTypography from "../AjTypography";
import { commonStyles } from "../../Style/CommonStyle";

const AjDetailTypography = (props) => {
  const {
    styleData1,
    styleData2,
    displayText1,
    displayText2,
    displayText3,
    styleData3,
  } = props;
  return (
    <>
      <AjTypography
        styleData={{
          ...commonStyles.detailTypographyStyle,
          ...commonStyles.detailTypographyStyleHead,
          ...styleData1,
        }}
        displayText={displayText1}
      />
      {displayText2 && (
        <AjTypography
          styleData={{
            ...commonStyles.detailTypographyStyle,
            ...commonStyles.detailTypographyStyleData,
            ...styleData2,
          }}
          displayText={displayText2}
        />
      )}

      {displayText3 && (
        <AjTypography
          styleData={{
            ...commonStyles.detailTypographyStyle,
            ...commonStyles.detailTypographyStyleData,
            ...styleData3,
          }}
          displayText={displayText3}
        />
      )}
    </>
  );
};

export default AjDetailTypography;
