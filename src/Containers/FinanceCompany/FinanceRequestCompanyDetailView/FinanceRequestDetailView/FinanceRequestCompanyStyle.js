import { ACTIVE_GREEN, RED } from "../../../../Constant/ColorConstant";
export const styles = {
  boxMarginLeft: {
    marginLeft: "1rem",
  },
  requestSentMargin: { marginLeft: "1rem" },
  btnWidth: {
    width: "15rem",
  },
  cacMargin: {
    "@media (max-width: 600px)": {
      marginTop: "0.75rem",
    },
  },
  layoutOverflow: { overflowX: "hidden" },
  buttonDirection: { display: "flex", flexDirection: "row" },
  closeRequestStyle: {
    marginTop: "1rem",
    marginRight: "1.125rem",
    color: ACTIVE_GREEN,
  },
  revokedStyle: {
    color: RED,
  },
  closeRequestBtnWidth: {
    width: "10.125rem",
  },
};
export default styles;
