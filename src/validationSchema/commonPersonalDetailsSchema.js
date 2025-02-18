import * as Yup from "yup";
import * as moment from "moment";
import { MIN_AGE } from "../Constant/AppConstant";

export const CommonPersonalDetailsSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "This should be 2 to 30 characters long")
    .max(30, "This should be 2 to 30 characters long"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "This should be 2 to 30 characters long")
    .max(30, "This should be 2 to 30 characters long"),
  dateOfBirth: Yup.string()
    .required("Date of birth is required")
    .test("invalidDate", "Date of birth is invalid", function (date) {
      return (
        moment(date).isValid() &&
        moment(date).isAfter("1900-12-31", "yeaar") &&
        moment().diff(date, "years") >= MIN_AGE
      );
    }),
});
