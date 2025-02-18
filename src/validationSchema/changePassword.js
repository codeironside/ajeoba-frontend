import * as Yup from "yup";
import { PASSWORD_REGEX_WITH_SPECIAL_CHARACTERS, PASSWORD_REGEX } from "../Constant/AppConstant";

export const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old Password is required"),
  newPassword: Yup.string().when("roleType", {
    is: "management",
    then: Yup.string()
      .required("New Password is required")
      .matches(
        PASSWORD_REGEX_WITH_SPECIAL_CHARACTERS,
        "Password is invalid"
      ),
    otherwise: Yup.string()
      .required("New Password is required")
      .matches(
        PASSWORD_REGEX,
        "Password is invalid "
      ),
  }),
  confirmNewPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("newPassword"), null], "Confirm Password does not match"),
});
