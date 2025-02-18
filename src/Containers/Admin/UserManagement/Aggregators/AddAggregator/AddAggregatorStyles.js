export const styles = {
  phoneNumberContainer: {
    marginTop: "0.5rem",
    width: "100%",
    display: "flex",
  },
  mobileNumberInput: {
    width: "100%",
    borderRadius: "0px 0.5rem 0.5rem 0px",
    marginTop: "0px",
  },
  aggregatorFieldContainer: {
    marginTop: "1.875rem",
    marginBottom: "1.875rem",
    "@media(max-width: 600px)": {
      marginTop: "1.25rem",
      marginBottom: "1.25rem",
    },
  },
  saveBtnContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  responsiveFields: {
    "@media(max-width: 600px)": {
      marginTop: "0",
    },
  },
  addAggregatorContainer: {
    width: "100%",
    marginTop: "1.5rem",
  },
};
