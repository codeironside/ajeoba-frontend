import { RED } from "../../Constant/ColorConstant";
export const styles = {
  mainContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
  },
  kycBox: {
    minWidth: "13.75rem",
    padding: "0px 0.625rem",
    height: "3.5rem",
    borderRadius: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "3.75rem",
  },
  kycMessage: {
    fontWeight: 400,
    fontSize: "0.875rem",
    lineHeight: "1.313rem",
    color: "#FFFFFF",
    marginRight: "0.625rem",
  },
  kycFalse: {
    backgroundColor: RED,
  },
  kycTrue: {
    backgroundColor: "#6D9E3F",
  },
  kycFalseMessage: {
    color: RED,
    marginTop: "2rem",
  },
  kycTrueMessage: {
    color: "#6D9E3F",
    marginTop: "2rem",
  },
};
