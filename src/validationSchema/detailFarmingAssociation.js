import * as Yup from "yup";
import * as moment from "moment";
import {
  ACCOUNT_HOLDER_NAME_REGEX,
  BANK_NAME_REGEX,
  MIN_AGE,
} from "../Constant/AppConstant";

export const detailFarmingAssociation = (orgVerificationText) =>
  Yup.object().shape({
    associationDetailFirstName: Yup.string()
      .required("First name is required")
      .min(2, "This should be 2 to 30 characters long")
      .max(30, "This should be 2 to 30 characters long"),

    associationDetailLastName: Yup.string()
      .required("Last name is required")
      .min(2, "This should be 2 to 30 characters long")
      .max(30, "This should be 2 to 30 characters long"),

    associationDetailGender: Yup.string().required("Gender is required"),

    associationDetailDateOfBirth: Yup.string()
      .required("Date of birth is required")
      .test("invalidDate", "Date of birth is invalid", function (date) {
        return (
          moment(date).isValid() &&
          moment(date).isAfter("1900-12-31", "yeaar") &&
          moment().diff(date, "years") >= MIN_AGE
        );
      }),

    associationDetailPassportPhoto: Yup.string()
      .required("Passport photo is required")
      .nullable(),

    associationDetailAssociationName: Yup.string()
      .required("Association name is required")
      .min(2, "Association name should have minimum 2 characters")
      .max(100, "Association name can have maximum 100 characters"),

    associationDetailAssociationRegNumber: Yup.string()
      .nullable()
      .required("Association registration number is required")
      .min(
        2,
        "Association registration number should have minimum 2 characters"
      )
      .max(
        50,
        "Association registration number can have maximum 50 characters"
      ),

    orgVerificationNumber: Yup.string()
      .nullable()
      .required(`${orgVerificationText} number is required`)
      .min(2, `${orgVerificationText} number should have minimum 2 chars`)
      .max(50, `${orgVerificationText} number can have maximum 50 chars`),

    associationDetailTypeOfProducts: Yup.array()
      .required("Type of product is required")
      .min(1, "At least 1 product is required"),

    associationDetailMemberSize: Yup.string()
      .required("Member size is required")
      .test(
        "min",
        "Member size should have minimum of 1 member",
        function (memberSize) {
          return memberSize > 0;
        }
      )
      .test(
        "max",
        "Member size can have maximum of 10000000 members",
        function (memberSize) {
          return memberSize < 1000001;
        }
      ),

    associationDetailCACDocument: Yup.string()
      .required("CAC document is required")
      .nullable(),

    associationDetailAccountHolderName: Yup.string()
      .nullable()
      .test(
        "max_length",
        "Account holder name can have maximum 50 characters",
        function (value) {
          if (!!value) {
            const schema = Yup.string().max(50);
            return schema.isValidSync(value);
          }
          return true;
        }
      )
      .matches(ACCOUNT_HOLDER_NAME_REGEX, {
        excludeEmptyString: true,
        message:
          "Account holder name should not have numbers or special characters (#,@,!, ... )",
      }),
    associationDetailBankName: Yup.string()
      .nullable()
      .test(
        "max_length",
        "Bank name can have maximum 200 characters",
        function (value) {
          if (!!value) {
            const schema = Yup.string().max(200);
            return schema.isValidSync(value);
          }
          return true;
        }
      ),
    associationDetailAccountNumber: Yup.string().nullable(),
  });
