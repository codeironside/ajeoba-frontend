import { LIGHT_GREY, BLACK, LIGHT_GREEN, LIGHT_SILVER_GREY } from "../../Constant/ColorConstant";
import { commonStyles } from "../../Style/CommonStyle";

export const openProductDetailsStyles = {
  openDialogModalContainer: {
    height: "fit-content",
    width: "70%",
    overflow: "scroll",
    "@media(max-width:600px)": {
      width: "90%",
    },
  },

  mainModalContainer: {
    padding: "2rem 4rem",
    background: LIGHT_GREY,
    maxHeight: "auto",
    width: "100%",
    "@media(max-width:600px)": {
      padding: "1rem",
      width: "100%"
    },
  },
  insideModalContainer: {
    border: `2px solid ${LIGHT_SILVER_GREY}`,
    borderRight: "none",
    borderLeft: "none",
    height: "180px",
    flex: 1,
    marginLeft: "16px",
    padding: "8px 0",
    display: "flex",
    alignItems: "center",
    "@media(max-width:600px)": {
      flexDirection: "column",
      marginLeft: "0",
      marginBottom: "8px",
      width: "100%",
      alignItems: "start",
    },
  },
  insideModalContainerImage: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1.5rem",
    "@media(max-width:600px)": {
      flexDirection: "column",
      alignItems: "start",
    },
  },
  detailsContainer: {
    marginLeft: "0.75rem",
    fontFamily: "Poppins",
    width: "80%",
    display: "flex",
  },
  firstColumn: {
    marginRight: "4rem",
  },
  fieldsMainConatiner: {
    padding: "1rem 4rem",
    width: "96%",
    margin: "0",
    "@media(max-width:600px)": {
      width: "90%",
    },
  },
  totalAmountText: {
    fontWeight: "500",
    fontSize: "0.857rem",
    lineHeight: "1.313rem",
    color: BLACK,
    marginRight: "0.5rem",
    "@media(max-width:600px)": {
      fontSize: "0.75rem",
    },
  },
  totalAmountValue: {
    color: "#006D33",
    fontWeight: "500",
    "@media(max-width:600px)": {
      fontSize: "0.75rem",
    },
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  imageContainer: {
    minWidth: "17rem",
    minHeight: "12rem",
    margin: "0 auto",
    display: "flex",
    "@media(max-width:600px)": {
      minWidth: "21rem",
      minHeight: "11rem",
      marginBottom: "1rem",
    },
  },
  productNameWidth: {
    maxWidth: "9rem",
  },
};
