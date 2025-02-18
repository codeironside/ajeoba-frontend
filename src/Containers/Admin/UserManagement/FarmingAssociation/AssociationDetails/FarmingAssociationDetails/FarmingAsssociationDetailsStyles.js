import {
  WHITE,
  ACTIVE_GREEN,
  BLACK,
  DARK_GREY,
  LIGHT_GREY,
} from "../../../../../../Constant/ColorConstant";

export const styles = {
  farmingAssociationDetailsContainer: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
    margin: "1.5rem 0 0 0",
    "@media (max-width: 1000px)": {
      flexDirection: "column",
      width: "100%",
      gap: "0.313rem",
    },
  },
  farmingsociationFieldContainer: {
    marginTop: "0.625rem",
    marginBottom: "0.625rem",
    "@media(max-width:600px)": {
      marginTop: "0",
    },
  },
  typeOfProductField: {
    marginTop: "0.625rem",
  },
  farmingAssocitionMember: {
    marginTop: "0px",
  },
  country: {
    marginTop: "0px",
    marginBottom: "3.125rem",
    "@media(max-width: 600px)": {
      marginBottom: "1.875rem",
    },
  },
  countryLabel: {
    "@media(max-width:600px)": {
      marginBottom: "1.875rem",
    },
  },
  editRespnsiveBtn: {
    "@media(max-width:900px)": {
      top: "40%",
      right: "40%",
    },
    "@media(max-width:500px)": {
      right: "36%",
    },
    "@media(max-width:390px)": {
      top:"40%",
      right: "35%",
    },
  },
  marginTopZero: {
    marginTop: 0,
  },
  associtionDetailsBoxes: {
    flexDirection: "column",
    flex: "1",
  },
  typoColor: {
    color: BLACK,
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
  ratingStatus: {
    textAlign: "center",
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
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dateIconColor: {
    color: "red",
  },
  disableDateIconColor: {
    color: DARK_GREY,
  },
  ratingIconColor: {
    "& .MuiRating-iconFilled": {
      color: ACTIVE_GREEN,
    },
  },
  responsiveBox: {
    "@media (max-width: 600px)": {
      marginTop: "5.75rem",
    },
  },
  changeDownloadBtnStyle: {
    textDecoration: "underline",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    marginLeft: "0.5rem",
    color: DARK_GREY,
  },
  cacDocErrorText: {
    width: "100%",
    marginTop: "1.625rem",
    color: "red",
    height: "1.25rem",
    fontSize: "0.875rem",
  },
  dividerStyles: {
    width: "100%",
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
    background: LIGHT_GREY,
    opacity: "0.4",
  },
  ratingStatusContainer: {
    width: "70%",
  },
  cacDocument: {
    "@media(max-width:500px)": {
      marginBottom: "-1.25rem",
    },
  },
};
