import React from "react";
import Typography from "@mui/material/Typography";

const style = {
  color: {
    color: "#006d33",
  },
};
const AjTypography = ({ displayText, styleData, ...restProps }) => {
  return (
    <Typography sx={{ ...style.color, ...styleData }} {...restProps}>
      {displayText}
    </Typography>
  );
};

export default AjTypography;
