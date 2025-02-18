import * as Yup from "yup";
import { PASSWORD_REGEX_WITH_SPECIAL_CHARACTERS} from "../Constant/AppConstant";

export const adminManagementSchema = Yup.object().shape({
  mode: Yup.string(),
  adminFirstName: Yup.string()
    .required("First name is required")
    .min(2, "This should be 2 to 30 characters long")
    .max(30, "This should be 2 to 30 characters long"),
  adminLastName: Yup.string()
    .required("Last name is required")
    .min(2, "This should be 2 to 30 characters long")
    .max(30, "This should be 2 to 30 characters long"),
  adminPassword: Yup.string()
    .when("mode", {
      is: "add",
      then: Yup.string().required("Password is required"),
    })
    .matches(
      PASSWORD_REGEX_WITH_SPECIAL_CHARACTERS,
      {
        message: "Password is invalid",
        excludeEmptyString: true,
      }
    ),
  adminConfirmPassword: Yup.string()
    .oneOf([Yup.ref("adminPassword"), null], "Passwords must match")
    .when("mode", {
      is: "add",
      then: Yup.string().required("Confirm password is required"),
    }),
});
