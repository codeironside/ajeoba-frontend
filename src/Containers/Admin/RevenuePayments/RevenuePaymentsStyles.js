import { DARK_GREY } from "../../../Constant/ColorConstant";
import { commonStyles } from "../../../Style/CommonStyle";

export const styles = {
  // revenueTableHeight: {
  //   height: `calc(100vh - 23rem)`,
  //   overflow: "auto",
  //   ...commonStyles.customSrollBar,
  //   "@media(max-width: 600px)": {
  //     height: `calc(100vh - 31rem)`,
  //   },
  // },
  tableHeightNoDataFoundRevenue: {
    height: "calc(100vh - 22.5rem)",
  },
  disableSettlementBtn: {
    "&:disabled": {
      color: DARK_GREY,
    },
  },
};
