import profileBackground from "../../Assets/Images/profileBackground.svg";
import { WHITE, ACTIVE_GREEN, BLACK } from "../../Constant/ColorConstant";

export const styles = {
  activeTab: {
    position: "absolute",
    top: "4.12rem",
    zIndex: "1",
    width: "100%",
    "& 	.MuiTabs-indicator": {
      height: "0rem",
    },
    "& .MuiTabs-flexContainer": {
      justifyContent: "center",
    },
  },
  tabPanelDisplay: {
    "& 	.Mui-selected": {
      background: WHITE,
    },
  },
  activeTabAlignLeft: {
    "& .MuiTabs-flexContainer": {
      justifyContent: "left",
    },
  },
  activeTabAlignLeftCorp: {
    "& .MuiTabs-flexContainer": {
      justifyContent: "left",
      padding: "0 1.7rem",
    },
  },
  activeTabPaddingCorp: {
    padding: "0 1.7rem",
  },
  noActiveTab: {
    "& 	.Mui-selected": {
      background: "none",
    },
  },
  listingActiveTabs: {
    "& 	.MuiTabs-indicator": {
      height: "0rem",
    },
  },
  listingTabPanelDisplay: {
    "& 	.Mui-selected": {
      background: ACTIVE_GREEN,
      color: "white!important",
    },
  },
  "@media (max-width: 1032px)": {
    top: "30%",
    left: "20%",
  },
  admin: {
    background: "none",
  },
  tabStyling: {
    borderRadius: "0.5rem 0.5rem 0rem 0rem",
    color: WHITE,
    padding: "0.62rem 1.25rem",
    fontSize: "0.87rem",
    textTransform: "capitalize",
    minHeight: "3rem",
  },
  textEllipsis: {
    "@media (max-width:600px)": {
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
      width: "5rem",
    },
  },
  listingInActiveTab: {
    color: BLACK,
    display: "flex",
    flexDirection: "row",
    gap: "0.5rem",
    "&.MuiTab-root": {
      minHeight: "0",
    },
    "& img": {
      filter:
        "invert(52%) sepia(80%) saturate(11%) hue-rotate(35deg) brightness(100%) contrast(88%)",
    },
    "&.Mui-selected": {
      "& img": {
        filter:
          "invert(0%) sepia(1%) saturate(12%) hue-rotate(30deg) brightness(105%) contrast(100%)",
      },
    },
    "@media (max-width: 600px)": {
      top: "0.625rem",
      padding: "0.3rem 0.6rem",
      fontSize: "0.75rem",
    },
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: 500,
    marginTop: "1.25rem",
    color: WHITE,
  },
  content: {
    width: "100%",
    height: "11.5rem",
    justifyContent: "center",
    position: "relative",
    backgroundImage: `url(${profileBackground})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  backArrow: {
    top: "10%",
    position: "absolute",
    left: "2.06rem",
    zIndex: "1",
    color: WHITE,
  },
  mainContainer: {
    height: "calc(100vh - 4.43rem)",
    overflow: "hidden",
    "@media (max-width: 600px)": {
      width: "100%",
    },
  },
  superAdminProfile: {
    marginTop: "2.5rem",
  },
};
