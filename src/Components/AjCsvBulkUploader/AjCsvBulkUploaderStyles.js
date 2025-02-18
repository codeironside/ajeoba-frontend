import { ACTIVE_GREEN, DARK_GREY, WHITE } from "../../Constant/ColorConstant";

export const styles = {
  mainBox: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "15.313rem",
    border: "0.125rem dashed lightgray",
    borderRadius: "0.5rem",
  },
  cloudUploadIcon: {
    color: DARK_GREY,
    marginTop: "1.563rem",
    width: "1.5rem",
    height: "1.5rem",
  },
  uploadButton: {
    backgroundColor: ACTIVE_GREEN,
    color: WHITE,
    width: "7.5rem",
    height: "3.5rem",
    boxShadow: "none",
    textTransform: "none",
    border: "0.063rem solid ACTIVE_GREEN",
    marginTop: "0.75rem",
    borderRadius: "0.5rem",
    "&:hover": {
      backgroundColor: ACTIVE_GREEN,
      color: WHITE,
      boxShadow: "none",
    },
  },
  uploadText: {
    fontWeight: "400",
    fontSize: "0.875rem",
    lineHeight: "1.313rem",
  },
  dragAndDropText: {
    color: DARK_GREY,
    fontWeight: "400",
    fontSize: "0.875rem",
    lineHeight: "1.313rem",
    marginTop: "0.75rem",
    textAlign: "center",
  },
};
