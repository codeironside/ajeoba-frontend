import { BLACK } from "../../Constant/ColorConstant";

export const styles = {
  dialog: {
    height: "50.313rem",
    width: "53.125rem",
    margin: "auto",
    color: (theme) => theme.palette.grey[500],
    "@media (max-width: 600px)": {
      maxWidth: "90vw",
      maxHeight: "95vh",
    },
  },
  dialogProduct: {
    height: "32rem",
    width: "32rem",
    margin: "auto",
    color: (theme) => theme.palette.grey[500],
    "@media (max-width: 600px)": {
      maxWidth: "90vw",
      maxHeight: "95vh",
    },
  },

  dialogProductInput: {
    height: "32rem",
    width: "32rem",
    margin: "auto",
    color: (theme) => theme.palette.grey[500],
    "@media (max-width: 600px)": {
      maxWidth: "90vw",
      maxHeight: "95vh",
    },
  },
  title: {
    fontSize: "0.875rem",
    lineHeight: "4.25rem",
    height: "4.25rem",
    borderBottom: "0.063rem solid #F4F4F4",
    fontWeight: "500",
    paddingLeft: "2.5rem",
    color: BLACK,
  },
  closeIcon: {
    position: "absolute",
    right: 40,
    top: 24,
    color: BLACK,
    cursor: "pointer",
  },
};
