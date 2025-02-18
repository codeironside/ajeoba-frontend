import {
  DARK_GREY,
  LIGHT_GREY,
  METALLIC_SILVER,
  RED,
  WHITE,
} from "../../../../Constant/ColorConstant";

export const styles = {
  fieldMarginBottom: {
    marginBottom: "1.75rem",
  },
  statusContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  customHeaderStyle: {
    "@media (max-width:600px)": {
      marginTop: "0rem",
    },
  },
  detailMainContainer: {
    display: "flex",
    margin: "1rem",
    width: "80%",
    justifyContent: "space-between",
    "@media (max-width:600px)": {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  infoHeading: {
    fontSize: "1rem",
    marginBottom: "1.12rem",
  },
  companyListBox: {
    display: "flex",
    background: `${LIGHT_GREY}`,
    height: "4.813rem",
    justifyContent: "space-between",
    marginBottom: "1rem",
    alignItems: "center",
    borderRadius: "0.5rem",
    paddingRight: "1rem",
  },
  companyList: {
    paddingLeft: "0.5rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "12.375rem",
  },

  companyListBoxLogDetails: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "68%",
    "@media (max-width: 600px)": {
      fontSize: "1rem",
      lineHeight: "1.5rem",
    },
  },
  listingBtn: {
    position: "",
    width: "9rem",
    top: "",
    right: "",
    border: "0.0625rem solid",
    marginTop: "0",
  },
  rejectedBtnStyling: {
    border: `0.0625rem solid ${METALLIC_SILVER}`,
    "& .MuiTypography-root": {
      color: `${DARK_GREY}`,
    },
  },
  revokeBtnStyling: {
    color: `${RED}`,
    border: `0.0625rem solid ${RED}`,
    "&:hover": {
      backgroundColor: `${RED}`,
      color: WHITE,
    },
  },
  textEllipsisWidth: {
    "@media(max-width: 1000px)": {
      width: "19rem",
    },
  },
  contactDetails: {
    display: "flex",
    flexDirection: "row",
    gap: "0.5rem",
  },
  customAddressStyle: {
    padding: "0rem",
  },
};
