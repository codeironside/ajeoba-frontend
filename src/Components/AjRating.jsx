import React from "react";
import { Rating } from "@mui/material";
import { ACTIVE_GREEN } from "../Constant/ColorConstant";

const styles = {
  disableRating: {
    "& 	.MuiRating-icon": {
      color: ACTIVE_GREEN,
    },
  },
  rating: {
    color: ACTIVE_GREEN,
  },
};

export const AjRating = ({
  styleData,
  readOnly,
  defaultValue,
  onChange,
  precision,
  ...restProps
}) => {
  return (
    <Rating
      sx={!readOnly ? [styles.rating, styleData] : styles.disableRating}
      {...restProps}
      readOnly={readOnly}
      name="half-rating"
      value={readOnly && parseInt(defaultValue)}
      defaultValue={!readOnly && parseInt(defaultValue)}
      onChange={onChange}
      precision={precision || 0.5}
    />
  );
};
