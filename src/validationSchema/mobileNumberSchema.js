import * as Yup from "yup";
import { MOBILE_NUMBER_REGEX } from "../Constant/AppConstant";

export const mobileNumberSchema = Yup.object().shape({
  mobileNumber: Yup.string()
    .required("Phone number is required")
    .matches(MOBILE_NUMBER_REGEX, "Phone number is invalid"),
  countryCode: Yup.string(),
  countryId: Yup.string(),
});
