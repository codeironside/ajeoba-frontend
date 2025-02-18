import { TABLE_HEIGHT } from "../../Constant/LayoutConstant";
import { commonStyles } from "../../Style/CommonStyle";

export const styles = {
  customBtnWidth: {
    width: "10.125rem",
  },
  imgPosition: { marginBottom: "0.375rem" },
  tableWrapper: {
    height: `calc(100vh - ${TABLE_HEIGHT})`,
    overflow: "auto",
    ...commonStyles.customSrollBar,
  },
  customTableWrapperStyle: {
    height: "calc(100vh - 25.7rem)",
    overflowY: "scroll",
    ...commonStyles.customSrollBar,
    "@media (max-width:600px)": {
      height: "calc(100vh - 28rem)",
      overflowY: "scroll",
      ...commonStyles.customSrollBar,
    },
  },
};
