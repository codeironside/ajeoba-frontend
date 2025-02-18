export const patnersstyle = {
  parentcontainer: {},
  container: {
    width: "90%",
    margin: "3rem auto",
    "@media(max-width: 768px)": {
      margin: "8vw auto",
    },
  },
  topcontemttext: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: ".5vw",
    "@media(max-width: 768px)": {
      gap: "3vw",
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
  },
  header2: {
    color: "black",
    fontWeight: "700",
    fontFamily: "DM Sans",
    fontSize: "1.5rem",
    lineHeight: "3rem",
    textTransform: "capitalize",
    textAlign: "center",
    "@media(max-width: 768px)": {
      lineHeight: "1.5rem",
      fontSize: "1rem",
    },
  },
  // carouselimage: {
  //   height: "7rem",
  //   width: "15rem",
  //   alignItems: "center",
  //   display: "flex",
  //   margin: "0 2rem",
  //   "@media(max-width: 768px)": {
  //     width: "6rem",
  //     height: "3rem",
  //   },
  //   "@media(max-width: 600px)": {
  //     width: "100%",
  //     height: "2rem",
  //     margin: "0 2rem",
  //   },
  // },
  // carousecontainerlimage: {
  //   marginTop: "4rem",
  //   height: "10rem",
  //   width: "10rem",
  //   display: "grid",
  //   placeItems: "center",
  //   overflow: "hidden",
  //   "@media(max-width: 768px)": {
  //     height: "8rem",
  //   },
  //   "@media(max-width: 468px)": {
  //     height: "4rem",
  //   },
  // },
  carousecontainerlimage: {
    marginTop: "4rem",
    maxWidth: "40%",
    width: "100%",
    height: "auto",
    "@media(max-width: 1100px)": {
      maxWidth: "50%",
    },
  },

  carouselimage: {
    maxWidth: "40%",
    width: "100%",
    height: "50%",
    "@media(max-width: 1100px)": {
      height: "60%",
    },
  },
};
