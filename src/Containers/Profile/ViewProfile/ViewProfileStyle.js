import {
  ACTIVE_GREEN,
  BLACK,
  DARK_GREY,
  PRIMARY_GREEN,
  WHITE,
} from "../../../Constant/ColorConstant";

export const viewProfileStyles = {
  associationDetailsContainer: {
    display: "flex",
    width: "80%",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "1.5rem",
    "@media (max-width: 1000px)": {
      width: "100%",
    },
  },
  associationDetailsContainerWidth: {
    width: "80%",
  },
  personalDetailsContainerWidth: {
    width: "100%",
    marginTop: "0",
  },
  associationDetailsContainerWidthRole: {
    justifyContent: "center",
  },
  userName: {
    fontSize: "1rem",
    color: DARK_GREY,
    marginBottom: "0.354rem",
    textTransform: "capitalize",
  },
  associationDetails: {
    display: "flex",
    padding: "0px",
    marginTop: "2.333rem",
    textAlign: "center",
    justifyContent: "space-between",
    "@media(max-width:600px)": {
      flexWrap: "wrap",
    },
  },
  customAssociationDetailsStyle: {
    marginTop: "0px",
    minWidth: "50%",
  },
  associationDetailsCustom: {
    "@media (max-width: 1670px)": {
      width: "80%",
    },
  },
  subHeadingColor: {
    color: BLACK,
  },
  itemLabel: {
    "@media (max-width: 1670px)": {
      marginTop: "0.75rem",
    },
  },
  downloadWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "underline",
    color: PRIMARY_GREEN,
    "@media (max-width: 900px)": {
      marginBottom: "0.75rem",
    },
  },
  changeBtnStyle: {
    display: "none",
  },
  docTextStyle: {
    fontWeight: "400",
    fontSize: "0.875rem",
    color: PRIMARY_GREEN,
  },
  productsContainer: {
    display: "flex",
    flexDirection: "column",
    width: "43.75rem",
    marginBottom: "3.125rem",
    alignItems: "center",
    "@media (max-width: 1000px)": {
      width: "90%",
    },
  },
  productsCorporateContainer: {
    display: "flex",
    flexDirection: "column",
    contain: "content",
    width: "100%",
    backgroundColor: "#F7F7F7",
    borderRadius: ".5rem",
    marginBottom: "3.125rem",
    alignItems: "center",
    "@media (max-width: 1000px)": {
      width: "90%",
    },
  },
  productsCorporateDetailContainer: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    backgroundColor: "#FFF",
    borderRadius: ".5rem",
    margin: "2rem auto",
    padding: "2rem",
    alignItems: "center",
    "@media (max-width: 600px)": {
      padding: "0",
      width: "98%",
      backgroundColor: "#F7F7F7",
    },
  },
  pcc_top: {
    position: "relative",
    backgroundColor: "#D6E5C7",
    width: "100%",
    height: "75px",
    contain: "content",
  },
  cancelBtnStyle: {
    marginTop: "1.875rem",
    marginRight: "1.25rem",
    fontSize: "0.875rem",
    color: ACTIVE_GREEN,
    lineHeight: "1.313rem",
    fontWeight: "600",
    borderRadius: "0.5rem",
    backgroundColor: WHITE,
    width: "13.188rem",
    height: "3.5rem",
    textTransform: "unset",
    "&:hover": {
      backgroundColor: ACTIVE_GREEN,
      color: WHITE,
    },
    "@media (max-width: 1000px)": {
      marginRight: "0px",
    },
  },
  addressHeading: {
    color: DARK_GREY,
    marginBottom: "1.25rem",
    display: "flex",
    gap: "0.25rem",
  },
  roleHeading: {
    color: BLACK,
    marginBottom: "1.25rem",
    textTransform: "uppercase",
  },

  btnContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  addressMainHeading: {
    fontWeight: "500",
    fontSize: "0.875rem",
    color: PRIMARY_GREEN,
    marginBottom: "1.25rem",
  },
  textEllipsis: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "50%",
    whiteSpace: "nowrap",
  },
  addressLineHeading: {
    whiteSpace: "nowrap",
  },
  addressContent: {
    overflowWrap: "anywhere",
  },
  setWidth: {
    textOverflow: "ellipsis",
    textAlign: "center",
    overflow: "hidden",
    width: "90%",
    margin: "0 auto",
    whiteSpace: "nowrap",
  },

  subHeadingStyle: {
    fontSize: "1rem",
    lineHeight: "1.5rem",
  },
  orderMainContainer: {
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
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
};
