export const styles = {
  fieldStyles: {
    marginTop: "1.25rem",
    width: "21.25rem",
  },
  
  qaCompanyDetail: {
    alignItems: "center",
    flexDirection: "column",
    flexWrap: "noWrap",
    justifyContent: "",
  },

  adminQaEditContainer: {
    margin: "0",
    padding: " 1rem 0rem 0rem 0rem",
  },
  editQACompanyBtn: {
    display: "none",
  },
  qaCompanyEmailPhoneContainer: {
    display: "flex",
    flex: "1",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    gap: "6.25rem",
    "@media(max-width: 600px)": {
      flexDirection: "column",
      gap: "0",
      margin: "0",
    },
  },
  adminEditBtn: {
    marginRight: "1.25rem",
  },
  shiftAdminContainer: {
    paddingLeft: "8.9rem",
    "@media(max-width: 900px)": {
      padding: "0",
    },
  },
  adminQAComapanyBtn: {
    "@media(max-width: 600px)": {
      flexDirection: "column",
    },
  },
  responsiveEmailPhone: {
    paddingBottom: "0.75rem",
  },
};
