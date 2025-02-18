import * as Yup from "yup";
import { MOBILE_NUMBER_REGEX } from "../Constant/AppConstant";
import {
  PASSWORD_REGEX_WITH_SPECIAL_CHARACTERS,
  PASSWORD_REGEX,
} from "../Constant/AppConstant";

export const SignupOtpSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is invalid"),
  mobile: Yup.string()
    .required("Phone number is required")
    .matches(MOBILE_NUMBER_REGEX, "Phone number is invalid"),
});

export const SignupSchema = Yup.object().shape({
  buyerName: Yup.string()
    .required("First name is required")
    .min(2, "This should be 2 to 30 characters long")
    .max(30, "This should be 2 to 30 characters long"),

  buyerEmail: Yup.string()
    .required("Email is required")
    .email("Email is invalid"),

  address1: Yup.string().required("Address is required"),
  address2: Yup.string(),

  // buyerCountry: Yup.string().required("Country is required"),
  option: Yup.string(),

  password: Yup.string().when("option", {
    is: "both",
    then: Yup.string()
      .required("Password is required")
      .matches(PASSWORD_REGEX_WITH_SPECIAL_CHARACTERS, "Password is invalid"),
    otherwise: Yup.string()
      .required("Password is required")
      .matches(PASSWORD_REGEX, "Password is invalid"),
  }),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
});
