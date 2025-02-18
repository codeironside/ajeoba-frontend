import { WHITE, ACTIVE_GREEN, LIGHT_GREY } from "../../Constant/ColorConstant";

export const styleModal = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  style: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    display: "flex",
    height: "fit-content",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    padding: "1rem",
    "@media(max-width:600px)": {
      flexDirection: "column",
      width: 400,
    },
  },
  donotShowAgain: {
    backgroundColor: LIGHT_GREY,
    width: "100%",
    height: "100%",
    margin: "0 auto",
    padding: "1rem",
    backgroundColor: ACTIVE_GREEN,
    color: WHITE,
    "&:hover": {
      backgroundColor: ACTIVE_GREEN,
    },
    "@media(max-width:600px)": {
      marginTop: "0",
    },
  },
  style_close: {
    position: "absolute",
    top: "15px",
    right: "15px",
    boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
    borderRadius: "50%",
    zIndex: 2000,
    padding: "8px 16px",
    bgcolor: "background.body",
    cursor: "pointer",
    fontSize: "1.2rem",
    fontWeight: "600",
    fontFamily: "poppins",
  },
};

export const subscribeFarmerCommonStyles = {
  subscribeFarmerButtonStyle: {
    width: "100%",
    height: "100%",
    margin: "0 auto",
    padding: "1rem",
    backgroundColor: ACTIVE_GREEN,
    color: WHITE,
    "&:hover": {
      backgroundColor: ACTIVE_GREEN,
    },
    "@media(max-width:600px)": {
      marginTop: "0",
    },
  },

  subscribeFarmerBox: {
    width: "100%",
    margin: "0 auto",
    backgroundColor: WHITE,
    padding: ".5rem 1rem",
  },

  signupFormFieldContainerSubscribe: {
    // marginBottom: "-1rem",
  },

  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    textAlign: "left",
    margin: "2.25rem auto 0",
    gap: "1rem",
    "@media(max-width:600px)": {
      margin: "0",
    },
  },

  randomSubContainer: {
    display: "flex",
    backgroundColor: "blue",
    flexDirection: "column",
    width: "25rem",
    textAlign: "left",
    margin: "2.25rem auto 0",
    "@media(max-width:600px)": {
      margin: "0",
    },
  },
};
