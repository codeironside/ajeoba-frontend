import { commonStyles } from "../../../../../../../Style/CommonStyle";
export const refreeListingStyles = {
  refereeContainer: {
    marginTop: "-4.375rem",
    borderRadius: "0.5rem",
    height: "calc(100vh - 13.125rem)",
  },
  refereeListingContainer: {
    backgroundColor: "#fff",
    width: "calc(100% - 3.4rem)",
    margin: "auto",
    position: "relative",
    "@media (max-width: 1000px)": {
      width: "calc(100% - 3.125rem)",
    },
  },
  countSearchBox: {
    display: "flex",
    flexDirection: "column",
  },
  searchBar: {
    display: "flex",
    paddingLeft: "1.25rem",
    paddingBottom: "1.25rem",
    alignItems: "center",
    "@media (max-width: 600px)": {
      width: "90%",
    },
  },
  searchTable: {
    marginTop: "1.25rem",
    minHeight: "60vh",
    borderRadius: "0.375rem",
    maxWidth: "100%",
  },
  tableWrapperStyles: {
    height: "calc(100vh - 25.313rem)",
    overflow: "auto",
    ...commonStyles.customSrollBar,
  },
  countBox:{
    margin: "1.25rem 0 0 1rem"
  }
};
