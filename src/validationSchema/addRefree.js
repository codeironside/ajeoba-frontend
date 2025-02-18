import * as Yup from "yup";
import * as moment from "moment";

import { MIN_AGE, MOBILE_NUMBER_REGEX } from "../Constant/AppConstant";

export const AddRefereeSchema = Yup.object().shape({
  mobileNumber: Yup.string()
    .required("Phone number is required")
    .matches(MOBILE_NUMBER_REGEX, "Phone number is invalid"),
  refereeFirstName: Yup.string()
    .required("First name is required")
    .min(2, "This should be 2 to 30 characters long")
    .max(30, "This should be 2 to 30 characters long"),
  refereeLastName: Yup.string()
    .required("Last name is required")
    .min(2, "This should be 2 to 30 characters long")
    .max(30, "This should be 2 to 30 characters long"),
  refereeGender: Yup.string().required("Gender is required"),
  refereeDateOfBirth: Yup.string()
    .required("Date of birth is required")
    .test("invalidDate", "Date of birth is invalid", function (date) {
      return (
        moment(date).isValid() &&
        moment(date).isAfter("1900-12-31", "yeaar") &&
        moment().diff(date, "years") >= MIN_AGE
      );
    }),
  UINNumber: Yup.string()
    .required("Unique identification number is required")
    .min(2, "This should be 2 to 20 characters long")
    .max(20, "This should be 2 to 20 characters long"),
});
