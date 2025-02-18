import { PRIMARY_GREEN } from "../../Constant/ColorConstant";

export const styles = {
  commonFontFamily: {
    fontFamily: "Poppins",
  },
  mainContainer: {
    paddingLeft: "3rem",
    "@media (max-width:500px)": {
      paddingLeft: "2rem",
    },
    "@media (max-width:300px)": {
      paddingLeft: "1rem",
    },
  },
  TncContainer: {
    padding: "5rem",
    paddingTop: "0",
    marginTop: "2.5rem",
    height: " calc(100vh - 7.5rem)",
    "@media (max-width:600px)": {
      padding: "3rem",
    },
    "@media (max-width:500px)": {
      padding: "2rem",
    },
  },

  headingStyle: {
    fontFamily: "Poppins",
    fontSize: "2rem",
    fontWeight: "500",
    "@media (max-width:500px)": {
      fontSize: "1.5rem",
    },
    "@media (max-width:380px)": {
      fontSize: "1rem",
    },
  },
  horizontalTag: {
    backgroundColor: `${PRIMARY_GREEN}`,
    height: ".1rem",
  },

  blockDisplay: {
    display: "block",
  },
};
