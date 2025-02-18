
export const exploremobileapp = {
  background: {
    position: "relative",
    width: "100%",
    height: "100%",
    "@media(min-width: 1400px)": {
      // aspectRatio: "10 / 5",
    },
    // "@media(min-width: 1350px)": {
    //   aspectRatio: "10 / 5",
    // },
    "@media(max-width: 1100px)": {
      aspectRatio: "10 / 7",
    },
    "@media(max-width: 900px)": {
      aspectRatio: "8 / 7",
    },
    "@media(max-width: 768px)": {
      aspectRatio: "4 / 4.5",
    },
    "@media(max-width: 600px)": {
      aspectRatio: "4 / 5.3",
    },
    "@media(max-width: 500px)": {
      aspectRatio: "4 / 5.5",
    },
    "@media(max-width: 450px)": {
      aspectRatio: "4 / 6",
    },
    "@media(max-width: 400px)": {
      aspectRatio: "4 / 6.5",
    },
    "@media(max-width: 350px)": {
      aspectRatio: "4 / 7.5",
    },
  },
  bgImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    // "@media(max-width: 400px)": {
    //   gap: "2rem",
    // },
  },
  topcontemt: {
    position: "absolute",
    top: "5%",
    left: "50%",
    // width: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    transform: "translate(-50%, 0)",
    textAlign: "center",
    gap: ".6vw",
    "@media(max-width: 768px)": {
      width: "100%",
      gap: "1rem",
    },
    "@media(max-width: 300px)": {
      gap: ".3rem",
    },
  },
  topcontemttext: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1vw",
    "@media(max-width: 768px)": {
      gap: "1rem",
      padding: "0 2rem",
    },
  },
  header: {
    color: "#6D9E3F",
    fontWeight: "700",
    fontFamily: "DM Sans",
    fontSize: "1rem",
    lineHeight: "2rem",
    textAlign: "center",
    textTransform: "uppercase",
    "@media(max-width: 768px)": {},
  },
  header2: {
    color: "black",
    fontWeight: "700",
    fontFamily: "DM Sans",
    fontSize: "1.75rem",
    lineHeight: "3rem",
    textTransform: "capitalize",
    textAlign: "center",
    "@media(max-width: 768px)": {
      lineHeight: "2.5rem",
      fontSize: "1.5rem",
      textAlign: "center",
    },
  },
  commingsson: {
    color: "#585858",
    fontWeight: "400",
    fontFamily: "DM Sans",
    fontSize: "1rem",
    lineHeight: "1.7rem",
    textTransform: "capitalize",
  },
  downloadappcpntainer: {
    // width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    "@media(max-width: 768px)": {
      flexDirection: "column",
      marginTop: "0.5rem",
      // width: "50%",
    },
  },
  downloadapp: {
    background: "#006D33",
    height: "4rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    gap: "1rem",
    cursor: "pointer",
    width: "17.5rem",
    transition: "background 0.3s ease-in",
    "@media(max-width: 768px)": {
      gap: "0.8rem",
      width: "16.5rem",
    },
    "@media (max-width: 400px)": {
      width: "14rem",
      height: "3rem",
    },
    "@:hover": {
      background: "#6D9E3F",
    },
  },
  storeicon: {
    width: "10%",
    "@media(max-width: 768px)": {
      width: "5%",
    },
  },
  download: {
    fontSize: "1rem",
    fontWeight: "700",
    fontFamily: "DM Sans",
    lineHeight: "1.3rem",
    color: "white",
    "@media (max-width: 500px)": {
      fontSize: "0.8rem",
      lineHeight: "1rem",
    },
  },
  bottomContent: {
    position: "absolute",
    bottom: "0",
    left: "50%",
    transform: "translate(-50%, 0)",
    width: "60%",
    height: "55%",
    "@media(min-width: 1400px)": {
      height: "65%",
    },
  },
  bottomContentsm: {
    position: "absolute",
    bottom: "0",
    left: "50%",
    transform: "translate(-50%, 0)",
    width: "60%",
    height: "auto",
    // "@media(max-width: 600px)": { width: "90%" },
  },
  bottomimg: {
    width: "100%",
    height: "100%",
  },
  carouselbottom: {
    position: "absolute",
    bottom: 0,
    right: 0,
    // left: 0,
    overflowX: "hidden",
    background:
      " linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.56) 111.49%)",
  },
  carouselbottomcontent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: ".5rem",
    padding: "1.5rem 0",
    "@media(max-width: 768px)": {
      padding: "1rem 0",
    },
  },
  carouselbottomiconcontent: {
    width: "5%",
    "@media(max-width: 768px)": {
      width: "3%",
    },
  },
  carouselbottomcontenttext: {
    fontSize: "1rem",
    fontWeight: "700",
    lineHeight: "1.3rem",
    color: "white",
    "@media(max-width: 768px)": {
      fontSize: ".9rem",
      lineHeight: "1.1rem",
    },
  },
};
