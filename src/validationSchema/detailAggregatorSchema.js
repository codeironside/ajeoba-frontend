import * as Yup from "yup";
import * as moment from "moment";
import { MIN_AGE } from "../Constant/AppConstant";

export const DetailAggregatorSchema = Yup.object().shape({
  aggregatorDetailFirstName: Yup.string()
    .required("First name is required")
    .min(2, "This should be 2 to 30 characters long")
    .max(30, "This should be 2 to 30 characters long"),

  aggregatorDetailLastName: Yup.string()
    .required("Last name is required")
    .min(2, "This should be 2 to 30 characters long")
    .max(30, "This should be 2 to 30 characters long"),

  aggregatorDetailGender: Yup.string().required("Gender is required"),

  aggregatorDetailCountryOfBirth: Yup.string().required(
    "Country of birth is required"
  ),
  aggregatorDetailCitizenship: Yup.string().required("Citizenship is required"),
  aggregatorDetailCountryOfTax: Yup.string()
    .required("country of Tax is required")
    .nullable(),
  aggregatorDetailDateOfBirth: Yup.string()
    .required("Date of birth is required")
    .test("invalidDate", "Date of birth is invalid", function (date) {
      return (
        moment(date).isValid() &&
        moment(date).isAfter("1900-12-31", "yeaar") &&
        moment().diff(date, "years") >= MIN_AGE
      );
    }),
  aggregatorDetailPassportPhoto: Yup.string()
    .required("Passport photo is required")
    .nullable(),
  aggregatorDetailTaxId: Yup.string()
    .notRequired()
    .nullable()
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
  aggregatorDetailUniqueIdentifictionType: Yup.string().required(
    "Unique Identifiation Type is required "
  ),
  aggregatorDetailUniqueIdentificationNumber: Yup.string()
    .nullable()
    .required("Unique Identifiction number is required")
    .min(2, "Unique Identifiction number should have minimum 2 characters")
    .max(20, "Unique Identifiction number can have maximum 20 characters"),

  aggregatorDetailTypeOfProducts: Yup.array()
    .required("Type of product is required")
    .min(1, "At least 1 product is required"),

  aggregatorDetailAccountHolderName: Yup.string()
    .test(
      "len",
      "Account holder name can have maximum 50 characters",
      (val) => val.length <= 50
    )
    .matches(/^[A-Za-z ]+$/, {
      excludeEmptyString: true,
      message:
        "Account holder name should not have numbers or special characters (#,@,!,  ... )",
    }),
  aggregatorDetailBankName: Yup.string()
    .test(
      "len",
      "Bank name can have maximum 200 characters",
      (val) => val.length <= 200
    )
    .matches(/^[A-Za-z ]+$/, {
      excludeEmptyString: true,
      message:
        "Bank name should not have numbers or special characters (#,@,!,  ... )",
    }),
  aggregatorDetailAccountNumber: Yup.string().nullable(),
});
