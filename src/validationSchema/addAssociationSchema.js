import * as Yup from "yup";
import * as moment from "moment";
import {
  MIN_AGE,
  MOBILE_NUMBER_REGEX,
  PASSWORD_REGEX,
} from "../Constant/AppConstant";

export const addAssociationSchema = (orgVerificationText) =>
  Yup.object().shape({
    addAs_Email: Yup.string()
      .required("Email is required")
      .email("Email is invalid"),

    addAs_Mobile: Yup.string()
      .required("Phone number is required")
      .matches(MOBILE_NUMBER_REGEX, "Phone number is invalid"),

    addAs_Password: Yup.string()
      .required("Password is required")
      .matches(PASSWORD_REGEX, "Password is invalid"),

    addAs_ConfirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf(
        [Yup.ref("addAs_Password"), null],
        "Confirm Password does not match"
      ),

    addAs_FirstName: Yup.string()
      .required("First name is required")
      .min(2, "This should be 2 to 30 characters long")
      .max(30, "This should be 2 to 30 characters long"),

    addAs_LastName: Yup.string()
      .required("Last name is required")
      .min(2, "This should be 2 to 30 characters long")
      .max(30, "This should be 2 to 30 characters long"),

    addAs_Gender: Yup.string().required("Gender is required"),

    addAs_DateOfBirth: Yup.string()
      .required("Date of birth is required")
      .test("invalidDate", "Date of birth is invalid", function (date) {
        return (
          moment(date).isValid() &&
          moment(date).isAfter("1900-12-31", "yeaar") &&
          moment().diff(date, "years") >= MIN_AGE
        );
      }),

    addAs_PassportPhoto: Yup.string(),

    addAs_associationName: Yup.string()
      .required("Association name is required")
      .min(2, "Association name should have minimum 2 chars")
      .max(100, "Association name can have maximum 100 chars"),

    addAs_associationRegNumber: Yup.string()
      .notRequired()
      .test(
        "min_len",
        "Association registration number should have minimum of 2 characters",
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
        "Association registration number can have maximum of 50 characters",
        function (max_val) {
          if (!!max_val) {
            const schema = Yup.string().max(50);
            return schema.isValidSync(max_val);
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

    addAs_TypeOfProducts: Yup.array()
      .required("Type of product is required")
      .min(1, "At least 1 product is required"),

    addAs_memberSize: Yup.string()
      .notRequired()
      .test(
        "min",
        "Member size should have minimum of 1 member",
        function (memberSize) {
          if (!!memberSize) {
            const schema = Yup.string().test(function (min_val) {
              return min_val > 0;
            });
            return schema.isValidSync(memberSize);
          }
          return true;
        }
      )
      .test(
        "max",
        "Member size can have maximum of 1000000 members",
        function (memberSize) {
          if (!!memberSize) {
            const schema = Yup.string().test(function (max_val) {
              return max_val < 1000001;
            });
            return schema.isValidSync(memberSize);
          }
          return true;
        }
      ),

    addAs_CACDocument: Yup.string(),
  });
