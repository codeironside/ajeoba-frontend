import { LIGHT_GREY, BLACK } from "../../Constant/ColorConstant";
import { commonStyles } from "../../Style/CommonStyle";

export const buyProductModalStyles = {
  modalContentConatiner: {
    overflow: "scroll",
    position: "relative",
    ...commonStyles.customSrollBar,
  },
  
  mainModalContainer: {
    padding: "1rem 4rem",
    background: LIGHT_GREY,
    maxHeight: "auto",
    "@media(max-width:600px)": {
      padding: "1rem",
    },
  },
  insideModalContainer: {
    display: "flex",
    alignItems: "center",
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
    width: "100%",
    margin: "0",
    "@media(max-width:600px)": {
      width: "100%",
    },
  },
  fieldsMainConatinerPayment: {
    padding: "1rem 0rem",
    width: "96%",
    margin: "0",
    "@media(max-width:600px)": {
      width: "90%",
      padding: "0",
    },
  },
  totalAmountText: {
    fontWeight: "500",
    fontSize: "0.857rem",
    lineHeight: "1.313rem",
    color: "#fff",
    marginRight: "0.5rem",
    letterSpacing: "0rem",
    fontFamily: "Poppins",
    "@media(max-width:600px)": {
      fontSize: "0.75rem",
    },
  },

  totalAmountTextPayment: {
    fontWeight: "700",
    fontSize: "1.25rem",
    lineHeight: "1.5rem",
    color: "#fff",
    marginRight: "0.5rem",
    fontFamily: "DM Sans",
    letterSpacing: "0em",
    textAlign: "left",
    "@media(max-width:600px)": {
      fontSize: "0.75rem",
    },
  },

  deliveryLabel: {
    fontWeight: "700",
    fontSize: "1.25rem",
    lineHeight: "1.5rem",
    color: "#090909",
    marginRight: "0.5rem",
    fontFamily: "DM Sans",
    letterSpacing: "0em",
    textAlign: "left",
    "@media(max-width:600px)": {
      fontSize: "0.75rem",
    },
  },

  totalAmountValue: {
    color: "#fff",
    fontWeight: "500",
    "@media(max-width:600px)": {
      fontSize: "0.75rem",
    },
  },

  weight: {
    color: "#fff",
    fontWeight: "500",
    "@media(max-width:600px)": {
      fontSize: "0.75rem",
      fontWeight: "800",
    },
  },

  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: "2rem",
    "@media(max-width:600px)": {
      marginBottom: "1.5rem",
    },
  },

  imageContainer: {
    minWidth: "12rem",
    minHeight: "7rem",
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