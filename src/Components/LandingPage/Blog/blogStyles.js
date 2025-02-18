import { ACTIVE_GREEN, LIGHT_GREY } from "../../../Constant/ColorConstant"


export const blogCSS = {

  section_1: {
    position: "relative",
    contain: "content",
    display: "flex",
    flexDirection: "column",
    height: "fit-content",
    width: "fit-content",
    gap: "3rem",
    padding: "4rem 6rem 6rem",
    margin: "0rem auto 0",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    "@media(max-width: 600px)": {
      padding: "0",
      height: "fit-content",
    },
    "@media(min-width: 1300px)": {
      padding: "4rem 14rem 3rem",
    },
  },

  info: {
    display: "flex",
    width: "fit-content",
    alignItems: "center",
    padding: ".7rem",
    gap: "1rem",
    margin: "0 auto",
  },

  info_top: {margin: "0 auto 0 0"},

  info_min: {
    display: "flex",
    width: "fit-content",
    alignItems: "center",
    gap: "2rem",
    padding: "0",
    margin: "0 0 0 1rem",
  },

  bannerTop: {
    display: "flex",
    width: "fit-content",
    flexDirection: "column",
    gap: "2rem",
    margin: "0 auto 6rem",
    textAlign: "center",
    "@media(max-width: 600px)": {
      width: "inherent",
      margin: "0 auto",
      gap: "1.25rem",
      padding: "2rem 0rem 1rem",
    },
  },

  bannerBottom: {
    display: "flex",
    width: "fit-content",
    flexDirection: "row",
    gap: "2rem",
    margin: "0 auto 2rem",
    textAlign: "center",
    "@media(max-width: 600px)": {
      flexDirection: "column",
      width: "91%",
      margin: "0 auto",
      gap: "1.25rem",
      padding: ".75rem 0rem",
    },
  },

  dimension: {
    flex: "1",
    display: "flex",
    contain: "content",
    "@media(max-width: 600px)": {
      width: "100%",
      height: "auto",
      borderRadius: ".5rem",
      padding: "2rem 0rem",
    }
  },

  b_below: {
    gap: "3rem",
    flexDirection: "column",
    padding: "1rem 0rem",
    justifyContent: "start",
    "@media(max-width: 600px)": {
      gap: "1.5rem",
      width: "100%",
    },
  },

  bb_image: {
    width: "100%",
    height: "100%",
  },

  bannerTopTitle: {
    width: "fit-content",
    margin: "0 auto",
  },

  title: {
    textAlign: "center",
    fontFamily: "DM Sans",
    fontSize: "3rem",
    fontWeight: "700",
    lineHeight: "2",
    color: "#003C1C",
    "@media(max-width: 600px)": {
      fontSize: "2rem",
      lineHeight: "2.625rem",
    },
  },

  blog_para: {
    fontFamily: "DM Sans",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "24px",
    letterSpacing: "0em",
    textAlign: "left",
  },

  blog_title: {
    fontFamily: "DM Sans",
    fontSize: "1.25rem",
    fontWeight: "700",
    lineHeight: "2rem",
    letterSpacing: "0em",
    textAlign: "left",
    color: "#003C1C",
  },

  title_b: {
    fontFamily: "DM Sans",
    width: "fit-content!important",
    fontSize: "2.5rem",
    fontWeight: "700",
    lineHeight: "3.5rem",
    letterSpacing: ".05em",
    textAlign: "left",
    color: "#003C1C",
    "@media(min-width: 1300px)": {
      letterSpacing: ".15em",
      lineHeight: "3.75rem",
    },
  },

  general_para: {
    height: "100%", 
    width: "100%",
    padding: "0rem",
    fontSize: "1.125rem",
    fontFamily: "DM Sans",
    fontWeight: "400",
    lineHeight: "1.688rem",
    letterSpacing: "0em",
    color: "#585858",
    textAlign: "center",
    "@media(max-width: 600px)": {
      fontSize: "1rem",
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

  welcome_para: {
    fontFamily: "DM Sans",
    fontSize: "1.125rem",
    fontWeight: "400",
    lineHeight: "1.75rem",
    letterSpacing: "0em",
    textAlign: "left",
    "@media(min-width: 1300px)": {
      fontSize: "1.5rem",
      lineHeight: "2rem",
    },
  },

  read_more_top_btn: {
    backgroundColor: "#006D33",
    color: "#FFFFFF",
    width: "8.438rem",
    height: "2.813rem",
    padding: "0.75rem 1.688rem",
    borderRadius: "0.5rem",
    gap: "0.5rem",
    textTransform: "capitalize",
  },

  more_btn_container: {
    textAlign: "center",
    padding: "2rem 0 0",
  },

  load_more_btn: {
    width: "8.438rem",
    height: "2.813rem",
    padding: "0.75rem 1.688rem",
    borderRadius: "0.5rem",
    border: "0.063rem solid #006D33",
    gap: "0.5rem",
    backgroundColor: "#FFFFFF",
    color: "#006D33",
    textTransform: "capitalize",
    margin: "0 auto",
  },

  orientation: {
    display: "block",
  },

  blog_cards: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "2rem",
    boxSizing: "border-box!important",
    "@media(max-width: 600px)": {
      flexDirection: "column",
      width: "26.872rem",
      padding: "0rem 1.5rem 0 .75rem",
    },
    "@media(min-width: 1300px)": {
      gap: "2.2rem",
    },
  },

  card: {
    display: "flex",
    flexDirection: "column",
    borderRadius: ".5rem",
    contain: "content",
    border: "0.063rem solid #BEBEBE",
  },

  link: {
    marginTop: "-1rem",
    width: "90px",
    height: "auto",
  },

  link_img: {
    width: "100%",
  },

  blog_card: {
    width: "25rem",
    height: "27.25rem",
    display: "flex",
    flexDirection: "column",
    contain: "content",
    gap: ".35rem",
    borderBottom: "0.063rem solid #EAEAEA",
    boxSizing: "border-box",
    padding: "0 0 4px 0",
    margin: "0 0 4px 0",
  },

  blog_image: {
    width: "45rem",
    height: "193.008px", // 193.008px,
  },

  blog_card_body: {},

  blog_card_footer: {},

  searchBar: {
    width: "49rem",
    height: "3.5rem",
    fontWeight: "400",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    border: "0.063rem solid #F2F2F2",
    boxSizing: "border-box",
    borderRadius: "0.5rem",
    paddingLeft: "0.75rem",
    backgroundColor: "#F5F5F5",
    "@media (max-width:600px)": {
      margin: "0",
      width: "24.375rem",
    },
  },

  searchIcon: {
    color: ACTIVE_GREEN,
  },

  iconBox: {
    backgroundColor: LIGHT_GREY,
    width: "5rem",
    height: "2.75rem",
    boxShadow: "0px 0.375rem 0.75rem rgba(0, 0, 0, 0.01)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    "@media(max-width:600px)": {
      fontWeight: 400,
      fontSize: "0.6rem",
    },
  },

  single_wrapper: {
    position: "relative",
    contain: "content",
    display: "flex",
    flexDirection: "column",
    height: "fit-content",
    width: "100%",
    gap: "3rem",
    padding: "6rem",
    margin: "0rem auto 0",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    "@media(max-width: 600px)": {
      padding: "8rem 1rem 1rem",
      margin: "0rem",
      height: "fit-content",
      gap: "1rem",
    },
    "@media(min-width: 1300px)": {
      padding: "6rem 14rem 3rem",
    },
  },

  cover_image: {
    width: "100%",
    height: "35.938rem",
    borderRadius: "0.5rem",
    objectFit: "cover",
    "@media(max-width: 600px)": {
      height: "204px",
      objectFit: "none",
    },
  },

  inner_wrapper: {
    width: "70%",
    "@media(max-width: 600px)": {
      width: "100%",
      padding: "0rem",
      margin: "0rem",
    },
  },

  inner_wrapper_last: {
    margin: "0 auto -4rem",
    gap: "2rem",
    display: "flex",
    flexDirection: "column",
    textAlign: "justify",
    "@media(max-width: 600px)": {
      gap: "1rem",
      width: "100%",
    },
  },

  blog_image_single_blog: {
    width: "100%",
    margin: "0 auto",
  },

}