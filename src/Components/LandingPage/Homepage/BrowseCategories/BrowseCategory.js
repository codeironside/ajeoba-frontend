export const browseCategry = {
  brosweParentContainer: {
    background: "#FFFFF8",
  },
  brosweCategoryContainer: {
    width: "100%",
  },

  topcontemttext: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "left",
    alignItems: "left",
    gap: "1rem",
    padding: "2rem 0 1rem 0",
    "@media(max-width: 768px)": {
      paddingTop: "2rem",
    },
  },
  brosweContentheadersFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    margin: "0 auto 0.1rem auto",
    "@media (max-width: 768px)": { justifyContent: "center" },
  },
  header: {
    color: "#6D9E3F",
    fontWeight: "700",
    fontFamily: "DM Sans",
    fontSize: "1rem",
    lineHeight: "2rem",
    textTransform: "uppercase",
    "@media(max-width: 768px)": {
      textAlign: "center",
    },
  },
  header2: {
    color: "black",
    fontWeight: "700",
    fontFamily: "DM Sans",
    fontSize: "1.5rem",
    lineHeight: "3rem",
    textTransform: "capitalize",
    "@media(max-width: 768px)": {
      lineHeight: "2.5rem",
      fontSize: "1.5rem",
      textAlign: "center",
    },
  },
  viewMore: {
    color: "#003C1C",
    fontWeight: "700",
    fontFamily: "DM Sans",
    fontSize: "1.1rem",
    lineHeight: "1.5rem",
    textDecoration: "underline",
    transition: "textDecoration 0.5s ease-out",
    "&:hover": {
      textDecoration: "none",
    },
    "@media(max-width: 768px)": {
      fontSize: "1rem",
      color: "#003C1C",
    },
  },
  arrowIcon: {
    color: "#0063DD",
  },
  viewMoreContainer: {
    display: "flex",
    alignItems: "center",
    gap: ".2rem",
    cursor: "pointer",
    justifyContent: "center",
  },
  viewMoreContainersm: {
    display: "flex",
    alignItems: "center",
    gap: ".3rem",
    cursor: "pointer",
    justifyContent: "center",
    marginTop: "1rem",
  },

  categoryOptionContainer: {
    display: "flex",
    width: "60%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "1rem",
    "@media(max-width: 1100px)": {
      width: "75%",
    },
    "@media (max-width: 768px)": {
      overflowX: "auto",
      flexWrap: "nowrap",
      width: "100%",
    },
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  categoryparentContainr: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "2vw",
    marginTop: ".5rem ",
    width: "90%",
    margin: " 0 auto",
    "@media(max-width: 768px)": {
      paddingLeft: "2rem",
      width: "100%",
      margin: "0",
    },
  },

  categoryOption: {
    color: "#585858",
    fontWeight: "400",
    fontSize: "1rem",
    lineHeight: "1.3rem",
    border: "1px solid #E7E7E7",
    borderRadius: "50px",
    padding: "13px 24px 13px 24px",
    width: "fit-content",
    textTransform: "capitalize",
    textAlign: "center",
    transition:
      "background .3s ease-out, color .3s ease-out, border .3s ease-out",
    cursor: "pointer",
    "&:hover": {
      background: "rgba(0, 109, 51, 0.05)",
      border: "1px solid #006D33",
      color: "#006D33",
    },
    "@media(max-width: 1100px)": {
      fontSize: ".8rem",
      minWidth: "25%",
    },
    "@media(max-width: 768px)": {
      fontSize: ".8rem",
      minWidth: "25%",
    },
    "@media(max-width: 500px)": {
      // fontSize: ".8rem",
      minWidth: "32%",
      padding: "10px 10px",
    },
    "@media(max-width: 400px)": {
      minWidth: "35%",
      fontSize: "0.8rem",
    },
  },
  activeadlistContainer: {
    display: "flex",
    gap: "2rem",
    width: "100%",
    fontFamily: "DM Sans",
    "@media (max-width: 1200px)": {
      overflowX: "auto",
      flexWrap: "nowrap",
    },
    "@media (max-width: 500px)": {
      margin: "1rem 0",
    },
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  activeadlistCard: {
    width: "25%",
    borderRadius: "8px",
    border: "1px solid rgba(210, 210, 210, 1)",
    boxShadow: "0",
    transition: "background 0.5s ease-out",
    "&:hover": {
      background: "none",
    },
    "@media (max-width: 1200px)": {
      minWidth: "28%",
    },
    // "@media (max-width: 1100px)": {
    //   minWidth: "33%",
    // },
    "@media (max-width: 768px)": {
      minWidth: "40%",
    },
    "@media (max-width: 600px)": {
      minWidth: "60%",
    },
    "@media (max-width: 300px)": {
      minWidth: "90%",
    },
  },
};
