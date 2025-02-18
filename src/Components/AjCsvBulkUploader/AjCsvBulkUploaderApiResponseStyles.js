import { BLACK, PRIMARY_GREEN, DARK_GREY } from "../../Constant/ColorConstant";

export const styles = {
  apiResponseBox: {
    display: "flex",
    flexDirection: "column",
    marginTop: "1.188rem",
    width: "100%",
  },
  apiResponseMessage: {
    fontWeight: "400",
    marginTop: "1rem",
    color: BLACK,
  },
  apiResponseError: { fontWeight: "400", marginTop: "1rem", color: "red" },
  colorActiveGreen: { color: PRIMARY_GREEN },
  colorDarkGrey: { color: DARK_GREY },
  wordBreakAll: { wordBreak: "break-all" },
};
