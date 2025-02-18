import * as Yup from "yup";
import { PASSWORD_REGEX } from "../Constant/AppConstant";

export const addQACompaniesSchema = (orgVerificationText) =>
  Yup.object().shape({
    addQACompanyEmail: Yup.string()
      .required("Email is required")
      .email("Email is invalid"),

    addQACompanyPassword: Yup.string()
      .required("Password is required")
      .matches(PASSWORD_REGEX, "Password is invalid"),

    addQACompanyConfirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf(
        [Yup.ref("addQACompanyPassword"), null],
        "Confirm Password does not match"
      ),

    addQaCompanyPassportPhoto: Yup.string().nullable(),

    addQaCompanyCACDocument: Yup.string().nullable(),

    addQaCompanyName: Yup.string()
      .required("Company name is required")
      .min(2, "This should be 2 to 25 characters long")
      .max(25, "This should be 2 to 25 characters long"),

    addQaComonayRegisrationNumber: Yup.string()
      .notRequired()
      .test(
        "min_length",
        "Registration number should have minimum of 2 chars",
        function (value) {
          if (!!value) {
            const schema = Yup.string().min(2);
            return schema.isValidSync(value);
          }
          return true;
        }
      )
      .test(
        "max_length",
        "Registration number can have maximum of 50 chars",
        function (value) {
          if (!!value) {
            const schema = Yup.string().max(50);
            return schema.isValidSync(value);
          }
          return true;
        }
      ),

    orgVerificationNumber: Yup.string()
      .notRequired()
      .test(
        "min_len",
        `${orgVerificationText} number should have minimum of 2 characters`,
        function (min_val) {
          if (!!min_val) {
            const schema = Yup.string().min(2);
            return schema.isValidSync(min_val);
          }
          return true;
        }
      )
      .test(
        "max_len",
        `${orgVerificationText} number can have maximum of 50 characters`,
        function (max_val) {
          if (!!max_val) {
            const schema = Yup.string().max(50);
            return schema.isValidSync(max_val);
          }
          return true;
        }
      ),

    qaCompanyCertificationType: Yup.array()
      .required("QA certication is required")
      .min(1, "At least 1 certificate is required"),
  });
