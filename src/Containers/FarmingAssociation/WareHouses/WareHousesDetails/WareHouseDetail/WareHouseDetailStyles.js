import { ACTIVE_GREEN, WHITE } from "../../../../../Constant/ColorConstant";

export const styles = {
  wareHouseDetailEditBtn: {
    color: ACTIVE_GREEN,
    marginTop: "0",
    lineHeight: "1.313rem",
    fontWeight: "600",
    borderRadius: "0.5rem",
    width: "7.5rem",
    backgroundColor: WHITE,
    "&:hover": {
      backgroundColor: ACTIVE_GREEN,
      color: WHITE,
    },
    "@media (max-width: 900px)": {
      marginTop: "1rem",
    },
  },
  statusEditContainer: {
    width: "100%",
    margin: "1.5rem 1.25rem 0px 1.25rem",
    display: "flex",
    alignItems: "center",
    "@media(max-width: 900px)": {
      flexDirection: "column",
      justifyContent: "center",
    },
  },
  statusUpdate: {
    textAlign: "center",
    width: "100%",
  },

  shiftContainer: {
    paddingLeft: "7.5rem",
    "@media(max-width: 900px)": {
      paddingLeft: "0px",
      flexDirection: "column",
    },
  },
  btnContainer: {
    "@media(max-width: 900px)": {
      flexDirection: "column",
    },
  },
  detailWareHouse: {
    width: "100%",
    "@media(max-width: 600px)": {
      marginTop: "2rem",
    },
  },
  responsiveBox: {
    "@media(max-width: 900px)": {
      marginTop: "0",
    },
  },
  wareHouseDetailResponsiveField: {
    marginTop: "0.313rem",
    "@media(max-width: 600px)": {
      marginTop: "0",
    },
  },
};
