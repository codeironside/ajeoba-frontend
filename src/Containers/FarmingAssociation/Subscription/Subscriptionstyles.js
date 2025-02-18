import { RED, WHITE } from "../../../Constant/ColorConstant";
import { commonStyles } from "../../../Style/CommonStyle";
export const styles = {
  mainContainer: {
    padding: "1.5rem",
  },

  contentContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: WHITE,
    borderRadius: "0.75rem",
    alignItems: "center",
    padding: "1.5rem",
    height: "calc(100vh - 10rem)",
    textAlign: "center",
  },
  cardContainer: {
    height: "calc(100vh - 17rem)",
    overflowY: "auto",
    width: "100%",
    padding: "0rem 1rem",
    ...commonStyles.customSrollBar,
  },
  notActiveStyle: {
    color: RED,
    fontSize: "1rem",
  },
};
