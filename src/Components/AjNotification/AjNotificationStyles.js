import {
  ACTIVE_GREEN,
  DARK_GREY,
  LIGHT_GREEN,
  WHITE,
} from "../../Constant/ColorConstant";
import { commonStyles } from "../../Style/CommonStyle";

export const styles = {
  popOverPaperStyles: {
    width: "calc(100vw - 70rem)",
    height: "calc(100vh - 5rem)",
    minWidth: "23rem",
    display: "flex",
    flexDirection: "column",
    "@media(max-width : 600px)": {
      maxWidth: "20rem",
    },
  },
  notificationHeaderStyles: {
    display: "flex",
    position: "sticky",
    flexDirection: "column",
    width: "100%",
    background: WHITE,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerHeadingStyles: {
    fontSize: "1.375rem",
    fontWeight: "500",
    color: ACTIVE_GREEN,
    textAlign: "center",
    margin: "1.5rem 0rem",
  },
  avatarDataStyles: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    "&:hover": {
      backgroundColor: LIGHT_GREEN,
    },
  },
  dividerStyle: {
    marginBottom: "none",
    marginTop: "none",
    borderColor: DARK_GREY,
  },
  noDataFoundStyles: {
    display: "flex",
    height: "22rem",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  anchorOriginStyles: {
    vertical: "bottom",
    horizontal: "right",
  },
  transformOriginStyles: {
    vertical: "top",
    horizontal: "right",
  },
  notificationIconStyles: {
    marginRight: "0.525rem",
    cursor: "pointer",
    "&:hover": {
      color: ACTIVE_GREEN,
    },
  },
  scrollNotificationStyles: {
    overflowX: "hidden",
    overflowY: "auto",
    ...commonStyles.customSrollBar,
  },
  notificationDataStyles: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
  notificationTitleStyles: {
    cursor: "pointer",
    margin: "0.5rem 1.2rem",
    "&:hover": {
      fontWeight: 500,
    },
  },
  timeStyle: {
    margin: "0rem 1.2rem",
    fontSize: "0.875rem",
    textAlign:"end",
  },
};
