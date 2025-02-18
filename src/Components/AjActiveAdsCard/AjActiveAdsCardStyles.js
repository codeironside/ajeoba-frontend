import { Height } from "@mui/icons-material";

export const styles = {
  mainContainer: {
    width: "100%",
    display: "flex",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: "0.75rem",
    padding: "1rem",
    marginBottom: "1.5rem",
    justifyContent: "space-between",
  },
  mainContainerRetail: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: "0.75rem",
    marginBottom: "1.5rem",
  },
  subContentContainer: {
    display: "flex",
    "@media (max-width:600px)": {
      flexDirection: "column",
      width: "90%",
      alignItems: "center",
    },
  },
  subContentContainerRetail: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "1.2rem",
    width: "100%",
    gap: "1.5rem",
    "@media (max-width:768px)": {
      flexDirection: "column",
      // width: "90%",
      alignItems: "flex-start",
    },
  },
  marginTopResponsive: {
    "@media (max-width:600px)": {
      marginTop: "1rem",
    },
  },
};
