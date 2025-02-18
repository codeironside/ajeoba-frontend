export const selectTruckStyles = {
  truckContainer: {
    "@media(max-width:600px)": {
      justifyContent: "center",
    },
  },
  deleteIcon: {
    paddingTop: "1rem",
  },
  truckDropdown: {
    marginTop: "1.25rem",
    display: "flex",
    flexDirection: "column",
    width: "21.25rem",
    "@media(max-width:600px)": {
      width: "18.25rem",
    },
  },
  customDropdown: {
    "@media (max-width:600px)": {
      minWidth: "0rem !important",
    },
  },
  selectTypeCountContainer: {
    alignItems: "center",
    "@media(max-width:600px)": {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
    },
  },
};
