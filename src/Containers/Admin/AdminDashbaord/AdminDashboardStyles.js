import { METALLIC_SILVER } from "../../../Constant/ColorConstant";

export const styles = {
  boxStyle: {
    minWidth: "24rem",
    "&:hover": {
      boxShadow: `0 0 0.938rem ${METALLIC_SILVER}`,
      transition: "box-shadow 0.5s ease-in-out",
    },
    "@media (max-width: 600px)": {
      minWidth: "20rem",
    },
  },
  headingTextStyle: {
    fontSize: "1.1rem",
  },
  countTextStyle: {
    fontSize: "2.25rem",
  },
};
