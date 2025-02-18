import { RED } from "../../Constant/ColorConstant";

export const styles = {
  addMoreBtn: {
    padding: "0",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  deleteBtnStyle: {
    padding: "0",
    height: "6.38rem",
    color: RED,
    "@media(max-width: 600px)": {
      height: "2rem",
    },
  },
};
