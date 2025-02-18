import { RED } from "../../../Constant/ColorConstant";
import { commonStyles } from "../../../Style/CommonStyle";

export const styles = {
  createLogisticBtn: {
    width: "10.5rem",
  },
  logisticAdsImage: {
    marginBottom: "0.6rem",
  },
  tableHeightNoDataFoundSearchFilterLogisticAds: {
    height: `calc(100vh -  17.2rem)`,
  },
  logisticAdTableHeight: {
    height: `calc(100vh -  18.8rem)`,
  },
  logisticAdTableHeightPagination: {
    overflowY: "scroll",
    ...commonStyles.customSrollBar,
    height: `calc(100vh -  21rem)`,
  },
  adNotPlacedStyle:{
    color: RED,
  },
  dialogStyling:{
    "& .MuiDialog-container": {
      marginTop: "7rem",
      height: "60%",
    },
  }
};
