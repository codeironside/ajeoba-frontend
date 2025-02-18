import ajeobaLogo from "../../Assets/Images/ajeoba-logo.png";
import {
  PRIMARY_GREEN,
  ACTIVE_GREEN,
  BLACK,
  WHITE,
  DARK_GREY,
  GREEN_OPAQ_20,
} from "../../Constant/ColorConstant";
import { commonStyles } from "../../Style/CommonStyle";

const drawerWidth = 17.5;

export const styles = {
  parentBox: { display: "flex" },
  logoImageContainer: {
    cursor: "pointer",
    marginTop: "2rem",
    marginLeft: "2rem",
    backgroundImage: `url(${ajeobaLogo})`,
    backgroundRepeat: "no-repeat",
    backgroundColor: "transparent",
    backgroundSize: "contain",
    width: "6.25rem",
    minHeight: "2.5rem",
    "@media (max-width: 600px)": {
      width: "5.75rem",
      height: "2.25rem",
      marginTop: "1.5rem",
      marginLeft: "1rem",
    },
  },
  navBox: {
    flexShrink: { sm: 0 },
    width: `${drawerWidth}rem`,
    "@media (max-width: 600px)": {
      width: 0,
    },
  },
  tempDrawerContainer: {
    display: { xs: "block", sm: "none" },
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: `${drawerWidth}rem`,
    },
  },
  permDrawerContainer: {
    display: { xs: "none", sm: "block" },
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: `${drawerWidth}rem`,
    },
  },
  navTopcontainer: {
    width: "100%",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    overflow: "auto",
    marginTop: "1rem",
    ...commonStyles.customSrollBar,
  },
  navContainer: {
    width: "13.5rem",
  },
  navButton: {
    width: "13.5rem",
    height: "3.5rem",
    marginTop: "0.5rem",
    display: "flex",
    justifyContent: "flex-start",
    paddingLeft: "1rem",
    "&:hover": {
      backgroundColor: WHITE,
    },
  },
  navButtonSelected: {
    background: ACTIVE_GREEN,
    borderRadius: "0.5rem",
    "&:hover": {
      backgroundColor: ACTIVE_GREEN,
    },
  },
  restrictedRouteStyle: {
    opacity: 0.5,
    pointerEvents: "none",
    background: WHITE,
    COLOR: DARK_GREY,
  },
  icon: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    width: "1.5rem",
    height: "1.5rem",
    marginRight: "0.75rem",
  },
  buttonText: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontWeight: 500,
    textTransform: "none",
    color: BLACK,
  },
  buttonTextSelected: {
    color: WHITE,
  },
  mainContentBox: {
    flexGrow: 1,
    marginTop: "4.438rem",
    width: `calc(100% - ${drawerWidth}rem)`,
    height: `calc(100vh - 4.438rem)`,
    overflow: "auto",
  },
  sidebarMenuIcon: {
    marginRight: "0.938rem",
    fontSize: "1.875rem",
    color: DARK_GREY,
  },
  whiteIcon: {
    color: "white",
  },
  navSubMenu: {
    backgroundColor: GREEN_OPAQ_20,
    borderRadius: "0px 0px 0.5rem 0.5rem",
    cursor: "pointer",
    marginTop: "-0.313rem",
  },
  submenuIcon: {
    width: "0.313rem",
    height: "0.313rem",
    marginRight: "0.625rem",
    color: DARK_GREY,
  },
  subMenuIconSelected: {
    width: "0.313rem",
    height: "0.313rem",
    marginRight: "0.625rem",
    color: PRIMARY_GREEN,
  },
  subMenuTextSelected: {
    color: PRIMARY_GREEN,
    fontSize: "0.75rem",
    lineHeight: "1.25rem",
    fontWeight: 500,
  },
  subMenuText: {
    color: DARK_GREY,
    fontSize: "0.75rem",
    lineHeight: "1.25rem",
    fontWeight: 500,
  },
};
