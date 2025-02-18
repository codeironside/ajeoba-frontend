import * as Yup from "yup";

export const BankDetailsSchema = Yup.object().shape({
  accountHolderName: Yup.string()
    .notRequired()
    .test(
      "check",
      "Account holder name should be 2 to 50 characters long",
      function (data) {
        if (!!data) {
          const validate = Yup.string().min(2).max(50);
          return validate.isValidSync(data);
        }
        return true;
      }
    ),
  bankName: Yup.string()
    .notRequired()
    .test(
      "checkBank",
      "Bank name should be 2 to 50 characters long",
      function (data) {
        if (!!data) {
          const validateBank = Yup.string().min(2).max(50);
          return validateBank.isValidSync(data);
        }
        return true;
      }
    ),

  accountNumber: Yup.string()
    .notRequired()
    .test(
      "check",
      "Account number should be 2 to 50 characters long",
      function (value) {
        if (!!value) {
          const validate = Yup.string().min(2).max(50);
          return validate.isValidSync(value);
        }
        return true;
      }
    ),
});
