import { commonStyles } from "../../Style/CommonStyle";

export const styles = {
  mainContainer: {
    display: "flex",
    maxWidth: "43.75rem",
    "@media (max-width:600px)": {
      flexDirection: "column",
    },
  },
  modalContainer: {
    padding: "1.25rem",
  },
  customButtonBox: {
    "@media (max-width:600px)": {
      position: "relative",
      marginTop: "-0.625rem",
    },
  },
  addCoordsButton: {
    ...commonStyles.underlineStyle,
    padding: "0rem",
    marginBottom: "0rem",
    width: "10rem",
    "@media (max-width:600px)": {
      width: "15rem",
    },
  },
};
