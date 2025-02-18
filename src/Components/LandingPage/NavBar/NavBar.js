import { ACTIVE_GREEN, WHITE } from "../../../Constant/ColorConstant";
import { commonStyles } from "../../../Style/CommonStyle";

export const navstyles = {
  logoStyles: {
    "@media (max-width: 600px)": {
      width: "30%",
    },
  },
  navbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    bgcolor: "#F4F4F4",
    height: "7rem",
    "@media (max-width: 600px)": {
      height: "4rem",
    },
  },
  buttonsStyles: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "3rem",
    "@media (max-width: 600px)": {
      gap: "1rem",
    },
  },
  signupStyle: {
    backgroundColor: ACTIVE_GREEN,
    width: "100%",
    padding: "1.2rem",
    borderRadius: "0.09rem",
    cursor: "pointer",
    fontSize: "1rem",
    textAlign: "center",
    color: WHITE,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    "@media (max-width: 600px)": {
      padding: ".5rem ",
      fontSize: ".6rem",
    },
    "@media(max-width:768px)": {
      padding: "1.2rem ",
    },
    "@media(max-width:480px)": {
      padding: "1.2rem ",
    },
  },
  signupStyleBuy: {
    backgroundColor: ACTIVE_GREEN,
    width: "100%",
    padding: ".9rem 1.2rem",
    borderRadius: "0.09rem",
    cursor: "pointer",
    fontSize: "1rem",
    textAlign: "center",
    color: WHITE,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    // "@media (max-width: 600px)": {
    //   padding: ".5rem ",
    //   fontSize: ".6rem",
    // },
    "@media(max-width:768px)": {
      padding: "1.2rem ",
    },
    "@media(max-width:480px)": {
      padding: "1.5rem ",
    },
  },
  signinStyle: {
    color: ACTIVE_GREEN,
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    "@media (max-width: 600px)": {
      fontSize: ".8rem",
    },
  },
};

export const bannerStyles = {
  bannerStyle: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    gap: "2rem",
    margin: "0 auto",
    padding: "0 1rem",
    "@media (max-width: 768px)": {
      flexDirection: "column-reverse",
    },
  },
  categoryHeader: {
    padding: "20px",
    fontWeight: "500",
    color: "#006d33",
    "@media (max-width: 600px)": {
      padding: "0 5px",
      fontWeight: "600",
      fontSize: "1rem",
    },
  },
  categoryStyle: {
    backgroundColor: "#ffff",
    width: "100%",
    height: "75vh",
    borderRadius: "5px",
  },
  categoryListBigScreen: {
    padding: ".5rem",
    maxHeight: "85%",
    overflowY: "scroll",
    marginTop: ".8rem",
    ...commonStyles.customSrollBar,
  },
  categoryListSmallScreen: {
    display: "flex",
    overflowX: "auto",
    textTransform: "capitalize",
  },
  bannerCaption: {
    width: "68.063rem",
    height: "6.375rem",
    top: " 38%",
    left: " 23%",
    position: "absolute",
    color: "white",

    fontSize: "40px",
    fontFamily: "DM Sans",
    lineHeight: "58px",
    fontWeight: "700",
    textAlign: "center",

    "@media (max-width: 768px)": {
      fontSize: "1.3rem",
      lineHeight: "2.3rem",
      margin: "1rem 0",
      width: "60%",
      height: "auto",
      top: " 40%",
      left: " 25%",
    },
    "@media (max-width: 480px)": {
      fontSize: "1.1rem",
      lineHeight: "1.6rem",
      margin: ".4rem 0",
      top: " 6.88rem ",
      left: "4.25rem",
    },
  },
  bannerButton: {
    border: "2px solid white",
    padding: " 1rem 1rem",
    color: "white",
    minWidth: "20%",
    fontWeight: "600",
    fontSize: "1.3rem",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
      fontWeight: "700",
    },
    "@media (max-width: 768px)": {
      // minWidth: "30%",
      minHeight: "20%",
      fontWeight: "500",
      fontSize: "1.1rem",
    },
    "@media (max-width: 480px)": {
      // width: "45%",
      // padding: " .3rem",
      fontWeight: "400",
      fontSize: ".7rem",
      border: "1px solid white",
    },
  },
};
