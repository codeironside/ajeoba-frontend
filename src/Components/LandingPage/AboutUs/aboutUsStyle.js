export const styles = {
  aboutContainer: {
    backgroundColor: "#fbfbfb",
    display: "flex",
    flexDirection: "column",
    gap: "0rem",
  },

  title: {
    textAlign: "center",
    fontFamily: "DM Sans",
    fontSize: "32px",
    fontWeight: "700",
    lineHeight: "44px",
    letterSpacing: "-0.02em",
    color: "#003C1C",
  },

  title_001: {
    fontFamily: "DM Sans",
    fontSize: "32px",
    fontWeight: "700",
    lineHeight: "50px",
    letterSpacing: "0em",
    textAlign: "left",
    color: "#003C1C",
  },

  columnDynamic: {
    xs: 4,
    sm: 8,
    md: 12,
  },

  about_icons: {
    width: "64px",
    height: "61px",
    padding: "0",
    borderRadius: "8px",
    contain: "content",
    gap: "8px",
    backgroundColor: "#F0F5EC",
  },

  bi_img: {
    height: "100%",
    width: "100%",
  },

  board_container: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    "@media(max-width: 600px)": {
      gap: "1rem",
    },
  },

  board_image_box: {
    height: "135px",
    width: "135px",
    borderRadius: "50%",
    margin: "0 auto",
    contain: "content",
  },

  board_card: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    padding: "1rem",
    textAlign: "center",
    gap: "1rem",
    "@media(max-width: 600px)": {
      padding: "1rem 0",
    },
  },

  group_board_card: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "80vw",
    margin: "0 auto",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    boxSizing: "border-box",
    "@media(max-width: 600px)": {
      flexDirection: "column",
      height: "fit-content",
    },
    "@media(min-width: 1300px)": {
      width: "70vw",
      padding: "0 8rem",
    },
  },

  section_0: {
    display: "flex",
    flexDirection: "row",
    height: "auto", // "242px",
    width: "100%",
    padding: "0",
    boxSizing: "border-box",
    "@media(max-width: 600px)": {
      flexDirection: "column",
    },
  },

  about_banner_image: {
    height: "242px",
    width: "100%",
    "@media(max-width: 600px)": {
      objectFit: "contain",
    },
  },

  top_flour: {
    position: "absolute",
    top: "-.5rem",
    left: "-.5rem",
    height: "350px",
    width: "auto",
  },

  bottom_flour: {
    position: "absolute",
    bottom: "-.5rem",
    right: ".51rem",
    height: "350px",
    width: "auto",
  },

  section_1: {
    position: "relative",
    contain: "content",
    display: "flex",
    flexDirection: "row",
    height: "fit-content",
    width: "100vw",
    gap: "2rem",
    padding: "6rem 8rem",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    "@media(max-width: 600px)": {
      flexDirection: "column",
      width: "100%",
      padding: "2rem 1rem",
      height: "fit-content",
      margin: "0",
    },
    "@media(min-width: 1300px)": {
      padding: "6rem 12rem",
    },
  },

  general_para: {
    height: "100%", //15.1875rem
    width: "100%",
    padding: "0rem",
    fontSize: "1.5vm",
    fontFamily: "DM Sans",
    // fontSize: "16px",
    fontWeight: "400",
    lineHeight: "2.6875vm",
    letterSpacing: "0em",
    textAlign: "left",
    "@media(max-width: 600px)": {
      fontSize: "medium",
      height: "fit-content",
      padding: "0",
    },
    "@media(min-width: 1650px)": {
      fontSize: "1.55rem",
      width: "fit-content",
      lineHeight: "2.5rem",
      margin: "0 auto",
    },

    "@media(min-width: 1500px)": {
      fontSize: "1.5rem",
      width: "fit-content",
      lineHeight: "2.65rem",
      margin: "0 auto",
    },
  },

  paragraph: {
    height: "100%",
    width: "100%",
    padding: "0rem",
    fontSize: ".75rem",
    fontFamily: "DM Sans",
    fontWeight: "400",
    lineHeight: "1rem",
    letterSpacing: "0em",
    textAlign: "left",
    "@media(max-width: 600px)": {
      height: "fit-content",
      fontSize: "1rem",
      lineHeight: "1.5rem",
      padding: "0",
    },

    "@media(min-width: 1300px)": {
      fontSize: "1.3rem",
      width: "fit-content",
      lineHeight: "2.6rem",
    },
  },

  mission_vision_text: {
    height: "100%", //15.1875rem
    width: "100%",
    padding: "0rem",
    fontSize: "1.5vm",
    fontFamily: "DM Sans",
    fontWeight: "400",
    lineHeight: "2.6875vm",
    letterSpacing: "0em",
    textAlign: "left",
    "@media(max-width: 600px)": {
      fontSize: "medium",
      height: "fit-content",
      padding: "0",
    },
    "@media(min-width: 1650px)": {
      fontSize: "1.55rem",
      width: "fit-content",
      lineHeight: "2.5rem",
      margin: "0 auto",
    },

    "@media(min-width: 1500px)": {
      fontSize: "1.5rem",
      width: "fit-content",
      lineHeight: "2.65rem",
      margin: "0 auto",
    },
  },

  section_1_banner_image: {
    width: "100%",
    height: "auto",
  },

  inner_s1: {
    flex: 1,
    display: "flex",
    height: "fit-content",
    // width: "40.875rem",
    flexDirection: "column",
    "@media(max-width: 600px)": {
      width: "100%",
    },
  },

  value_bottom: {
    position: "relative",
    bottom: "0",
  },

  vb_icon: {
    position: "absolute",
    right: "0",
    bottom: "0",
    zIndex: "0",
  },

  vb_icon_left: {
    position: "absolute",
    left: "0",
    bottom: "0",
    zIndex: "0",
  },

  dimension: {
    height: "380px",
    "@media(max-width: 600px)": {
      height: "638.74px",
      contain: "content",
    },
  },

  section_2_image: {
    height: "auto",
    width: "100%",
    "@media(max-width: 600px)": {
      height: "184px",
    },
  },

  inner_s2_inner: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    zIndex: "10",
    gap: "32px",
  },

  s2_para: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  footer_para: {
    fontFamily: "DM Sans",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "32px",
    letterSpacing: "0em",
    textAlign: "left",
  },

  isi_reverse: {
    "@media(max-width: 600px)": {
      flexDirection: "column-reverse",
    },
  },

  inner_vb: {
    display: "flex",
    flexDirection: "column",
  },

  section_2: {
    display: "flex",
    flexDirection: "row",
    height: "fit-content",
    position: "relative",
    backgroundColor: "#F0F5EC",
    width: "100vw",
    gap: "2rem",
    padding: "4rem 8rem 8rem",
    alignItems: "center",
    contain: "content",
    justifyContent: "center",
    "@media(max-width: 600px)": {
      flexDirection: "column",
      width: "100%",
      padding: "2rem 1rem",
      height: "fit-content",
      margin: "0",
    },
    "@media(min-width: 1300px)": {
      padding: "6rem 12rem 12rem",
    },
  },

  grid: {
    position: "absolute",
    zIndex: "0",
    height: "100%",
  },

  section_2_inner: {
    flex: "1",
    display: "flex",
    flexDirection: "row",
    height: "90%",
    gap: "2rem",
    boxSizing: "border-box",
    "@media(max-width: 600px)": {
      flexDirection: "column",
      height: "849px",
    },
  },

  section_3: {
    display: "flex",
    flexDirection: "column",
    height: "fit-content",
    position: "relative",
    backgroundColor: "#FFFFFF",
    width: "100vw",
    gap: "2rem",
    padding: "2rem 8rem 4rem",
    alignItems: "center",
    contain: "content",
    justifyContent: "center",
    "@media(max-width: 600px)": {
      width: "100%",
      padding: "2rem 1rem",
      height: "fit-content",
      margin: "0",
    },
    "@media(min-width: 1300px)": {
      padding: "4rem 12rem",
    },
  },

  value_container: {
    display: "flex",
    flexDirection: "column",
    height: "fit-content",
    position: "relative",
    width: "auto",
    padding: "4rem 0rem",
    backgroundColor: "#FFFFFF",
    zIndex: "100",
    contain: "content",
    boxSizing: "border-box",
    "@media(max-width: 600px)": {
      width: "100%",
      padding: "2rem 1rem",
      height: "fit-content",
      margin: "0",
    },
    "@media(min-width: 1000px)": {
      padding: "4rem 0 0rem",
    },
  },

  group_value_card: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    width: "fit-content",
    gap: "1rem",
    boxSizing: "border-box",
    backgroundColor: "#FFFFFF",
    "@media(max-width: 600px)": {
      flexDirection: "column",
      height: "fit-content",
    },
    "@media(min-width: 800px)": {
      flexWrap: "wrap",
    },
    "@media(min-width: 1300px)": {
      height: "fit-content",
    },
  },

  value_card: {
    display: "flex",
    flexDirection: "column",
    width: "23.5rem",
    height: "15.375rem",
    padding: "1.5rem",
    backgroundColor: "#FFFFFF",
    zIndex: "100",
    borderRadius: "0.5rem",
    gap: "1rem",
    border: "1px solid #BEBEBE",
    "@media(max-width: 600px)": {
      width: "100%",
      height: "fit-content",
    },
    "@media(min-width: 800px)": {
      width: "22.5rem",
      height: "17.5rem",
    },
    "@media(min-width: 1300px)": {
      width: "32.5rem",
      height: "20rem",
    },
  },

  section_4: {
    display: "flex",
    flexDirection: "column",
    height: "fit-content",
    position: "relative",
    backgroundColor: "#FFFFFF",
    width: "100vw",
    gap: "2rem",
    padding: "4rem 8rem",
    alignItems: "center",
    contain: "content",
    justifyContent: "center",
    "@media(max-width: 600px)": {
      width: "100%",
      padding: "2rem 1rem",
      height: "fit-content",
      margin: "0",
    },
    "@media(min-width: 1300px)": {
      padding: "6rem 16rem",
      height: "fit-content",
    },
  },

  section_4_box: {
    padding: "0",
    "@media(min-width: 1300px)": {
      padding: "2rem 16rem",
    },
  },

  section_5: {
    display: "flex",
    flexDirection: "column",
    height: "697px",
    gap: "32px",
    padding: "2rem 3rem",
    contain: "centent",
    boxSizing: "border-box",
    "@media(max-width: 600px)": {
      flexDirection: "column",
      height: "fit-content",
    },
  },

  name_title: {
    fontFamily: "DM Sans",
    fontSize: "1.2rem",
    fontWeight: "700",
    lineHeight: "32px",
    letterSpacing: "0em",
  },

  section_6: {
    display: "flex",
    flexDirection: "column",
    height: "442px",
    boxSizing: "border-box",
    backgroundColor: "#F0F5EC",
    "@media(max-width: 600px)": {
      height: "fit-content",
    },
  },

  section_6_top: {
    display: "flex",
    flexDirection: "row",
    height: "429px",
    padding: "2rem 3rem",
    margin: "0 3rem",
    gap: "2rem",
    boxSizing: "border-box",
    borderBottom: "1px solid #B0D2C0",
    backgroundColor: "#F0F5EC",
    "@media(max-width: 600px)": {
      flexDirection: "column",
      height: "fit-content",
      margin: "0",
    },
  },

  footer_bottom: {
    fontFamily: "DM Sans",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "25px",
    letterSpacing: "0em",
    textAlign: "center",
    padding: "16px 0",
  },

  footer_col_1: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  social_media_icons: {
    display: "flex",
    flexDirection: "row",
    gap: "16px",
  },

  sm_icons: {
    height: "39.31px",
    width: "39.31px",
  },

  footer_list: {
    display: "flex",
    gap: "6rem",
  },

  ul: {
    listStyle: "none",
    padding: "0rem",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  },

  section_6_inner: {
    flex: "1",
    display: "flex",
    flexDirection: "row",
    height: "100%",
    boxSizing: "border-box",
    "@media(max-width: 600px)": {
      flexDirection: "column",
    },
  },

  s6i: {
    flex: "1",
  },

  footer_title: {
    fontFamily: "DM Sans",
    fontSize: "20px",
    fontWeight: "700",
    lineHeight: "26.04px",
    letterSpacing: "0em",
    textAlign: "left",
    marginBottom: "16px",
  },

  carousel_height: {
    height: "200px",
  },
};
