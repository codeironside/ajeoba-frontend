import { ROLES } from "../Constant/RoleConstant";

export const getText = (id) => {
  if (id === ROLES.FARMING_ASSOCIATION) return "farming association";
  else if (id === ROLES.PRODUCT_AGGREGATOR) return "Aggregator";
  else if (id === ROLES.QA_COMPANY) return "QA Company";
  else if (id === ROLES.CORPORATE_BUYER) return "Corporate Buyer";
  else if (id === ROLES.LOGISTICS_COMPANY) return "Logistics Company";
  else if (id === ROLES.SINGLE_BUYER) return "Buyer";
  else if (id === ROLES.SINGLE_SELLER) return "Seller";
  else return;
};
