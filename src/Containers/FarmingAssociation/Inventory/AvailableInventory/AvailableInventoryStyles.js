export const styles = {
  listingMargin: {
    margin: "0",
  },
  cardsBox: {
    height: "calc(100vh - 12.5rem)",
  },
  listingMarginTop: {
    marginTop: "0",
    paddingTop: "1rem",
    "@media(max-width: 600px)": {
      flexDirection: "column",
    },
  },
  listingMarginTopProductListing: {
    marginTop: "0",
    "@media(max-width: 600px)": {
      flexDirection: "column",
    },
  },
 
  countBox: {
    marginBottom: "2.37rem",
  },
  addInventoryBtn: {
    width: "9.75rem",
    position: "absolute",
    zIndex: "1",
    top: "4%",
    right: "2%",
    "@media(max-width: 600px)": {
      top: "1%",
      right: "2%",
      width: "6.75rem",
      height: "2.75rem",
    },
  },
  createBatchButton: {
    width: "7.938rem",
    height: "3.5rem",
    zIndex: "1",
    top: "1.8%",

    position: "relative",
    "@media(max-width: 600px)": {
      top: "1.2%",
      right: "2%",
      width: "6rem",
      height: "2rem",
    },
  },
  filterDropdown: {
    maxWidth: "40%",
    "& .MuiTypography-root": {
      overflow: "hidden",
      width: "14.125rem",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
  },
  inventoryContainer: {
    paddingTop: "3.125rem",
  },
  createBatchContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "-1.875rem",
  },
  batchColumnStyles: {
    marginLeft: "0.55rem",
    alignItems: "center",
    gap: "0.3rem",
  },
  tableHeightStyle: { height: "calc(100vh - 16.7rem)" },
  inventoryMainContainer: {
    flexWrap: "noWrap",
  },

  batchBtnTextResponsive: {
    "@media(max-width: 600px)": {
      fontSize: "0.68rem",
    },
  },
  emptyBoxStyle: {
    height: "3.5rem",
    "@media (max-width: 600px)": {
      height: "2rem",
    },
  },
  viewMoreWidth: {
    width: "5.2rem",
  },
  batchIdBox: {
    display: "flex",
    alignItems: "center",
  },
  batchIconStyle: { height: "1.13rem", marginLeft: "0.313rem" },
  noContentStyles: {
    height: "calc(100vh - 20.3rem)",
  },
  marketPlaceHeight: {
    height: "calc(100vh - 12.5rem)",
  },
  marketPlaceStyles: {
    width: "calc(100% -  3rem)",
    padding: "0.5rem 1.25rem",
    height: "calc(100vh - 23.8rem)",
    overflowY: "auto",
  },
  marginLeft10: { marginLeft: "0.625rem" },
  batchListingNoDataFound: {
    height: "calc(100vh - 12.7rem)",
    paddingTop: "1.937rem",
  },
};
