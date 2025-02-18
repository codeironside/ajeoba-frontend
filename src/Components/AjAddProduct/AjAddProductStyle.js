import { WHITE, ACTIVE_GREEN } from "../../Constant/ColorConstant";
export const styles = {
  itemContainer: {
    width: "43.75rem",
    gap: "1.25rem",
    display: "flex",
    marginTop: "-0.625rem",
    "@media (max-width: 600px)": {
      height: "auto",
      flexDirection: "column",
      width: "100%",
    },
  },
  errorItemStyle: {
    marginTop: "0.5rem",
    fontWeight: 400,
  },
  gridStyle: { flex: "1", width: "100%" },
  searchInput: {
    height: "3.5rem",
    marginTop: "0.5rem",
    background: WHITE,
    border: "0.063rem solid #F2F2F2",
    boxSizing: "border-box",
    boxShadow: "0px 0.25rem 0.5rem rgba(0, 0, 0, 0.04)",
    borderRadius: "0.5rem",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiAutocomplete-popupIndicator": {
      "& .MuiSvgIcon-root": {
        color: ACTIVE_GREEN,
      },
    },
  },
  nextBtnStyle: {
    marginTop: "2.25rem",
    marginBottom: "1.875rem",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dropDownResponsive: {
    "@media(max-width: 600px)": {
      width: "100%",
      minWidth: "0",
    },
  },
};
