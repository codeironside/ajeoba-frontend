import * as Yup from "yup";
import { BANK_NAME_REGEX, ACCOUNT_HOLDER_NAME_REGEX } from "../Constant/AppConstant";

export const personalProfileDetailsSchema = Yup.object().shape({
  accountHolderName: Yup.string()
    .required("Account holder name is required")
    .test(
      "len",
      "Account holder name can have maximum 50 chars",
      (val) => val.length <= 50
    )
    .matches(ACCOUNT_HOLDER_NAME_REGEX, "Account holder name should not have numbers or special characters (#,@,!,  ... )"),
  bankName: Yup.string()
    .required("Bank name is required")
    .test(
      "len",
      "Bank name can have maximum 200 chars",
      (val) => val.length <= 200
    ),
  accountNumber: Yup.string().required("Account number is required"),
});
