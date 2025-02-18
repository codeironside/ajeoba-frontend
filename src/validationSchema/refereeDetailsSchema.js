import * as Yup from "yup";
import * as moment from "moment";
import { MIN_AGE } from "../Constant/AppConstant";

export const refereeDetailsSchema = Yup.object().shape({
  refereeDetailsFirstName: Yup.string()
    .required("First name is required")
    .min(2, "This should be 2 to 30 characters long")
    .max(30, "This should be 2 to 30 characters long"),
  refereeDetailsLastName: Yup.string()
    .required("Last name is required")
    .min(2, "This should be 2 to 30 characters long")
    .max(30, "This should be 2 to 30 characters long"),
  refereeDetailsGender: Yup.string().required("Gender is required"),
  refereeDetailsDateOfBirth: Yup.string()
    .required("Date of birth is required")
    .test("invalidDate", "Date of birth is invalid", function (date) {
      return (
        moment(date).isValid() &&
        moment(date).isAfter("1900-12-31", "year") &&
        moment().diff(date, "years") >= MIN_AGE
      );
    }),
});
