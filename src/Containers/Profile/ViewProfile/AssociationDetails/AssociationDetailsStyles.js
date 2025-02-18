import {
  ACTIVE_GREEN,
  LIGHT_GREY,
  WHITE,
  DARK_GREY,
} from "../../../../Constant/ColorConstant";
import { commonStyles } from "../../../../Style/CommonStyle";
export const styles = {
  centerContentContainer: {
    marginTop: "-4.375rem",
    borderRadius: "0.5rem",
    overflow: "auto",
    height: "calc(100vh - 12.5rem)",
    ...commonStyles.customSrollBar,
    "@media (max-width: 900px)": {
      paddingTop: 0,
      height: "calc(100vh - 12.5rem)",
      marginTop: "-4.5rem",
    },
  },

  wrapper: {
    display: "grid",
    gridGap: "0 3.75rem",
    gridTemplateColumns: "31.25rem 31.25rem",
    "@media (max-width: 900px)": {
      gridTemplateColumns: "repeat(auto-fill, 18.75rem)",
    },
  },
  chipDropDown: {
    border: "0.063rem solid #F2F2F2",
    boxSizing: "border-box",
    boxShadow: "0px 0.25rem 0.5rem rgba(0, 0, 0, 0.04)",
    borderRadius: "0.5rem",

    marginTop: "0.5rem",
    "& fieldset": {
      border: "none",
    },
    "& .MuiOutlinedInput-root": {
      minHeight: "3.5rem",
    },
    "& .MuiSelect-iconOpen": {
      borderRadius: "0.5rem 0px 0px 0.5rem",
    },
  },
  disableInput: {
    marginTop: "0.5rem",
    background: LIGHT_GREY,
  },
  disableIconColor: {
    "& .MuiAutocomplete-popupIndicator": {
      "& .MuiSvgIcon-root": {
        color: DARK_GREY,
      },
    },
  },
  editBtn: {
    color: ACTIVE_GREEN,
    lineHeight: "1.313rem",
    fontWeight: "600",
    borderRadius: "0.5rem",
    position: "absolute",
    width: "7.5rem",
    right: "1.875rem",
    top: "0.75rem",
    backgroundColor: WHITE,
    "&:hover": {
      backgroundColor: ACTIVE_GREEN,
      color: WHITE,
    },
  },
  editCorporateBtn: {
    color: ACTIVE_GREEN,
    lineHeight: "1.313rem",
    fontWeight: "600",
    borderRadius: "0.5rem",
    position: "absolute",
    width: "8rem",
    right: "1.875rem",
    top: "-.9rem",
    backgroundColor: WHITE,
    "&:hover": {
      backgroundColor: ACTIVE_GREEN,
      color: WHITE,
    },
    "@media (max-width: 600px)": {
      top: "-1rem!important",
      right: "1rem!important",
    },
  },
  responsiveBtnTopRole: {
    "@media (max-width: 900px)": {
      top: "14.375rem",
    },
  },
  responsiveBtnTop: {
    "@media (max-width: 900px)": {
      top: "21.875rem",
    },
    "@media (max-width: 400px)": {
      top: "22.813rem",
    },
  },

  responsiveBtnTopTax: {
    "@media (max-width: 900px)": {
      top: "11.25rem",
    },
  },
  responsiveBtnQa: {
    "@media (max-width: 900px)": {
      top: "11.25rem",
    },
  },
  associtionDetailsContainer: {
    display: "flex",
    flexDirection: "column",
    width: "43.75rem",
    alignItems: "center",
    marginTop: "3.125rem",
    "@media (max-width: 1000px)": {
      width: "90%",
    },
  },
  productsMemberStyles: {
    marginBottom: "1.625rem",
  },
  pcc_box: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: "2rem",
    "@media (max-width: 600px)": {
      flexDirection: "column",
      gap: "0rem",
      width: "90%",
      margin: "0 auto",
    },
  },
  pcc_box_inside: {
    flex: "1",
  },
  ratingStyles: {
    "& .MuiRating-iconFilled": {
      color: ACTIVE_GREEN,
    },
  },
  searchInput: {
    width: "100%",
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
  setWidth: {
    width: "28.125rem",
  },
  responsiveEditCorporate: {
    "@media (max-width: 900px)": {
      top: "17.25rem",
    },
  },
  responsiveEditLogistics: {
    "@media (max-width: 900px)": {
      top: "22.5rem",
    },
  },
};
