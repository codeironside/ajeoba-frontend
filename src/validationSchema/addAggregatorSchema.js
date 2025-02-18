import * as Yup from "yup";
import * as moment from "moment";
import {
  MIN_AGE,
  MOBILE_NUMBER_REGEX,
  PASSWORD_REGEX,
} from "../Constant/AppConstant";

export const addAggregatorSchema = Yup.object().shape({
  addAggregatorEmail: Yup.string()
    .required("Email is required")
    .email("Email is invalid"),

  addAggregatorMobile: Yup.string()
    .required("Phone number is required")
    .matches(MOBILE_NUMBER_REGEX, "Phone number is invalid"),

  addAggregatorPassword: Yup.string()
    .required("Password is required")
    .matches(PASSWORD_REGEX, "Password is invalid"),
  addAggregatorConfirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf(
      [Yup.ref("addAggregatorPassword"), null],
      "Confirm Password does not match"
    ),

  addAggregatorFirstName: Yup.string()
    .required("First name is required")
    .min(2, "This should be 2 to 30 characters long")
    .max(30, "This should be 2 to 30 characters long"),

  addAggregatorLastName: Yup.string()
    .required("Last name is required")
    .min(2, "This should be 2 to 30 characters long")
    .max(30, "This should be 2 to 30 characters long"),

  addAggregatorGender: Yup.string().required("Gender is required"),

  addAggregatorDateOfBirth: Yup.string()
    .required("Date of birth is required")
    .test("invalidDate", "Date of birth is invalid", function (date) {
      return (
        moment(date).isValid() &&
        moment(date).isAfter("1900-12-31", "yeaar") &&
        moment().diff(date, "years") >= MIN_AGE
      );
    }),

  addAggregatorPassportPhoto: Yup.string(),

  addAggregatorCountryOfBirth: Yup.string(),

  addAggregatorCitizenship: Yup.string(),

  addAggregatorCountryOfTax: Yup.string(),

  addAggregatorUniqueIdentificationNumber: Yup.string()
    .notRequired()
    .test(
      "min_length",
      "Unique identifiction number should have minimum 2 characters",
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
      "Unique identifiction number can have maximum 20 characters",
      function (value) {
        if (!!value) {
          const schema = Yup.string().max(20);
          return schema.isValidSync(value);
        }
        return true;
      }
    ),

  addAggregatorUniqueIdentifictionType: Yup.string(),

  addAggregatorTaxId: Yup.string()
    .notRequired()
    .test(
      "min_length",
      "Tax Id should have minimum of 2 characters",
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
      "Tax Id can have maximum of 9 characters",
      function (value) {
        if (!!value) {
          const schema = Yup.string().max(9);
          return schema.isValidSync(value);
        }
        return true;
      }
    ),

  addAggregatorTypeOfProducts: Yup.array()
    .required("Type of product is required")
    .min(1, "At least 1 product is required"),
});
