import {
  ACTIVE_GREEN,
  DARK_GREY,
  WHITE,
  YELLOW,
  RED,
} from "../../Constant/ColorConstant";

export const styles = {
  activeStyle: {
    backgroundColor: ACTIVE_GREEN,
    "&:hover": {
      backgroundColor: ACTIVE_GREEN,
    },
  },
  inActiveStyle: {
    backgroundColor: DARK_GREY,
    "&:hover": {
      backgroundColor: DARK_GREY,
    },
  },
  statusText: {
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: "1.25rem",
    color: WHITE,
    textTransform: "capitalize",
  },
  inTransitStyle: {
    backgroundColor: YELLOW,
    "&:hover": {
      backgroundColor: YELLOW,
    },
  },
  cursorStyle: {
    cursor: "default",
  },
  revokedDeniedStyle: {
    backgroundColor: RED,
    cursor: "default",
    "&:hover": {
      backgroundColor: RED,
      cursor: "default",
    },
  },
};
