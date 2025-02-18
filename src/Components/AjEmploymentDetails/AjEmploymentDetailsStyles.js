import { BLACK } from "../../Constant/ColorConstant";

export const styles = {
  searchInput: {
    width: "100%",
    height: "3.5rem",
    marginTop: "0.5rem",
    background: "#FFFFFF",
    border: "0.063rem solid #F2F2F2",
    boxSizing: "border-box",
    boxShadow: "0px 0.25rem 0.5rem rgba(0, 0, 0, 0.04)",
    borderRadius: "0.5rem",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  toolTipText: {
    color: BLACK,
    fontWeight: 400,
    fontSize: "0.875rem",
    lineHeight: "1.375rem",
  },
  inputBaseCustomStyle: {
    "@media (max-width:600px)": {
      maxWidth: "85%",
    },
  },
  signUpFormCustomStyle: {
    maxWidth: "95%",
  },
};
