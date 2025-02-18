import { commonStyles } from "../../Style/CommonStyle";

export const styles = {
  mainContainer: {
    height: "calc(100vh - 25.5rem)",
    overflowY: "auto",
    marginTop: "2rem",
    ...commonStyles.customSrollBar,
  },
  button: {
    ...commonStyles.underlineStyle,
    padding: "0rem",
    marginBottom: "0rem",
  },
  coordsContainer: {
    display: "flex",
    "@media (max-width:600px)": {
      flexDirection: "column",
    },
  },
};
